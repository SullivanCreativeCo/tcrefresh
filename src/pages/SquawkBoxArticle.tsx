import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, ExternalLink } from "lucide-react";
import TCNavbar from "@/components/TCNavbar";
import TCFooter from "@/components/TCFooter";
import { Badge } from "@/components/ui/badge";
import { useSquawkArticles } from "@/hooks/useSquawkArticles";

const categoryStyle: Record<string, string> = {
  Vendors: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "MSP News": "bg-primary/15 text-primary border-primary/20",
  Security: "bg-red-500/15 text-red-400 border-red-500/20",
  "M&A": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Compliance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Channel: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "AI & Automation": "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

const SquawkBoxArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, loading } = useSquawkArticles();
  const article = articles.find((a) => a.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TCNavbar />
        <div className="pt-32 text-center" role="status" aria-live="polite">
          <p className="text-muted-foreground text-sm motion-safe:animate-pulse">Loading…</p>
        </div>
        <TCFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TCNavbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <Link
            to="/squawk-box"
            className="text-primary hover:underline text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            ← Back to Squawk Box
          </Link>
        </div>
        <TCFooter />
      </div>
    );
  }

  const related = articles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{article.headline} | Squawk Box — ThreatCaptain</title>
        <meta name="description" content={article.preview} />
      </Helmet>

      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold"
      >
        Skip to article
      </a>

      <TCNavbar />

      <article id="article-content" className="max-w-3xl mx-auto px-4 pt-28 pb-20 sm:pt-36">
        <Link
          to="/squawk-box"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          aria-label="Back to Squawk Box feed"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to Squawk Box
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`text-xs border ${categoryStyle[article.category] ?? "bg-muted/15 text-muted-foreground border-muted/20"}`}>
              {article.category}
            </Badge>
            <span
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400"
              aria-label={`Impact score: ${article.impactScore} out of 10`}
              role="img"
            >
              <Zap className="w-3 h-3" aria-hidden="true" />
              Impact {article.impactScore}/10
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-4">{article.headline}</h1>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-10">
            <span className="font-medium">{article.source}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Summary */}
          {article.preview && (
            <blockquote className="text-sm text-foreground leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-4">
              {article.preview}
            </blockquote>
          )}

          {/* Video hook */}
          {article.videoHook && (
            <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 mb-6">
              <p className="text-sm font-semibold text-primary">{article.videoHook}</p>
            </div>
          )}

          {/* Video embed */}
          {article.videoPublicUrl && (
            <div className="mb-6">
              <video
                src={article.videoPublicUrl}
                controls
                className="w-full rounded-lg"
                aria-label={`Video: ${article.headline}`}
              >
                <track kind="captions" label="English" />
                Your browser does not support the video element.
              </video>
            </div>
          )}

          {/* Body / LinkedIn post copy */}
          <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed">
            {article.body.split("\n").map((para, i) =>
              para.trim() ? (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ) : null
            )}
          </div>

          {/* Answer points */}
          {article.answerPoints.length > 0 && (
            <section className="mt-8" aria-label="Key points">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Key Points</h2>
              <ul className="space-y-2" role="list">
                {article.answerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary font-bold mt-0.5" aria-hidden="true">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Takeaway */}
          {article.takeaway && (
            <section className="mt-8 rounded-lg bg-card/60 border border-border/50 p-5" aria-label="Takeaway">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Takeaway</h2>
              <p className="text-sm text-foreground leading-relaxed">{article.takeaway}</p>
            </section>
          )}

          {/* Source link */}
          {article.articleUrl && (
            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-xs text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              Read original source <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </motion.div>

        {related.length > 0 && (
          <nav className="mt-16 pt-10 border-t border-border/30" aria-label="Related stories">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
              Related Stories
            </h2>
            <div className="grid gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/squawk-box/${r.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-border/30 bg-card/30 p-4 hover:border-primary/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={`Related: ${r.headline}`}
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {r.headline}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {r.source} <span aria-hidden="true">·</span>{" "}
                      <time dateTime={r.date}>
                        {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </time>
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold text-amber-400 whitespace-nowrap"
                    aria-label={`Impact: ${r.impactScore} out of 10`}
                  >
                    {r.impactScore}/10
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </article>

      <TCFooter />
    </div>
  );
};

export default SquawkBoxArticle;
