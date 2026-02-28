import type { Metadata } from "next";
import { Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotificationPreferencesForm } from "@/components/forms";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const notificationPreferencesResponse = user
    ? await supabase
        .from("notification_preferences")
        .select("marketing_emails,payment_alerts,security_alerts")
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null };

  const notificationPreferences = notificationPreferencesResponse.data;

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="size-4" />
          <span>/</span>
          <span className="font-medium text-foreground">Settings</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your app preferences.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">General</CardTitle>
          <CardDescription>
            Core account and app-level settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="account-email">Account Email</Label>
            <Input
              id="account-email"
              name="email"
              defaultValue={user?.email ?? ""}
              type="email"
              autoComplete="email"
              spellCheck={false}
              disabled
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="app-name">App Name</Label>
            <Input
              id="app-name"
              name="appName"
              defaultValue={env.NEXT_PUBLIC_APP_NAME}
              readOnly
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="app-url">App URL</Label>
            <Input
              id="app-url"
              name="appUrl"
              defaultValue={env.NEXT_PUBLIC_APP_URL}
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Choose what you get notified about.</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferencesForm
            defaultMarketingEmails={
              notificationPreferences?.marketing_emails ?? true
            }
            defaultPaymentAlerts={
              notificationPreferences?.payment_alerts ?? true
            }
            defaultSecurityAlerts={
              notificationPreferences?.security_alerts ?? true
            }
          />
        </CardContent>
      </Card>

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
            <Button variant="outline" size="sm" disabled>
              Coming Soon
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-3">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and data.
              </p>
            </div>
            <Button variant="destructive" size="sm" disabled>
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
