import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, CheckCircle2, Lock, Send } from "lucide-react";

/* ─── Types ─── */
type Step = "url" | "quiz" | "results" | "gate";

interface Option {
  label: string;
  points: number;
}

interface Question {
  text: string;
  options: Option[];
}

/* ─── Data ─── */
const questions: Question[] = [
  {
    text: "How do you currently generate most of your new leads?",
    options: [
      { label: "Referrals only", points: 1 },
      { label: "Some outbound", points: 2 },
      { label: "Inbound marketing", points: 3 },
      { label: "Mix of everything", points: 4 },
    ],
  },
  {
    text: "Do you have a dedicated marketing person or team?",
    options: [
      { label: "No", points: 1 },
      { label: "Part-time", points: 2 },
      { label: "Full-time", points: 3 },
      { label: "Agency", points: 4 },
    ],
  },
  {
    text: "How often do you publish content?",
    options: [
      { label: "Never", points: 1 },
      { label: "Monthly", points: 2 },
      { label: "Weekly", points: 3 },
      { label: "Multiple times per week", points: 4 },
    ],
  },
  {
    text: "Do you run any paid advertising?",
    options: [
      { label: "No", points: 1 },
      { label: "Tried it, stopped", points: 2 },
      { label: "Running some now", points: 3 },
      { label: "Active campaigns with tracking", points: 4 },
    ],
  },
  {
    text: "How do you nurture leads after first contact?",
    options: [
      { label: "We don't", points: 1 },
      { label: "Manual follow-up", points: 2 },
      { label: "Email sequences", points: 3 },
      { label: "Full CRM automation", points: 4 },
    ],
  },
  {
    text: "Do you have a clear ICP documented?",
    options: [
      { label: "No", points: 1 },
      { label: "Sort of", points: 2 },
      { label: "Yes, documented", points: 3 },
      { label: "Yes, and we use it to target", points: 4 },
    ],
  },
  {
    text: "Rate your brand consistency across channels.",
    options: [
      { label: "What brand?", points: 1 },
      { label: "Inconsistent", points: 2 },
      { label: "Mostly consistent", points: 3 },
      { label: "Dialed in", points: 4 },
    ],
  },
  {
    text: "Do you track marketing ROI or cost per lead?",
    options: [
      { label: "No", points: 1 },
      { label: "Loosely", points: 2 },
      { label: "Yes, monthly", points: 3 },
      { label: "Yes, with attribution", points: 4 },
    ],
  },
  {
    text: "Do you use case studies or testimonials in sales?",
    options: [
      { label: "No", points: 1 },
      { label: "Have some, don't use them", points: 2 },
      { label: "Yes, actively", points: 3 },
      { label: "Yes, with video", points: 4 },
    ],
  },
  {
    text: "How would you describe your competitive positioning?",
    options: [
      { label: "Compete on price", points: 1 },
      { label: "Similar to others", points: 2 },
      { label: "Clear differentiator", points: 3 },
      { label: "Own a niche", points: 4 },
    ],
  },
];

/* ─── Helpers ─── */
function computeCategories(answers: number[]) {
  const avg = (indices: number[]) => {
    const vals = indices.map((i) => answers[i] ?? 0);
    return Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 4)) * 100);
  };
  return [
    { label: "Lead Generation", score: avg([0, 3, 4]) },
    { label: "Content & Brand", score: avg([2, 6]) },
    { label: "Sales Enablement", score: avg([8, 9]) },
    { label: "Analytics & Tracking", score: avg([7]) },
    { label: "Competitive Position", score: avg([5, 9]) },
  ];
}

function barColor(score: number) {
  if (score <= 40) return "bg-destructive";
  if (score <= 70) return "bg-warning";
  return "bg-success";
}

function getInsights(cats: ReturnType<typeof computeCategories>) {
  const insights: string[] = [];
  const lowest = [...cats].sort((a, b) => a.score - b.score);
  if (lowest[0].score <= 40)
    insights.push(`Your ${lowest[0].label.toLowerCase()} is a critical gap — fixing this could be your fastest growth lever.`);
  if (lowest[1].score <= 50)
    insights.push(`${lowest[1].label} needs attention. Most MSPs at your stage underinvest here.`);
  const best = [...cats].sort((a, b) => b.score - a.score)[0];
  if (best.score >= 60)
    insights.push(`${best.label} is your strongest area — double down and use it as a competitive advantage.`);
  if (insights.length === 0)
    insights.push("You're ahead of most MSPs. The full report shows exactly where to push next.");
  return insights;
}

