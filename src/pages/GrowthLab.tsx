import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Compass, MessageSquare, Lock } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import MarketingAudit from "@/components/tools/MarketingAudit";
import CarePlan from "@/components/tools/CarePlan";
import SalesScript from "@/components/tools/SalesScript";

const categories = ["All", "Marketing", "Strategy", "Sales"] as const;

type ToolId = "marketing-audit" | "care-plan" | "sales-script";

const tools: {
  id: ToolId;
  icon: typeof ClipboardCheck;
  title: string;
  description: string;
  category: (typeof categories)[number];
  cta: string;
  ready: boolean;
}[] = [
  {
    id: "marketing-audit",
    icon: ClipboardCheck,
    title: "MSP Marketing Audit",
    description: "Score your marketing maturity and get a custom roadmap to generate more leads.",
    category: "Marketing",
    cta: "Start Your Audit ›",
    ready: true,
  },
  {
    id: "care-plan",
    icon: Compass,
    title: "Customized Care Plan",
    description: "Answer a few questions about your MSP and get a tailored plan to grow your security practice.",
    category: "Strategy",
    cta: "Build Your Plan ›",
    ready: true,
  },
  {
    id: "sales-script",
    icon: MessageSquare,
    title: "Sales Script Generator",
    description: "Generate a full sales conversation flow customized to your vertical and prospect type.",
    category: "Sales",
    cta: "Generate Script ›",
    ready: true,
  },
];

const GrowthLab = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const toolSectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  const handleToolLaunch = (id: ToolId, ready: boolean) => {
    if (!ready) return;
    setActiveTool(id);
    setTimeout(() => toolSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>MSP Growth Lab | ThreatCaptain</title>
        <meta name="description" content="Free interactive tools built by MSPs, for MSPs. Diagnose your marketing, plan your growth, and sharpen your sales conversations." />
      </Helmet>
      <TCNavbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-4"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4">
            MSP Growth Lab
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Toolkit for Selling Smarter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tools built by MSPs, for MSPs. Diagnose your marketing, plan your growth, and sharpen your sales conversations.
          </p>
        </motion.div>

        {/* Animated gradient divider */}
        <div className="relative h-px w-full max-w-2xl mx-auto my-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 h-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 ${
                activeTool === tool.id
                  ? "border-primary/50 shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                  : "border-border/50 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <tool.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-base font-semibold text-foreground truncate">{tool.title}</h2>
                    <span className="flex-shrink-0 text-[0.65rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleToolLaunch(tool.id, tool.ready)}
                disabled={!tool.ready}
                className={`mt-5 w-full text-sm py-2 rounded-lg border transition-colors duration-200 ${
                  tool.ready
                    ? "border-primary/20 bg-primary/5 text-primary hover:bg-primary/15"
                    : "border-border/30 bg-muted/10 text-muted-foreground cursor-not-allowed"
                }`}
              >
                {tool.ready ? tool.cta : "Coming Soon"}
              </button>
            </motion.div>
          ))}

          {/* Coming Soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * filtered.length }}
            className="relative overflow-hidden rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 opacity-60"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-muted-foreground mb-2">Coming Soon</h2>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">New tools added regularly. Stay tuned.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Active tool section */}
        <div ref={toolSectionRef}>
          <AnimatePresence mode="wait">
            {activeTool === "marketing-audit" && (
              <motion.div
                key="marketing-audit"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-16 overflow-hidden"
              >
                <div className="relative h-px w-full max-w-2xl mx-auto mb-12 overflow-hidden">
                  <div className="absolute inset-0 h-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
                </div>
                <MarketingAudit onBack={() => setActiveTool(null)} />
              </motion.div>
            )}
            {activeTool === "care-plan" && (
              <motion.div
                key="care-plan"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-16 overflow-hidden"
              >
                <div className="relative h-px w-full max-w-2xl mx-auto mb-12 overflow-hidden">
                  <div className="absolute inset-0 h-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
                </div>
                <CarePlan onBack={() => setActiveTool(null)} />
              </motion.div>
            )}
            {activeTool === "sales-script" && (
              <motion.div
                key="sales-script"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-16 overflow-hidden"
              >
                <div className="relative h-px w-full max-w-2xl mx-auto mb-12 overflow-hidden">
                  <div className="absolute inset-0 h-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
                </div>
                <SalesScript onBack={() => setActiveTool(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        {!activeTool && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-24 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Want the Full Picture?</h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              These tools are just a taste. ThreatCaptain gives you the complete platform to sell cybersecurity at the executive level.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
              >
                Try Free for 14 Days
              </Link>
              <Link
                to="/request-demo"
                className="px-6 py-3 rounded-lg border border-primary/20 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary/10 transition-all duration-200"
              >
                Request Demo
              </Link>
            </div>
          </motion.section>
        )}
      </main>

      <TCFooter />
    </div>
  );
};

export default GrowthLab;
