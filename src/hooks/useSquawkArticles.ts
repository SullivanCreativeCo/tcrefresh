import { useState, useEffect } from 'react';
import type { SquawkCategory } from '@/data/squawkBoxArticles';

export interface SquawkArticleRow {
  id: string;
  title: string;
  headline: string | null;
  summary: string | null;
  takeaway: string | null;
  category: string | null;
  source: string | null;
  article_url: string | null;
  original_question: string | null;
  video_hook: string | null;
  linkedin_post_copy: string | null;
  video_public_url: string | null;
  answer_points: string[] | null;
  posting_status: string | null;
  created_at: string;
  stat1_number: string | null;
  stat1_label: string | null;
  stat2_number: string | null;
  stat2_label: string | null;
}

export interface SquawkArticle {
  id: string;
  slug: string;
  headline: string;
  source: string;
  date: string;
  category: SquawkCategory;
  preview: string;
  body: string;
  impactScore: number;
  featured?: boolean;
  articleUrl: string | null;
  takeaway: string | null;
  videoHook: string | null;
  linkedinPostCopy: string | null;
  videoPublicUrl: string | null;
  answerPoints: string[];
}

const validCategories: SquawkCategory[] = ["Vendors", "MSP News", "Security", "M&A", "Compliance", "Channel", "AI & Automation"];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

function mapRowToArticle(row: SquawkArticleRow, index: number): SquawkArticle {
  const category = validCategories.includes(row.category as SquawkCategory)
    ? (row.category as SquawkCategory)
    : "MSP News";

  const points = row.answer_points ?? [];
  const body = row.summary || row.linkedin_post_copy || points.join('\n\n') || '';
  const preview = row.summary || row.original_question || (points[0] ? points[0].slice(0, 160) : '');

  return {
    id: row.id,
    slug: slugify(row.headline || row.title || row.id),
    headline: row.headline || row.title || 'Untitled',
    source: row.source || 'ThreatCaptain',
    date: row.created_at,
    category,
    preview,
    body,
    impactScore: 5,
    featured: index === 0,
    articleUrl: row.article_url,
    takeaway: row.takeaway,
    videoHook: row.video_hook,
    linkedinPostCopy: row.linkedin_post_copy,
    videoPublicUrl: row.video_public_url,
    answerPoints: points,
  };
}

const ENDPOINT = 'https://nidlkjvzmwvxawwhfkvv.supabase.co/functions/v1/public-squawk-articles';

export function useSquawkArticles() {
  const [articles, setArticles] = useState<SquawkArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rows: SquawkArticleRow[] = json.articles ?? [];
        const mapped = rows.map(mapRowToArticle);
        setArticles(mapped);
      } catch (err: any) {
        console.error('Squawk fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return { articles, loading, error };
}
