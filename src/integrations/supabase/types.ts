export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      circle_members: {
        Row: {
          circle_id: string
          id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          circle_id: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          circle_id?: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          category: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          image_url: string | null
          is_private: boolean | null
          is_virtual: boolean | null
          location: string | null
          max_members: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          max_members?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          max_members?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "circles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          post_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      event_attendees: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          circle_id: string
          created_at: string | null
          created_by: string
          description: string | null
          event_date: string
          id: string
          is_virtual: boolean | null
          location: string | null
          max_attendees: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          circle_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          event_date: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          circle_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          event_date?: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ok_to_board_requests: {
        Row: {
          airline: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          documents: Json | null
          flight_date: string
          full_name: string
          id: string
          pnr_number: string
          remarks: string | null
          status: string | null
        }
        Insert: {
          airline: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          documents?: Json | null
          flight_date: string
          full_name: string
          id?: string
          pnr_number: string
          remarks?: string | null
          status?: string | null
        }
        Update: {
          airline?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          documents?: Json | null
          flight_date?: string
          full_name?: string
          id?: string
          pnr_number?: string
          remarks?: string | null
          status?: string | null
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
      posts: {
        Row: {
          author_id: string
          circle_id: string
          content: string
          created_at: string | null
          id: string
          is_pinned: boolean | null
          post_type: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          circle_id: string
          content: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          post_type?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          circle_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          post_type?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
        ]
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
      promo_codes: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          usage_count: number | null
          usage_limit: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_type?: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          usage_count?: number | null
          usage_limit?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
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
      transport_services: {
        Row: {
          capacity: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number | null
          status: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
          status?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
          status?: string | null
        }
        Relationships: []
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
      increment_promo_usage: {
        Args: { promo_id: string }
        Returns: undefined
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
