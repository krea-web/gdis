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
  rate_april: number | null;
  rate_may: number | null;
  rate_june: number | null;
  rate_july: number | null;
  rate_august: number | null;
  rate_september: number | null;
  rate_october: number | null;
  image_url: string | null;
  logo_url: string | null;
  available: boolean | null;
  fuel_type: string | null;
  year: number | null;
  characteristics: string | null;
  damage_policy: string | null;
  franchise_amount: number | null;
};

/** Get the rate for a vehicle given a month (0-indexed). Falls back to daily_rate. */
export function getMonthlyRate(vehicle: Vehicle, month: number): number {
  const monthRateMap: Record<number, number | null> = {
    3: vehicle.rate_april,
    4: vehicle.rate_may,
    5: vehicle.rate_june,
    6: vehicle.rate_july,
    7: vehicle.rate_august,
    8: vehicle.rate_september,
    9: vehicle.rate_october,
  };
  return monthRateMap[month] ?? vehicle.daily_rate ?? 0;
}

/** Get the absolute lowest rate across all months and daily_rate */
export function getLowestRate(vehicle: Vehicle): number {
  const rates = [
    vehicle.daily_rate,
    vehicle.rate_april,
    vehicle.rate_may,
    vehicle.rate_june,
    vehicle.rate_july,
    vehicle.rate_august,
    vehicle.rate_september,
    vehicle.rate_october,
  ].filter((r): r is number => r != null && r > 0);
  return rates.length > 0 ? Math.min(...rates) : 0;
}

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
