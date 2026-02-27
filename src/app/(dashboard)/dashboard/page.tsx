import type { Metadata } from "next";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
  },
  {
    label: "Revenue",
    value: "$14,239",
    change: "+8.1%",
    icon: DollarSign,
  },
  {
    label: "Active Now",
    value: "573",
    change: "+4.3%",
    icon: Activity,
  },
  {
    label: "Growth",
    value: "+24%",
    change: "+2.1%",
    icon: TrendingUp,
  },
];

const recentActivity = [
  { user: "Alex Johnson", action: "signed up", time: "2 min ago" },
  { user: "Priya Sharma", action: "upgraded to Pro", time: "15 min ago" },
  { user: "Sam Chen", action: "made a payment", time: "1 hr ago" },
  { user: "Jordan Lee", action: "updated profile", time: "2 hr ago" },
  { user: "Taylor Swift", action: "signed up", time: "3 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here&apos;s your overview.
          </p>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-xl font-semibold">{stat.value}</p>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-background">
                    <stat.icon className="size-4 text-foreground" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <CardDescription>Latest user actions in your app.</CardDescription>
        </CardHeader>
        <CardContent>
          <StaggerChildren className="space-y-3" staggerDelay={0.06}>
            {recentActivity.map((item) => (
              <StaggerItem key={`${item.user}-${item.time}`}>
                <div className="flex cursor-default items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                      {item.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.action}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </CardContent>
      </Card>
    </div>
  );
}
