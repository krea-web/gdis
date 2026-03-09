import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Vehicle = {
  id: string;
  category: string;
  make: string;
  model: string;
  license_plate: string;
  color?: string | null;
  km_current?: number | null;
  next_revision_date?: string | null;
  daily_rate: number | null;
  image_url: string | null;
  logo_url: string | null;
  available: boolean | null;
  fuel_type: string | null;
  year: number | null;
  characteristics: string | null;
  damage_policy: string | null;
  franchise_amount: number | null;
};

async function fetchVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("available", true);

  if (error) throw error;
  return (data ?? []) as unknown as Vehicle[];
}

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
    staleTime: 1000 * 60 * 5,
  });
}

/** Group vehicles by their `category` field */
export function groupByCategory(vehicles: Vehicle[]): Record<string, Vehicle[]> {
  return vehicles.reduce((acc, v) => {
    const key = v.category ?? "Altro";
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {} as Record<string, Vehicle[]>);
}
