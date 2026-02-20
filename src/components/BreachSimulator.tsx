import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, DollarSign, Clock, ChevronRight, RotateCcw } from "lucide-react";

type SimStep = "industry" | "size" | "result";

const industries = [
  { id: "healthcare", label: "Healthcare", riskMultiplier: 1.4, avgCost: 10.93 },
  { id: "finance", label: "Financial Services", riskMultiplier: 1.3, avgCost: 5.9 },
  { id: "manufacturing", label: "Manufacturing", riskMultiplier: 1.1, avgCost: 4.73 },
  { id: "legal", label: "Legal / Professional Services", riskMultiplier: 1.15, avgCost: 4.47 },
  { id: "retail", label: "Retail / E-Commerce", riskMultiplier: 1.0, avgCost: 3.28 },
  { id: "education", label: "Education", riskMultiplier: 0.9, avgCost: 3.65 },
];

const sizes = [
  { id: "small", label: "1–50 employees", multiplier: 0.3, downtime: 14 },
  { id: "medium", label: "51–250 employees", multiplier: 0.6, downtime: 21 },
  { id: "large", label: "251–1,000 employees", multiplier: 1.0, downtime: 24 },
  { id: "enterprise", label: "1,000+ employees", multiplier: 1.8, downtime: 28 },
];

const BreachSimulator = () => {
  const [step, setStep] = useState<SimStep>("industry");
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<typeof sizes[0] | null>(null);

  const handleIndustrySelect = (industry: typeof industries[0]) => {
    setSelectedIndustry(industry);
    setStep("size");
  };

  const handleSizeSelect = (size: typeof sizes[0]) => {
    setSelectedSize(size);
    setStep("result");
  };

  const reset = () => {
    setStep("industry");
    setSelectedIndustry(null);
    setSelectedSize(null);
  };

  const estimatedCost = selectedIndustry && selectedSize
    ? (selectedIndustry.avgCost * selectedSize.multiplier * 1_000_000 * (0.8 + Math.random() * 0.4))
    : 0;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const p95Cost = estimatedCost * 1.65;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-primary/[0.06] rounded-3xl blur-2xl" />

      <div className="relative glass-strong rounded-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <p className="text-[10px] text-primary font-semibold uppercase tracking-widest mb-0.5">ThreatCaptain</p>
            <h3 className="text-sm font-semibold text-foreground">Breach Impact Simulator</h3>
            <p className="text-[11px] text-muted-foreground">See what a breach could cost your client</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {["industry", "size", "result"].map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                (step === "industry" && i === 0) ||
                (step === "size" && i <= 1) ||
                (step === "result")
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "industry" && (
            <motion.div
              key="industry"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                Step 1 — Select Industry
              </p>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleIndustrySelect(ind)}
                    className="text-left p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-foreground group"
                  >
                    <span className="group-hover:text-primary transition-colors">{ind.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "size" && (
            <motion.div
              key="size"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                Step 2 — Company Size
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Industry: <span className="text-primary font-medium">{selectedIndustry?.label}</span>
              </p>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeSelect(size)}
                    className="w-full text-left p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-foreground flex items-center justify-between group"
                  >
                    <span className="group-hover:text-primary transition-colors">{size.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "result" && selectedIndustry && selectedSize && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                Estimated Breach Impact
              </p>

              {/* Big number */}
              <div className="text-center mb-5">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-destructive mb-1"
                >
                  {formatCurrency(estimatedCost)}
                </motion.p>
                <p className="text-xs text-muted-foreground">Average estimated loss</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center p-3 rounded-xl bg-muted/30 border border-border">
                  <DollarSign className="w-4 h-4 text-accent mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">{formatCurrency(p95Cost)}</p>
                  <p className="text-[10px] text-muted-foreground">95th %ile</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30 border border-border">
                  <Clock className="w-4 h-4 text-accent mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">{selectedSize.downtime} days</p>
                  <p className="text-[10px] text-muted-foreground">Avg downtime</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30 border border-border">
                  <Shield className="w-4 h-4 text-accent mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">{(selectedIndustry.riskMultiplier * 100).toFixed(0)}%</p>
                  <p className="text-[10px] text-muted-foreground">Risk index</p>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground text-center mb-4 italic">
                Based on IBM Cost of a Data Breach 2024 &amp; FAIR methodology
              </p>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Run Again
                </button>
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                >
                  Get Full Report
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embeddable badge */}
        <div className="mt-5 pt-4 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground">
            🔒 Powered by <span className="text-primary font-medium">ThreatCaptain</span> — <a href="#contact" className="text-primary hover:underline">Get your free risk report</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreachSimulator;
