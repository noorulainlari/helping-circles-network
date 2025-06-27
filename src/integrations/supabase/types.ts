export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          name: string
          referral_bonus: number | null
          roi_days: number | null
          roi_percentage: number | null
          status: boolean | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          name: string
          referral_bonus?: number | null
          roi_days?: number | null
          roi_percentage?: number | null
          status?: boolean | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          name?: string
          referral_bonus?: number | null
          roi_days?: number | null
          roi_percentage?: number | null
          status?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          package_activated_at: string | null
          package_id: string | null
          referral_code: string
          referred_by: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          total_referral_earned: number | null
          total_roi_earned: number | null
          total_withdrawn: number | null
          wallet_balance: number | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          package_activated_at?: string | null
          package_id?: string | null
          referral_code: string
          referred_by?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          total_referral_earned?: number | null
          total_roi_earned?: number | null
          total_withdrawn?: number | null
          wallet_balance?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          package_activated_at?: string | null
          package_id?: string | null
          referral_code?: string
          referred_by?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          total_referral_earned?: number | null
          total_roi_earned?: number | null
          total_withdrawn?: number | null
          wallet_balance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_commissions: {
        Row: {
          amount: number
          created_at: string | null
          from_user: string
          id: string
          level: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          from_user: string
          id?: string
          level: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          from_user?: string
          id?: string
          level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_commissions_from_user_fkey"
            columns: ["from_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roi_distributions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          note: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          note?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          note?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roi_distributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          note: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_payment_methods: {
        Row: {
          bank_details: Json | null
          created_at: string | null
          id: string
          preferred_method: Database["public"]["Enums"]["payment_method"]
          upi: string | null
          usdt_wallet: string | null
          user_id: string
        }
        Insert: {
          bank_details?: Json | null
          created_at?: string | null
          id?: string
          preferred_method: Database["public"]["Enums"]["payment_method"]
          upi?: string | null
          usdt_wallet?: string | null
          user_id: string
        }
        Update: {
          bank_details?: Json | null
          created_at?: string | null
          id?: string
          preferred_method?: Database["public"]["Enums"]["payment_method"]
          upi?: string | null
          usdt_wallet?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_payment_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          matched_user_id: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          proof_url: string | null
          status: Database["public"]["Enums"]["withdrawal_status"] | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          matched_user_id?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          proof_url?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"] | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          matched_user_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          proof_url?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_matched_user_id_fkey"
            columns: ["matched_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      activate_package: {
        Args: { p_package_id: string; p_referred_by_code?: string }
        Returns: Json
      }
      admin_process_withdrawal: {
        Args: { p_withdrawal_id: string; p_action: string; p_notes?: string }
        Returns: Json
      }
      distribute_daily_roi: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { p_user_id?: string }
        Returns: string
      }
      get_wallet_history: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          id: string
          type: string
          amount: number
          status: string
          description: string
          created_at: string
        }[]
      }
      process_referral_commissions: {
        Args: {
          p_new_user_id: string
          p_referrer_id: string
          p_package_amount: number
        }
        Returns: undefined
      }
      request_withdrawal: {
        Args: {
          p_amount: number
          p_payment_method: Database["public"]["Enums"]["payment_method"]
          p_payment_details: Json
        }
        Returns: Json
      }
      rpc_activate_package: {
        Args: { package_id: string; referral_code?: string }
        Returns: Json
      }
      rpc_request_withdrawal: {
        Args: { amount: number; payment_method: string; payment_details: Json }
        Returns: Json
      }
    }
    Enums: {
      payment_method: "upi" | "bank" | "usdt"
      transaction_status: "pending" | "completed" | "failed"
      transaction_type: "activation" | "roi" | "referral" | "withdrawal"
      user_status: "inactive" | "active" | "suspended"
      withdrawal_status:
        | "pending"
        | "matched"
        | "proof_uploaded"
        | "completed"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_method: ["upi", "bank", "usdt"],
      transaction_status: ["pending", "completed", "failed"],
      transaction_type: ["activation", "roi", "referral", "withdrawal"],
      user_status: ["inactive", "active", "suspended"],
      withdrawal_status: [
        "pending",
        "matched",
        "proof_uploaded",
        "completed",
        "rejected",
      ],
    },
  },
} as const
