import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      {/* Avatar & Name */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Personal Info</CardTitle>
          <CardDescription>Update your name and photo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-lg font-semibold">
              JD
            </div>
            <div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="profile-first">First name</Label>
              <Input id="profile-first" defaultValue="Jane" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-last">Last name</Label>
              <Input id="profile-last" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue="jane@example.com"
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support for help.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Password</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-pw">Current password</Label>
            <Input id="current-pw" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New password</Label>
            <Input id="new-pw" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-pw">Confirm password</Label>
            <Input id="confirm-pw" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm">Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
