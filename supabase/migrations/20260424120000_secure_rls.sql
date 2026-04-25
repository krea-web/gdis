-- ============================================================
--  GDIS Rent — Restrictive RLS hardening (pre-production)
--  Apr 2026
--
--  Rationale: previous migrations allowed `anon` role to read,
--  insert and update ALL rows on the bookings table (USING (true)).
--  That exposes customer PII (email/phone/tax_code/license photos)
--  and allows price tampering. This migration locks every table
--  so that only the server-side edge function (service_role) can
--  write, and clients can only read public data (vehicles where
--  available=true, pricing_periods).
-- ============================================================

-- ─── BOOKINGS ───────────────────────────────────────────────
--  No direct client access. All booking creation / reading /
--  signing goes through the n8n-proxy edge function, which
--  uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).

DROP POLICY IF EXISTS "Allow anonymous booking inserts" ON public.bookings;
DROP POLICY IF EXISTS "Allow reading bookings by id"     ON public.bookings;
DROP POLICY IF EXISTS "Allow updating bookings"          ON public.bookings;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings FORCE ROW LEVEL SECURITY;

--  Authenticated users may read ONLY their own bookings (future admin UI / customer area).
CREATE POLICY "bookings_select_own"
ON public.bookings
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

--  Authenticated admins (profiles.is_admin = true) may read/update any booking.
CREATE POLICY "bookings_select_admin"
ON public.bookings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);

CREATE POLICY "bookings_update_admin"
ON public.bookings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);

--  No policy for anon → all anon access is denied.
--  No INSERT policy → client cannot insert (must go through edge function).


-- ─── VEHICLES ───────────────────────────────────────────────
--  Public site must show the available fleet. Everything else
--  (inserts, updates, deletes) is admin-only.

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vehicles_public_read" ON public.vehicles;

CREATE POLICY "vehicles_public_read"
ON public.vehicles
FOR SELECT
TO anon, authenticated
USING (available = true);

DROP POLICY IF EXISTS "vehicles_admin_read_all" ON public.vehicles;
CREATE POLICY "vehicles_admin_read_all"
ON public.vehicles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);

DROP POLICY IF EXISTS "vehicles_admin_write" ON public.vehicles;
CREATE POLICY "vehicles_admin_write"
ON public.vehicles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);


-- ─── PRICING_PERIODS ────────────────────────────────────────
--  Read-only public. Write only via service_role (edge function).

DROP POLICY IF EXISTS "Allow public read pricing_periods" ON public.pricing_periods;

CREATE POLICY "pricing_periods_public_read"
ON public.pricing_periods
FOR SELECT
TO anon, authenticated
USING (true);

--  No write policies → only service_role can mutate.


-- ─── LEADS ──────────────────────────────────────────────────
--  Public can submit a lead (email capture). Nobody can read
--  or modify from client side.

DROP POLICY IF EXISTS "Allow anonymous lead inserts" ON public.leads;

CREATE POLICY "leads_public_insert"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "leads_admin_read"
ON public.leads
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);


-- ─── PROFILES ───────────────────────────────────────────────
--  Users can read/update their own row only. Admins can read all.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own"    ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own"    ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_read_all" ON public.profiles;

CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid() AND is_admin IS NOT DISTINCT FROM (SELECT is_admin FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "profiles_admin_read_all"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);


-- ─── STORAGE: licenses bucket ───────────────────────────────
--  Current state: bucket is public. This means driver license
--  photos are world-readable by URL. Make it private so that
--  only the service_role (edge function) can issue signed URLs.

UPDATE storage.buckets
SET public = false
WHERE id = 'licenses';

--  Policies on storage.objects for the `licenses` bucket:
--  - anon/authenticated: INSERT allowed (so client can upload via booking form).
--  - SELECT blocked for all non-service-role (no public enumeration).
--  - UPDATE/DELETE blocked.

DROP POLICY IF EXISTS "licenses_anon_upload" ON storage.objects;
CREATE POLICY "licenses_anon_upload"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'licenses');

DROP POLICY IF EXISTS "licenses_admin_read" ON storage.objects;
CREATE POLICY "licenses_admin_read"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'licenses' AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = true
  )
);


-- ─── Notes for deployment ───────────────────────────────────
--
--  1. Apply this migration before the next client deploy:
--        supabase db push
--
--  2. The edge function `n8n-proxy` must be updated to use
--     SUPABASE_SERVICE_ROLE_KEY (see n8n-proxy/index.ts changes).
--
--  3. After running, verify from the browser console at the
--     deployed domain (not authenticated):
--        supabase.from('bookings').select('*')  → should return []
--        supabase.from('vehicles').select('*')  → should return visible rows
--
--  4. The license bucket is now private. Client uploads still
--     work (INSERT). Any reads must go through a signed URL
--     issued by the edge function or admin UI.
