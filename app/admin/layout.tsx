"use client";

import React from "react";
import Link from "next/link";
import { Shield, Database, Users, Building2, KeyRound, ExternalLink } from "lucide-react";
import { MultiSiteHeader } from "@/components/multi-site-header";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShringarLogo } from "@/components/logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isDbConnected } = useShringar();

  return (
    <div className="min-h-screen flex flex-col bg-[#140206] text-white">
      {/* Platform Admin Navbar */}
      <header className="sticky top-0 z-30 border-b border-emerald-500/20 bg-[#20040a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <ShringarLogo
              size="sm"
              title="Shringar HQ"
              subtitle="Platform Operations Command"
              href="/admin"
              className="text-emerald-300"
            />

            {/* DB Status Pill */}
            <div className="hidden md:flex items-center gap-1.5 bg-black/40 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs">
              <Database className="h-3 w-3 text-emerald-400" />
              <span className="font-mono text-[10px] text-white/70">MongoDB Atlas:</span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isDbConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="text-[10px] text-emerald-300 font-medium">
                {isDbConnected ? "Live Connected" : "Local Sync"}
              </span>
            </div>
          </div>

          {/* Admin User Badge & Login */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold leading-tight truncate max-w-[140px] text-white">
                {currentUser.name}
              </p>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] py-0">
                Super Administrator
              </Badge>
            </div>

            <Link href="/admin/login">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs py-1 px-3"
              >
                Switch Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Console Content */}
      <main className="flex-1">{children}</main>

      {/* Admin Footer */}
      <footer className="border-t border-white/10 bg-[#0d0104] text-white/60 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-serif font-bold text-sm text-emerald-300">
              Shringar Platform Operations
            </span>
            <span className="text-white/30">|</span>
            <span className="text-[11px]">Universal Multi-Tenant Administration</span>
          </div>
          <div className="text-[11px] font-mono text-white/50">
            Node.js Engine • Redux Toolkit Client • MongoDB Atlas Persistent
          </div>
        </div>
      </footer>
    </div>
  );
}
