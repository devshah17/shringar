"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Sparkles,
  ArrowRight,
  Crown,
  Shield,
  User as UserIcon,
  Star,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Gift,
  Building2,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShringar } from "@/lib/store";
import { SalonType } from "@/lib/types";

export default function Home() {
  const { salons, services, switchRole } = useShringar();
  const [selectedType, setSelectedType] = useState<SalonType | "all">("all");

  const filteredSalons = selectedType === "all" ? salons : salons.filter((s) => s.type === selectedType);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[var(--border)]">
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Prominent Rounded Shringar Logo */}
          <div className="flex justify-center mb-1">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-[var(--accent)]/50 shadow-xl bg-[#520817] transition-transform duration-300 hover:scale-105">
              <img
                src="/logo.png"
                alt="Shringar Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-semibold text-[var(--heading)] shadow-sm">
            <Crown className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>The Royale Standard for Salons, Parlours &amp; Spas</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--heading)] font-serif max-w-4xl mx-auto leading-tight">
            Digitizing Salons, Empowering Growth &amp; Elevating{" "}
            <span className="text-[var(--primary)] underline decoration-[var(--accent)] decoration-wavy decoration-2">
              Every Experience
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto font-medium leading-relaxed">
            Shringar is a salon digitization and management platform. We onboard unisex studios, ladies parlours, and gentlemen lounges into the digital age—empowering salon proprietors to manage bookings, optimize treatments, and analyze sales &amp; service revenue, while providing customers with verified online bookings and royal rewards.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-8 py-6 text-base shadow-lg">
                <Calendar className="h-4 w-4" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base border-2">
                <Scissors className="h-4 w-4 text-[var(--accent)]" />
                Salon Owner Portal
              </Button>
            </Link>
            <Link href="/theme">
              <Button size="lg" variant="ghost" className="gap-2 text-xs opacity-80">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                Theme System
              </Button>
            </Link>
          </div>

          {/* Quick Persona Jump Bar */}
          <div className="pt-8 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              ✦ Experience By Role (1-Click Test Drive)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/dashboard"
                onClick={() => switchRole("owner")}
                className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-all shadow-sm text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[var(--heading)] group-hover:text-[var(--primary)]">
                  <Crown className="h-4 w-4 text-[var(--accent)]" />
                  <span>Salon Owner</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  Manage multi-salons, services, bookings, rewards &amp; offers.
                </p>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => switchRole("customer")}
                className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-all shadow-sm text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[var(--heading)] group-hover:text-[var(--primary)]">
                  <UserIcon className="h-4 w-4 text-[var(--accent)]" />
                  <span>Customer</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  View past salons &amp; services, reward points, and book slots.
                </p>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => switchRole("admin")}
                className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] transition-all shadow-sm text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[var(--heading)] group-hover:text-[var(--primary)]">
                  <Shield className="h-4 w-4 text-[var(--accent)]" />
                  <span>Platform Admin</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  Platform-wide master oversight, user roles &amp; access control.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SALON SHOWCASE SECTION ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="accent" className="mb-2">
              Verified Salons &amp; Studios
            </Badge>
            <h2 className="text-3xl font-extrabold text-[var(--heading)] font-serif">
              Discover Royale Parlours Near You
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Top-rated studios offering unisex styling, bridal artistry, and men&apos;s grooming.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Studios" },
              { id: "unisex", label: "Unisex Salons" },
              { id: "ladies", label: "Ladies & Bridal" },
              { id: "men", label: "Men's Grooming" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as SalonType | "all")}
                className={`px-4 py-2 rounded-[var(--radius-md)] text-xs font-bold transition-all cursor-pointer border ${
                  selectedType === tab.id
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm"
                    : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="overflow-hidden flex flex-col justify-between shadow-md group">
              <div className="relative h-48 w-full overflow-hidden bg-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="accent" className="shadow-md capitalize">
                    {salon.type}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{salon.rating}</span>
                  <span className="opacity-70">({salon.reviewCount})</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif">{salon.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                  <span>
                    {salon.address}, {salon.city}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]/60">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[var(--primary)]" />
                    Open 10:00 AM - 9:00 PM
                  </span>
                  <span>Est. {salon.establishedYear}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-[var(--border)]/60 gap-2">
                <Link href="/dashboard" className="w-full" onClick={() => switchRole("customer")}>
                  <Button className="w-full gap-1.5" size="sm">
                    <Calendar className="h-3.5 w-3.5" />
                    Book Service
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* ── POPULAR SIGNATURE SERVICES ────────────────────────────────────── */}
      <section className="py-16 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="accent">Signature Rituals</Badge>
            <h2 className="text-3xl font-extrabold text-[var(--heading)] font-serif">
              Popular Services Across Salons
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Curated treatments provided by senior stylists and beauty masters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)]/60 shadow-sm flex flex-col justify-between hover:border-[var(--primary)] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {srv.category}
                    </Badge>
                    <span className="font-extrabold text-base text-[var(--primary)] font-serif">
                      ₹{srv.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[var(--heading)] mt-2 font-serif">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 line-clamp-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)]/60 text-xs">
                  <span className="text-[var(--muted-foreground)] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {srv.durationMinutes} mins
                  </span>
                  <Link href="/dashboard" onClick={() => switchRole("customer")}>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES SECTION ─────────────────────────────────────── */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="accent">Management Architecture</Badge>
          <h2 className="text-3xl font-extrabold text-[var(--heading)] font-serif">
            Designed for Modern Salon Entrepreneurs
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Every tool you need to scale from a single boutique parlour to a multi-city salon chain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Building2 className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--heading)] font-serif">Multi-Branch Salons</h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Create, update, and manage multiple salon locations seamlessly from a single unified owner dashboard.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Calendar className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--heading)] font-serif">Smart Bookings</h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Schedule walk-in reservations, assign expert stylists, and manage real-time appointment statuses.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Gift className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--heading)] font-serif">Loyalty Rewards Engine</h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Retain high-value clients with automated reward point accruals, tier promotions, and custom salon coupons.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
              <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="font-bold text-base text-[var(--heading)] font-serif">Live Revenue Insights</h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Track daily sales, service performance, and staff productivity with transparent reporting.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-[var(--border)] bg-[var(--navbar)] text-[var(--navbar-foreground)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[#520817] shadow-sm">
              <Scissors className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="font-bold text-lg font-serif leading-none">Shringar</p>
              <p className="text-xs opacity-75 mt-0.5 font-mono">Royale Salon Management Ecosystem</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs opacity-85">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <Link href="/dashboard" className="hover:opacity-100 transition-opacity">
              Dashboard
            </Link>
            <Link href="/login" className="hover:opacity-100 transition-opacity">
              Login
            </Link>
            <Link href="/signup" className="hover:opacity-100 transition-opacity">
              Register Salon
            </Link>
            <Link href="/theme" className="hover:opacity-100 transition-opacity">
              Design System
            </Link>
          </div>

          <p className="text-xs opacity-60">
            © 2026 Shringar (श्रृंगार) · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
