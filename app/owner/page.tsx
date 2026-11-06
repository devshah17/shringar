"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Crown,
  Scissors,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit,
  Star,
  CheckCircle2,
  Gift,
  Tag,
  TrendingUp,
  MapPin,
  Phone,
  Building2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import {
  Salon,
  SalonType,
  Service,
  ServiceCategory,
  BookingStatus,
  Offer,
} from "@/lib/types";

export default function OwnerDashboardPage() {
  const {
    currentUser,
    salons,
    activeSalonId,
    setActiveSalonId,
    createSalon,
    updateSalon,
    deleteSalon,
    services,
    createService,
    updateService,
    deleteService,
    bookings,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    offers,
    createOffer,
    toggleOfferActive,
    deleteOffer,
    rewardConfig,
    updateRewardsConfig,
  } = useShringar();

  const activeSalon = salons.find((s) => s.id === activeSalonId) || salons[0];
  const salonServices = services.filter((s) => s.salonId === activeSalon?.id);
  const salonBookings = bookings.filter((b) => b.salonId === activeSalon?.id);
  const salonOffers = offers.filter((o) => o.salonId === activeSalon?.id);

  // Modal Dialogs
  const [isCreateSalonOpen, setIsCreateSalonOpen] = useState(false);
  const [isEditSalonOpen, setIsEditSalonOpen] = useState(false);
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);

  // Form states
  const [newSalonForm, setNewSalonForm] = useState({
    name: "",
    type: "unisex" as SalonType,
    address: "",
    city: "Mumbai",
    phone: "",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    establishedYear: 2026,
  });

  const [editSalonForm, setEditSalonForm] = useState({
    name: activeSalon?.name || "",
    type: activeSalon?.type || ("unisex" as SalonType),
    address: activeSalon?.address || "",
    city: activeSalon?.city || "Mumbai",
    phone: activeSalon?.phone || "",
  });

  const [serviceForm, setServiceForm] = useState({
    name: "",
    category: "Hair" as ServiceCategory,
    price: 1500,
    durationMinutes: 45,
    description: "",
  });

  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    serviceId: salonServices[0]?.id || "",
    stylistName: "Meera Kapoor",
    date: "2026-11-20",
    time: "14:00",
  });

  const [offerForm, setOfferForm] = useState({
    code: "",
    title: "",
    discountPercent: 15,
    minBillAmount: 2000,
    validUntil: "2026-12-31",
    description: "",
  });

  const [rewardsRate, setRewardsRate] = useState(rewardConfig.earnRate);
  const [rewardsVal, setRewardsVal] = useState(rewardConfig.pointValueRupees);
  const [rewardsMin, setRewardsMin] = useState(rewardConfig.minPointsToRedeem);
  const [rewardsSaved, setRewardsSaved] = useState(false);

  // Handlers
  const handleCreateSalon = (e: React.FormEvent) => {
    e.preventDefault();
    createSalon(newSalonForm);
    setIsCreateSalonOpen(false);
    setNewSalonForm({
      name: "",
      type: "unisex",
      address: "",
      city: "Mumbai",
      phone: "",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      establishedYear: 2026,
    });
  };

  const handleUpdateSalon = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSalon) {
      updateSalon(activeSalon.id, editSalonForm);
      setIsEditSalonOpen(false);
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSalon) return;
    createService({
      ...serviceForm,
      salonId: activeSalon.id,
      popular: true,
    });
    setIsCreateServiceOpen(false);
    setServiceForm({
      name: "",
      category: "Hair",
      price: 1500,
      durationMinutes: 45,
      description: "",
    });
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSalon) return;
    const selectedSrv = salonServices.find((s) => s.id === bookingForm.serviceId) || salonServices[0];
    createBooking({
      salonId: activeSalon.id,
      salonName: activeSalon.name,
      customerId: `walkin-${Date.now()}`,
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      serviceId: selectedSrv ? selectedSrv.id : "srv-gen",
      serviceName: selectedSrv ? selectedSrv.name : "Custom Treatment",
      stylistName: bookingForm.stylistName,
      date: bookingForm.date,
      time: bookingForm.time,
      price: selectedSrv ? selectedSrv.price : 1500,
      status: "Confirmed",
    });
    setIsCreateBookingOpen(false);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSalon) return;
    createOffer({
      ...offerForm,
      salonId: activeSalon.id,
      isActive: true,
    });
    setIsCreateOfferOpen(false);
  };

  const handleSaveRewards = () => {
    updateRewardsConfig({
      earnRate: Number(rewardsRate),
      pointValueRupees: Number(rewardsVal),
      minPointsToRedeem: Number(rewardsMin),
    });
    setRewardsSaved(true);
    setTimeout(() => setRewardsSaved(false), 2500);
  };

  const totalEstRevenue = salonBookings
    .filter((b) => b.status === "Confirmed" || b.status === "Completed")
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Multi-Salon Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[var(--accent)] font-semibold">
              Proprietor Management Console
            </span>
            <Badge variant="accent" className="capitalize text-[10px]">
              {activeSalon?.type} Studio
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[var(--headings)] mt-1">
            {activeSalon?.name || "Shringar Studio"}
          </h1>
          <p className="text-xs text-[var(--body-text)] flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3 text-[var(--accent)]" />
            {activeSalon?.address}, {activeSalon?.city} • Phone: {activeSalon?.phone}
          </p>
        </div>

        {/* Salon Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (activeSalon) {
                setEditSalonForm({
                  name: activeSalon.name,
                  type: activeSalon.type,
                  address: activeSalon.address,
                  city: activeSalon.city,
                  phone: activeSalon.phone,
                });
              }
              setIsEditSalonOpen(true);
            }}
            className="text-xs gap-1.5"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit Branch Details
          </Button>

          <Button
            size="sm"
            variant="accent"
            onClick={() => setIsCreateSalonOpen(true)}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            + Add New Branch
          </Button>

          {salons.length > 1 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${activeSalon?.name}?`)) {
                  deleteSalon(activeSalon.id);
                }
              }}
              className="text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-800"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-xs">
          <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75">
            Today&apos;s Bookings
          </span>
          <p className="text-2xl font-bold font-serif text-[var(--headings)] mt-1">
            {salonBookings.filter((b) => b.status === "Confirmed").length}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">Confirmed slots</span>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-xs">
          <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75">
            Branch Revenue (Est.)
          </span>
          <p className="text-2xl font-bold font-serif text-[var(--primary)] mt-1">
            ₹{totalEstRevenue.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-[var(--body-text)]">Across all bookings</span>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-xs">
          <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75">
            Active Services Menu
          </span>
          <p className="text-2xl font-bold font-serif text-[var(--headings)] mt-1">
            {salonServices.length}
          </p>
          <span className="text-[11px] text-[var(--body-text)]">Treatments offered</span>
        </div>

        <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] shadow-xs">
          <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75">
            Client Rating
          </span>
          <p className="text-2xl font-bold font-serif text-[var(--headings)] mt-1 flex items-center gap-1">
            <Star className="h-5 w-5 fill-[var(--accent)] text-[var(--accent)]" />
            {activeSalon?.rating || 4.9}
          </p>
          <span className="text-[11px] text-[var(--body-text)]">
            Based on {activeSalon?.reviewCount || 0} reviews
          </span>
        </div>
      </div>

      {/* ── SALES & SERVICE PERFORMANCE ANALYTICS ─────────────────────── */}
      <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="text-lg font-bold font-serif text-[var(--headings)]">
                Sales &amp; Service Performance Analytics
              </h2>
              <Badge variant="accent" className="text-[10px]">Digitized Insights</Badge>
            </div>
            <p className="text-xs text-[var(--body-text)]">
              Real-time analysis of your treatments, service popularity, and revenue performance.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-[var(--body-text)] opacity-75">
              Avg. Ticket: <strong className="text-[var(--primary)] font-serif text-sm">₹{Math.round(totalEstRevenue / Math.max(1, salonBookings.length))}</strong>
            </span>
          </div>
        </div>

        {/* Analytics Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Revenue Treatments */}
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--headings)] opacity-80">
              Treatment Sales Breakdown
            </h3>
            <div className="space-y-2">
              {salonServices.slice(0, 4).map((srv) => {
                const srvBookings = salonBookings.filter((b) => b.serviceId === srv.id);
                const srvRevenue = srvBookings.reduce((sum, b) => sum + b.price, 0);
                const pct = totalEstRevenue > 0 ? Math.round((srvRevenue / totalEstRevenue) * 100) : 0;
                return (
                  <div key={srv.id} className="space-y-1 bg-[var(--background)]/50 p-2.5 rounded-lg border border-[var(--border)]/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--headings)]">{srv.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[var(--body-text)] opacity-75">{srvBookings.length} bookings</span>
                        <span className="font-bold text-[var(--primary)] font-serif">₹{srvRevenue.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] font-mono text-[var(--accent)]">({pct}%)</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Digitization & Retention Health */}
          <div className="bg-gradient-to-br from-[#520817] to-[#741B32] text-white p-5 rounded-xl border border-[var(--accent)]/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent)] block">
                Platform Health Score
              </span>
              <p className="text-xl font-bold font-serif">100% Digitized Studio</p>
              <ul className="text-xs space-y-1.5 text-white/85">
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>Online client booking live</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>Royale loyalty rewards connected</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>Sales &amp; services tracking active</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-white/15 pt-2 text-[10px] text-white/70 font-mono">
              Empowered by Shringar Platform
            </div>
          </div>
        </div>
      </section>

      {/* Services Catalog Section */}
      <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-[var(--headings)] flex items-center gap-2">
              <Scissors className="h-4 w-4 text-[var(--accent)]" />
              Service &amp; Treatment Catalog ({salonServices.length})
            </h2>
            <p className="text-xs text-[var(--body-text)]">
              Manage treatments, prices in ₹, and session duration for {activeSalon?.name}.
            </p>
          </div>
          <Button
            size="sm"
            variant="accent"
            onClick={() => setIsCreateServiceOpen(true)}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            + Add New Service
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salonServices.map((srv) => (
            <div
              key={srv.id}
              className="p-3.5 rounded-xl border border-[var(--border)]/70 hover:border-[var(--accent)] transition-colors flex flex-col justify-between space-y-2 bg-[var(--background)]/40"
            >
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold font-serif text-[var(--headings)]">
                    {srv.name}
                  </h3>
                  <Badge variant="accent" className="text-[9px] shrink-0">
                    {srv.category}
                  </Badge>
                </div>
                <p className="text-[11px] text-[var(--body-text)] line-clamp-2">
                  {srv.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/40 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[var(--primary)] font-serif">
                    ₹{srv.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-[var(--body-text)] opacity-75">
                    {srv.durationMinutes}m
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteService(srv.id)}
                  className="h-6 w-6 p-0 text-rose-600 hover:bg-rose-50"
                  title="Delete treatment"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings & Walk-ins Section */}
      <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-[var(--headings)] flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--accent)]" />
              Appointment Bookings &amp; Walk-ins ({salonBookings.length})
            </h2>
            <p className="text-xs text-[var(--body-text)]">
              Schedule in-store walk-ins, assign stylists, and manage booking statuses.
            </p>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsCreateBookingOpen(true)}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            + New Walk-in / Booking
          </Button>
        </div>

        {salonBookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--body-text)] border border-dashed border-[var(--border)] rounded-xl">
            No bookings scheduled for this branch yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--border)]/30 border-b border-[var(--border)] font-semibold text-[var(--headings)]">
                <tr>
                  <th className="p-2.5">Client Name</th>
                  <th className="p-2.5">Contact</th>
                  <th className="p-2.5">Treatment</th>
                  <th className="p-2.5">Date &amp; Time</th>
                  <th className="p-2.5">Stylist</th>
                  <th className="p-2.5">Amount</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60 text-[var(--body-text)]">
                {salonBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[var(--border)]/20 transition-colors">
                    <td className="p-2.5 font-bold text-[var(--headings)]">{b.customerName}</td>
                    <td className="p-2.5 font-mono">{b.customerPhone}</td>
                    <td className="p-2.5 font-medium">{b.serviceName}</td>
                    <td className="p-2.5 font-mono">
                      {b.date} • {b.time}
                    </td>
                    <td className="p-2.5">{b.stylistName}</td>
                    <td className="p-2.5 font-bold text-[var(--primary)] font-serif">
                      ₹{b.price}
                    </td>
                    <td className="p-2.5">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          updateBookingStatus(b.id, e.target.value as BookingStatus)
                        }
                        className={`text-[11px] rounded px-2 py-0.5 font-semibold cursor-pointer border ${
                          b.status === "Confirmed"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : b.status === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-rose-50 text-rose-800 border-rose-300"
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2.5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteBooking(b.id)}
                        className="h-6 w-6 p-0 text-rose-600 hover:bg-rose-50"
                        title="Delete booking"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Rewards Policy & Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loyalty Policy Config */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
            <Gift className="h-4 w-4 text-[var(--accent)]" />
            <div>
              <h2 className="text-base font-bold font-serif text-[var(--headings)]">
                Loyalty Rewards Policy
              </h2>
              <p className="text-[11px] text-[var(--body-text)]">
                Define how client reward points are earned and redeemed.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Points Earned per ₹100 spent
              </label>
              <Input
                type="number"
                value={rewardsRate}
                onChange={(e) => setRewardsRate(Number(e.target.value))}
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Point Rupee Value (₹ per point)
              </label>
              <Input
                type="number"
                step="0.1"
                value={rewardsVal}
                onChange={(e) => setRewardsVal(Number(e.target.value))}
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--headings)]">
                Minimum Points to Redeem
              </label>
              <Input
                type="number"
                value={rewardsMin}
                onChange={(e) => setRewardsMin(Number(e.target.value))}
                className="text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {rewardsSaved && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Policy updated!
                </span>
              )}
              <Button
                size="sm"
                variant="primary"
                onClick={handleSaveRewards}
                className="text-xs ml-auto shadow-sm"
              >
                Save Rewards Policy
              </Button>
            </div>
          </div>
        </div>

        {/* Promotional Offers */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-[var(--accent)]" />
              <div>
                <h2 className="text-base font-bold font-serif text-[var(--headings)]">
                  Promotional Coupons &amp; Offers
                </h2>
                <p className="text-[11px] text-[var(--body-text)]">
                  Active discounts for {activeSalon?.name}.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="accent"
              onClick={() => setIsCreateOfferOpen(true)}
              className="text-xs gap-1"
            >
              <Plus className="h-3 w-3" />
              + Offer
            </Button>
          </div>

          <div className="space-y-2">
            {salonOffers.length === 0 ? (
              <p className="text-xs text-[var(--body-text)] py-4 text-center">
                No active promotional offers for this branch.
              </p>
            ) : (
              salonOffers.map((off) => (
                <div
                  key={off.id}
                  className="p-3 rounded-xl border border-[var(--border)] flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[var(--primary)] bg-[var(--accent)]/15 px-1.5 py-0.5 rounded">
                        {off.code}
                      </span>
                      <span className="font-semibold text-[var(--headings)]">{off.title}</span>
                    </div>
                    <p className="text-[10px] text-[var(--body-text)] opacity-75 mt-0.5">
                      {off.discountPercent}% OFF • Min bill ₹{off.minBillAmount} • Valid till {off.validUntil}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleOfferActive(off.id)}
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer ${
                        off.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {off.isActive ? "Active" : "Paused"}
                    </button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteOffer(off.id)}
                      className="h-6 w-6 p-0 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CREATE SALON MODAL */}
      <Dialog
        isOpen={isCreateSalonOpen}
        onClose={() => setIsCreateSalonOpen(false)}
        title="Add New Salon / Parlour Branch"
      >
        <form onSubmit={handleCreateSalon} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Salon Name</label>
            <Input
              required
              value={newSalonForm.name}
              onChange={(e) => setNewSalonForm({ ...newSalonForm, name: e.target.value })}
              placeholder="e.g. Shringar Royale — South Mumbai"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Studio Category</label>
            <select
              value={newSalonForm.type}
              onChange={(e) =>
                setNewSalonForm({ ...newSalonForm, type: e.target.value as SalonType })
              }
              className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
            >
              <option value="unisex">Unisex Salon &amp; Spa</option>
              <option value="ladies">Ladies Parlour &amp; Bridal</option>
              <option value="men">Men&apos;s Grooming Lounge</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">City</label>
              <Input
                value={newSalonForm.city}
                onChange={(e) => setNewSalonForm({ ...newSalonForm, city: e.target.value })}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Phone</label>
              <Input
                value={newSalonForm.phone}
                onChange={(e) => setNewSalonForm({ ...newSalonForm, phone: e.target.value })}
                placeholder="+91 98200 00000"
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Street Address</label>
            <Input
              required
              value={newSalonForm.address}
              onChange={(e) => setNewSalonForm({ ...newSalonForm, address: e.target.value })}
              placeholder="e.g. Linking Road, Bandra West"
              className="text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsCreateSalonOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Branch
            </Button>
          </div>
        </form>
      </Dialog>

      {/* EDIT SALON MODAL */}
      <Dialog
        isOpen={isEditSalonOpen}
        onClose={() => setIsEditSalonOpen(false)}
        title="Edit Branch Details"
      >
        <form onSubmit={handleUpdateSalon} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Salon Name</label>
            <Input
              required
              value={editSalonForm.name}
              onChange={(e) => setEditSalonForm({ ...editSalonForm, name: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Studio Category</label>
            <select
              value={editSalonForm.type}
              onChange={(e) =>
                setEditSalonForm({ ...editSalonForm, type: e.target.value as SalonType })
              }
              className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
            >
              <option value="unisex">Unisex Salon &amp; Spa</option>
              <option value="ladies">Ladies Parlour &amp; Bridal</option>
              <option value="men">Men&apos;s Grooming Lounge</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">City</label>
              <Input
                value={editSalonForm.city}
                onChange={(e) => setEditSalonForm({ ...editSalonForm, city: e.target.value })}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Phone</label>
              <Input
                value={editSalonForm.phone}
                onChange={(e) => setEditSalonForm({ ...editSalonForm, phone: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Address</label>
            <Input
              value={editSalonForm.address}
              onChange={(e) => setEditSalonForm({ ...editSalonForm, address: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsEditSalonOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog>

      {/* CREATE SERVICE MODAL */}
      <Dialog
        isOpen={isCreateServiceOpen}
        onClose={() => setIsCreateServiceOpen(false)}
        title="Add New Treatment to Catalog"
      >
        <form onSubmit={handleCreateService} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Treatment Name</label>
            <Input
              required
              value={serviceForm.name}
              onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
              placeholder="e.g. Keratin Smooth Therapy"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Category</label>
            <select
              value={serviceForm.category}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })
              }
              className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
            >
              <option value="Hair">Hair</option>
              <option value="Skin & Facial">Skin &amp; Facial</option>
              <option value="Nails & Art">Nails &amp; Art</option>
              <option value="Bridal & Festive">Bridal &amp; Festive</option>
              <option value="Spa & Wellness">Spa &amp; Wellness</option>
              <option value="Beard & Men's Grooming">Beard &amp; Men&apos;s Grooming</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Price (₹)</label>
              <Input
                type="number"
                required
                value={serviceForm.price}
                onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Duration (mins)</label>
              <Input
                type="number"
                required
                value={serviceForm.durationMinutes}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, durationMinutes: Number(e.target.value) })
                }
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Description</label>
            <Input
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              placeholder="Brief details about the service"
              className="text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsCreateServiceOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Service
            </Button>
          </div>
        </form>
      </Dialog>

      {/* CREATE BOOKING MODAL */}
      <Dialog
        isOpen={isCreateBookingOpen}
        onClose={() => setIsCreateBookingOpen(false)}
        title="Schedule Walk-in / Phone Reservation"
      >
        <form onSubmit={handleCreateBooking} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Customer Name</label>
            <Input
              required
              value={bookingForm.customerName}
              onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
              placeholder="e.g. Radhika Sharma"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Phone Number</label>
            <Input
              required
              value={bookingForm.customerPhone}
              onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
              placeholder="+91 98200 00000"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Select Treatment</label>
            <select
              value={bookingForm.serviceId}
              onChange={(e) => setBookingForm({ ...bookingForm, serviceId: e.target.value })}
              className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
            >
              {salonServices.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} (₹{srv.price})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Date</label>
              <Input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Time</label>
              <Input
                type="time"
                required
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsCreateBookingOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm Walk-in
            </Button>
          </div>
        </form>
      </Dialog>

      {/* CREATE OFFER MODAL */}
      <Dialog
        isOpen={isCreateOfferOpen}
        onClose={() => setIsCreateOfferOpen(false)}
        title="Create Promotional Coupon"
      >
        <form onSubmit={handleCreateOffer} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Coupon Code</label>
              <Input
                required
                value={offerForm.code}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })
                }
                placeholder="e.g. FESTIVE20"
                className="text-xs uppercase font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Discount (%)</label>
              <Input
                type="number"
                required
                value={offerForm.discountPercent}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, discountPercent: Number(e.target.value) })
                }
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Offer Title</label>
            <Input
              required
              value={offerForm.title}
              onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
              placeholder="e.g. Festive Glow Special"
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Min Bill (₹)</label>
              <Input
                type="number"
                value={offerForm.minBillAmount}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, minBillAmount: Number(e.target.value) })
                }
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Valid Until</label>
              <Input
                type="date"
                required
                value={offerForm.validUntil}
                onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsCreateOfferOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Publish Coupon
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
