"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Scissors, Building2, Calendar, Gift, Tag, Plus, LogOut, ChevronDown } from "lucide-react";
import { MultiSiteHeader } from "@/components/multi-site-header";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShringarLogo } from "@/components/logo";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, salons, activeSalonId, setActiveSalonId } = useShringar();

  const ownerSalons = salons.filter(
    (s) => s.ownerId === currentUser.id || (currentUser.salonIds && currentUser.salonIds.includes(s.id))
  );

  const activeSalon = salons.find((s) => s.id === activeSalonId) || salons[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[var(--foreground)]">
      {/* Salon Owner Executive Console Navbar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[#321019] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <ShringarLogo
              size="sm"
              title="Shringar Partner"
              subtitle="Salon Owner Business Console"
              href="/owner"
              className="text-[#EED8B0]"
            />

            {/* Branch Switcher Dropdown */}
            {salons.length > 0 && (
              <div className="hidden md:flex items-center gap-1.5 bg-black/30 border border-white/15 px-3 py-1 rounded-lg text-xs">
                <Building2 className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="opacity-70 text-[10px] uppercase font-mono">Branch:</span>
                <select
                  value={activeSalonId}
                  onChange={(e) => setActiveSalonId(e.target.value)}
                  className="bg-transparent text-white font-semibold text-xs border-none focus:outline-none cursor-pointer"
                >
                  {salons.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#321019] text-white">
                      {s.name} ({s.type})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Owner Identity & Login */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold leading-tight truncate max-w-[140px] text-white">
                {currentUser.name}
              </p>
              <Badge className="bg-[#741B32] text-[#EED8B0] text-[9px] border-[#EED8B0]/30 py-0">
                Salon Proprietor
              </Badge>
            </div>

            <Link href="/owner/login">
              <Button size="sm" variant="accent" className="text-xs shadow-sm py-1 px-3">
                Switch Owner
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Console Content */}
      <main className="flex-1">{children}</main>

      {/* Owner Console Footer */}
      <footer className="border-t border-[var(--border)] bg-[#24050b] text-white/80 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-serif font-bold text-sm text-[var(--accent)]">
              Shringar Partner Network
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[11px] text-white/60">
              Salon Proprietor &amp; Stylist Management
            </span>
          </div>
          <div className="text-[11px] text-white/60">
            Active Studio: <strong className="text-white">{activeSalon?.name}</strong> • Mumbai
          </div>
        </div>
      </footer>
    </div>
  );
}
