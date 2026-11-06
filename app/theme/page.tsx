"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Sparkles,
  Bell,
  Star,
  CheckCircle2,
  AlertTriangle,
  Info,
  Crown,
  Coffee,
  ArrowLeft,
  User,
  Calendar,
  Clock,
  TrendingUp,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────────
   THEME DEFINITIONS (Royale Luxury Collection)
   ───────────────────────────────────────────────────────────────────────────── */

const themes = [
  {
    id: "theme-royale-2",
    name: "Royale 2",
    icon: <Crown className="h-4 w-4" />,
    tagline: "Official Signature: Deep Wine #520817 · Background #F8F0E8 · White Cards #FFFFFF · Headings #321019 · Text #55434A · Gold #C58B3C · Hover #741B32",
    isBrand: true,
    palette: [
      { name: "Deep Wine",       hex: "#520817", role: "Navbar & Primary Button" },
      { name: "Main Canvas",     hex: "#F8F0E8", role: "Main Background" },
      { name: "Pure White",      hex: "#FFFFFF", role: "Product Cards" },
      { name: "Dark Plum",       hex: "#321019", role: "Headings" },
      { name: "Warm Charcoal",   hex: "#55434A", role: "Body Text" },
      { name: "Antique Gold",    hex: "#C58B3C", role: "Gold Icons / Accents" },
      { name: "Wine Rose Hover", hex: "#741B32", role: "Hover Button" },
      { name: "Silk Sand",       hex: "#E5D4C1", role: "Borders" },
    ],
  },
  {
    id: "theme-velvet-rouge",
    name: "Velvet Rouge",
    icon: <Crown className="h-4 w-4" />,
    tagline: "Deep Velvet Wine #78182E · Blush Rose #C86D7E · Soft Linen #F7EFE6",
    isBrand: false,
    palette: [
      { name: "Velvet Wine",   hex: "#78182E", role: "Primary Button" },
      { name: "Blush Rose",    hex: "#C86D7E", role: "Accent" },
      { name: "Soft Linen",    hex: "#F7EFE6", role: "Background" },
      { name: "Pure Ivory",    hex: "#FFF9F4", role: "Surface / Cards" },
      { name: "Warm Cashmere", hex: "#ECD9CD", role: "Muted" },
      { name: "Wine Burgundy", hex: "#2E0B14", role: "Headings" },
      { name: "Linen Edge",    hex: "#E2CBBC", role: "Border" },
    ],
  },
  {
    id: "theme-mahogany-silk",
    name: "Mahogany Silk",
    icon: <Coffee className="h-4 w-4" />,
    tagline: "Rich Mahogany #5E1C11 · Rose Copper #C8785E · Warm Sand Silk #F7ECE5",
    isBrand: false,
    palette: [
      { name: "Rich Mahogany",   hex: "#5E1C11", role: "Primary Button" },
      { name: "Rose Copper",     hex: "#C8785E", role: "Accent" },
      { name: "Sand Silk",       hex: "#F7ECE5", role: "Background" },
      { name: "Porcelain Cream", hex: "#FEF9F6", role: "Surface / Cards" },
      { name: "Cedar Mist",      hex: "#EDD6CA", role: "Muted" },
      { name: "Blackened Walnut",hex: "#280803", role: "Headings" },
      { name: "Sandstone Edge",  hex: "#DFC6BA", role: "Border" },
    ],
  },
] as const;

type ThemeId = (typeof themes)[number]["id"];

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — Colour Swatch
   ───────────────────────────────────────────────────────────────────────────── */