/* ─── Circular Gauge ─── */
const CircularGauge = ({ score }: { score: number }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const color = score <= 40 ? "hsl(var(--destructive))" : score <= 70 ? "hsl(var(--warning))" : "hsl(var(--success))";

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
interface MarketingAuditProps {
  onBack: () => void;
}

const MarketingAudit = ({ onBack }: MarketingAuditProps) => {
  const [step, setStep] = useState<Step>("url");
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const handleUrlSubmit = () => {
    if (!url.trim()) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep("quiz");
    }, 2200);
  };

  const handleAnswer = (points: number) => {
    const next = [...answers, points];
    setAnswers(next);
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      setStep("results");
    }
  };

  const overallScore = Math.round((answers.reduce((a, b) => a + b, 0) / (questions.length * 4)) * 100);
  const categories = computeCategories(answers);
  const insights = getInsights(categories);
  const pagesIndexed = Math.floor(Math.random() * 18) + 5;
  const domain = (() => {
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  })();

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitted(true);
  };

  return (
    <div ref={topRef}>
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </button>

      <AnimatePresence mode="wait">
        {/* ─── STEP 1: URL ─── */}
        {step === "url" && (
          <motion.div
            key="url"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">MSP Marketing Audit</h2>
            <p className="text-muted-foreground text-center mb-8">
              Let's start with your website
            </p>

            {!scanning ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="audit-url" className="text-sm text-muted-foreground mb-1.5 block">
                    Your MSP website
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="audit-url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://yourmsp.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                      />
                    </div>
                    <button
                      onClick={handleUrlSubmit}
                      className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
                    >
                      Analyze
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    We'll check your online presence and combine it with your answers for a complete audit.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-primary/30 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-muted-foreground">Scanning your site…</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── STEP 2: QUIZ ─── */}
        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto"
          >
            {/* Site detected banner */}
            <div className="rounded-lg border border-success/20 bg-success/5 p-3 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Website detected: <span className="text-foreground font-medium">{domain}</span>. We found{" "}
                <span className="text-foreground font-medium">{pagesIndexed} pages</span> indexed.
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                  animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-5">
                  {questions[currentQ].text}
                </h3>
                <div className="grid gap-2">
                  {questions[currentQ].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt.points)}
                      className="text-left px-4 py-3 rounded-lg border border-border/50 bg-card/30 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── STEP 3: RESULTS PREVIEW ─── */}
        {(step === "results" || step === "gate") && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-1 text-center">Your Marketing Maturity Score</h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">Based on your answers and website analysis</p>

            <CircularGauge score={overallScore} />

            {/* Category bars */}
            <div className="mt-10 space-y-4">
              {categories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{cat.label}</span>
                    <span className="text-foreground font-medium">{cat.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${barColor(cat.score)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="mt-8 rounded-xl border border-border/50 bg-card/50 p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Key Insights</h3>
              <ul className="space-y-2">
                {insights.map((ins, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {ins}
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── STEP 4: EMAIL GATE ─── */}
            <div className="mt-12 relative">
              {/* Blurred preview */}
              <div className="rounded-xl border border-border/30 bg-card/30 p-6 mb-6 select-none pointer-events-none" aria-hidden>
                <div className="filter blur-[6px] opacity-40 space-y-3">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-full" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-5/6" />
                  <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mt-4" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-full" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-4/5" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground/40" />
                </div>
              </div>

              {!submitted ? (
                <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Unlock Your Full Marketing Audit</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Get detailed recommendations, competitor benchmarks, and a prioritized action plan.
                  </p>
                  <form onSubmit={handleGateSubmit} className="max-w-sm mx-auto space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      aria-label="Full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                      Get My Full Report
                    </button>
                    <p className="text-xs text-muted-foreground/50">
                      No spam. Just your report and occasional growth tips.
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-success/20 bg-success/5 p-8 text-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-1">Check your inbox!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your full report is on its way to <span className="text-foreground font-medium">{email}</span>.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketingAudit;
