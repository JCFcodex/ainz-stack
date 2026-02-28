import type { Metadata } from "next";
import { Home } from "lucide-react";
import { ChangePasswordForm, ProfileForm } from "@/components/forms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Profile",
};

function getInitials(
  firstName: string | null,
  lastName: string | null,
  email: string | null,
) {
  const first = firstName?.trim().charAt(0) ?? "";
  const last = lastName?.trim().charAt(0) ?? "";
  const combined = `${first}${last}`.toUpperCase();

  if (combined) {
    return combined;
  }

  return (email?.charAt(0) ?? "U").toUpperCase();
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profileResponse = user
    ? await supabase
        .from("profiles")
        .select("first_name,last_name,email")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const profile = profileResponse.data;

  const firstName = profile?.first_name ?? null;
  const lastName = profile?.last_name ?? null;
  const email = profile?.email ?? user?.email ?? "";

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="size-4" />
          <span>/</span>
          <span className="font-medium text-foreground">Profile</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Personal Info</CardTitle>
          <CardDescription>
            Update your name and profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-lg font-semibold">
              {getInitials(firstName, lastName, email || null)}
            </div>
            <div>
              <p className="text-sm font-medium">{email || "No email"}</p>
              <p className="text-xs text-muted-foreground">
                Avatar uploads can be added in a later release.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue={email}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Email changes are managed by your authentication provider.
            </p>
          </div>

          <ProfileForm
            defaultFirstName={firstName}
            defaultLastName={lastName}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Password</CardTitle>
          <CardDescription>Update your password securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
