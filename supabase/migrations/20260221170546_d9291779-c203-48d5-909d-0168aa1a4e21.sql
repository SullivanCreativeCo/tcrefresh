
-- Add source and metadata columns to widget_leads
ALTER TABLE public.widget_leads
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Create lead_magnet_submissions table
CREATE TABLE public.lead_magnet_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name text NOT NULL,
  email text,
  full_name text,
  company_name text,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.lead_magnet_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert lead_magnet_submissions"
  ON public.lead_magnet_submissions FOR INSERT
  WITH CHECK (true);

-- Create contacts table
CREATE TABLE public.contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  company_name text,
  source text,
  lead_score integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (true);
