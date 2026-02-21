import { motion } from "framer-motion";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";

const articles = [
  {
    title: "Why CFOs Ignore Your Security Pitch (And How to Fix It)",
    category: "Sales Strategy",
    description: "Learn the three financial triggers that make CFOs pay attention to cybersecurity spending.",
    gradient: "from-primary/60 to-blue-600/60",
  },
  {
    title: "The $2.3M Conversation: Turning Breach Data Into Budget Approval",
    category: "Risk Communication",
    description: "How to frame breach cost data in a way that drives executive action and budget sign-off.",
    gradient: "from-cyan-500/60 to-teal-500/60",
  },
  {
    title: "How One MSP Closed 5 Deals in 30 Days Using Financial Risk Data",
    category: "Case Study",
    description: "A real-world look at how quantified risk reporting transformed one MSP's sales pipeline.",
    gradient: "from-violet-500/60 to-purple-600/60",
  },
  {
    title: "Stop Selling Features, Start Selling Outcomes",
    category: "Sales Strategy",
    description: "Why outcome-based selling wins more deals and how to restructure your pitch around results.",
    gradient: "from-orange-500/60 to-rose-500/60",
  },
  {
    title: "The Insurance Gap: Your Client's Biggest Blind Spot",
    category: "Risk Communication",
    description: "Most SMBs are dangerously underinsured. Here's how to turn that gap into a sales conversation.",
    gradient: "from-emerald-500/60 to-cyan-600/60",
  },
  {
    title: "Building a QBR That Actually Drives Upsells",
    category: "Sales Strategy",
    description: "Transform your quarterly business reviews from status updates into revenue-generating events.",
    gradient: "from-pink-500/60 to-primary/60",
  },
];

const categoryColor: Record<string, string> = {
  "Sales Strategy": "bg-primary/20 text-primary",
  "Risk Communication": "bg-cyan-500/20 text-cyan-400",
  "Case Study": "bg-violet-500/20 text-violet-400",
};

const Insights = () => (
  <div className="min-h-screen bg-background text-foreground">
    <TCNavbar />

    <section className="pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Insights for <span className="text-gradient-cyan">MSP Sales Leaders</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Practical guides, data-driven strategies, and real-world frameworks to help you close more security deals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group glass-strong rounded-2xl border border-white/5 overflow-hidden hover:border-primary/20 transition-colors"
            >
              <div className={`h-40 bg-gradient-to-br ${a.gradient}`} />
              <div className="p-5">
                <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest rounded-full px-2.5 py-1 mb-3 ${categoryColor[a.category] ?? "bg-white/10 text-muted-foreground"}`}>
                  {a.category}
                </span>
                <h2 className="text-base font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {a.description}
                </p>
                <span className="text-xs text-primary font-medium cursor-default">
                  Read More →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <TCFooter />
  </div>
);

export default Insights;
