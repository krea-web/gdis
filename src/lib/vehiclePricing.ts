/**
 * Fonte di verità per i prezzi "da" mostrati al pubblico.
 * Usata da FleetShowcase (fallback), VehicleComparisonTable e dai JSON-LD nelle pagine flotta.
 *
 * Se cambi un prezzo qui, viene aggiornato automaticamente ovunque.
 */
export const VEHICLE_PRICE_FROM = {
  city_car: 50, // Fiat Panda
  premium: 120, // Mercedes A 180d
  scooter: 50, // Honda SH
  quad: 250, // Yamaha Raptor
} as const;

export type VehicleCategory = keyof typeof VEHICLE_PRICE_FROM;
