import { useState, useRef } from "react";
import beakonLab from "@/assets/beakon-lab.png";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Stethoscope,
  PenLine,
  Lock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import MarketingAudit from "@/components/tools/MarketingAudit";
import CarePlan from "@/components/tools/CarePlan";
import SalesScript from "@/components/tools/SalesScript";

const categories = ["All", "Marketing", "Strategy", "Sales"] as const;

type ToolId = "marketing-audit" | "care-plan" | "sales-script";

const tools: {
  id: ToolId;
  icon: typeof Monitor;
  title: string;
  subtitle: string;
  description: string;
  category: (typeof categories)[number];
  cta: string;
}[] = [
  {
    id: "marketing-audit",
    icon: Monitor,
    title: "MSP Marketing Audit",
    subtitle: "10-question maturity assessment",
    description:
      "Score your marketing maturity across 10 dimensions and get a custom roadmap to generate more leads.",
    category: "Marketing",
    cta: "Start Audit",
  },
  {
    id: "care-plan",
    icon: Stethoscope,
    title: "Customized Care Plan",
    subtitle: "Strategic growth blueprint",
    description:
      "Answer a few questions about your MSP and get a tailored plan to grow your security practice.",
    category: "Strategy",
    cta: "Build Plan",
  },
  {
    id: "sales-script",
    icon: PenLine,
    title: "Sales Script Generator",
    subtitle: "Vertical-specific conversations",
    description:
      "Generate a full sales conversation flow customized to your vertical and prospect type.",
    category: "Sales",
    cta: "Generate Script",
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

/* ── Marketplace Tool Card ── */
const ToolCard = ({
  tool,
  index,
  onLaunch,
}: {
  tool: (typeof tools)[number];
  index: number;
  onLaunch: (id: ToolId) => void;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.08 * index }}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_32px_hsl(var(--primary)/0.12)]"
  >
    {/* Hero area with large icon */}
    <div className="relative flex items-center justify-center py-8 sm:py-10 bg-gradient-to-b from-primary/8 to-transparent">
      <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)] transition-all duration-300">
        <tool.icon className="w-8 h-8" />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
      {/* Category pill */}
      <span className="mb-2 self-start text-[10px] font-mono uppercase tracking-widest text-primary">
        {tool.category}
      </span>

      <h2 className="text-lg font-bold text-foreground mb-1 leading-tight">
        {tool.title}
      </h2>
      <p className="text-xs text-muted-foreground mb-3">{tool.subtitle}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      {/* CTA */}
      <button
        onClick={() => onLaunch(tool.id)}
        className="flex items-center justify-center gap-2 w-full text-sm font-semibold py-2.5 rounded-xl bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 min-h-[44px] group/btn"
      >
        {tool.cta}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  </motion.article>
);

const GrowthLab = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const toolSectionRef = useRef<HTMLDivElement>(null);
  const filteredCount = useRef(0);

  const filtered =
    activeCategory === "All"
      ? tools
      : tools.filter((t) => t.category === activeCategory);
  filteredCount.current = filtered.length;

  const handleToolLaunch = (id: ToolId) => {
    setActiveTool(id);
    setTimeout(
      () =>
        toolSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      100,
    );
  };

  const handleBack = () => {
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>
          MSP Growth Lab - Free Tools for MSP Growth | ThreatCaptain
        </title>
        <meta
          name="description"
          content="Free interactive tools to audit your marketing, plan your growth, and sharpen your sales conversations. Built by MSPs, for MSPs."
        />
      </Helmet>
      <TCNavbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!activeTool && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero header */}
              <section
                className="text-center max-w-3xl mx-auto mb-6"
                aria-label="Growth Lab introduction"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest text-primary">
                    MSP Growth Lab
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Your Toolkit for Selling Smarter
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                  Equip the right tools. Make the right moves. Level up your security sales game.
                </p>
              </section>

              <div className="flex justify-center mb-8">
                <img src={beakonLab} alt="Captain Beakon with lab equipment" className="h-28 sm:h-36 object-contain" />
              </div>

              {/* Divider */}
              <div
                className="relative h-px w-full max-w-2xl mx-auto mb-8 overflow-hidden"
                aria-hidden="true"
              >
                <motion.div
                  className="absolute inset-0 h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Category filters */}
              <div
                className="flex flex-wrap justify-center gap-2 mb-10"
                role="group"
                aria-label="Filter tools by category"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`text-xs font-mono uppercase tracking-wider px-4 py-2 sm:py-1.5 rounded-full border transition-all duration-200 min-h-[44px] sm:min-h-0 ${
                      activeCategory === cat
                        ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                        : "border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tool grid — marketplace style */}
              <section aria-label="Available tools">
                <div aria-live="polite" className="sr-only">
                  Showing {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filtered.map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      index={i}
                      onLaunch={handleToolLaunch}
                    />
                  ))}

                  {/* Coming Soon placeholder */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 * filtered.length,
                    }}
                    className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/40 bg-card/20 backdrop-blur-sm p-8 sm:p-10"
                    aria-label="More tools coming soon"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center text-muted-foreground mb-4">
                      <Lock className="w-7 h-7" />
                    </div>
                    <h2 className="text-base font-semibold text-muted-foreground mb-1">
                      Coming Soon
                    </h2>
                    <p className="text-xs text-muted-foreground text-center">
                      New tools added regularly.
                    </p>
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
                <div
                  className="relative h-px w-full max-w-2xl mx-auto mb-12 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 h-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                    }}
                  />
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Want the Full Picture?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              These tools are just a taste. ThreatCaptain gives you the
              complete platform to sell cybersecurity at the executive level.
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
