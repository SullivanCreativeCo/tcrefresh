import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Newspaper, Mail, Zap, Clock, ChevronRight } from "lucide-react";
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
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-bold ${color}`}
      aria-label={`Impact score: ${score} out of 10`}
      role="img"
    >
      <Zap className="w-3 h-3" aria-hidden="true" />
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

  const topStory = nonFeatured[0];
  const gridStories = nonFeatured.slice(1, 5);
  const remainingStories = nonFeatured.slice(5);

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
        <section className="relative pt-24 pb-4 sm:pt-32 sm:pb-6 overflow-hidden" aria-label="Squawk Box masthead">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4">
              <img
                src={captainBeacon}
                alt="Captain Beakon mascot"
                className="h-11 sm:h-14 w-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              />
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Newspaper className="w-3 h-3 text-primary" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                    ThreatCaptain Intelligence
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  Squawk Box
                </h1>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" aria-hidden="true" />
                <span>{articles.length > 0 ? formatDate(articles[0]?.date, "full") : "—"}</span>
              </div>
            </div>
            {/* Divider with category filters */}
            <div className="border-t border-border/50 mt-4 pt-3">
              <nav aria-label="Filter articles by category">
                <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Category filters">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={activeFilter === cat}
                      onClick={() => setActiveFilter(cat as any)}
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        activeFilter === cat
                          ? "bg-primary/15 border-primary/30 text-primary"
                          : "bg-transparent border-border/30 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* Loading / Error */}
        {loading && (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center" role="status" aria-live="polite">
            <p className="text-muted-foreground text-sm motion-safe:animate-pulse">Loading intelligence feed…</p>
          </div>
        )}
        {error && (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center" role="alert">
            <p className="text-destructive text-sm">Failed to load articles. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="max-w-6xl mx-auto px-4 pb-16">

            {/* ── Featured Banner ── */}
            {featured && activeFilter === "All" && (
              <Link
                to={`/squawk-box/${featured.slug}`}
                className="block group mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
                aria-label={`Top story: ${featured.headline}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-r from-primary/10 via-card/80 to-card/60 p-6 sm:p-8 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black uppercase tracking-[0.15em] text-primary bg-primary/15 px-2 py-0.5 rounded-full" aria-hidden="true">
                      ⚡ Top Story
                    </span>
                    <Badge className={`text-xs border ${categoryStyle[featured.category]}`}>
                      {featured.category}
                    </Badge>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black leading-tight mb-2 group-hover:text-primary transition-colors max-w-3xl">
                    {featured.headline}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">
                    {featured.preview}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <span className="font-semibold">{featured.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(featured.date, "full")}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-primary ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </motion.div>
              </Link>
            )}

            {/* ── Main Layout: Top Story + Grid ── */}
            {topStory && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8 items-start">
                {/* Top Story — Large Card */}
                <motion.div
                  className="lg:col-span-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Link
                    to={`/squawk-box/${topStory.slug}`}
                    className="group block rounded-xl border border-border/30 bg-card/50 p-5 hover:border-primary/25 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`Read: ${topStory.headline}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`text-xs border ${categoryStyle[topStory.category]}`}>
                        {topStory.category}
                      </Badge>
                      <ScoreBadge score={topStory.impactScore} />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold leading-snug mb-3 group-hover:text-primary transition-colors">
                      {topStory.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {topStory.preview}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                      <span className="font-semibold">{topStory.source}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formatDate(topStory.date)}</span>
                    </div>
                  </Link>
                </motion.div>

                {/* Right Column — Stacked Small Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {gridStories.map((article, i) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        to={`/squawk-box/${article.slug}`}
                        className="group block rounded-lg border border-border/30 bg-card/40 p-4 hover:border-primary/20 transition-all h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        aria-label={`Read: ${article.headline}`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <Badge className={`text-xs border ${categoryStyle[article.category]}`}>
                            {article.category}
                          </Badge>
                          <ScoreBadge score={article.impactScore} />
                        </div>
                        <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
                          {article.headline}
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          {article.source} <span aria-hidden="true">·</span> {formatDate(article.date)}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Remaining Stories — Clean List ── */}
            {remainingStories.length > 0 && (
              <div className="mb-12" role="feed" aria-label="More headlines">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border/30 pb-2">
                  More Headlines
                </h2>
                <div className="divide-y divide-border/20">
                  {remainingStories.map((article, i) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                    >
                      <Link
                        to={`/squawk-box/${article.slug}`}
                        className="group flex items-center gap-4 py-4 hover:bg-accent/5 -mx-2 px-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        aria-label={`Read: ${article.headline}`}
                        role="article"
                      >
                        <Badge className={`text-xs border shrink-0 ${categoryStyle[article.category]}`}>
                          {article.category}
                        </Badge>
                        <h4 className="text-sm font-semibold group-hover:text-primary transition-colors flex-1 line-clamp-1">
                          {article.headline}
                        </h4>
                        <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                          {formatDate(article.date)}
                        </span>
                        <ScoreBadge score={article.impactScore} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {nonFeatured.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-12" role="status">No stories in this category yet.</p>
            )}

            {/* ── Newsletter Signup ── */}
            <section className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8 text-center" aria-label="Newsletter signup">
              <Mail className="w-6 h-6 text-primary mx-auto mb-3" aria-hidden="true" />
              <h2 className="text-lg font-bold mb-1">Get the Squawk Every Week</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                MSP stories that matter — vendor moves, compliance shifts, and market data — every Monday.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-2 max-w-sm mx-auto">
                <label htmlFor="squawk-email" className="sr-only">Email address</label>
                <input
                  id="squawk-email"
                  type="email"
                  required
                  placeholder="you@yourmsp.com"
                  className="w-full sm:flex-1 px-3 py-2 rounded-lg bg-card/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Subscribe
                </button>
              </form>
            </section>
          </div>
        )}
      </main>

      <TCFooter />
    </div>
  );
};

export default SquawkBox;
