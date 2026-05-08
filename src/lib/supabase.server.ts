import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const key = serviceKey || anonKey;

if (!url || !key) {
  throw new Error(
    'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY in build environment.',
  );
}

export const supabaseServer = createClient<Database>(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
