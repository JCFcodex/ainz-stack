"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateNotificationPreferences } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type NotificationPreferencesFormProps = {
  defaultMarketingEmails: boolean;
  defaultPaymentAlerts: boolean;
  defaultSecurityAlerts: boolean;
};

export function NotificationPreferencesForm({
  defaultMarketingEmails,
  defaultPaymentAlerts,
  defaultSecurityAlerts,
}: NotificationPreferencesFormProps) {
  const [marketingEmails, setMarketingEmails] = useState(defaultMarketingEmails);
  const [paymentAlerts, setPaymentAlerts] = useState(defaultPaymentAlerts);
  const [securityAlerts, setSecurityAlerts] = useState(defaultSecurityAlerts);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSave() {
    setPending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.set("marketingEmails", String(marketingEmails));
    formData.set("paymentAlerts", String(paymentAlerts));
    formData.set("securityAlerts", String(securityAlerts));

    const result = await updateNotificationPreferences(null, formData);
    if (!result.success) {
      setError(result.error ?? "Unable to save notification preferences.");
      setPending(false);
      return;
    }

    setSuccess(result.message ?? "Notification preferences updated.");
    setPending(false);
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-success/10 px-3 py-2 text-xs text-success">
          {success}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="marketing-emails" className="text-sm font-medium">
              Marketing emails
            </Label>
            <p className="text-xs text-muted-foreground">
              Receive product updates and tips.
            </p>
          </div>
          <Switch
            id="marketing-emails"
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="payment-alerts" className="text-sm font-medium">
              Payment alerts
            </Label>
            <p className="text-xs text-muted-foreground">
              Get notified about payment events.
            </p>
          </div>
          <Switch
            id="payment-alerts"
            checked={paymentAlerts}
            onCheckedChange={setPaymentAlerts}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="security-alerts" className="text-sm font-medium">
              Security alerts
            </Label>
            <p className="text-xs text-muted-foreground">
              Important security notifications.
            </p>
          </div>
          <Switch
            id="security-alerts"
            checked={securityAlerts}
            onCheckedChange={setSecurityAlerts}
          />
        </div>
      </div>

      <Button
        size="sm"
        type="button"
        onClick={onSave}
        className="gap-2"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Save className="size-3.5" />
        )}
        {pending ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
}
