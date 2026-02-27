"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { logout } from "@/actions/auth";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

type SidebarProps = {
  onNavigate?: () => void;
  isMobile?: boolean;
};

export function Sidebar({ onNavigate, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar transition-all duration-300 md:shadow-[1px_0_3px_rgba(0,0,0,0.04)]",
        isCollapsed ? "w-16" : "w-56",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-14 items-center px-3",
          isMobile ? "justify-start" : "justify-between",
        )}
      >
        {!isCollapsed && <Logo size="sm" />}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-sidebar-muted"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        )}
      </div>

      <Separator />

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold ring-1 ring-sidebar-border"
                  : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-0",
              )}
              title={isCollapsed ? link.label : undefined}
              onClick={() => onNavigate?.()}
            >
              <link.icon className="size-4 shrink-0" />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-2">
        <form action={logout}>
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isCollapsed && "justify-center px-0",
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
