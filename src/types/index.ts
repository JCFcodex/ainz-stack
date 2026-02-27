/**
 * Shared Type Definitions
 *
 * Central place for app-wide types used across
 * components, actions, and API routes.
 */

/* ─── API Response ─── */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

/* ─── Pagination ─── */
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

/* ─── User ─── */
export type UserProfile = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  plan: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
};

export type UserRole = "user" | "admin" | "super_admin";

/* ─── Subscription ─── */
export type SubscriptionPlan = "free" | "pro" | "enterprise";

export type Subscription = {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
};

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "incomplete";

/* ─── Invoice ─── */
export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  receiptUrl?: string;
};

/* ─── Notification ─── */
export type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

/* ─── Navigation ─── */
export type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
};
