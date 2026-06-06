import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Booking = Tables<"bookings">;
export type Vehicle = Tables<"vehicles">;

export type BookingWithVehicle = Booking & { vehicles?: Pick<Vehicle, "make" | "model" | "category" | "license_plate"> | null };

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "signed";

export function useAdminBookings() {
  const [bookings, setBookings] = useState<BookingWithVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*, vehicles ( make, model, category, license_plate )")
      .order("created_at", { ascending: false })
      .limit(500);
    if (err) setError(err.message);
    else setBookings((data ?? []) as BookingWithVehicle[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setStatus = async (id: string, status: BookingStatus) => {
    const { error: err } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (err) throw err;
    await refresh();
  };

  const remove = async (id: string) => {
    const { error: err } = await supabase.from("bookings").delete().eq("id", id);
    if (err) throw err;
    await refresh();
  };

  return { bookings, loading, error, refresh, setStatus, remove };
}
