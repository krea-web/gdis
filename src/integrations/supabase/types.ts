export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          birth_date: string | null
          birth_place: string | null
          city: string | null
          contract_url: string | null
          created_at: string
          customer_name: string | null
          customer_surname: string | null
          email: string | null
          end_date: string
          has_second_driver: boolean | null
          id: string
          license_back_url: string | null
          license_front_url: string | null
          phone: string | null
          residence_address: string | null
          second_driver_birth_date: string | null
          second_driver_birth_place: string | null
          second_driver_cf: string | null
          second_driver_city: string | null
          second_driver_email: string | null
          second_driver_license_back_url: string | null
          second_driver_license_front_url: string | null
          second_driver_name: string | null
          second_driver_phone: string | null
          second_driver_residence_address: string | null
          second_driver_surname: string | null
          signed_at: string | null
          signed_pdf_url: string | null
          start_date: string
          status: string | null
          tax_code: string | null
          total_price: number
          user_id: string | null
          vehicle_id: string | null
        }
        Insert: {
          birth_date?: string | null
          birth_place?: string | null
          city?: string | null
          contract_url?: string | null
          created_at?: string
          customer_name?: string | null
          customer_surname?: string | null
          email?: string | null
          end_date: string
          has_second_driver?: boolean | null
          id?: string
          license_back_url?: string | null
          license_front_url?: string | null
          phone?: string | null
          residence_address?: string | null
          second_driver_birth_date?: string | null
          second_driver_birth_place?: string | null
          second_driver_cf?: string | null
          second_driver_city?: string | null
          second_driver_email?: string | null
          second_driver_license_back_url?: string | null
          second_driver_license_front_url?: string | null
          second_driver_name?: string | null
          second_driver_phone?: string | null
          second_driver_residence_address?: string | null
          second_driver_surname?: string | null
          signed_at?: string | null
          signed_pdf_url?: string | null
          start_date: string
          status?: string | null
          tax_code?: string | null
          total_price: number
          user_id?: string | null
          vehicle_id?: string | null
        }
        Update: {
          birth_date?: string | null
          birth_place?: string | null
          city?: string | null
          contract_url?: string | null
          created_at?: string
          customer_name?: string | null
          customer_surname?: string | null
          email?: string | null
          end_date?: string
          has_second_driver?: boolean | null
          id?: string
          license_back_url?: string | null
          license_front_url?: string | null
          phone?: string | null
          residence_address?: string | null
          second_driver_birth_date?: string | null
          second_driver_birth_place?: string | null
          second_driver_cf?: string | null
          second_driver_city?: string | null
          second_driver_email?: string | null
          second_driver_license_back_url?: string | null
          second_driver_license_front_url?: string | null
          second_driver_name?: string | null
          second_driver_phone?: string | null
          second_driver_residence_address?: string | null
          second_driver_surname?: string | null
          signed_at?: string | null
          signed_pdf_url?: string | null
          start_date?: string
          status?: string | null
          tax_code?: string | null
          total_price?: number
          user_id?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      pricing_periods: {
        Row: {
          end_date: string | null
          id: string
          price_multiplier: number | null
          season: Database["public"]["Enums"]["season_type"] | null
          start_date: string | null
        }
        Insert: {
          end_date?: string | null
          id?: string
          price_multiplier?: number | null
          season?: Database["public"]["Enums"]["season_type"] | null
          start_date?: string | null
        }
        Update: {
          end_date?: string | null
          id?: string
          price_multiplier?: number | null
          season?: Database["public"]["Enums"]["season_type"] | null
          start_date?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_admin: boolean | null
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          is_admin?: boolean | null
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_admin?: boolean | null
          verification_status?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          available: boolean | null
          category: string
          characteristics: string | null
          color: string | null
          created_at: string
          daily_rate: number | null
          damage_policy: string | null
          franchise_amount: number | null
          fuel_type: string | null
          id: string
          image_url: string | null
          km_current: number | null
          license_plate: string
          logo_url: string | null
          make: string
          model: string
          next_revision_date: string | null
          year: number | null
        }
        Insert: {
          available?: boolean | null
          category: string
          characteristics?: string | null
          color?: string | null
          created_at?: string
          daily_rate?: number | null
          damage_policy?: string | null
          franchise_amount?: number | null
          fuel_type?: string | null
          id?: string
          image_url?: string | null
          km_current?: number | null
          license_plate: string
          logo_url?: string | null
          make: string
          model: string
          next_revision_date?: string | null
          year?: number | null
        }
        Update: {
          available?: boolean | null
          category?: string
          characteristics?: string | null
          color?: string | null
          created_at?: string
          daily_rate?: number | null
          damage_policy?: string | null
          franchise_amount?: number | null
          fuel_type?: string | null
          id?: string
          image_url?: string | null
          km_current?: number | null
          license_plate?: string
          logo_url?: string | null
          make?: string
          model?: string
          next_revision_date?: string | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      season_type: "low" | "mid" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      season_type: ["low", "mid", "high"],
    },
  },
} as const
