"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, Crown, User as UserIcon, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SalonType, UserRole } from "@/lib/types";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useShringar();

  const [role, setRole] = useState<UserRole>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [salonName, setSalonName] = useState("");
  const [salonType, setSalonType] = useState<SalonType>("unisex");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (role === "owner" && !salonName.trim()) {
      setError("Please specify your primary salon or parlour name.");
      return;
    }

    signup({
      name,
      email,
      role,
      phone,
      salonName: role === "owner" ? salonName : undefined,
      salonType: role === "owner" ? salonType : undefined,
    });

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
          Join India&apos;s Royale Salon Management Community
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-xl border-2 border-[var(--border)]">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-serif">Create Account</CardTitle>
            <Badge variant="accent" className="capitalize text-[10px]">
              {role === "owner" ? "Salon Partner" : "Client Registration"}
            </Badge>
          </div>
          <CardDescription>
            Choose your account type to access the right tools.
          </CardDescription>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-[var(--radius-md)] bg-[var(--background)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`py-2.5 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === "customer"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <UserIcon className="h-4 w-4 text-[var(--accent)]" />
              <span>I am a Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`py-2.5 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === "owner"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <Crown className="h-4 w-4 text-[var(--accent)]" />
              <span>I own a Salon / Parlour</span>
            </button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-[var(--radius-md)] bg-red-100 text-red-800 text-xs border border-red-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Sharma"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@example.com"
            />

            {/* Owner Specific Fields */}
            {role === "owner" && (
              <div className="p-4 rounded-[var(--radius-lg)] border-2 border-[var(--accent)]/30 bg-[var(--background)]/60 space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[var(--primary)]" />
                  <span className="text-xs font-bold text-[var(--heading)] font-serif uppercase tracking-wider">
                    Primary Salon Setup
                  </span>
                </div>

                <Input
                  label="Salon / Parlour Name"
                  required={role === "owner"}
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="e.g. Royal Touch Unisex Studio"
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--foreground)]">
                    Salon Specialty Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "unisex", label: "Unisex" },
                      { id: "ladies", label: "Ladies" },
                      { id: "men", label: "Men's" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSalonType(st.id as SalonType)}
                        className={`py-1.5 px-2 rounded-[var(--radius-sm)] text-xs font-medium border text-center transition-all cursor-pointer ${
                          salonType === st.id
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                            : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full gap-2 shadow-md mt-2" size="lg">
              Complete Registration &amp; Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </form>

        <CardFooter className="pt-2 border-t border-[var(--border)]/60 text-center justify-center">
          <p className="text-xs text-[var(--muted-foreground)]">
            Already have a registered account?{" "}
            <Link href="/login" className="font-bold text-[var(--primary)] hover:underline">
              Sign In Instead
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
