import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Newspaper, TrendingUp, Mail, ArrowRight, AlertTriangle, Zap } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { Badge } from "@/components/ui/badge";
import captainBeacon from "@/assets/captain-beacon.png";
import {
  squawkArticles,
  categories,
  marketPulseStats,
  type SquawkCategory,
} from "@/data/squawkBoxArticles";

const categoryStyle: Record<SquawkCategory, string> = {
  Vendors: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "MSP News": "bg-primary/15 text-primary border-primary/20",
  Security: "bg-red-500/15 text-red-400 border-red-500/20",
  "M&A": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Compliance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : score >= 6
        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
        : "bg-slate-500/20 text-slate-400 border-slate-500/30";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border rounded px-1.5 py-0.5 ${color}`}
    >
      <Zap className="w-3 h-3" />
      {score}/10
    </span>
  );
}

const SquawkBox = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | SquawkCategory>("All");

  const featured = squawkArticles.find((a) => a.featured)!;
  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? squawkArticles.filter((a) => !a.featured)
        : squawkArticles.filter((a) => a.category === activeFilter && !a.featured),
    [activeFilter]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Squawk Box — MSP Intelligence | ThreatCaptain</title>
        <meta
          name="description"
          content="Weekly MSP industry intelligence from Captain Beakon. Vendor moves, security trends, compliance shifts, and M&A — curated for managed service providers."
        />
      </Helmet>
      <TCNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={captainBeacon}
            alt="Captain Beakon"
            className="h-28 sm:h-36 w-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.35)]"
          />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                ThreatCaptain Intelligence
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Squawk Box
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-lg">
              MSP Intelligence, Delivered Weekly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Spotlight ── */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <Link to={`/squawk-box/${featured.slug}`} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-lg overflow-hidden hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent pointer-events-none" />
            <div className="relative p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-1 rounded">
                  Featured
                </span>
                <Badge className={`text-[10px] border ${categoryStyle[featured.category]}`}>
                  {featured.category}
                </Badge>
                <ScoreBadge score={featured.impactScore} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-3 group-hover:text-primary transition-colors">
                {featured.headline}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                {featured.preview}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{featured.source}</span>
                <span>·</span>
                <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <ArrowRight className="w-4 h-4 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat as any)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-primary/15 border-primary/30 text-primary"
                  : "bg-card/40 border-white/5 text-muted-foreground hover:border-white/15 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── News Grid ── */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                to={`/squawk-box/${article.slug}`}
                className="group block h-full rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm p-5 hover:border-primary/25 hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`text-[9px] border ${categoryStyle[article.category]}`}>
                    {article.category}
                  </Badge>
                  <ScoreBadge score={article.impactScore} />
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.headline}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {article.preview}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-auto">
                  <span className="font-medium">{article.source}</span>
                  <span>·</span>
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">No stories in this category yet.</p>
        )}
      </section>

      {/* ── Market Pulse ── */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-bold">Market Pulse</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPulseStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm p-4"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
              <p className="text-xl font-black text-foreground">{s.value}</p>
              <p className="text-[10px] text-primary font-semibold mt-1">{s.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-8 sm:p-12 text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Get the Squawk Every Week</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Captain Beakon delivers the MSP stories that matter — vendor moves, compliance shifts, and market data — straight to your inbox every Monday.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // placeholder
            }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@yourmsp.com"
              className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-card/60 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <TCFooter />
    </div>
  );
};

export default SquawkBox;
