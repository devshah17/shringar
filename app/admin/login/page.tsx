"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useShringar();

  const [email, setEmail] = useState<string>("admin@shringar.com");
  const [password, setPassword] = useState<string>("shringar123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "admin");
    router.push("/admin");
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    login(demoEmail, "admin");
    router.push("/admin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-emerald-500/30 bg-[#20040a] text-white">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-emerald-500/50 shadow-lg bg-[#520817]">
            <img
              src="/logo.png"
              alt="Shringar Logo"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-serif font-extrabold text-white">
            HQ Platform Operations Sign In
          </CardTitle>
          <CardDescription className="text-xs text-white/70">
            Authorized administrative personnel only. Universal governance privileges required.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick Demo Admin Sign In */}
          <div className="bg-black/40 p-3 rounded-lg border border-emerald-500/20 text-xs space-y-2">
            <span className="text-[10px] uppercase font-mono text-emerald-300 block">
              1-Click Demo Platform Admin:
            </span>
            <Button
              type="button"
              size="sm"
              onClick={() => handleQuickDemo("admin@shringar.com")}
              className="w-full text-xs h-8 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold"
            >
              Sign In as Dev Shah (Platform Admin)
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">
                Administrator Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shringar.com"
                className="text-xs bg-black/50 border-white/20 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">
                Security Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-xs bg-black/50 border-white/20 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-xs shadow-md mt-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold"
            >
              Authenticate &amp; Enter Command Center
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-0 text-center text-xs text-white/60">
          <div className="pt-2 border-t border-white/10 w-full flex justify-between text-[11px]">
            <Link href="/customer/login" className="hover:underline text-white/80">
              ← Customer Website
            </Link>
            <Link href="/owner/login" className="hover:underline text-white/80">
              Salon Owner Portal →
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
