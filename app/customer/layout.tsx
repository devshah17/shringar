"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Gift, Building2, User as UserIcon, ExternalLink } from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShringarLogo } from "@/components/logo";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser } = useShringar();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Clean, Premium Customer & Platform Navbar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)]/40 bg-[var(--navbar)] text-[var(--navbar-foreground)] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-6">
            <ShringarLogo
              size="sm"
              subtitle="Salon Digitization Platform"
              href="/customer"
            />

            {/* Customer Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              <Link
                href="/customer"
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-colors ${
                  pathname === "/customer" || pathname === "/"
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
            </nav>
          </div>

          {/* Right Section: Reward Balance & Account */}
          <div className="flex items-center gap-3">
            {/* Customer Reward Points Pill */}
            <Link
              href="/customer/bookings"
              className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/15 text-xs hover:border-[var(--accent)] transition-colors"
              title="Your Royale Loyalty Points"
            >
              <Gift className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="font-semibold text-[var(--accent)]">
                {currentUser.rewardPoints ?? 480}
              </span>
              <span className="text-[10px] opacity-75">Pts</span>
            </Link>

            {/* User Profile or Login */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold leading-tight truncate max-w-[120px]">
                  {currentUser.name}
                </p>
                <span className="text-[10px] opacity-75">Customer</span>
              </div>

              <Link href="/customer/login">
                <Button size="sm" variant="accent" className="text-xs shadow-sm py-1 px-3">
                  Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Website Content */}
      <main className="flex-1">{children}</main>

      {/* Platform & Customer Footer */}
      <footer className="border-t border-[var(--border)] bg-[#24050b] text-white/80 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <ShringarLogo size="xs" showText={false} />
                <span className="font-serif font-bold text-base text-[var(--accent)]">
                  Shringar
                </span>
                <span className="text-white/40">|</span>
                <span className="text-xs text-white/70 font-sans">
                  Salon Digitization &amp; Management Platform
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Empowering unisex salons, ladies parlours, and men&apos;s grooming lounges across India with digital appointment scheduling, customer retention rewards, and deep sales &amp; service analytics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-white/70 text-xs">
              <Link href="/customer" className="hover:text-white transition-colors">
                Explore Salons
              </Link>
              <Link href="/customer/bookings" className="hover:text-white transition-colors">
                Rewards Program
              </Link>
              <a
                href="/owner"
                className="hover:text-[var(--accent)] transition-colors flex items-center gap-1 font-semibold text-[var(--accent)]"
              >
                Salon Owner Console <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="/admin"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
              >
                Platform Admin <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-[11px]">
            <p>© 2026 Shringar Platform. All rights reserved.</p>
            <p className="font-mono">Empowering Studios &amp; Elevating Client Experiences</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
