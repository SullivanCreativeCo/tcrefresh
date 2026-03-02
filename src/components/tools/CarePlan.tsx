import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Lock, Send, Lightbulb } from "lucide-react";

/* ─── Types ─── */
type Step = "quiz" | "results";

interface RadioQuestion {
  type: "radio";
  text: string;
  options: { label: string; value: number }[];
}

interface MultiQuestion {
  type: "multi";
  text: string;
  options: string[];
}

type Question = RadioQuestion | MultiQuestion;

/* ─── Data ─── */
const questions: Question[] = [
  {
    type: "radio",
    text: "How many endpoints do you currently manage across all clients?",
    options: [
      { label: "Under 500", value: 1 },
      { label: "500–2,000", value: 2 },
      { label: "2,000–10,000", value: 3 },
      { label: "10,000+", value: 4 },
    ],
  },
  {
    type: "radio",
    text: "What percentage of your revenue comes from security services?",
    options: [
      { label: "Under 10%", value: 1 },
      { label: "10–25%", value: 2 },
      { label: "25–50%", value: 3 },
      { label: "Over 50%", value: 4 },
    ],
  },
  {
    type: "multi",
    text: "Which security services do you currently offer?",
    options: [
      "EDR / Antivirus",
      "Email Security",
      "Backup & DR",
      "Security Awareness Training",
      "Vulnerability Scanning",
      "vCISO / Compliance",
      "Incident Response",
      "None of these",
    ],
  },
  {
    type: "radio",
    text: "What's your biggest challenge growing security revenue?",
    options: [
      { label: "Clients don't see the value", value: 1 },
      { label: "We don't know how to price it", value: 2 },
      { label: "We lack the technical expertise", value: 3 },
      { label: "We can't differentiate from competitors", value: 4 },
    ],
  },
  {
    type: "radio",
    text: "How do you currently talk about security with clients?",
    options: [
      { label: "We mention it when asked", value: 1 },
      { label: "We include it in QBRs", value: 2 },
      { label: "We lead with it in every conversation", value: 3 },
      { label: "We have a dedicated security sales motion", value: 4 },
    ],
  },
  {
    type: "radio",
    text: "What's your target growth for security revenue in the next 12 months?",
    options: [
      { label: "Just getting started", value: 1 },
      { label: "25% growth", value: 2 },
      { label: "50% growth", value: 3 },
      { label: "Double it or more", value: 4 },
    ],
  },
  {
    type: "radio",
    text: "Do you have a standardized security stack you recommend to all clients?",
    options: [
      { label: "No, it varies", value: 1 },
      { label: "Somewhat standardized", value: 2 },
      { label: "Yes, fully standardized", value: 3 },
      { label: "Yes, with tiered packages", value: 4 },
    ],
  },
];

/* ─── Quick wins pool ─── */
interface QuickWin {
  text: string;
  condition: (d: Dimensions, multiSelections: string[]) => boolean;
}

interface Dimensions {
  serviceBreadth: number;
  revenueMix: number;
  salesReadiness: number;
  standardization: number;
  growthAmbition: number;
}

const quickWinPool: QuickWin[] = [
  {
    text: "You're leaving money on the table by not offering Security Awareness Training. It's high-margin and easy to deliver.",
    condition: (_, multi) => !multi.includes("Security Awareness Training"),
  },
  {
    text: "Adding Vulnerability Scanning to your stack creates a natural upsell path and helps justify higher-tier packages.",
    condition: (_, multi) => !multi.includes("Vulnerability Scanning"),
  },
  {
    text: "vCISO and compliance services are the fastest-growing MSP revenue stream. Even a lightweight offering can command premium pricing.",
    condition: (_, multi) => !multi.includes("vCISO / Compliance"),
  },
  {
    text: "Standardizing your security stack would cut your delivery costs and make pricing conversations dramatically simpler.",
    condition: (d) => d.standardization <= 50,
  },
  {
    text: "Leading with security in every client conversation — not just QBRs — could unlock 30-50% more pipeline within 90 days.",
    condition: (d) => d.salesReadiness <= 50,
  },
  {
    text: "Your security revenue mix is below the industry benchmark of 25%. Repackaging existing services under a 'security' umbrella is the quickest fix.",
    condition: (d) => d.revenueMix <= 50,
  },
  {
    text: "With your growth ambitions, consider creating tiered security packages (Good / Better / Best) to make upselling effortless.",
    condition: (d) => d.growthAmbition >= 50 && d.standardization <= 50,
  },
  {
    text: "Incident Response is a high-value differentiator most MSPs skip. Even a retainer-based offering sets you apart.",
    condition: (_, multi) => !multi.includes("Incident Response"),
  },
];

/* ─── Helpers ─── */
function computeDimensions(radioAnswers: Record<number, number>, multiSelections: string[]): Dimensions {
  const breadthRaw = multiSelections.filter((s) => s !== "None of these").length;
  const serviceBreadth = Math.round(Math.min((breadthRaw / 7) * 100, 100));
  const revenueMix = Math.round(((radioAnswers[1] ?? 1) / 4) * 100);
  const salesReadiness = Math.round((((radioAnswers[3] ?? 1) + (radioAnswers[4] ?? 1)) / 8) * 100);
  const standardization = Math.round(((radioAnswers[6] ?? 1) / 4) * 100);
  const growthAmbition = Math.round(((radioAnswers[5] ?? 1) / 4) * 100);
  return { serviceBreadth, revenueMix, salesReadiness, standardization, growthAmbition };
}

