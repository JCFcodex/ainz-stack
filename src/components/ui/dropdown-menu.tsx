"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Context ─── */
type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown must be used within <DropdownMenu>");
  return ctx;
}

/* ─── Root ─── */
function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/* ─── Trigger ─── */
function DropdownMenuTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdown();

  return (
    <button
      type="button"
      className={cn("inline-flex items-center gap-1", className)}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn("size-3.5 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

/* ─── Content ─── */
function DropdownMenuContent({
  children,
  className,
  align = "start",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open } = useDropdown();

  if (!open) return null;

  return (
    <div
      role="menu"
      className={cn(
        "absolute top-full z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-card p-1 shadow-md animate-in fade-in zoom-in-95",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Item ─── */
function DropdownMenuItem({
  children,
  className,
  destructive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  destructive?: boolean;
}) {
  const { setOpen } = useDropdown();

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        destructive
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-accent",
        className,
      )}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── Separator ─── */
function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div className={cn("my-1 h-px bg-border", className)} role="separator" />
  );
}

/* ─── Label ─── */
function DropdownMenuLabel({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
