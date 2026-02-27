"use client";

import * as React from "react";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
type ToastVariant = "default" | "success" | "error" | "warning" | "info";

type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
};

type ToastContextValue = {
  toasts: Toast[];
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
  dismiss: (id: string) => void;
};

/* ─── Context ─── */
const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

/* ─── Provider ─── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (message: string, variant: ToastVariant = "default", duration = 4000) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, message, variant, duration }]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

/* ─── Viewport ─── */
function ToastViewport() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-100 flex max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

/* ─── Toast Item ─── */
const variantStyles: Record<ToastVariant, string> = {
  default: "border-border bg-card text-foreground",
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle2 className="size-4 shrink-0 text-green-600" />,
  error: <XCircle className="size-4 shrink-0 text-red-600" />,
  warning: <AlertTriangle className="size-4 shrink-0 text-yellow-600" />,
  info: <Info className="size-4 shrink-0 text-blue-600" />,
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm shadow-lg animate-in slide-in-from-right fade-in",
        variantStyles[toast.variant],
      )}
    >
      {variantIcons[toast.variant]}
      <p className="flex-1">{toast.message}</p>
      <button
        onClick={onDismiss}
        className="shrink-0 rounded p-0.5 opacity-50 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
