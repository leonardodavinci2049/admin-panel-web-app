"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "./loading-button";
import { LogOut } from "lucide-react";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);
    const { error } = await authClient.revokeSessions();
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to log out everywhere");
    } else {
      toast.success("Logged out from all devices");
      router.push("/sign-in");
    }
  }

  return (
    <LoadingButton
      variant="ghost"
      size="sm"
      onClick={handleLogoutEverywhere}
      loading={loading}
      className="gap-2"
      aria-label="Log out from all devices"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Log out</span>
    </LoadingButton>
  );
}
