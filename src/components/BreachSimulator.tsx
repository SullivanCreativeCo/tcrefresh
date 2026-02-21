import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, DollarSign, Clock, ChevronRight, RotateCcw, Loader2, User, Mail, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SimStep = "industry" | "size" | "contact" | "analyzing" | "result";

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

interface ContactForm {
  fullName: string;
  email: string;
  companyName: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  companyName?: string;
}

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const BreachSimulator = () => {
  const [step, setStep] = useState<SimStep>("industry");
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<typeof sizes[0] | null>(null);
  const [contact, setContact] = useState<ContactForm>({ fullName: "", email: "", companyName: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [estimatedCost, setEstimatedCost] = useState(0);
  

  const handleIndustrySelect = (industry: typeof industries[0]) => {
    setSelectedIndustry(industry);
    setStep("size");
  };

  const handleSizeSelect = (size: typeof sizes[0]) => {
    setSelectedSize(size);
    setStep("contact");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!contact.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!contact.email.trim()) {
      newErrors.email = "Business email is required";
    } else if (!validateEmail(contact.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!contact.companyName.trim()) newErrors.companyName = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async () => {
    if (!validateForm()) return;
    if (!selectedIndustry || !selectedSize) return;

    const cost = selectedIndustry.avgCost * selectedSize.multiplier * 1_000_000 * (0.8 + Math.random() * 0.4);
    setEstimatedCost(cost);
    setStep("analyzing");

    const email = contact.email.trim().toLowerCase();
    const fullName = contact.fullName.trim();
    const companyName = contact.companyName.trim();
    const roundedCost = Math.round(cost);

    try {
      // Insert into widget_leads
      const { error: wlError } = await supabase.from("widget_leads").insert({
        full_name: fullName,
        email,
        company_name: companyName,
        industry: selectedIndustry.id,
        company_size: selectedSize.id,
        estimated_cost: roundedCost,
        source: "breach_simulator_website",
        metadata: { estimated_breach_cost: roundedCost, industry: selectedIndustry.label, size: selectedSize.label },
      } as any);
      if (wlError) throw wlError;

      // Insert into lead_magnet_submissions
      await supabase.from("lead_magnet_submissions" as any).insert({
        tool_name: "breach_impact_simulator",
        email,
        full_name: fullName,
        company_name: companyName,
        metadata: { industry: selectedIndustry.id, company_size: selectedSize.id, estimated_breach_cost: roundedCost },
      });

      // Insert into contacts
      await supabase.from("contacts" as any).insert({
        email,
        full_name: fullName,
        company_name: companyName,
        source: "breach_simulator",
        lead_score: 30,
      });

      toast.success("Report ready! Your breach exposure estimate has been generated.");
    } catch (err) {
      console.error("BreachSimulator save error:", err);
      toast.error("Something went wrong. Your results are shown below, but we couldn't save your info.");
    }
  };

  useEffect(() => {
    if (step === "analyzing") {
      const timer = setTimeout(() => setStep("result"), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const reset = () => {
    setStep("industry");
    setSelectedIndustry(null);
    setSelectedSize(null);
    setContact({ fullName: "", email: "", companyName: "" });
    setErrors({});
    setEstimatedCost(0);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const p95Cost = estimatedCost * 1.65;

  const stepIndex = { industry: 0, size: 1, contact: 2, analyzing: 3, result: 3 };
  const currentStepIndex = stepIndex[step];

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
            <p className="text-[10px] text-foreground font-semibold uppercase tracking-widest mb-0.5">ThreatCaptain</p>
            <h3 className="text-sm font-semibold text-foreground">Breach Impact Simulator</h3>
            <p className="text-[11px] text-muted-foreground">See what a breach could cost your client</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= currentStepIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 — Industry */}
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

          {/* STEP 2 — Size */}
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

          {/* STEP 3 — Contact */}
          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                Step 3 — Your Details
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Enter your info to unlock your breach exposure report.
              </p>
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={contact.fullName}
                      onChange={(e) => setContact((c) => ({ ...c, fullName: e.target.value }))}
                      maxLength={100}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors ${
                        errors.fullName ? "border-destructive/60" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.fullName}</p>}
                </div>

                {/* Business Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Business Email"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      maxLength={255}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors ${
                        errors.email ? "border-destructive/60" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={contact.companyName}
                      onChange={(e) => setContact((c) => ({ ...c, companyName: e.target.value }))}
                      maxLength={100}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors ${
                        errors.companyName ? "border-destructive/60" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.companyName && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.companyName}</p>}
                </div>

                <button
                  onClick={handleContactSubmit}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow mt-1"
                >
                  Calculate My Risk Exposure
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Analyzing */}
          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-8 flex flex-col items-center justify-center gap-5"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-1">Calculating your breach exposure...</p>
                <p className="text-[11px] text-muted-foreground">Analyzing industry data &amp; threat vectors</p>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 5 — Result */}
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

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-border/50 text-center">
          <p className="text-[10px] text-foreground/80">
            🔒 Powered by <span className="text-foreground font-semibold">ThreatCaptain</span> — <a href="#contact" className="text-foreground hover:text-primary transition-colors underline">Get your free risk report</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreachSimulator;
