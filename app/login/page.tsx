"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, Crown, Shield, User as UserIcon, ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useShringar();

  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const [email, setEmail] = useState("rajesh@shringar.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);

  // Sync sample credentials on role change
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "owner") {
      setEmail("rajesh@shringar.com");
    } else if (role === "customer") {
      setEmail("radhika@gmail.com");
    } else {
      setEmail("admin@shringar.com");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    router.push("/dashboard");
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[var(--background)]">
      {/* Brand Header */}
      <div className="mb-8 text-center space-y-2 flex flex-col items-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-[var(--accent)]/40 shadow-xl bg-[#520817]">
            <img
              src="/logo.png"
              alt="Shringar Logo"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <span className="font-extrabold text-2xl font-serif text-[var(--heading)]">
            Shringar
          </span>
        </Link>
        <p className="text-xs text-[var(--muted-foreground)]">
          Royale Salon &amp; Parlour Management
        </p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-2 border-[var(--border)]">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-serif">Sign in to Account</CardTitle>
            <Badge variant="accent" className="capitalize text-[10px]">
              {selectedRole} Portal
            </Badge>
          </div>
          <CardDescription>
            Select your role to access your personalized salon dashboard.
          </CardDescription>

          {/* Role Picker Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-[var(--radius-md)] bg-[var(--background)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => handleRoleSelect("owner")}
              className={`py-2 px-2 rounded-[var(--radius-sm)] text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedRole === "owner"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <Crown className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Owner</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("customer")}
              className={`py-2 px-2 rounded-[var(--radius-sm)] text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedRole === "customer"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <UserIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
              className={`py-2 px-2 rounded-[var(--radius-sm)] text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                selectedRole === "admin"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Admin</span>
            </button>
          </div>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div>
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@shringar.com"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--muted-foreground)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--accent)]"
                />
                Remember this device
              </label>
              <span className="text-[var(--primary)] font-medium hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <Button type="submit" className="w-full gap-2 shadow-md" size="lg">
              Sign In to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="px-6 pb-6 pt-2 space-y-3">
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--border)]" />
            </span>
            <span className="relative bg-[var(--card)] px-3 text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)]">
              Instant Demo Access
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemo("owner")}
              className="text-[11px] gap-1 px-1 h-9"
            >
              <Crown className="h-3 w-3 text-[var(--accent)]" />
              Owner
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemo("customer")}
              className="text-[11px] gap-1 px-1 h-9"
            >
              <UserIcon className="h-3 w-3 text-[var(--accent)]" />
              Client
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemo("admin")}
              className="text-[11px] gap-1 px-1 h-9"
            >
              <Shield className="h-3 w-3 text-[var(--accent)]" />
              Admin
            </Button>
          </div>
        </div>

        <CardFooter className="pt-2 border-t border-[var(--border)]/60 text-center justify-center">
          <p className="text-xs text-[var(--muted-foreground)]">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="font-bold text-[var(--primary)] hover:underline">
              Create an Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
