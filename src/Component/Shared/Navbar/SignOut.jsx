"use client";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignOutButton =() => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    toast.success("Signed out successfully! Redirecting to home...");
  };

  return (
    <Button variant="danger" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
