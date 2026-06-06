import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Vehicle = Tables<"vehicles">;
export type VehicleInsert = TablesInsert<"vehicles">;
export type VehicleUpdate = TablesUpdate<"vehicles">;

export type VehicleCategory = "auto" | "scooter" | "quad" | "premium";

export const VEHICLE_CATEGORIES: { id: VehicleCategory; label: string }[] = [
  { id: "auto", label: "City car" },
  { id: "scooter", label: "Scooter" },
  { id: "quad", label: "Quad" },
  { id: "premium", label: "Premium" },
];

export function useAdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("vehicles")
      .select("*")
      .order("category", { ascending: true })
      .order("make", { ascending: true });
    if (err) setError(err.message);
    else setVehicles(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (payload: VehicleInsert) => {
    const { error: err } = await supabase.from("vehicles").insert(payload);
    if (err) throw err;
    await refresh();
  };

  const update = async (id: string, payload: VehicleUpdate) => {
    const { error: err } = await supabase.from("vehicles").update(payload).eq("id", id);
    if (err) throw err;
    await refresh();
  };

  const remove = async (id: string) => {
    const { error: err } = await supabase.from("vehicles").delete().eq("id", id);
    if (err) throw err;
    await refresh();
  };

  return { vehicles, loading, error, refresh, create, update, remove };
}
