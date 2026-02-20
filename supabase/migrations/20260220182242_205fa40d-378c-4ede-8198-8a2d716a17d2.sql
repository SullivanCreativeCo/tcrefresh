
CREATE TABLE public.widget_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  estimated_cost NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.widget_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public lead capture widget)
CREATE POLICY "Anyone can insert widget leads"
  ON public.widget_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
