import { create } from "zustand";

/**
 * Minimal auth store scaffold.
 *
 * Replace the `User` type and store logic with your
 * actual Supabase auth integration. This provides the
 * client-side state shape for authentication.
 */

export type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isLoading: false }),
}));
