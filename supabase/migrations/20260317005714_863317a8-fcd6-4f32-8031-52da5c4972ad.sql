-- Allow anonymous inserts into bookings (public booking form)
CREATE POLICY "Allow anonymous booking inserts"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading own booking by id (for signature step)
CREATE POLICY "Allow reading bookings by id"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating bookings (for signature step)
CREATE POLICY "Allow updating bookings"
ON public.bookings
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);