function getStage(d: Dimensions): { label: string; color: string } {
  const avg = (d.serviceBreadth + d.revenueMix + d.salesReadiness + d.standardization + d.growthAmbition) / 5;
  if (avg >= 75) return { label: "Market Leader", color: "text-success" };
  if (avg >= 55) return { label: "Scaling Up", color: "text-primary" };
  if (avg >= 35) return { label: "Growth Ready", color: "text-warning" };
  return { label: "Foundation Building", color: "text-destructive" };
}

function getQuickWins(d: Dimensions, multi: string[]): string[] {
  const wins = quickWinPool.filter((w) => w.condition(d, multi)).map((w) => w.text);
  return wins.slice(0, 3);
}

/* ─── Radar Chart ─── */
const RadarChart = ({ dimensions }: { dimensions: Dimensions }) => {
  const labels = ["Service Breadth", "Revenue Mix", "Sales Readiness", "Standardization", "Growth Ambition"];
  const values = [
    dimensions.serviceBreadth,
    dimensions.revenueMix,
    dimensions.salesReadiness,
    dimensions.standardization,
    dimensions.growthAmbition,
  ];

  const cx = 150;
  const cy = 150;
  const maxR = 100;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  const getPoint = (i: number, r: number) => ({
    x: cx + r * Math.cos(startAngle + i * angleStep),
    y: cy + r * Math.sin(startAngle + i * angleStep),
  });

  const gridLevels = [25, 50, 75, 100];

  const dataPoints = values.map((v, i) => getPoint(i, (v / 100) * maxR));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox="0 0 300 300" className="w-full">
        {/* Grid */}
        {gridLevels.map((level) => {
          const pts = Array.from({ length: 5 }, (_, i) => getPoint(i, (level / 100) * maxR));
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return <path key={level} d={path} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity={0.5} />;
        })}

        {/* Axes */}
        {Array.from({ length: 5 }, (_, i) => {
          const p = getPoint(i, maxR);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity={0.3} />;
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="hsl(var(--primary) / 0.15)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => {
          const p = getPoint(i, maxR + 24);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground"
              style={{ fontSize: "10px" }}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/* ─── Main Component ─── */
interface CarePlanProps {
  onBack: () => void;
}

const CarePlan = ({ onBack }: CarePlanProps) => {
  const [step, setStep] = useState<Step>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [radioAnswers, setRadioAnswers] = useState<Record<number, number>>({});
  const [multiSelections, setMultiSelections] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const handleRadioAnswer = (value: number) => {
    setRadioAnswers((prev) => ({ ...prev, [currentQ]: value }));
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      setStep("results");
    }
  };

  const handleMultiNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      setStep("results");
    }
  };

  const toggleMulti = (option: string) => {
    if (option === "None of these") {
      setMultiSelections(["None of these"]);
      return;
    }
    setMultiSelections((prev) => {
      const filtered = prev.filter((s) => s !== "None of these");
      return filtered.includes(option) ? filtered.filter((s) => s !== option) : [...filtered, option];
    });
  };

  const dimensions = computeDimensions(radioAnswers, multiSelections);
  const stage = getStage(dimensions);
  const quickWins = getQuickWins(dimensions, multiSelections);

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitted(true);
  };

  const q = questions[currentQ];

  return (
    <div ref={topRef}>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </button>

      <AnimatePresence mode="wait">
        {/* ─── QUIZ ─── */}
        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Customized Care Plan</h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Answer a few questions and we'll build your tailored growth plan.
            </p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>
                  Question {currentQ + 1} of {questions.length}
                </span>
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

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-5">{q.text}</h3>

                {q.type === "radio" ? (
                  <div className="grid gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleRadioAnswer(opt.value)}
                        className="text-left px-4 py-3 rounded-lg border border-border/50 bg-card/30 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      {q.options.map((opt) => {
                        const selected = multiSelections.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleMulti(opt)}
                            className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 flex items-center gap-3 ${
                              selected
                                ? "border-primary/50 bg-primary/10 text-foreground"
                                : "border-border/50 bg-card/30 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                                selected ? "border-primary bg-primary" : "border-border"
                              }`}
                            >
                              {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleMultiNext}
                      disabled={multiSelections.length === 0}
                      className="w-full text-sm py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── RESULTS ─── */}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-1 text-center">Your Growth Snapshot</h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Here's where your MSP stands today
            </p>

            {/* Stage badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-card/60 backdrop-blur-sm">
                <div className={`w-2.5 h-2.5 rounded-full ${stage.color.replace("text-", "bg-")}`} />
                <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Current Stage:</span>
                <span className={`text-sm font-bold ${stage.color}`}>{stage.label}</span>
              </div>
            </motion.div>

            {/* Radar chart */}
            <RadarChart dimensions={dimensions} />

            {/* Quick wins */}
            {quickWins.length > 0 && (
              <div className="mt-10 space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Wins</h3>
                {quickWins.map((win, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex gap-3 p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm"
                  >
                    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{win}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Email gate */}
            <div className="mt-12 relative">
              {/* Blurred preview */}
              <div className="rounded-xl border border-border/30 bg-card/30 p-6 mb-6 select-none pointer-events-none relative" aria-hidden>
                <div className="filter blur-[6px] opacity-40 space-y-3">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-full" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-5/6" />
                  <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mt-4" />
                  <div className="h-3 bg-muted-foreground/15 rounded w-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground/40" />
                </div>
              </div>

              {!submitted ? (
                <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Get Your Complete Growth Plan</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Detailed recommendations, service stack suggestions, pricing guidance, and a 90-day action plan tailored to your MSP.
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
                      Send My Plan
                    </button>
                    <p className="text-xs text-muted-foreground/50">
                      No spam. Just your plan and occasional growth tips.
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
                    Your complete growth plan is on its way to <span className="text-foreground font-medium">{email}</span>.
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

export default CarePlan;
