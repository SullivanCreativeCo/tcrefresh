import { useState, useEffect } from 'react';
import { squawkSupabase } from '@/lib/squawkSupabase';
import type { SquawkCategory } from '@/data/squawkBoxArticles';

export interface SquawkArticleRow {
  id: string;
  slug: string;
  title: string;
  original_question: string | null;
  answer_points: string[] | null;
  takeaway: string | null;
  category: string | null;
  source: string | null;
  posting_status: string | null;
  created_at: string;
  impact_score: number | null;
}

export interface SquawkArticle {
  slug: string;
  headline: string;
  source: string;
  date: string;
  category: SquawkCategory;
  preview: string;
  body: string;
  impactScore: number;
  featured?: boolean;
}

const validCategories: SquawkCategory[] = ["Vendors", "MSP News", "Security", "M&A", "Compliance"];

function mapRowToArticle(row: SquawkArticleRow, index: number): SquawkArticle {
  const category = validCategories.includes(row.category as SquawkCategory)
    ? (row.category as SquawkCategory)
    : "MSP News";

  const points = row.answer_points ?? [];
  const body = points.join('\n\n');
  const preview = row.original_question || (points[0] ? points[0].slice(0, 160) : '');

  return {
    slug: row.slug || `article-${row.id}`,
    headline: row.title || 'Untitled',
    source: row.source || 'ThreatCaptain',
    date: row.created_at,
    category,
    preview,
    body,
    impactScore: row.impact_score ?? 5,
    featured: index === 0,
  };
}

export function useSquawkArticles() {
  const [articles, setArticles] = useState<SquawkArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const { data, error: err } = await squawkSupabase
        .from('squawk_box_articles')
        .select('*')
        .eq('posting_status', 'approved')
        .order('created_at', { ascending: false });

      if (err) {
        console.error('Squawk fetch error:', err);
        setError(err.message);
        setLoading(false);
        return;
      }

      const mapped = (data as SquawkArticleRow[]).map(mapRowToArticle);
      setArticles(mapped);
      setLoading(false);
    }
    fetch();
  }, []);

  return { articles, loading, error };
}
