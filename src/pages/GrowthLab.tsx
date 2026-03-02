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
}[] = [
  {
    id: "marketing-audit",
    icon: ClipboardCheck,
    title: "MSP Marketing Audit",
    description: "Score your marketing maturity and get a custom roadmap to generate more leads.",
    category: "Marketing",
    cta: "Start Your Audit ›",
  },
  {
    id: "care-plan",
    icon: Compass,
    title: "Customized Care Plan",
    description: "Answer a few questions about your MSP and get a tailored plan to grow your security practice.",
    category: "Strategy",
    cta: "Build Your Plan ›",
  },
  {
    id: "sales-script",
    icon: MessageSquare,
    title: "Sales Script Generator",
    description: "Generate a full sales conversation flow customized to your vertical and prospect type.",
    category: "Sales",
    cta: "Generate Script ›",
  },
];

const ToolComponent = ({ id, onBack }: { id: ToolId; onBack: () => void }) => {
  switch (id) {
    case "marketing-audit":
      return <MarketingAudit onBack={onBack} />;
    case "care-plan":
      return <CarePlan onBack={onBack} />;
    case "sales-script":
      return <SalesScript onBack={onBack} />;
  }
};

const GrowthLab = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const toolSectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  const handleToolLaunch = (id: ToolId) => {
    setActiveTool(id);
    setTimeout(() => toolSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleBack = () => {
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>MSP Growth Lab - Free Tools for MSP Growth | ThreatCaptain</title>
        <meta name="description" content="Free interactive tools to audit your marketing, plan your growth, and sharpen your sales conversations. Built by MSPs, for MSPs." />
        <meta property="og:title" content="MSP Growth Lab - Free Tools for MSP Growth | ThreatCaptain" />
        <meta property="og:description" content="Free interactive tools to audit your marketing, plan your growth, and sharpen your sales conversations. Built by MSPs, for MSPs." />
      </Helmet>
      <TCNavbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <AnimatePresence mode="wait">
          {!activeTool && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
            >
              <section className="text-center max-w-3xl mx-auto mb-4" aria-label="Growth Lab introduction">
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4" aria-hidden="true">
                  MSP Growth Lab
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Your Toolkit for Selling Smarter
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Tools built by MSPs, for MSPs. Diagnose your marketing, plan your growth, and sharpen your sales conversations.
                </p>
              </section>

              {/* Animated gradient divider */}
              <div className="relative h-px w-full max-w-2xl mx-auto my-10 overflow-hidden" aria-hidden="true">
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
              <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Filter tools by category" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    onClick={() => setActiveCategory(cat)}
                    aria-selected={activeCategory === cat}
                    aria-pressed={activeCategory === cat}
                    className={`text-xs font-mono uppercase tracking-wider px-4 py-2 sm:py-1.5 rounded-full border transition-all duration-200 min-h-[44px] sm:min-h-0 ${
                      activeCategory === cat
                        ? "border-primary/50 bg-primary/15 text-primary"
                        : "border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              {/* Tool grid */}
              <section aria-label="Available tools">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filtered.map((tool, i) => (
                    <motion.article
                      key={tool.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className={`group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 ${
                        activeTool === tool.id
                          ? "border-primary/50 shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                          : "border-border/50 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)]"
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-base font-semibold text-foreground truncate">{tool.title}</h2>
                            <span className="flex-shrink-0 text-[0.65rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.3)] transition-shadow duration-300">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToolLaunch(tool.id)}
                        className="mt-4 sm:mt-5 w-full text-sm py-2.5 sm:py-2 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/15 transition-colors duration-200 min-h-[44px] sm:min-h-0"
                      >
                        {tool.cta}
                      </button>
                    </motion.article>
                  ))}

                  {/* Coming Soon placeholder */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * filtered.length }}
                    className="relative overflow-hidden rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5 sm:p-6 opacity-60"
                    aria-label="More tools coming soon"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
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
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active tool section */}
        <div ref={toolSectionRef}>
          <AnimatePresence mode="wait">
            {activeTool && (
              <motion.section
                key={activeTool}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
                transition={{ duration: 0.4, delay: 0.15 }}
                aria-label={`${tools.find((t) => t.id === activeTool)?.title} tool`}
              >
                <div className="relative h-px w-full max-w-2xl mx-auto mb-12 overflow-hidden" aria-hidden="true">
                  <div className="absolute inset-0 h-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />
                </div>
                <ToolComponent id={activeTool} onBack={handleBack} />
              </motion.section>
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
            aria-label="Call to action"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Want the Full Picture?</h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              These tools are just a taste. ThreatCaptain gives you the complete platform to sell cybersecurity at the executive level.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 text-center min-h-[44px] flex items-center justify-center"
              >
                Try Free for 14 Days
              </Link>
              <Link
                to="/request-demo"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-primary/20 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary/10 transition-all duration-200 text-center min-h-[44px] flex items-center justify-center"
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
