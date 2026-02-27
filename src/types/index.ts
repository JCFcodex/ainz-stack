import type { Database } from "@/types/supabase";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type UserRole = Database["public"]["Enums"]["user_role"];
export type SubscriptionPlan = Database["public"]["Enums"]["subscription_plan"];
export type SubscriptionStatus = Database["public"]["Enums"]["subscription_status"];
export type InvoiceStatus = Database["public"]["Enums"]["invoice_status"];

export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  plan: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
};

export type Subscription = {
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Invoice = {
  id: string;
  userId: string;
  amountCents: number;
  currency: string;
  status: InvoiceStatus;
  date: string;
  receiptUrl: string | null;
};

export type NotificationPreferences = {
  marketingEmails: boolean;
  paymentAlerts: boolean;
  securityAlerts: boolean;
  updatedAt: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
};
