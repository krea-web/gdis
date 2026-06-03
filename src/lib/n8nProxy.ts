/**
 * @deprecated DORMANT — kept in repo for rollback only.
 * The n8n /create-booking and /check-availability webhooks were the backbone
 * of the self-service booking flow. After the WhatsApp refactor (commit
 * 1641e34) no code path invokes this helper anymore. The upstream n8n
 * workflows have also been deactivated (commit f92516b — webhooks return
 * 404), the Supabase edge function n8n-proxy now requires JWT auth, and
 * n8n.kreareweb.com was removed from CSP connect-src.
 *
 * To re-enable: reactivate the n8n workflows + re-add n8n.kreareweb.com to
 * CSP connect-src + set the Supabase edge function back to verify_jwt: false.
 */
import { supabase } from "@/integrations/supabase/client";

export type N8nEndpoint = "check-availability" | "create-booking" | "sign";

type InvokeOptions = {
  turnstileToken?: string;
};

export async function invokeN8nProxy<TResponse = unknown>(
  endpoint: N8nEndpoint,
  data: unknown,
  options: InvokeOptions = {},
): Promise<TResponse> {
  const { data: responseData, error } = await supabase.functions.invoke("n8n-proxy", {
    body: {
      endpoint,
      data,
      ...(options.turnstileToken ? { turnstileToken: options.turnstileToken } : {}),
    },
  });

  if (error) {
    throw new Error(error.message || "Proxy call failed");
  }

  return responseData as TResponse;
}

export type CreateBookingResponse = {
  id: string;
  total_price: number;
};