function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <div
        className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border)] shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <p className="text-xs font-semibold text-[var(--foreground)] truncate">{name}</p>
      <p className="text-[10px] font-mono text-[var(--muted-foreground)]">{hex}</p>
      <p className="text-[10px] text-[var(--muted-foreground)] opacity-80">{role}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — Section heading
   ───────────────────────────────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4 flex items-center gap-2">
      <span className="flex-1 h-px bg-[var(--border)]" />
      {children}
      <span className="flex-1 h-px bg-[var(--border)]" />
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function ThemePage() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("theme-royale-2");
  const theme = themes.find((t) => t.id === activeTheme) || themes[0];

  return (
    <div className={cn(activeTheme, "min-h-screen bg-[var(--background)] transition-colors duration-500")}>
      {/* ── TOP NAVBAR ── */}
      <nav className="sticky top-0 z-20 border-b border-[var(--border)]/40 bg-[var(--navbar)] text-[var(--navbar-foreground)] shadow-md transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5 text-sm font-medium"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[#520817] shadow-sm ring-2 ring-white/20">
                <Scissors className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight block leading-none">
                  Shringar
                </span>
                <span className="text-[10px] opacity-80 tracking-wider uppercase block font-mono mt-0.5">
                  Parlour &amp; Salon Management
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="gap-1.5 border border-white/25 bg-white/10 text-inherit backdrop-blur-sm shadow-sm py-1 px-3">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />
              <span className="font-semibold">{theme.name}</span>
            </Badge>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Page header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="gap-1 py-0.5 px-2.5">
              <Palette className="h-3 w-3" />
              Royale Themes
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              Curated Luxury Salon Palettes
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--heading)] font-serif">
            Royale Salon Themes
          </h1>
          <p className="text-[var(--muted-foreground)] text-base max-w-2xl leading-relaxed">
            Exclusive palette options designed for Shringar parlour and salon management. Experience how all buttons, product cards, inputs, and headings adapt seamlessly.
          </p>
        </div>

        {/* ── ROYALE 2 SPECIFICATION SHOWCASE CARD ─────────────────────────── */}
        <div className="rounded-[var(--radius-xl)] border-2 border-[var(--accent)]/40 bg-[var(--card)] p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm">
                <Crown className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--heading)] flex items-center gap-2">
                  Royale 2 Theme Specification
                  <Badge variant="accent" className="text-[10px]">Active Standard</Badge>
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Precise 10-element assignment for background, navbar, buttons, hover states, cards, and text.
                </p>
              </div>
            </div>
            {activeTheme !== "theme-royale-2" && (
              <Button
                size="sm"
                variant="accent"
                onClick={() => setActiveTheme("theme-royale-2")}
                className="self-start md:self-auto gap-1.5"
              >
                <Crown className="h-3.5 w-3.5" />
                Select Royale 2
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 mt-4">
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#F8F0E8] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Main BG</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#F8F0E8</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#520817] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Navbar</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#520817</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#520817] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Primary Btn</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#520817</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#EED8B0] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Btn Text</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#EED8B0</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#FFFFFF] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Cards</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#FFFFFF</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#321019] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Headings</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#321019</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#55434A] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Body Text</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#55434A</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#C58B3C] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Gold Icons</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#C58B3C</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#741B32] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Hover Btn</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#741B32</p>
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]/70">
              <div className="h-4 w-4 rounded-full bg-[#E5D4C1] shadow-sm mb-1 ring-1 ring-black/20" />
              <p className="text-[11px] font-bold text-[var(--heading)]">Borders</p>
              <p className="text-[9px] font-mono text-[var(--muted-foreground)]">#E5D4C1</p>
            </div>
          </div>
        </div>

        {/* ── THEME SWITCHER ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Select Theme</SectionHeading>
          <div className="flex flex-wrap gap-3">
            {themes.map((t) => {
              const isSelected = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id as ThemeId)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[var(--radius-lg)] border px-5 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm",
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md scale-[1.03] ring-2 ring-[var(--accent)]/60"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                  )}
                >
                  {t.icon}
                  <span>{t.name}</span>
                  {t.isBrand && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--accent)] text-[#520817] px-2 py-0.5 rounded-full ml-1.5 shadow-sm">
                      Signature
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[var(--muted-foreground)] italic bg-[var(--card)]/60 border border-[var(--border)]/60 px-3.5 py-2 rounded-[var(--radius-md)] inline-block">
            {theme.tagline}
          </p>
        </div>

        {/* ── COLOR PALETTE SWATCHES ────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Active Palette Swatches ({theme.name})</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {theme.palette.map((color) => (
              <Swatch key={color.hex + color.role} {...color} />
            ))}
          </div>
        </div>

        {/* ── BUTTONS ───────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Buttons</SectionHeading>
          <div className="space-y-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            {/* Variants */}
            <div>
              <p className="text-xs text-[var(--muted-foreground)] mb-3 font-semibold uppercase tracking-wider">
                Variants (Hover over primary button to see hover color: #741B32)
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="default">
                  <Crown className="h-4 w-4" /> Book Appointment
                </Button>
                <Button variant="accent">
                  <Sparkles className="h-4 w-4" /> Gold Accent
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Cancel</Button>
                <Button variant="link">Service Details →</Button>
              </div>
            </div>
            {/* Sizes */}
            <div>
              <p className="text-xs text-[var(--muted-foreground)] mb-3 font-semibold uppercase tracking-wider">Sizes</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small (sm)</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large (lg)</Button>
                <Button size="xl">Royale (xl)</Button>
                <Button size="icon" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* States */}
            <div>
              <p className="text-xs text-[var(--muted-foreground)] mb-3 font-semibold uppercase tracking-wider">States</p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button>Active Button</Button>
                <Button disabled>Disabled State</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BADGES ───────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Badges &amp; Status Tags</SectionHeading>
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">
                <Crown className="h-3 w-3" /> Wine Primary
              </Badge>
              <Badge variant="accent">
                <Star className="h-3 w-3" /> Antique Gold Accent
              </Badge>
              <Badge variant="secondary">Secondary Neutral</Badge>
              <Badge variant="outline">Outline Style</Badge>
              <Badge variant="muted">Muted Badge</Badge>
              <Badge variant="destructive">Cancelled</Badge>
            </div>
            <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-2">
              <Badge variant="accent">VIP Client</Badge>
              <Badge variant="default">Confirmed Slot</Badge>
              <Badge variant="secondary">Hair Spa</Badge>
              <Badge variant="outline">Bridal Suite</Badge>
              <Badge variant="muted">Pending Checkout</Badge>
            </div>
          </div>
        </div>

        {/* ── INPUTS ───────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Inputs &amp; Form Fields</SectionHeading>
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              <Input label="Client Name" placeholder="Priya Sharma" defaultValue="Radhika Singhania" />
              <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" defaultValue="+91 98201 54321" />
              <Input label="Email Address" type="email" placeholder="priya@example.com" defaultValue="radhika@shringar.com" />
              <Input label="Appointment Date" type="date" defaultValue="2026-11-15" />
              <Input label="Promo Code (Error State)" placeholder="Enter promo code" error="Invalid or expired salon voucher." defaultValue="FESTIVE50" />
              <Input label="Membership ID (Disabled)" placeholder="SHR-2026-881" disabled defaultValue="SHR-GOLD-094" />
            </div>
          </div>
        </div>

        {/* ── CARDS (PRODUCT & SERVICE CARDS: #FFFFFF in Royale 2) ─────────── */}
        <div className="space-y-4">
          <SectionHeading>Product &amp; Service Cards</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Appointment Card */}
            <Card className="flex flex-col justify-between shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 ring-2 ring-[var(--accent)]/50">
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Radhika Singhania</CardTitle>
                      <CardDescription>Hair Spa + Blowout Styling</CardDescription>
                    </div>
                  </div>
                  <Badge variant="accent" className="font-semibold">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5 text-sm text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--primary)]" />
                    <span className="font-medium text-[var(--foreground)]">Sat, 14 Nov 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--primary)]" />
                    <span>2:30 PM (90 Minutes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[var(--primary)]" />
                    <span>Senior Stylist: Meera Kapoor</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2 pt-2 border-t border-[var(--border)]/60">
                <Button variant="default" size="sm" className="flex-1">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Cancel
                </Button>
              </CardFooter>
            </Card>

            {/* Revenue Card */}
            <Card className="flex flex-col justify-between shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
                    Monthly Salon Revenue
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px]">November</Badge>
                </div>
                <CardDescription>Target: ₹1,50,000</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-extrabold text-[var(--heading)] font-serif">
                  ₹1,38,500
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "Hair & Keratin Services", value: "₹68,200", pct: 49 },
                    { label: "Bridal & Skin Care", value: "₹48,800", pct: 35 },
                    { label: "Nails & Spa Adornment", value: "₹21,500", pct: 16 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-bold text-[var(--foreground)]">{item.value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--muted)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t border-[var(--border)]/60">
                <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                  +18% growth compared to last month
                </p>
              </CardFooter>
            </Card>

            {/* Service Package Card */}
            <Card className="relative overflow-hidden flex flex-col justify-between shadow-md border-2 border-[var(--accent)]/40">
              <div
                className="absolute top-0 right-0 h-28 w-28 rounded-bl-full opacity-15"
                style={{ background: "var(--accent)" }}
              />
              <CardHeader>
                <Badge variant="accent" className="w-fit mb-1 font-bold gap-1">
                  <Star className="h-3 w-3" /> Royale Exclusive
                </Badge>
                <CardTitle className="text-lg font-serif">Royal Bridal Package</CardTitle>
                <CardDescription>Complete HD makeup, bridal hair &amp; mehendi artistry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[var(--primary)] font-serif">₹14,999</span>
                  <span className="text-sm text-[var(--muted-foreground)] line-through">₹18,500</span>
                  <Badge variant="secondary" className="text-[10px] ml-auto">Save 19%</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
                  {["HD Airbrush Bridal Makeup", "Couture Hair Styling & Flowers", "Organic Mehendi Application", "Saree & Dupatta Draping"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                      <span className="text-[var(--foreground)] font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full shadow-md" size="lg">
                  <Scissors className="h-4 w-4" /> Book Royale Package
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* ── AVATARS ──────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Stylist &amp; Client Avatars</SectionHeading>
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm flex flex-wrap gap-6 items-end">
            <div className="space-y-1.5 text-center">
              <Avatar className="h-8 w-8 mx-auto ring-1 ring-[var(--accent)]">
                <AvatarFallback className="text-[10px]">SM</AvatarFallback>
              </Avatar>
              <p className="text-[10px] text-[var(--muted-foreground)]">Small (32px)</p>
            </div>
            <div className="space-y-1.5 text-center">
              <Avatar className="h-10 w-10 mx-auto ring-2 ring-[var(--accent)]">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <p className="text-[10px] text-[var(--muted-foreground)]">Default (40px)</p>
            </div>
            <div className="space-y-1.5 text-center">
              <Avatar className="h-14 w-14 mx-auto ring-2 ring-[var(--accent)]">
                <AvatarFallback className="text-lg font-serif">RS</AvatarFallback>
              </Avatar>
              <p className="text-[10px] text-[var(--muted-foreground)]">Large (56px)</p>
            </div>
            <div className="space-y-1.5 text-center">
              <Avatar className="h-20 w-20 mx-auto ring-4 ring-[var(--accent)]/40 shadow-lg">
                <AvatarFallback className="text-2xl font-serif">SH</AvatarFallback>
              </Avatar>
              <p className="text-[10px] text-[var(--muted-foreground)]">Hero (80px)</p>
            </div>

            {/* Salon Staff Roster */}
            <div className="ml-auto pl-4 border-l border-[var(--border)] space-y-2">
              <p className="text-xs font-semibold text-[var(--heading)]">Assigned Salon Specialists</p>
              <div className="flex -space-x-2.5 items-center">
                {["MK", "RJ", "SL", "AN", "PD"].map((initials) => (
                  <Avatar key={initials} className="h-10 w-10 ring-2 ring-[var(--card)] shadow-sm">
                    <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-[var(--card)] bg-[var(--accent)] text-[#520817] text-xs font-bold shadow-sm">
                  +4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ALERTS ───────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Alerts &amp; Notifications</SectionHeading>
          <div className="space-y-3 max-w-2xl">
            <Alert variant="primary" className="shadow-sm">
              <Crown className="h-4 w-4 text-[var(--primary)]" />
              <AlertTitle>Royal Gold Membership Active</AlertTitle>
              <AlertDescription>
                Client Radhika Singhania holds a Royal Gold Membership. Automatically applying 15% luxury discount on checkout.
              </AlertDescription>
            </Alert>
            <Alert variant="accent" className="shadow-sm">
              <Bell className="h-4 w-4 text-[var(--accent)]" />
              <AlertTitle>Upcoming Bridal Session in 30 Minutes</AlertTitle>
              <AlertDescription>
                Bridal suite #1 is prepped. Stylist Meera has arrived.
              </AlertDescription>
            </Alert>
            <Alert variant="muted" className="shadow-sm">
              <Info className="h-4 w-4" />
              <AlertTitle>Inventory Reorder Reminder</AlertTitle>
              <AlertDescription>
                Moroccan Argan Serum bottle count is at 4 units (threshold: 6).
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" className="shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Appointment Cancelled by Client</AlertTitle>
              <AlertDescription>
                The 5:00 PM slot for Hair Smoothening is now open for walk-ins.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* ── SAMPLE BOOKING FORM ─────────────────────────────────────────── */}
        <div className="space-y-4">
          <SectionHeading>Interactive Booking Form Demo</SectionHeading>
          <Card className="max-w-xl shadow-lg border-2 border-[var(--border)]">
            <CardHeader className="border-b border-[var(--border)]/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
                  <Scissors className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <div>
                  <CardTitle className="font-serif">New Salon Booking</CardTitle>
                  <CardDescription>Schedule walk-in or advance parlour appointment</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Client first name" defaultValue="Kavita" />
                <Input label="Last Name" placeholder="Client last name" defaultValue="Verma" />
              </div>
              <Input label="Contact Phone" type="tel" placeholder="+91 98765 43210" defaultValue="+91 98111 22334" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Booking Date" type="date" defaultValue="2026-11-20" />
                <Input label="Preferred Slot" type="time" defaultValue="14:00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--heading)]">Requested Service Categories</label>
                <div className="flex flex-wrap gap-2">
                  {["Hair Styling", "Skin Rituals", "Nail Studio", "Bridal HD", "SPA Therapy"].map((s, idx) => (
                    <Button
                      key={s}
                      variant={idx === 0 || idx === 3 ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-3 border-t border-[var(--border)]/60 pt-4">
              <Button className="flex-1 shadow-md" size="lg">
                <CheckCircle2 className="h-4 w-4" /> Confirm &amp; Reserve Slot
              </Button>
              <Button variant="ghost" size="lg">
                Clear
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] pt-8 pb-6 text-center space-y-2">
          <p className="text-sm font-semibold text-[var(--heading)] font-serif">
            Shringar — श्रृंगार Salon Design System
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Active Theme: <span className="font-bold text-[var(--foreground)]">{theme.name}</span> · {theme.tagline}
          </p>
        </footer>
      </div>
    </div>
  );
}
