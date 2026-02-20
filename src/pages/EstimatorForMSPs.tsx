import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Code2, Users, Zap, Smartphone, Database, Shield, ArrowRight } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import BreachSimulator from "@/components/BreachSimulator";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Embed on Your Site",
    description: "Drop a single line of code onto your MSP website. Live in under 5 minutes.",
  },
  {
    number: "02",
    icon: Users,
    title: "Visitor Enters Info",
    description: "Prospects self-qualify by selecting their industry and size, then enter their contact details to unlock results.",
  },
  {
    number: "03",
    icon: Zap,
    title: "You Get a Lead",
    description: "Every submission lands in your dashboard with name, email, company, and a calculated breach cost — ready to follow up.",
  },
];

const features = [
  {
    icon: Shield,
    title: "White-Label Ready",
    description: "Brand it as your own. Your logo, your colors, your domain.",
  },
  {
    icon: Users,
    title: "Built-In Lead Capture",
    description: "Contact details are required before results display — no anonymous browsers.",
  },
  {
    icon: Database,
    title: "Real IBM Data",
    description: "Estimates are grounded in IBM Cost of a Data Breach 2024 and FAIR methodology.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Looks sharp on every device — desktop, tablet, and phone.",
  },
  {
    icon: Code2,
    title: "Easy Embed",
    description: "One script tag. No frameworks required. Works with any website platform.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Prospects get a personalized financial impact estimate in under 5 seconds.",
  },
];

const EstimatorForMSPs = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TCNavbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <AnimatedShaderBackground />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
                  Lead Magnet for MSPs
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                  Turn Website Visitors Into<br />
                  <span className="text-gradient-cyan">Qualified Leads</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                  Give prospects a personalized breach cost estimate. In exchange, they give you their contact details — pre-qualified and ready to close.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/request-demo"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-700 text-slate-300 text-sm hover:border-primary/30 transition-colors"
                  >
                    See How It Works
                  </a>
                </div>
              </motion.div>

              {/* Right — Live Demo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden md:block relative"
              >
                <div className="absolute inset-0 -z-10 blur-3xl rounded-3xl bg-primary/20 scale-110" />
                <div className="absolute inset-0 -z-10 blur-2xl rounded-3xl bg-blue-500/10 scale-105" />
                <BreachSimulator />
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10" />
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-[#0a0e1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Simple Setup</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                From installation to your first lead in under an hour.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative glass-strong rounded-2xl p-8 border border-border/50"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-black text-primary/20 leading-none select-none">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-[#080b16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Everything You Need</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Built for MSPs</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                No fluff. Every feature exists to help you capture and convert more leads.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-strong rounded-xl p-6 border border-border/50 flex gap-4 items-start"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="py-24 bg-[#0a0e1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Try It Now</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Live Demo</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                This is exactly what your prospects will see on your website. Go ahead — run it yourself.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-md mx-auto"
            >
              <div className="absolute inset-0 -z-10 blur-3xl rounded-3xl bg-primary/20 scale-110" />
              <div className="absolute inset-0 -z-10 blur-2xl rounded-3xl bg-blue-500/10 scale-105" />
              <BreachSimulator />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#080b16]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
                Get Started
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Ready to Turn Visitors<br />
                Into <span className="text-gradient-cyan">Qualified Leads?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                See the estimator running on your site in under a day. Book a demo and we'll handle the setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/request-demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                >
                  Request Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-slate-700 text-slate-300 hover:border-primary/30 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <TCFooter />
    </div>
  );
};

export default EstimatorForMSPs;
