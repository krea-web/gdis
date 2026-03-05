import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type Vehicle = {
  id: string;
  type: string;
  brand: string;
  model: string;
  plate?: string;
  color?: string;
  km?: number;
  maintenance_due?: string | null;
  price_low_season: number;
  price_mid_season: number;
  price_high_season: number;
  image_url: string | null;
  status: string;
};

async function fetchVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "available");

  if (error) throw error;
  return data ?? [];
}

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
    staleTime: 1000 * 60 * 5,
  });
}

/** Group vehicles by their `type` field */
export function groupByType(vehicles: Vehicle[]): Record<string, Vehicle[]> {
  return vehicles.reduce((acc, v) => {
    const key = v.type ?? "Altro";
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {} as Record<string, Vehicle[]>);
}
