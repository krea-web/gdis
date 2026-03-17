ALTER TABLE public.pricing_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public read for pricing periods
CREATE POLICY "Allow public read pricing_periods"
ON public.pricing_periods FOR SELECT TO anon, authenticated USING (true);

-- Allow anonymous lead inserts
CREATE POLICY "Allow anonymous lead inserts"
ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);