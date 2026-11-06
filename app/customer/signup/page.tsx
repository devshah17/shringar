"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, User as UserIcon, Gift, Sparkles } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function CustomerSignupPage() {
  const router = useRouter();
  const { signup } = useShringar();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name,
      email,
      phone,
      role: "customer",
    });
    router.push("/customer/bookings");
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
            Create Customer Account
          </CardTitle>
          <CardDescription className="text-xs text-[var(--body-text)]">
            Join the Royale Privilege network and receive <strong>150 bonus reward points</strong> immediately.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Full Name
              </label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Radhika Singhania"
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="radhika@gmail.com"
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Mobile Number
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="text-xs"
              />
            </div>

            <div className="bg-[var(--accent)]/15 border border-[var(--accent)]/30 p-3 rounded-lg text-xs text-[var(--headings)] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
              <span>
                <strong>150 Welcome Points</strong> will be credited to your account balance upon registration.
              </span>
            </div>

            <Button type="submit" variant="primary" className="w-full text-xs shadow-md mt-2">
              Create Account &amp; Claim Bonus
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0 text-center text-xs text-[var(--body-text)]">
          <p>
            Already have an account?{" "}
            <Link href="/customer/login" className="font-bold text-[var(--primary)] hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
