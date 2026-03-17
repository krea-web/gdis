import { supabase } from "@/integrations/supabase/client";

export type N8nEndpoint = "check-availability" | "create-booking" | "sign";

export async function invokeN8nProxy<TResponse = unknown>(
  endpoint: N8nEndpoint,
  data: unknown,
): Promise<TResponse> {
  const { data: responseData, error } = await supabase.functions.invoke("n8n-proxy", {
    body: { endpoint, data },
  });

  if (error) {
    throw new Error(error.message || "Proxy call failed");
  }

  return responseData as TResponse;
}
