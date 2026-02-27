export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: Database["public"]["Enums"]["user_role"];
          plan: Database["public"]["Enums"]["subscription_plan"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          plan?: Database["public"]["Enums"]["subscription_plan"];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          plan?: Database["public"]["Enums"]["subscription_plan"];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          user_id: string;
          plan: Database["public"]["Enums"]["subscription_plan"];
          status: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan?: Database["public"]["Enums"]["subscription_plan"];
          status?: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          plan?: Database["public"]["Enums"]["subscription_plan"];
          status?: Database["public"]["Enums"]["subscription_status"];
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          stripe_invoice_id: string | null;
          amount_cents: number;
          currency: string;
          status: Database["public"]["Enums"]["invoice_status"];
          hosted_invoice_url: string | null;
          pdf_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_invoice_id?: string | null;
          amount_cents: number;
          currency?: string;
          status?: Database["public"]["Enums"]["invoice_status"];
          hosted_invoice_url?: string | null;
          pdf_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_invoice_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: Database["public"]["Enums"]["invoice_status"];
          hosted_invoice_url?: string | null;
          pdf_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      notification_preferences: {
        Row: {
          user_id: string;
          marketing_emails: boolean;
          payment_alerts: boolean;
          security_alerts: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          marketing_emails?: boolean;
          payment_alerts?: boolean;
          security_alerts?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          marketing_emails?: boolean;
          payment_alerts?: boolean;
          security_alerts?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      email_logs: {
        Row: {
          id: string;
          user_id: string | null;
          template: string;
          recipient: string;
          subject: string;
          status: Database["public"]["Enums"]["email_status"];
          provider_message_id: string | null;
          error_message: string | null;
          attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          template: string;
          recipient: string;
          subject: string;
          status?: Database["public"]["Enums"]["email_status"];
          provider_message_id?: string | null;
          error_message?: string | null;
          attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          template?: string;
          recipient?: string;
          subject?: string;
          status?: Database["public"]["Enums"]["email_status"];
          provider_message_id?: string | null;
          error_message?: string | null;
          attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stripe_events: {
        Row: {
          event_id: string;
          type: string;
          created_at: string;
          processed_at: string;
        };
        Insert: {
          event_id: string;
          type: string;
          created_at?: string;
          processed_at?: string;
        };
        Update: {
          event_id?: string;
          type?: string;
          created_at?: string;
          processed_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "user" | "admin" | "super_admin";
      subscription_plan: "free" | "pro" | "enterprise";
      subscription_status:
        | "active"
        | "canceled"
        | "past_due"
        | "trialing"
        | "incomplete"
        | "incomplete_expired"
        | "unpaid";
      invoice_status: "paid" | "pending" | "failed";
      email_status: "pending" | "sent" | "failed";
    };
    CompositeTypes: Record<string, never>;
  };
}
