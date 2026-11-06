"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Gift, Building2, User as UserIcon, LogOut } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShringarLogo } from "@/components/logo";

export function Navbar() {
  const pathname = usePathname();
  const { currentUser } = useShringar();

  return (
    <nav className="sticky top-0 z-30 border-b border-[var(--border)]/40 bg-[var(--navbar)] text-[var(--navbar-foreground)] shadow-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand Logo & Platform Positioning */}
        <div className="flex items-center gap-6">
          <ShringarLogo
            size="sm"
            subtitle="Salon Digitization Platform"
            href="/"
          />

          {/* Clean Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-colors ${
                pathname === "/" || pathname === "/customer"
                  ? "bg-white/15 text-white"
                  : "opacity-80 hover:opacity-100 hover:bg-white/10"
              }`}
            >
              Explore Salons
            </Link>
            <Link
              href="/customer/bookings"
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-colors flex items-center gap-1.5 ${
                pathname.startsWith("/customer/bookings")
                  ? "bg-white/15 text-white"
                  : "opacity-80 hover:opacity-100 hover:bg-white/10"
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
              My Appointments &amp; Rewards
            </Link>
            <a
              href="/owner"
              className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-[var(--accent)] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 ml-1 border border-[var(--accent)]/30"
              title="Salon Proprietors: Manage bookings, sales analytics & digitized services"
            >
              <Building2 className="h-3.5 w-3.5" />
              For Salons &amp; Parlours
            </a>
          </div>
        </div>

        {/* Right Section: Customer Loyalty Points & Account */}
        <div className="flex items-center gap-3">
          {/* Customer Reward Points Pill */}
          <Link
            href="/customer/bookings"
            className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/15 text-xs hover:border-[var(--accent)] transition-colors"
            title="Royale Loyalty Points"
          >
            <Gift className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">
              {currentUser.rewardPoints ?? 480}
            </span>
            <span className="text-[10px] opacity-75">Pts</span>
          </Link>

          {/* User Profile or Login */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-tight truncate max-w-[140px]">
                {currentUser.name}
              </p>
              <span className="text-[10px] opacity-75 block">Customer</span>
            </div>

            <Link href="/customer/login">
              <Button size="sm" variant="accent" className="text-xs shadow-sm py-1 px-3">
                Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
