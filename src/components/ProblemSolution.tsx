import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { AlertTriangle, BarChart3, FileText, CheckCircle2, TrendingUp, Shield, DollarSign } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Block 1: Translation Gap */}
      <div className="section-container mb-32">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-4">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            The Language Barrier <span className="gradient-text">Killing Your Deals</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technical teams speak in vulnerabilities and CVE scores. Executives speak in revenue loss and balance sheet impact. Your clients get lost in translation—and deals stall.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-destructive" size={20} />
                <h3 className="text-sm font-semibold text-destructive uppercase tracking-wider">Technical View</h3>
              </div>
              <div className="space-y-3">
                {["CVE-2024-1234 — Critical RCE", "Unpatched API Endpoints", "Weak Authentication Controls", "SQL Injection Vulnerability"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-md font-mono text-sm text-destructive/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-3xl">😕</span>
              </div>
              <p className="text-lg text-muted-foreground italic">
                "But what does this actually <span className="text-foreground font-semibold">cost us</span>?"
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Every Executive, Ever</p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Block 2: Data-Driven */}
      <div className="section-container mb-32">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-secondary uppercase tracking-widest mb-4">The Approach</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Data-Driven <span className="gradient-text">Risk Assessment</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Stop relying on scare tactics. Your clients need to understand the real financial exposure, backed by industry data from IBM, Verizon, and MITRE ATT&CK.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-primary" size={20} />
              <h3 className="font-semibold">Security Findings → Structured Assessment</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Ransomware Vulnerability", severity: "Critical", color: "text-destructive" },
                { icon: AlertTriangle, label: "Unpatched API Endpoint", severity: "High", color: "text-warning" },
                { icon: TrendingUp, label: "Weak Authentication", severity: "Medium", color: "text-accent" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="p-4 bg-muted/50 rounded-lg border border-border/30"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <item.icon className={`${item.color} mb-2`} size={20} />
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <span className={`text-xs font-mono ${item.color}`}>{item.severity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Block 3: Financial Impact Translation */}
      <div className="section-container mb-32">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-accent uppercase tracking-widest mb-4">The Output</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Speak the <span className="gradient-text">Executive Language</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transform technical findings into comprehensive business risk assessments that quantify financial exposure, insurance implications, and operational downtime.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />

            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-primary" size={20} />
              <h3 className="font-semibold">Business Risk Assessment Report</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
              {[
                { label: "Scenario", value: "Ransomware Attack" },
                { label: "Exposure", value: "Healthcare Client" },
                { label: "Downtime", value: "24 hours" },
                { label: "Business Scale", value: "Mid-Market ($50M)" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border/20">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="text-center py-6 mb-6 bg-muted/40 rounded-xl border border-border/20">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">📊 Estimated Financial Impact</p>
              <CountUpNumber />
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Operational Downtime", value: "$604,254", pct: 38 },
                { label: "Incident Response", value: "$445,633", pct: 28 },
                { label: "Forensic Investigation", value: "$398,401", pct: 25 },
                { label: "Regulatory Notification", value: "$143,044", pct: 9 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-medium">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="text-destructive" size={16} />
                <span className="text-sm font-medium text-destructive">Insurance Coverage Gap: $847,000 uninsured exposure</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Block 4: Confusion to Confidence */}
      <div className="section-container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-success uppercase tracking-widest mb-4">The Result</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Turn Conversations Into <span className="gradient-text">Commitments</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            When executives see financial impact quantified with industry-backed data, security becomes a business priority—not an IT expense.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            <div className="glass-card p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Before</p>
                <p className="font-medium">Security Upgrade Initiative</p>
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-warning/10 text-warning border border-warning/20 rounded-full">
                ⏳ Pending Review
              </span>
            </div>

            <div className="flex justify-center">
              <motion.div
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-primary text-sm">↓</span>
              </motion.div>
            </div>

            <div className="glass-card p-6 flex items-center justify-between border-success/20">
              <div>
                <p className="text-sm text-muted-foreground mb-1">After</p>
                <p className="font-medium">Security Upgrade Initiative</p>
              </div>
              <motion.span
                className="px-3 py-1 text-xs font-medium bg-success/10 text-success border border-success/20 rounded-full flex items-center gap-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <CheckCircle2 size={14} /> Budget Approved
              </motion.span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const CountUpNumber = () => {
  return (
    <motion.span
      className="text-3xl sm:text-4xl font-bold font-mono text-foreground"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      $1,591,332
    </motion.span>
  );
};

export default ProblemSolution;
