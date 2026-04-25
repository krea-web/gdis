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
