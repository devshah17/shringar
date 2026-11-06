"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Building2 } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SalonType } from "@/lib/types";

export default function OwnerSignupPage() {
  const router = useRouter();
  const { signup } = useShringar();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [salonName, setSalonName] = useState<string>("");
  const [salonType, setSalonType] = useState<SalonType>("unisex");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name,
      email,
      phone,
      role: "owner",
      salonName,
      salonType,
    });
    router.push("/owner");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
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
            Register Your Salon Studio
          </CardTitle>
          <CardDescription className="text-xs text-[var(--body-text)]">
            Join the Shringar Partner Network and start receiving online reservations today.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Proprietor / Manager Name
              </label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Mehta"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Business Email
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@salon.com"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 00000"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-3 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Salon Studio Name
                </label>
                <Input
                  required
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="e.g. Royal Crown Grooming Lounge"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Studio Type
                </label>
                <select
                  value={salonType}
                  onChange={(e) => setSalonType(e.target.value as SalonType)}
                  className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
                >
                  <option value="unisex">Unisex Salon &amp; Spa</option>
                  <option value="ladies">Ladies Parlour &amp; Bridal Studio</option>
                  <option value="men">Men&apos;s Grooming Lounge</option>
                </select>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full text-xs shadow-md mt-2">
              Launch Studio Console
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0 text-center text-xs text-[var(--body-text)]">
          <p>
            Already registered?{" "}
            <Link href="/owner/login" className="font-bold text-[var(--primary)] hover:underline">
              Partner Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
