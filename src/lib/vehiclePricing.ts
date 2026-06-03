/**
 * Prezzi "da €/giorno" mostrati al pubblico (off-peak minimum).
 * Source of truth statica per SSG: usata da homepage, FleetShowcase, VehicleComparisonTable e JSON-LD fleet.
 *
 * Sincronizzati al campo `vehicles.daily_rate` di Supabase (verifica via `npm run check:prices`).
 */
export const VEHICLE_PRICE_FROM = {
  city_car: 65, // Fiat Panda Hybrid — daily_rate base
  premium: 120, // Mercedes Classe A 180d — daily_rate base
  scooter: 50, // Honda SH 125i — daily_rate base (SH 350i: 70)
  quad: 250, // Yamaha Raptor 700R — daily_rate base
} as const;

export type VehicleCategory = keyof typeof VEHICLE_PRICE_FROM;
