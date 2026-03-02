import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    subtitle: "1 team included",
    description: "Good for trying ThreatCaptain out.",
    cta: "Get Started Free",
    ctaStyle: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    features: [
      "1 team workspace",
      "Breach cost estimator",
      "Basic risk dashboard",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$249",
    period: "/team/year",
    subtitle: "2–4 teams",
    description: "Best for growing MSPs.",
    cta: "Start Pro Trial",
    ctaStyle:
      "bg-primary text-white hover:shadow-[0_0_24px_hsl(var(--primary)/0.5)] hover:bg-primary/90",
    features: [
      "Everything in Starter",
      "Up to 4 team workspaces",
      "Financial risk reports",
      "Sales playbook tools",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$179",
    period: "/team/year",
    subtitle: "5+ teams (minimum 5)",
    description: "Best per-team value for larger orgs.",
    cta: "Contact Sales",
    ctaStyle: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    features: [
      "Everything in Pro",
      "Unlimited team workspaces",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "SLA & onboarding",
    ],
    popular: false,
  },
];

const TCPricing = () => (
  <section id="pricing" className="relative py-24 sm:py-32">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Simple, Transparent Plans
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Start free. Scale when you're ready. Every plan is per&nbsp;team, per&nbsp;year.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
              t.popular
                ? "border-primary/40 bg-primary/[0.06] shadow-[0_0_40px_hsl(var(--primary)/0.12)]"
                : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
            }`}
          >
            {t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t.subtitle}</p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground tracking-tight">{t.price}</span>
              <span className="text-sm text-muted-foreground ml-1">{t.period}</span>
              <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1" role="list">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={t.name === "Enterprise" ? "/request-demo" : "/request-demo"}
              className={`block text-center text-sm font-medium rounded-lg px-5 py-3 transition-all duration-300 ${t.ctaStyle}`}
            >
              {t.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TCPricing;
