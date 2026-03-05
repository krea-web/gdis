// Types are now derived from Supabase generated types in src/integrations/supabase/types.ts

export type Vehicle = {
  id: string;
  type: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  km: number;
  maintenance_due: string | null;
  price_low_season: number;
  price_mid_season: number;
  price_high_season: number;
  image_url: string | null;
  status: string;
};

export type Booking = {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  driver_license_front_url: string | null;
  driver_license_back_url: string | null;
  driver_2_info: string | null;
  contract_pdf_url: string | null;
};

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  verification_status: string;
};
