import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, RefreshCw, Lock, Send, CheckCircle2, Check } from "lucide-react";

/* ─── Option data ─── */
const callTypes = ["Cold Call", "Discovery Call", "QBR", "Upsell Conversation", "Renewal with Security Add-on"] as const;
const industries = ["Healthcare", "Legal", "Finance", "Manufacturing", "Professional Services", "Retail", "Education", "Government", "Other"] as const;
const roles = ["CEO / Owner", "CFO / Finance", "IT Director", "Office Manager", "Operations"] as const;
const sizes = ["1-25", "26-100", "101-250", "251-500", "500+"] as const;
const services = ["Managed Security", "Compliance", "Backup & DR", "Security Awareness Training", "Full Security Stack", "vCISO"] as const;

type CallType = (typeof callTypes)[number];
type Industry = (typeof industries)[number];
type Role = (typeof roles)[number];
type Size = (typeof sizes)[number];
type Service = (typeof services)[number];

/* ─── Template engine ─── */
function industryRisk(industry: Industry): string {
  const map: Record<string, string> = {
    Healthcare: "HIPAA violations and ransomware targeting patient records",
    Legal: "client confidentiality breaches and bar association compliance",
    Finance: "wire fraud, SOX compliance gaps, and fintech attack vectors",
    Manufacturing: "operational shutdowns from ransomware and supply-chain attacks",
    "Professional Services": "client data exposure and business email compromise",
    Retail: "POS breaches, PCI compliance, and customer data theft",
    Education: "student data protection (FERPA) and phishing targeting staff",
    Government: "CMMC requirements, nation-state threats, and citizen data protection",
    Other: "data breaches, ransomware, and evolving compliance requirements",
  };
  return map[industry] || map.Other;
}

function sizeContext(size: Size): string {
  if (size === "1-25") return "small teams like yours";
  if (size === "26-100") return "mid-size organizations like yours";
  if (size === "251-500" || size === "500+") return "organizations at your scale";
  return "companies your size";
}

function roleTitle(role: Role): string {
  if (role === "CEO / Owner") return "business leader";
  if (role === "CFO / Finance") return "finance leader";
  if (role === "IT Director") return "IT leader";
  if (role === "Office Manager") return "operations leader";
  return "leader";
}

interface GeneratedScript {
  scenario: string;
  opening: string;
  bridge: string;
}

