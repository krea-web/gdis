-- Admin panel: extra columns + audit log + premium category support
-- Date: 2026-05-09
-- Author: GDIS admin build

-- 1) Allow 'premium' as vehicle category (drop CHECK if too restrictive, add a permissive one)
DO $$
DECLARE
  con_name text;
BEGIN
  SELECT conname INTO con_name
  FROM pg_constraint
  WHERE conrelid = 'public.vehicles'::regclass
    AND contype = 'c'
    AND pg_get_constraintdef(oid) ILIKE '%category%';

  IF con_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.vehicles DROP CONSTRAINT %I', con_name);
  END IF;
END $$;

ALTER TABLE public.vehicles
  ADD CONSTRAINT vehicles_category_check
  CHECK (category IN ('auto', 'scooter', 'quad', 'premium'));

-- 2) Extra fleet tracking columns
ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS last_revision_date date,
  ADD COLUMN IF NOT EXISTS notes text;

-- 3) Soft delete for bookings
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- 4) Damage report on bookings (JSONB list of {description, photo_urls[], created_at})
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS damages jsonb DEFAULT '[]'::jsonb;

-- 5) Customer blacklist flag on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_blacklisted boolean DEFAULT false;

-- 6) Admin audit log table
CREATE TABLE IF NOT EXISTS public.admin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_table text,
  target_id text,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_actions_created_at_idx ON public.admin_actions (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_actions_user_id_idx ON public.admin_actions (user_id);

ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- 5b) Helper SECURITY DEFINER per evitare ricorsione RLS sulle policy che leggono profiles
CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((SELECT is_admin FROM public.profiles WHERE id = uid), false);
$$;

REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

DROP POLICY IF EXISTS "admins read admin_actions" ON public.admin_actions;
CREATE POLICY "admins read admin_actions"
  ON public.admin_actions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

DROP POLICY IF EXISTS "admins insert admin_actions" ON public.admin_actions;
CREATE POLICY "admins insert admin_actions"
  ON public.admin_actions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- 7) Admin RLS coverage on existing tables (safe to re-run)
DROP POLICY IF EXISTS "admins full access vehicles" ON public.vehicles;
CREATE POLICY "admins full access vehicles"
  ON public.vehicles
  FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "admins full access bookings" ON public.bookings;
CREATE POLICY "admins full access bookings"
  ON public.bookings
  FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "admins read profiles" ON public.profiles;
CREATE POLICY "admins read profiles"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "admins update profiles" ON public.profiles;
CREATE POLICY "admins update profiles"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "admins manage pricing_periods" ON public.pricing_periods;
CREATE POLICY "admins manage pricing_periods"
  ON public.pricing_periods
  FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 8) STORAGE policies (admin RW sui bucket operativi: licenses, contracts, vehicles)
DROP POLICY IF EXISTS "admins read licenses" ON storage.objects;
CREATE POLICY "admins read licenses"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'licenses'
    AND public.is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "admins manage contracts" ON storage.objects;
CREATE POLICY "admins manage contracts"
  ON storage.objects
  FOR ALL
  USING       (bucket_id = 'contracts' AND public.is_admin(auth.uid()))
  WITH CHECK  (bucket_id = 'contracts' AND public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "admins manage vehicles bucket" ON storage.objects;
CREATE POLICY "admins manage vehicles bucket"
  ON storage.objects
  FOR ALL
  USING       (bucket_id = 'vehicles' AND public.is_admin(auth.uid()))
  WITH CHECK  (bucket_id = 'vehicles' AND public.is_admin(auth.uid()));
