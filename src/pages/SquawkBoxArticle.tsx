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
        <div className="pt-32 text-center">
          <p className="text-muted-foreground text-sm animate-pulse">Loading…</p>
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
          <Link to="/squawk-box" className="text-primary hover:underline text-sm">
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
      <TCNavbar />

      <article className="max-w-3xl mx-auto px-4 pt-28 pb-20 sm:pt-36">
        <Link
          to="/squawk-box"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Squawk Box
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`text-[10px] border ${categoryStyle[article.category] ?? "bg-muted/15 text-muted-foreground border-muted/20"}`}>
              {article.category}
            </Badge>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
              <Zap className="w-3 h-3" />
              Impact {article.impactScore}/10
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-4">{article.headline}</h1>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-10">
            <span className="font-medium">{article.source}</span>
            <span>·</span>
            <span>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Summary */}
          {article.preview && (
            <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-4">
              {article.preview}
            </p>
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
              <video src={article.videoPublicUrl} controls className="w-full rounded-lg" />
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
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Key Points</h2>
              <ul className="space-y-2">
                {article.answerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Takeaway */}
          {article.takeaway && (
            <div className="mt-8 rounded-lg bg-card/60 border border-white/10 p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Takeaway</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">{article.takeaway}</p>
            </div>
          )}

          {/* Source link */}
          {article.articleUrl && (
            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-xs text-primary hover:underline"
            >
              Read original source <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </motion.div>

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
              Related Stories
            </h2>
            <div className="grid gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/squawk-box/${r.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-white/5 bg-card/30 p-4 hover:border-primary/20 transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {r.headline}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {r.source} · {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 whitespace-nowrap">
                    {r.impactScore}/10
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <TCFooter />
    </div>
  );
};

export default SquawkBoxArticle;