function generateScript(callType: CallType, industry: Industry, role: Role, size: Size, service: Service, variation: number): GeneratedScript {
  const risk = industryRisk(industry);
  const sCtx = sizeContext(size);
  const rTitle = roleTitle(role);
  const scenario = `${callType} · ${industry} · ${role} · ${size} employees · ${service}`;

  const openings: Record<string, string[]> = {
    "Cold Call": [
      `Hi, this is [Your Name] from [Your Company]. I work with ${industry.toLowerCase()} organizations in the area, and I wanted to share something we're seeing with ${sCtx} around ${risk}. Do you have 60 seconds?`,
      `Hi, I'm [Your Name] with [Your Company]. We specialize in helping ${industry.toLowerCase()} businesses protect against ${risk}. I'm reaching out because we've helped several ${sCtx} recently and I thought it might be relevant. Is this a good time for a quick intro?`,
      `Good morning — [Your Name] from [Your Company]. I know you're busy as a ${rTitle}, so I'll be brief. We've been working with ${industry.toLowerCase()} companies on a critical issue around ${risk}, and I wanted to see if it's on your radar.`,
    ],
    "Discovery Call": [
      `Thanks for taking the time today. As a ${rTitle} in ${industry.toLowerCase()}, you're probably hearing more about ${risk}. I'd love to understand where security fits into your current priorities before I share what we've seen work for ${sCtx}.`,
      `I appreciate you jumping on this call. My goal today is simple — understand your current setup, hear what's keeping you up at night around ${risk}, and see if there's a fit. Sound good?`,
      `Great to connect. Before I dive into anything, I'd love to hear from you — how are you currently thinking about ${risk}? That'll help me tailor what I share to what actually matters to you.`,
    ],
    QBR: [
      `Thanks for making time for our quarterly review. Before we get into the standard updates, I want to flag something we've been tracking that directly impacts your ${industry.toLowerCase()} compliance posture and could affect your cyber insurance renewal.`,
      `Appreciate you being here. I've got our normal performance metrics ready, but first — there's a developing trend around ${risk} that I think every ${rTitle} in ${industry.toLowerCase()} needs to know about. Can I take two minutes on that before we dive in?`,
      `Great to see everyone. Before our standard review, I wanted to highlight a gap we've identified in your current security coverage related to ${risk}. I think it's important context for the rest of our discussion.`,
    ],
    "Upsell Conversation": [
      `I wanted to bring something to your attention. Based on what we're managing for you today, there's an area around ${service.toLowerCase()} that could significantly reduce your exposure to ${risk}. It's something we've been rolling out to ${sCtx} with great results.`,
      `As your ${rTitle}, you should know that the threat landscape around ${risk} has shifted considerably. The good news: there's a straightforward way to address it that builds on what we're already doing together.`,
      `Quick update for you — we've been analyzing the security posture across our client base, and I noticed your organization has a gap around ${service.toLowerCase()} that puts you at elevated risk for ${risk}. I have a recommendation.`,
    ],
    "Renewal with Security Add-on": [
      `As we approach your renewal, I want to make sure we're not just keeping the lights on — I want to make sure you're protected. The landscape around ${risk} has changed a lot in the past year, and I'd recommend we adjust your coverage.`,
      `Before we finalize your renewal, I wanted to flag something. With the increase in ${risk} targeting ${industry.toLowerCase()} organizations, I'd be doing you a disservice if I didn't recommend adding ${service.toLowerCase()} to your agreement.`,
      `Thanks for your continued partnership. As we look at renewal, there's one thing I'd push hard on: ${sCtx} in ${industry.toLowerCase()} are being targeted more aggressively than ever around ${risk}. Let me show you how we can close that gap.`,
    ],
  };

  const bridges: Record<string, string[]> = {
    "Cold Call": [
      `The reason I bring this up — we just helped a ${industry.toLowerCase()} company with ${size === "500+" ? "over 500" : size} employees avoid a six-figure incident related to ${risk}. The fix was surprisingly straightforward with ${service.toLowerCase()}. Would it make sense to show you what that looks like?`,
      `Here's why this matters to you specifically: ${industry.toLowerCase()} organizations are seeing a 3x increase in attacks targeting ${risk}. The good news is ${service.toLowerCase()} can address this without blowing up your budget. Can I share how?`,
    ],
    "Discovery Call": [
      `What I'm hearing is pretty common among ${industry.toLowerCase()} organizations. The gap between where you are and where you need to be around ${risk} is exactly what ${service.toLowerCase()} is designed to close. Let me walk you through what that typically looks like for ${sCtx}.`,
      `That's really helpful context. Based on what you've shared, I think ${service.toLowerCase()} could be a game-changer for you — especially given the ${risk} angle. Let me show you what we've done for similar organizations.`,
    ],
    QBR: [
      `Here's the connection to our current engagement: your existing setup handles the basics well, but it doesn't address ${risk}. Adding ${service.toLowerCase()} would close that gap and, frankly, it's becoming table stakes for ${industry.toLowerCase()} organizations your size.`,
      `What I want to propose is layering ${service.toLowerCase()} into our current agreement. It directly addresses ${risk}, and based on what we're seeing in the industry, it's not a matter of if — it's when. Let me show you the numbers.`,
    ],
    "Upsell Conversation": [
      `The way I see it, you have two options: address ${risk} proactively with ${service.toLowerCase()}, or wait until an incident forces the conversation. I'd much rather help you get ahead of it. Here's what the investment looks like.`,
      `We've been seeing ${industry.toLowerCase()} organizations get hit hard by ${risk}. The clients we've moved to ${service.toLowerCase()} haven't had a single incident. I'd love to extend that same protection to you.`,
    ],
    "Renewal with Security Add-on": [
      `Think of it this way — your current agreement protects your infrastructure, but ${service.toLowerCase()} protects your business. Given the ${risk} exposure in ${industry.toLowerCase()}, the ROI on this addition is typically 10:1 when you factor in avoided incident costs.`,
      `I've put together a renewal package that includes ${service.toLowerCase()} at a bundled rate. It addresses ${risk} head-on and positions you well ahead of where most ${sCtx} are today. Let me walk you through it.`,
    ],
  };

  const openingPool = openings[callType] || openings["Cold Call"];
  const bridgePool = bridges[callType] || bridges["Cold Call"];
  return { scenario, opening: openingPool[variation % openingPool.length], bridge: bridgePool[variation % bridgePool.length] };
}

