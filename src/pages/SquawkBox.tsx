import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Newspaper, Mail, ArrowRight, Zap, Clock, ChevronRight } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { Badge } from "@/components/ui/badge";
import captainBeacon from "@/assets/captain-beacon.png";
import { useSquawkArticles } from "@/hooks/useSquawkArticles";
import {
  categories,
  type SquawkCategory,
} from "@/data/squawkBoxArticles";

const categoryStyle: Record<SquawkCategory, string> = {
  Vendors: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "MSP News": "bg-primary/15 text-primary border-primary/20",
  Security: "bg-red-500/15 text-red-400 border-red-500/20",
  "M&A": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Compliance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Channel: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "AI & Automation": "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "text-red-400"
      : score >= 6
        ? "text-amber-400"
        : "text-slate-400";
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${color}`}>
      <Zap className="w-2.5 h-2.5" />
      {score}
    </span>
  );
}

function formatDate(date: string, style: "full" | "short" = "short") {
  return new Date(date).toLocaleDateString("en-US", 
    style === "full" 
      ? { month: "long", day: "numeric", year: "numeric" }
      : { month: "short", day: "numeric" }
  );
}

const SquawkBox = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | SquawkCategory>("All");
  const { articles, loading, error } = useSquawkArticles();

  const featured = articles.find((a) => a.featured);
  const nonFeatured = useMemo(
    () =>
      activeFilter === "All"
        ? articles.filter((a) => !a.featured)
        : articles.filter((a) => a.category === activeFilter && !a.featured),
    [activeFilter, articles]
  );

  // Split into lead stories (first 2) and the rest for the feed
  const leadStories = nonFeatured.slice(0, 2);
  const feedStories = nonFeatured.slice(2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Squawk Box — MSP Intelligence | ThreatCaptain</title>
        <meta
          name="description"
          content="Weekly MSP industry intelligence from Captain Beakon. Vendor moves, security trends, compliance shifts, and M&A — curated for managed service providers."
        />
      </Helmet>

      <a
        href="#squawk-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <TCNavbar />

      <main id="squawk-main">
        {/* ── Masthead ── */}
        <section className="relative pt-24 pb-6 sm:pt-32 sm:pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={captainBeacon}
                alt="Captain Beakon mascot"
                className="h-12 sm:h-14 w-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Newspaper className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">
                    ThreatCaptain Intelligence
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  Squawk Box
                </h1>
              </div>
            </div>
            {/* Ticker bar */}
            <div className="flex items-center gap-3 border-t border-b border-white/5 py-2 mt-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
                Live Feed
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Updated {articles.length > 0 ? formatDate(articles[0]?.date, "full") : "—"}</span>
              </div>
              <span className="text-[10px] text-muted-foreground ml-auto">{articles.length} stories</span>
            </div>
          </div>
        </section>

        {/* Loading / Error */}
        {loading && (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground text-sm animate-pulse">Loading intelligence feed…</p>
          </div>
        )}
        {error && (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <p className="text-red-400 text-sm">Failed to load articles. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Category Filter Bar ── */}
            <section className="max-w-6xl mx-auto px-4 pt-5 pb-6">
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by category">
                {["All", ...categories].map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeFilter === cat}
                    onClick={() => setActiveFilter(cat as any)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                      activeFilter === cat
                        ? "bg-primary/15 border-primary/30 text-primary"
                        : "bg-transparent border-white/5 text-muted-foreground hover:border-white/15 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Featured / Lead Story ── */}
            {featured && activeFilter === "All" && (
              <section className="max-w-6xl mx-auto px-4 mb-8">
                <Link to={`/squawk-box/${featured.slug}`} className="block group">
                  <motion.article
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative border-l-4 border-primary pl-5 sm:pl-8 py-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                        Breaking
                      </span>
                      <Badge className={`text-[9px] border ${categoryStyle[featured.category]}`}>
                        {featured.category}
                      </Badge>
                      <ScoreBadge score={featured.impactScore} />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight mb-2 group-hover:text-primary transition-colors">
                      {featured.headline}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-3">
                      {featured.preview}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="font-semibold">{featured.source}</span>
                      <span>·</span>
                      <span>{formatDate(featured.date, "full")}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-primary ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </motion.article>
                </Link>
              </section>
            )}

            {/* ── Two-Column Layout: Lead + Sidebar ── */}
            <section className="max-w-6xl mx-auto px-4 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                
                {/* Main Column — Lead Stories */}
                <div className="lg:col-span-8">
                  {leadStories.length > 0 && (
                    <div className="space-y-0 divide-y divide-white/5">
                      {leadStories.map((article, i) => (
                        <motion.div
                          key={article.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                        >
                          <Link
                            to={`/squawk-box/${article.slug}`}
                            className="group block py-5 first:pt-0"
                            role="article"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`text-[9px] border ${categoryStyle[article.category]}`}>
                                {article.category}
                              </Badge>
                              <ScoreBadge score={article.impactScore} />
                              <span className="text-[10px] text-muted-foreground ml-auto">
                                {formatDate(article.date)}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors">
                              {article.headline}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {article.preview}
                            </p>
                            <span className="text-[10px] font-semibold text-muted-foreground mt-2 block">
                              {article.source}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Remaining feed — dense list */}
                  {feedStories.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        More Stories
                      </h2>
                      <div className="space-y-0 divide-y divide-white/[0.03]">
                        {feedStories.map((article, i) => (
                          <motion.div
                            key={article.slug}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25, delay: i * 0.03 }}
                          >
                            <Link
                              to={`/squawk-box/${article.slug}`}
                              className="group flex items-start gap-3 py-3.5"
                              role="article"
                            >
                              <ScoreBadge score={article.impactScore} />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                  {article.headline}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                                  <Badge className={`text-[8px] border py-0 px-1.5 ${categoryStyle[article.category]}`}>
                                    {article.category}
                                  </Badge>
                                  <span>{article.source}</span>
                                  <span>·</span>
                                  <span>{formatDate(article.date)}</span>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {nonFeatured.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-12">No stories in this category yet.</p>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  {/* Category Quick Links */}
                  <div className="rounded-xl border border-white/5 bg-card/30 p-4 mb-5">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Sections
                    </h3>
                    <div className="space-y-1">
                      {categories.map((cat) => {
                        const count = articles.filter((a) => a.category === cat).length;
                        if (count === 0) return null;
                        return (
                          <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded hover:bg-white/5 transition-colors ${
                              activeFilter === cat ? "text-primary bg-primary/5" : "text-muted-foreground"
                            }`}
                          >
                            <span className="font-medium">{cat}</span>
                            <span className="text-[10px] opacity-50">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Newsletter Signup — Compact */}
                  <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <h3 className="text-xs font-bold">Weekly Squawk</h3>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">
                      Get the MSP stories that matter every Monday.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                      <label htmlFor="squawk-email" className="sr-only">Email</label>
                      <input
                        id="squawk-email"
                        type="email"
                        required
                        placeholder="you@yourmsp.com"
                        className="w-full px-3 py-2 rounded-lg bg-card/60 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </aside>
              </div>
            </section>
          </>
        )}
      </main>

      <TCFooter />
    </div>
  );
};

export default SquawkBox;
