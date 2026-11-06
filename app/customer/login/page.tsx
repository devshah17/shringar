"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, User as UserIcon, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useShringar();

  const [email, setEmail] = useState<string>("radhika@gmail.com");
  const [password, setPassword] = useState<string>("shringar123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "customer");
    router.push("/customer");
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    login(demoEmail, "customer");
    router.push("/customer");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-[var(--border)]">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/50 shadow-lg bg-[#520817]">
            <img
              src="/logo.png"
              alt="Shringar Logo"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-serif font-extrabold text-[var(--headings)]">
            Customer Portal Sign In
          </CardTitle>
          <CardDescription className="text-xs text-[var(--body-text)]">
            Access your bookings, loyalty reward points, and exclusive salon privileges.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick Demo Customer Sign In */}
          <div className="bg-[var(--border)]/30 p-3 rounded-lg border border-[var(--border)]/60 text-xs space-y-2">
            <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75 block">
              1-Click Demo Profiles:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemo("radhika@gmail.com")}
                className="text-xs h-8 text-[var(--primary)] border-[var(--primary)]/40 hover:bg-[var(--primary)] hover:text-white"
              >
                Radhika (480 Pts)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemo("kunal@gmail.com")}
                className="text-xs h-8 text-[var(--primary)] border-[var(--primary)]/40 hover:bg-[var(--primary)] hover:text-white"
              >
                Kunal (120 Pts)
              </Button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-xs"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full text-xs shadow-md mt-2">
              Sign In to Customer Account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0 text-center text-xs text-[var(--body-text)]">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/customer/signup" className="font-bold text-[var(--primary)] hover:underline">
              Create account (+150 bonus points)
            </Link>
          </p>
          <div className="pt-2 border-t border-[var(--border)] w-full flex justify-between text-[11px] text-[var(--body-text)] opacity-70">
            <Link href="/owner/login" className="hover:underline">
              Salon Owner Portal →
            </Link>
            <Link href="/admin/login" className="hover:underline">
              Admin Platform →
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
