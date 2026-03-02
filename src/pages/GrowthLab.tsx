import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TrendingUp, Target, Calculator, BarChart3, Shield, Users } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";

const tools = [
  {
    icon: Calculator,
    title: "Breach Cost Estimator",
    description: "Quantify potential breach costs by industry, company size, and attack vector to build compelling security proposals.",
    tag: "Lead Gen",
  },
  {
    icon: Target,
    title: "Security Stack Scorer",
    description: "Evaluate a prospect's current security posture and identify upsell opportunities with a gap analysis framework.",
    tag: "Sales Tool",
  },
  {
    icon: TrendingUp,
    title: "MRR Growth Planner",
    description: "Model recurring revenue scenarios by adding security tiers, managed detection, and compliance packages to your stack.",
    tag: "Revenue",
  },
  {
    icon: BarChart3,
    title: "Competitive Benchmarker",
    description: "See how your service offerings compare against regional MSP competitors on pricing, scope, and coverage.",
    tag: "Strategy",
  },
  {
    icon: Shield,
    title: "Compliance Readiness Checker",
    description: "Map client environments against CMMC, HIPAA, and SOC 2 controls to surface compliance-driven deal opportunities.",
    tag: "Compliance",
  },
  {
    icon: Users,
    title: "Client Risk Report Builder",
    description: "Generate branded, board-ready risk reports that translate technical findings into business-impact language.",
    tag: "Deliverable",
  },
];

const GrowthLab = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Helmet>
      <title>MSP Growth Lab | ThreatCaptain</title>
      <meta name="description" content="Interactive tools and calculators to help MSPs quantify cyber risk, close security deals, and grow recurring revenue." />
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
          Interactive Tools
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          MSP Growth Lab
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Hands-on calculators and frameworks that turn cyber risk data into closed deals and higher MRR.
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

      {/* Tool grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <tool.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-base font-semibold text-foreground truncate">{tool.title}</h2>
                  <span className="flex-shrink-0 text-[0.65rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tool.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
            </div>
            <button className="mt-5 w-full text-sm py-2 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/15 transition-colors duration-200">
              Launch Tool
            </button>
          </motion.div>
        ))}
      </div>
    </main>

    <TCFooter />
  </div>
);

export default GrowthLab;
