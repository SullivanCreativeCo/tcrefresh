import { motion } from "framer-motion";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";

const articles = [
  {
    title: "Why CFOs Ignore Your Security Pitch (And How to Fix It)",
    category: "Sales Strategy",
    description: "You walk in with vulnerability counts. They want to know: how much could a breach cost us? Learn the 3 financial triggers that make CFOs lean in instead of tuning out.",
    gradient: "from-primary/60 to-blue-600/60",
  },
  {
    title: "The $2.3M Conversation: Turning Breach Data Into Budget Approval",
    category: "Risk Communication",
    description: "One number changed everything for an MSP in Ohio. Learn how to frame breach cost data so executives see security as a revenue protector, not a cost center.",
    gradient: "from-cyan-500/60 to-teal-500/60",
  },
  {
    title: "How One MSP Closed 5 Deals in 30 Days Using Financial Risk Data",
    category: "Case Study",
    description: "Jake was stuck in 90-day sales cycles. Then he started leading with dollar amounts instead of threat feeds. Here's exactly what changed.",
    gradient: "from-violet-500/60 to-purple-600/60",
  },
  {
    title: "Stop Selling Features. Start Selling Outcomes.",
    category: "Sales Strategy",
    description: "Your prospect doesn't care about your SOC. They care about not being the next headline. A framework for rewriting every pitch around business impact.",
    gradient: "from-orange-500/60 to-rose-500/60",
  },
  {
    title: "The Insurance Gap: Your Client's Biggest Blind Spot",
    category: "Risk Communication",
    description: "68% of SMBs think their cyber insurance covers everything. It doesn't. Here's how to use that gap to start conversations that lead to contracts.",
    gradient: "from-emerald-500/60 to-cyan-600/60",
  },
  {
    title: "Building a QBR That Actually Drives Upsells",
    category: "Sales Strategy",
    description: "Most QBRs are boring status updates. Learn how to turn them into strategic conversations that surface new revenue using risk quantification data.",
    gradient: "from-pink-500/60 to-primary/60",
  },
  {
    title: "From Vendor to Trusted Advisor: The MSP Positioning Playbook",
    category: "Case Study",
    description: "The MSPs winning right now aren't selling harder. They're positioning differently. A playbook for becoming the advisor your clients can't afford to lose.",
    gradient: "from-amber-500/60 to-orange-600/60",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group glass-strong rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
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
