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

const sidebarGroups = [
  {
    title: "Daily Operation",
    links: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Accounting",
    links: [
      {
        label: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "System Options",
    links: [
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
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
        "flex h-screen flex-col bg-card border-r border-border transition-[width] duration-300",
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
      <nav className="flex-1 space-y-4 p-2 overflow-y-auto">
        {sidebarGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-sidebar-muted uppercase">
                {group.title}
              </h4>
            )}
            {group.links.map((link) => {
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
          </div>
        ))}
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
