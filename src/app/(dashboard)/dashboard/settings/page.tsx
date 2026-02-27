import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your app preferences.
        </p>
      </div>

      {/* General */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">General</CardTitle>
          <CardDescription>App display and brand settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="app-name">App Name</Label>
            <Input id="app-name" defaultValue="My SaaS App" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="app-url">App URL</Label>
            <Input id="app-url" defaultValue="https://myapp.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Choose what you get notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              label: "Marketing emails",
              desc: "Receive product updates and tips.",
            },
            {
              label: "Payment alerts",
              desc: "Get notified about payment events.",
            },
            {
              label: "Security alerts",
              desc: "Important security notifications.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="h-5 w-9 rounded-full bg-border peer-checked:bg-foreground after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Danger Zone</CardTitle>
            <Badge variant="destructive" className="text-xs">
              Caution
            </Badge>
          </div>
          <CardDescription>Irreversible actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Export Data</p>
              <p className="text-xs text-muted-foreground">
                Download all your data as JSON.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-3">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and data.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