/* ─── Select component ─── */
const Field = ({ label, value, onChange, options, id }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[]; id: string }) => (
  <div>
    <label htmlFor={id} className="text-sm text-muted-foreground mb-1.5 block">{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none min-h-[44px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

/* ─── Copy button ─── */
const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-md bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground transition-colors" aria-label="Copy to clipboard">
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

/* ─── Typewriter ─── */
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 12);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <>{displayed}<span className="animate-pulse">|</span></>;
};

/* ─── Loading skeleton ─── */
const ScriptSkeleton = () => (
  <div className="space-y-4 py-8" role="status" aria-label="Generating script">
    <div className="flex justify-center">
      <motion.div className="w-14 h-14 rounded-full border-2 border-primary/30 border-t-primary" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
    </div>
    <p className="text-muted-foreground text-center text-sm">Crafting your conversation flow…</p>
    <div className="space-y-3 max-w-md mx-auto">
      {[0.9, 1, 0.7, 0.85].map((w, i) => (
        <motion.div key={i} className="h-2.5 rounded-full bg-muted" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} style={{ width: `${w * 100}%` }} />
      ))}
    </div>
  </div>
);

/* ─── Main Component ─── */
interface SalesScriptProps {
  onBack: () => void;
}

const SalesScript = ({ onBack }: SalesScriptProps) => {
  const [callType, setCallType] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");
  const [size, setSize] = useState("");
  const [service, setService] = useState("");
  const [generating, setGenerating] = useState(false);
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [variation, setVariation] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const canGenerate = callType && industry && role && size && service;

  const doGenerate = (v: number) => {
    setGenerating(true);
    setScript(null);
    setTimeout(() => {
      setScript(generateScript(callType as CallType, industry as Industry, role as Role, size as Size, service as Service, v));
      setGenerating(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }, 1800);
  };

  const handleGenerate = () => { if (!canGenerate) return; doGenerate(variation); };
  const handleRegenerate = () => { const v = variation + 1; setVariation(v); doGenerate(v); };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitted(true);
  };

  return (
    <div ref={topRef}>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 min-h-[44px]">
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </button>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Sales Script Generator</h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">Tell us about the call and we'll craft a conversation flow tailored to your scenario.</p>

        {/* Form */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="script-call-type" label="What type of call is this?" value={callType} onChange={setCallType} options={callTypes} />
            <Field id="script-industry" label="What industry is the prospect in?" value={industry} onChange={setIndustry} options={industries} />
            <Field id="script-role" label="What's the prospect's role?" value={role} onChange={setRole} options={roles} />
            <Field id="script-size" label="How many employees?" value={size} onChange={setSize} options={sizes} />
            <div className="sm:col-span-2">
              <Field id="script-service" label="Main service to discuss?" value={service} onChange={setService} options={services} />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="mt-6 w-full py-3 sm:py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          >
            {generating ? "Crafting your conversation flow…" : "Generate My Script"}
          </button>
        </div>

        {/* Loading */}
        <AnimatePresence>
          {generating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScriptSkeleton />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {script && !generating && (
          <motion.div ref={resultRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground break-all">{script.scenario}</p>
              <button onClick={handleRegenerate} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
            </div>

            {/* Opening */}
            <div className="relative mb-4 rounded-xl border-l-4 border-l-primary border border-border/50 bg-card/50 backdrop-blur-sm p-4 sm:p-5">
              <CopyBtn text={script.opening} />
              <span className="inline-block text-[0.6rem] font-mono uppercase tracking-widest text-primary mb-2">Opening</span>
              <p className="text-sm text-foreground leading-relaxed pr-8">
                <Typewriter text={script.opening} />
              </p>
            </div>

            {/* Bridge */}
            <div className="relative mb-6 rounded-xl border-l-4 border-l-[hsl(280,60%,55%)] border border-border/50 bg-card/50 backdrop-blur-sm p-4 sm:p-5">
              <CopyBtn text={script.bridge} />
              <span className="inline-block text-[0.6rem] font-mono uppercase tracking-widest text-[hsl(280,60%,55%)] mb-2">Bridge to Security</span>
              <p className="text-sm text-foreground leading-relaxed pr-8">
                <Typewriter text={script.bridge} delay={script.opening.length * 12 + 200} />
              </p>
            </div>

            {/* Preview ends divider */}
            <div className="flex items-center gap-3 my-8" aria-hidden="true">
              <div className="flex-1 h-px bg-border/50" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Lock className="w-3.5 h-3.5" />
                Preview ends here
              </div>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Blurred gated content */}
            <div className="relative rounded-xl border border-border/30 bg-card/30 p-6 mb-6 select-none pointer-events-none" aria-hidden="true">
              <div className="filter blur-[6px] opacity-40 space-y-4">
                <div className="rounded-xl border-l-4 border-l-success p-4 border border-border/30">
                  <div className="h-3 bg-muted-foreground/20 rounded w-1/3 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-full" />
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-5/6" />
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-full" />
                    <div className="h-2.5 bg-muted-foreground/10 rounded w-4/5" />
                  </div>
                </div>
                <div className="rounded-xl border-l-4 border-l-warning p-4 border border-border/30">
                  <div className="h-3 bg-muted-foreground/20 rounded w-1/4 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-full" />
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-2/3" />
                  </div>
                </div>
                <div className="rounded-xl border-l-4 border-l-destructive p-4 border border-border/30">
                  <div className="h-3 bg-muted-foreground/20 rounded w-1/3 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-full" />
                    <div className="h-2.5 bg-muted-foreground/15 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Email gate */}
            {!submitted ? (
              <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm p-5 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Unlock the Complete Script</h3>
                <p className="text-sm text-muted-foreground mb-5">Get the full conversation flow including discovery questions, objection handling, value statements, and close.</p>
                <div className="text-left max-w-sm mx-auto mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">What's included:</p>
                  <ul className="space-y-1.5">
                    {["Discovery Questions (5-7 tailored questions)", "Industry-Specific Risk Talking Points", "Objection Responses", "Value Statement", "Suggested Next Steps & Close"].map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <form onSubmit={handleGateSubmit} className="max-w-sm mx-auto space-y-3">
                  <div>
                    <label htmlFor="script-name" className="sr-only">Full name</label>
                    <input id="script-name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="script-email" className="sr-only">Email address</label>
                    <input id="script-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" autoComplete="email" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 min-h-[44px]">
                    <Send className="w-4 h-4" />
                    Get My Full Script
                  </button>
                  <p className="text-xs text-muted-foreground/50">No spam. Just your script and occasional growth tips.</p>
                </form>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl border border-success/20 bg-success/5 p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-1">Check your inbox!</h3>
                <p className="text-sm text-muted-foreground">Your complete script is on its way to <span className="text-foreground font-medium">{email}</span>.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SalesScript;
