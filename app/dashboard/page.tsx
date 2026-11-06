"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Crown,
  Scissors,
  Calendar,
  Clock,
  User as UserIcon,
  Shield,
  Plus,
  Trash2,
  Edit,
  Star,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Tag,
  TrendingUp,
  MapPin,
  Phone,
  Building2,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useShringar } from "@/lib/store";
import {
  Booking,
  BookingStatus,
  Offer,
  Salon,
  SalonType,
  Service,
  ServiceCategory,
  User,
  UserRole,
} from "@/lib/types";

export default function DashboardPage() {
  const {
    currentUser,
    salons,
    services,
    bookings,
    offers,
    users,
    rewardConfig,
    activeSalonId,
    setActiveSalonId,
    createSalon,
    updateSalon,
    deleteSalon,
    createService,
    updateService,
    deleteService,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    updateRewardsConfig,
    createOffer,
    toggleOfferActive,
    deleteOffer,
    updateUserRole,
    toggleUserStatus,
    updateUserPermissions,
  } = useShringar();

  // Active Salon for Owner / Admin view
  const currentSalon = salons.find((s) => s.id === activeSalonId) || salons[0] || null;

  // Active Tab per role
  const [ownerTab, setOwnerTab] = useState<"salons" | "services" | "bookings" | "rewards" | "offers">("salons");
  const [adminTab, setAdminTab] = useState<"overview" | "salons" | "services" | "bookings" | "users">("overview");

  /* ─────────────────────────────────────────────────────────────────────────
     MODAL STATES
     ───────────────────────────────────────────────────────────────────────── */
  // Salon modals
  const [isNewSalonOpen, setIsNewSalonOpen] = useState(false);
  const [newSalonData, setNewSalonData] = useState({
    name: "",
    type: "unisex" as SalonType,
    address: "",
    city: "Mumbai",
    phone: "",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    establishedYear: 2026,
  });

  const [editingSalon, setEditingSalon] = useState<Salon | null>(null);

  // Service modals
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    name: "",
    category: "Hair" as ServiceCategory,
    price: 1500,
    durationMinutes: 60,
    description: "",
  });

  // Booking modal (Owner creating walk-in, or Customer booking)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    salonId: activeSalonId,
    customerId: currentUser.id,
    customerName: currentUser.name,
    customerPhone: currentUser.phone || "+91 98765 43210",
    serviceId: services[0]?.id || "",
    stylistName: "Senior Stylist",
    date: "2026-11-20",
    time: "14:00",
  });

  // Offer modal
  const [isNewOfferOpen, setIsNewOfferOpen] = useState(false);
  const [newOfferData, setNewOfferData] = useState({
    code: "",
    title: "",
    discountPercent: 15,
    minBillAmount: 2000,
    validUntil: "2026-12-31",
    description: "",
  });

  // Rewards config form state (Owner / Admin)
  const [rewardsForm, setRewardsForm] = useState({
    earnRate: rewardConfig.earnRate,
    pointValueRupees: rewardConfig.pointValueRupees,
    minPointsToRedeem: rewardConfig.minPointsToRedeem,
  });
  const [rewardsSavedMsg, setRewardsSavedMsg] = useState(false);

  // User permissions modal (Admin)
  const [selectedUserForPerms, setSelectedUserForPerms] = useState<User | null>(null);

  /* ─────────────────────────────────────────────────────────────────────────
     HANDLERS
     ───────────────────────────────────────────────────────────────────────── */
  const handleCreateSalon = (e: React.FormEvent) => {
    e.preventDefault();
    createSalon(newSalonData);
    setIsNewSalonOpen(false);
    setNewSalonData({
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
    if (!editingSalon) return;
    updateSalon(editingSalon.id, editingSalon);
    setEditingSalon(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    createService({
      ...newServiceData,
      salonId: currentSalon?.id || salons[0].id,
    });
    setIsNewServiceOpen(false);
    setNewServiceData({
      name: "",
      category: "Hair",
      price: 1500,
      durationMinutes: 60,
      description: "",
    });
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenSalon = salons.find((s) => s.id === newBookingData.salonId) || salons[0];
    const chosenService = services.find((srv) => srv.id === newBookingData.serviceId) || services[0];

    createBooking({
      salonId: chosenSalon.id,
      salonName: chosenSalon.name,
      customerId: newBookingData.customerId,
      customerName: newBookingData.customerName,
      customerPhone: newBookingData.customerPhone,
      serviceId: chosenService?.id || "srv-default",
      serviceName: chosenService?.name || "Standard Ritual",
      stylistName: newBookingData.stylistName,
      date: newBookingData.date,
      time: newBookingData.time,
      price: chosenService?.price || 1500,
      status: "Confirmed",
    });

    setIsBookingModalOpen(false);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    createOffer({
      ...newOfferData,
      salonId: currentSalon?.id || salons[0].id,
      isActive: true,
    });
    setIsNewOfferOpen(false);
    setNewOfferData({
      code: "",
      title: "",
      discountPercent: 15,
      minBillAmount: 2000,
      validUntil: "2026-12-31",
      description: "",
    });
  };

  const handleSaveRewards = (e: React.FormEvent) => {
    e.preventDefault();
    updateRewardsConfig(rewardsForm);
    setRewardsSavedMsg(true);
    setTimeout(() => setRewardsSavedMsg(false), 3000);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     CUSTOMER SPECIFIC COMPUTED DATA
     ───────────────────────────────────────────────────────────────────────── */
  const customerBookings = bookings.filter(
    (b) => b.customerId === currentUser.id || b.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );
  const upcomingCustomerBookings = customerBookings.filter((b) => b.status === "Confirmed");
  const pastCustomerBookings = customerBookings.filter((b) => b.status === "Completed" || b.status === "Cancelled");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── TOP GREETING & ROLE CONTEXT BAR ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-[var(--accent)]/50 shadow-sm">
              <AvatarFallback className="text-lg font-serif font-bold text-[var(--primary)]">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[var(--heading)] font-serif">
                  Welcome, {currentUser.name}
                </h1>
                <Badge variant="accent" className="capitalize text-xs font-semibold">
                  {currentUser.role === "owner" ? "👑 Salon Owner" : currentUser.role === "admin" ? "🛡️ Platform Admin" : "👤 Valued Client"}
                </Badge>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                {currentUser.role === "owner"
                  ? "Multi-Salon management, client appointments, services & rewards."
                  : currentUser.role === "customer"
                  ? "Track rewards, view previous salon visits, and book appointments."
                  : "Platform-wide master oversight, user roles, and access permissions."}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {currentUser.role === "customer" && (
              <Button onClick={() => setIsBookingModalOpen(true)} className="gap-1.5 shadow-sm">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
            )}

            {(currentUser.role === "owner" || currentUser.role === "admin") && (
              <Button onClick={() => setIsNewSalonOpen(true)} variant="accent" className="gap-1.5 shadow-sm text-xs">
                <Plus className="h-4 w-4" />
                Add Salon
              </Button>
            )}

            {(currentUser.role === "owner" || currentUser.role === "admin") && (
              <Button onClick={() => setIsBookingModalOpen(true)} className="gap-1.5 shadow-sm text-xs">
                <Plus className="h-4 w-4" />
                Create Booking
              </Button>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 1: SALON OWNER DASHBOARD
            ═══════════════════════════════════════════════════════════════════ */}
        {currentUser.role === "owner" && (
          <div className="space-y-6">
            {/* Active Salon Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[var(--primary)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Managing Active Salon:
                </span>
                <select
                  value={activeSalonId}
                  onChange={(e) => setActiveSalonId(e.target.value)}
                  className="bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-1.5 text-xs font-bold text-[var(--heading)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  {salons.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.type}) — {s.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--muted-foreground)]">
                  Total Locations Managed: <strong className="text-[var(--foreground)]">{salons.length}</strong>
                </span>
              </div>
            </div>

            {/* Owner Navigation Sub-Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-3">
              {[
                { id: "salons", label: "My Salons", count: salons.length },
                { id: "services", label: "Services Catalog", count: services.filter((srv) => srv.salonId === currentSalon?.id).length },
                { id: "bookings", label: "Bookings & Walk-ins", count: bookings.filter((b) => b.salonId === currentSalon?.id).length },
                { id: "rewards", label: "Rewards System" },
                { id: "offers", label: "Promo Offers", count: offers.filter((o) => o.salonId === currentSalon?.id).length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setOwnerTab(tab.id as typeof ownerTab)}
                  className={`px-4 py-2 rounded-[var(--radius-md)] text-xs font-bold transition-all cursor-pointer border ${
                    ownerTab === tab.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm"
                      : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="ml-1.5 opacity-80 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* TAB: SALONS */}
            {ownerTab === "salons" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                    Managed Salons &amp; Studios
                  </h3>
                  <Button size="sm" onClick={() => setIsNewSalonOpen(true)} className="gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Create New Salon
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {salons.map((salon) => (
                    <Card
                      key={salon.id}
                      className={`overflow-hidden flex flex-col justify-between shadow-md ${
                        salon.id === activeSalonId ? "ring-2 ring-[var(--accent)]" : ""
                      }`}
                    >
                      <div className="relative h-44 w-full bg-zinc-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={salon.image} alt={salon.name} className="h-full w-full object-cover" />
                        <Badge variant="accent" className="absolute top-3 right-3 capitalize">
                          {salon.type}
                        </Badge>
                        {salon.id === activeSalonId && (
                          <div className="absolute top-3 left-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                            Active Workspace
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-serif">{salon.name}</CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                          {salon.address}, {salon.city}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-2 text-xs text-[var(--muted-foreground)]">
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                          {salon.phone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          {salon.rating} · ({salon.reviewCount} customer reviews)
                        </p>
                      </CardContent>

                      <CardFooter className="pt-2 border-t border-[var(--border)]/60 gap-2">
                        {salon.id !== activeSalonId && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setActiveSalonId(salon.id)}
                            className="flex-1 text-xs"
                          >
                            Set Active
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingSalon(salon)}
                          className="flex-1 text-xs gap-1"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteSalon(salon.id)}
                          className="px-2 text-xs"
                          title="Delete salon"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {ownerTab === "services" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                      Services Catalog ({currentSalon?.name})
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Manage price, duration, and categories for this salon location.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setIsNewServiceOpen(true)} className="gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Create Service
                  </Button>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3.5 font-bold">Service Name</th>
                          <th className="p-3.5 font-bold">Category</th>
                          <th className="p-3.5 font-bold">Duration</th>
                          <th className="p-3.5 font-bold">Price</th>
                          <th className="p-3.5 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]/60">
                        {services
                          .filter((srv) => srv.salonId === currentSalon?.id)
                          .map((srv) => (
                            <tr key={srv.id} className="hover:bg-[var(--background)]/50 transition-colors">
                              <td className="p-3.5 font-bold text-[var(--heading)]">
                                <div>{srv.name}</div>
                                <div className="text-[10px] text-[var(--muted-foreground)] font-normal line-clamp-1">
                                  {srv.description}
                                </div>
                              </td>
                              <td className="p-3.5">
                                <Badge variant="secondary" className="text-[10px]">
                                  {srv.category}
                                </Badge>
                              </td>
                              <td className="p-3.5 font-mono">{srv.durationMinutes} mins</td>
                              <td className="p-3.5 font-bold font-serif text-sm text-[var(--primary)]">
                                ₹{srv.price.toLocaleString("en-IN")}
                              </td>
                              <td className="p-3.5 text-right">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteService(srv.id)}
                                  className="h-7 px-2 text-[10px]"
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BOOKINGS */}
            {ownerTab === "bookings" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                      Appointment Bookings &amp; Walk-ins
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Schedule walk-in bookings and update client statuses.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setIsBookingModalOpen(true)} className="gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    New Booking
                  </Button>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3.5 font-bold">Client</th>
                          <th className="p-3.5 font-bold">Service</th>
                          <th className="p-3.5 font-bold">Stylist</th>
                          <th className="p-3.5 font-bold">Date &amp; Time</th>
                          <th className="p-3.5 font-bold">Price</th>
                          <th className="p-3.5 font-bold">Status</th>
                          <th className="p-3.5 font-bold text-right">Change Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]/60">
                        {bookings
                          .filter((b) => b.salonId === currentSalon?.id)
                          .map((b) => (
                            <tr key={b.id} className="hover:bg-[var(--background)]/50 transition-colors">
                              <td className="p-3.5 font-bold text-[var(--heading)]">
                                <div>{b.customerName}</div>
                                <div className="text-[10px] text-[var(--muted-foreground)] font-mono">
                                  {b.customerPhone}
                                </div>
                              </td>
                              <td className="p-3.5 font-medium">{b.serviceName}</td>
                              <td className="p-3.5">{b.stylistName}</td>
                              <td className="p-3.5 font-mono text-[11px]">
                                {b.date} · {b.time}
                              </td>
                              <td className="p-3.5 font-bold font-serif text-[var(--primary)]">
                                ₹{b.price.toLocaleString("en-IN")}
                              </td>
                              <td className="p-3.5">
                                <Badge
                                  variant={
                                    b.status === "Confirmed"
                                      ? "default"
                                      : b.status === "Completed"
                                      ? "accent"
                                      : "destructive"
                                  }
                                  className="text-[10px]"
                                >
                                  {b.status}
                                </Badge>
                              </td>
                              <td className="p-3.5 text-right space-x-1">
                                {b.status !== "Completed" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateBookingStatus(b.id, "Completed")}
                                    className="h-7 px-2 text-[10px]"
                                  >
                                    Mark Done
                                  </Button>
                                )}
                                {b.status !== "Cancelled" && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateBookingStatus(b.id, "Cancelled")}
                                    className="h-7 px-2 text-[10px] text-red-600"
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REWARDS */}
            {ownerTab === "rewards" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                    Loyalty Reward Points Configuration
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Customize how clients earn and redeem loyalty points at your salons.
                  </p>
                </div>

                <Card className="max-w-xl shadow-md border-2 border-[var(--border)]">
                  <form onSubmit={handleSaveRewards}>
                    <CardHeader>
                      <CardTitle className="text-base font-serif flex items-center gap-2">
                        <Gift className="h-4 w-4 text-[var(--accent)]" />
                        Edit Reward Policy
                      </CardTitle>
                      <CardDescription>
                        Clients earn points automatically upon booking completion.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {rewardsSavedMsg && (
                        <div className="p-3 rounded-[var(--radius-md)] bg-emerald-100 text-emerald-800 text-xs border border-emerald-300 flex items-center gap-1.5">
                          <Check className="h-4 w-4" />
                          Reward policy saved and updated across all branches!
                        </div>
                      )}

                      <Input
                        label="Points Earned per ₹100 Spent"
                        type="number"
                        min="1"
                        max="20"
                        value={rewardsForm.earnRate}
                        onChange={(e) => setRewardsForm({ ...rewardsForm, earnRate: Number(e.target.value) })}
                      />

                      <Input
                        label="Rupee Value of 1 Point (₹)"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="5"
                        value={rewardsForm.pointValueRupees}
                        onChange={(e) =>
                          setRewardsForm({ ...rewardsForm, pointValueRupees: Number(e.target.value) })
                        }
                      />

                      <Input
                        label="Minimum Points Required to Redeem"
                        type="number"
                        min="50"
                        step="50"
                        value={rewardsForm.minPointsToRedeem}
                        onChange={(e) =>
                          setRewardsForm({ ...rewardsForm, minPointsToRedeem: Number(e.target.value) })
                        }
                      />

                      <div className="p-3 rounded-[var(--radius-md)] bg-[var(--background)] text-xs text-[var(--muted-foreground)] space-y-1">
                        <p className="font-semibold text-[var(--foreground)]">Rule Preview:</p>
                        <p>
                          A ₹2,000 service earns <strong>{Math.floor((2000 / 100) * rewardsForm.earnRate)} Points</strong>.
                        </p>
                        <p>
                          100 points will give client <strong>₹{100 * rewardsForm.pointValueRupees}</strong> discount.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-[var(--border)]/60 pt-4">
                      <Button type="submit" className="w-full">
                        Save Reward Rules
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            )}

            {/* TAB: OFFERS */}
            {ownerTab === "offers" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                      Promotional Offers &amp; Coupons
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Create percentage discounts and festival voucher codes.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setIsNewOfferOpen(true)} className="gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Create Offer
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {offers
                    .filter((o) => o.salonId === currentSalon?.id)
                    .map((off) => (
                      <Card key={off.id} className="shadow-md flex flex-col justify-between">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="accent" className="font-mono font-bold tracking-wider">
                              {off.code}
                            </Badge>
                            <Badge variant={off.isActive ? "default" : "muted"} className="text-[10px]">
                              {off.isActive ? "Active" : "Paused"}
                            </Badge>
                          </div>
                          <CardTitle className="text-base font-serif mt-2">{off.title}</CardTitle>
                          <CardDescription className="text-xs">{off.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <p className="font-bold text-xl text-[var(--primary)] font-serif">
                            {off.discountPercent}% OFF
                          </p>
                          <p className="text-[var(--muted-foreground)]">
                            Min. Bill: ₹{off.minBillAmount.toLocaleString("en-IN")}
                          </p>
                          <p className="text-[var(--muted-foreground)]">Valid Until: {off.validUntil}</p>
                        </CardContent>
                        <CardFooter className="pt-2 border-t border-[var(--border)]/60 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleOfferActive(off.id)}
                            className="flex-1 text-xs"
                          >
                            {off.isActive ? "Pause" : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteOffer(off.id)}
                            className="h-8 px-2"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 2: CUSTOMER DASHBOARD
            ═══════════════════════════════════════════════════════════════════ */}
        {currentUser.role === "customer" && (
          <div className="space-y-10">
            {/* Loyalty Points & Tier Card */}
            <div className="rounded-[var(--radius-xl)] border-2 border-[var(--accent)]/40 bg-[var(--card)] p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md">
                  <Gift className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      Shringar Royale Rewards
                    </h2>
                    <Badge variant="accent" className="gap-1 text-[10px]">
                      <Crown className="h-3 w-3" /> Gold Tier Member
                    </Badge>
                  </div>
                  <p className="text-3xl font-extrabold text-[var(--heading)] font-serif mt-1">
                    {currentUser.rewardPoints || 0}{" "}
                    <span className="text-sm font-normal text-[var(--muted-foreground)] font-sans">
                      Reward Points
                    </span>
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    Worth approximately ₹{((currentUser.rewardPoints || 0) * rewardConfig.pointValueRupees).toFixed(0)} off your next parlour appointment.
                  </p>
                </div>
              </div>

              <Button onClick={() => setIsBookingModalOpen(true)} size="lg" className="gap-2 shadow-md">
                <Calendar className="h-4 w-4" />
                Book an Appointment
              </Button>
            </div>

            {/* Upcoming Appointments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-xl text-[var(--heading)]">
                  Upcoming Appointments
                </h3>
                <Button size="sm" variant="outline" onClick={() => setIsBookingModalOpen(true)} className="text-xs gap-1">
                  <Plus className="h-3.5 w-3.5" /> Book Another
                </Button>
              </div>

              {upcomingCustomerBookings.length === 0 ? (
                <div className="p-8 text-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] space-y-3">
                  <Calendar className="h-8 w-8 mx-auto text-[var(--muted-foreground)]" />
                  <p className="text-sm font-semibold text-[var(--heading)]">No upcoming appointments scheduled.</p>
                  <Button size="sm" onClick={() => setIsBookingModalOpen(true)}>
                    Schedule Now
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingCustomerBookings.map((bk) => (
                    <Card key={bk.id} className="shadow-md border-2 border-[var(--primary)]/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base font-serif">{bk.serviceName}</CardTitle>
                            <CardDescription className="text-xs font-semibold text-[var(--primary)]">
                              {bk.salonName}
                            </CardDescription>
                          </div>
                          <Badge variant="default">{bk.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs text-[var(--muted-foreground)]">
                        <p className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                          <Calendar className="h-3.5 w-3.5 text-[var(--primary)]" />
                          {bk.date} at {bk.time}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <UserIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
                          Assigned Stylist: {bk.stylistName}
                        </p>
                        <p className="flex items-center gap-1.5 font-bold font-serif text-sm text-[var(--primary)]">
                          ₹{bk.price.toLocaleString("en-IN")}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-2 border-t border-[var(--border)]/60 gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateBookingStatus(bk.id, "Cancelled")}
                          className="flex-1 text-xs"
                        >
                          Cancel Booking
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* PREVIOUS SERVICES & SALONS (Requested User Feature) */}
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-[var(--heading)]">
                  Previous Services &amp; Visited Salons
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Complete history of services received along with previous salon locations and earned points.
                </p>
              </div>

              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4 font-bold">Past Service</th>
                        <th className="p-4 font-bold">Salon Location Attended</th>
                        <th className="p-4 font-bold">Stylist</th>
                        <th className="p-4 font-bold">Date</th>
                        <th className="p-4 font-bold">Price Paid</th>
                        <th className="p-4 font-bold">Points Earned</th>
                        <th className="p-4 font-bold text-right">Quick Rebook</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]/60">
                      {pastCustomerBookings.map((past) => (
                        <tr key={past.id} className="hover:bg-[var(--background)]/50 transition-colors">
                          <td className="p-4 font-bold text-[var(--heading)] font-serif text-sm">
                            {past.serviceName}
                          </td>
                          <td className="p-4 font-semibold text-[var(--primary)]">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-[var(--accent)]" />
                              {past.salonName}
                            </div>
                          </td>
                          <td className="p-4 text-[var(--muted-foreground)]">{past.stylistName}</td>
                          <td className="p-4 font-mono text-[11px] text-[var(--muted-foreground)]">{past.date}</td>
                          <td className="p-4 font-bold font-serif text-[var(--heading)]">
                            ₹{past.price.toLocaleString("en-IN")}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">
                            +{past.pointsEarned || 50} pts
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setNewBookingData((prev) => ({
                                  ...prev,
                                  salonId: past.salonId,
                                  serviceId: past.serviceId,
                                }));
                                setIsBookingModalOpen(true);
                              }}
                              className="text-xs h-8"
                            >
                              Rebook
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Available Active Offers */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-[var(--heading)]">
                Available Salon Vouchers &amp; Offers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {offers
                  .filter((o) => o.isActive)
                  .map((off) => (
                    <Card key={off.id} className="border-2 border-[var(--accent)]/30 shadow-md">
                      <CardHeader className="pb-2">
                        <Badge variant="accent" className="font-mono w-fit font-bold">
                          {off.code}
                        </Badge>
                        <CardTitle className="text-base font-serif mt-2">{off.title}</CardTitle>
                        <CardDescription className="text-xs">{off.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 text-xs">
                        <p className="text-2xl font-extrabold text-[var(--primary)] font-serif">
                          {off.discountPercent}% OFF
                        </p>
                        <p className="text-[var(--muted-foreground)] mt-1">
                          Valid on bookings above ₹{off.minBillAmount}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 3: PLATFORM ADMIN DASHBOARD
            ═══════════════════════════════════════════════════════════════════ */}
        {currentUser.role === "admin" && (
          <div className="space-y-6">
            {/* Admin Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Total Platform Salons
                </p>
                <p className="text-3xl font-extrabold text-[var(--heading)] font-serif">{salons.length}</p>
                <p className="text-[11px] text-emerald-700">100% active locations</p>
              </div>

              <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Total Platform Services
                </p>
                <p className="text-3xl font-extrabold text-[var(--heading)] font-serif">{services.length}</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">Across 6 categories</p>
              </div>

              <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Registered Users
                </p>
                <p className="text-3xl font-extrabold text-[var(--heading)] font-serif">{users.length}</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">Owners, Clients, Admins</p>
              </div>

              <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Gross Platform Bookings
                </p>
                <p className="text-3xl font-extrabold text-[var(--primary)] font-serif">
                  ₹{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-emerald-700">{bookings.length} reservations logged</p>
              </div>
            </div>

            {/* Admin Sub-Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-3">
              {[
                { id: "overview", label: "Master Oversight" },
                { id: "users", label: "Users & Access Permissions", count: users.length },
                { id: "salons", label: "All Network Salons", count: salons.length },
                { id: "services", label: "All Platform Services", count: services.length },
                { id: "bookings", label: "Universal Bookings Log", count: bookings.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as typeof adminTab)}
                  className={`px-4 py-2 rounded-[var(--radius-md)] text-xs font-bold transition-all cursor-pointer border ${
                    adminTab === tab.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm"
                      : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="ml-1.5 opacity-80 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ADMIN TAB: USERS & PERMISSIONS (Requested User Feature) */}
            {(adminTab === "users" || adminTab === "overview") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                      User Management &amp; Access Permissions
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Change user roles, toggle account status (Active / Suspended), and manage system permissions.
                    </p>
                  </div>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-4 font-bold">User</th>
                          <th className="p-4 font-bold">Current Role</th>
                          <th className="p-4 font-bold">Account Access</th>
                          <th className="p-4 font-bold">Permissions</th>
                          <th className="p-4 font-bold text-right">Modify Access</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]/60">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-[var(--background)]/50 transition-colors">
                            <td className="p-4 font-bold text-[var(--heading)]">
                              <div>{u.name}</div>
                              <div className="text-[10px] text-[var(--muted-foreground)] font-mono">{u.email}</div>
                            </td>
                            <td className="p-4">
                              <select
                                value={u.role}
                                onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                                className="bg-[var(--background)] border border-[var(--border)] rounded px-2 py-1 text-xs font-bold capitalize text-[var(--heading)]"
                              >
                                <option value="customer">Customer</option>
                                <option value="owner">Salon Owner</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={u.status === "Active" ? "default" : "destructive"}
                                className="cursor-pointer text-[10px]"
                                onClick={() => toggleUserStatus(u.id)}
                                title="Click to toggle status"
                              >
                                {u.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {(u.permissions && u.permissions.length > 0) ? (
                                  u.permissions.map((p) => (
                                    <span
                                      key={p}
                                      className="text-[9px] bg-[var(--background)] border border-[var(--border)] px-1.5 py-0.5 rounded"
                                    >
                                      {p.replace("_", " ")}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-[var(--muted-foreground)]">Standard Member</span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-right space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUserForPerms(u)}
                                className="text-xs h-8"
                              >
                                Edit Rights
                              </Button>
                              <Button
                                size="sm"
                                variant={u.status === "Active" ? "ghost" : "default"}
                                onClick={() => toggleUserStatus(u.id)}
                                className="text-xs h-8"
                              >
                                {u.status === "Active" ? "Suspend" : "Activate"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN TAB: SALONS */}
            {adminTab === "salons" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                    All Platform Salons
                  </h3>
                  <Button size="sm" onClick={() => setIsNewSalonOpen(true)} className="gap-1 text-xs">
                    <Plus className="h-3.5 w-3.5" />
                    Add Platform Salon
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {salons.map((salon) => (
                    <Card key={salon.id} className="shadow-md flex flex-col justify-between">
                      <CardHeader>
                        <Badge variant="accent" className="w-fit capitalize">
                          {salon.type}
                        </Badge>
                        <CardTitle className="text-base font-serif mt-2">{salon.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {salon.address}, {salon.city}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2 border-t border-[var(--border)]/60 gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingSalon(salon)}
                          className="flex-1 text-xs"
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteSalon(salon.id)}
                          className="text-xs px-2"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN TAB: SERVICES */}
            {adminTab === "services" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                    All Services Across Network
                  </h3>
                </div>

                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5 font-bold">Service</th>
                        <th className="p-3.5 font-bold">Salon ID</th>
                        <th className="p-3.5 font-bold">Category</th>
                        <th className="p-3.5 font-bold">Price</th>
                        <th className="p-3.5 font-bold text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]/60">
                      {services.map((srv) => (
                        <tr key={srv.id} className="hover:bg-[var(--background)]/50">
                          <td className="p-3.5 font-bold text-[var(--heading)]">{srv.name}</td>
                          <td className="p-3.5 font-mono text-[10px] text-[var(--muted-foreground)]">{srv.salonId}</td>
                          <td className="p-3.5">{srv.category}</td>
                          <td className="p-3.5 font-bold font-serif text-[var(--primary)]">
                            ₹{srv.price.toLocaleString("en-IN")}
                          </td>
                          <td className="p-3.5 text-right">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteService(srv.id)}
                              className="h-7 px-2 text-[10px]"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN TAB: BOOKINGS */}
            {adminTab === "bookings" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[var(--heading)]">
                  Universal Bookings Ledger
                </h3>
                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5 font-bold">Client</th>
                        <th className="p-3.5 font-bold">Salon</th>
                        <th className="p-3.5 font-bold">Service</th>
                        <th className="p-3.5 font-bold">Date &amp; Time</th>
                        <th className="p-3.5 font-bold">Status</th>
                        <th className="p-3.5 font-bold text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]/60">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[var(--background)]/50">
                          <td className="p-3.5 font-bold">{b.customerName}</td>
                          <td className="p-3.5 text-[var(--primary)]">{b.salonName}</td>
                          <td className="p-3.5">{b.serviceName}</td>
                          <td className="p-3.5 font-mono text-[11px]">
                            {b.date} {b.time}
                          </td>
                          <td className="p-3.5">
                            <Badge variant={b.status === "Confirmed" ? "default" : "secondary"}>
                              {b.status}
                            </Badge>
                          </td>
                          <td className="p-3.5 text-right">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteBooking(b.id)}
                              className="h-7 px-2 text-[10px]"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 1: CREATE NEW SALON
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog
        isOpen={isNewSalonOpen}
        onClose={() => setIsNewSalonOpen(false)}
        title="Register New Salon or Branch"
        description="Add a new salon location to your portfolio."
      >
        <form onSubmit={handleCreateSalon} className="space-y-4">
          <Input
            label="Salon Name"
            required
            value={newSalonData.name}
            onChange={(e) => setNewSalonData({ ...newSalonData, name: e.target.value })}
            placeholder="e.g. Shringar Royale Spa — Versova"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">Salon Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(["unisex", "ladies", "men"] as SalonType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewSalonData({ ...newSalonData, type: t })}
                  className={`py-1.5 px-3 rounded-[var(--radius-sm)] text-xs font-bold border text-center transition-all cursor-pointer capitalize ${
                    newSalonData.type === t
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                      : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Street Address"
            required
            value={newSalonData.address}
            onChange={(e) => setNewSalonData({ ...newSalonData, address: e.target.value })}
            placeholder="Shop 4, Crystal Plaza"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              required
              value={newSalonData.city}
              onChange={(e) => setNewSalonData({ ...newSalonData, city: e.target.value })}
              placeholder="Mumbai"
            />
            <Input
              label="Phone Contact"
              required
              value={newSalonData.phone}
              onChange={(e) => setNewSalonData({ ...newSalonData, phone: e.target.value })}
              placeholder="+91 98200 12345"
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Create Salon
          </Button>
        </form>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 2: UPDATE SALON
          ───────────────────────────────────────────────────────────────────── */}
      {editingSalon && (
        <Dialog
          isOpen={true}
          onClose={() => setEditingSalon(null)}
          title={`Update: ${editingSalon.name}`}
          description="Modify details for this salon branch."
        >
          <form onSubmit={handleUpdateSalon} className="space-y-4">
            <Input
              label="Salon Name"
              required
              value={editingSalon.name}
              onChange={(e) => setEditingSalon({ ...editingSalon, name: e.target.value })}
            />
            <Input
              label="Address"
              required
              value={editingSalon.address}
              onChange={(e) => setEditingSalon({ ...editingSalon, address: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="City"
                required
                value={editingSalon.city}
                onChange={(e) => setEditingSalon({ ...editingSalon, city: e.target.value })}
              />
              <Input
                label="Phone"
                required
                value={editingSalon.phone}
                onChange={(e) => setEditingSalon({ ...editingSalon, phone: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Dialog>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 3: CREATE SERVICE
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog
        isOpen={isNewServiceOpen}
        onClose={() => setIsNewServiceOpen(false)}
        title="Add Service to Catalog"
        description={`Creating service under ${currentSalon?.name}`}
      >
        <form onSubmit={handleCreateService} className="space-y-4">
          <Input
            label="Service Title"
            required
            value={newServiceData.name}
            onChange={(e) => setNewServiceData({ ...newServiceData, name: e.target.value })}
            placeholder="e.g. 24K Gold Luxury Facial"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">Category</label>
            <select
              value={newServiceData.category}
              onChange={(e) => setNewServiceData({ ...newServiceData, category: e.target.value as ServiceCategory })}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-xs text-[var(--foreground)]"
            >
              <option value="Hair">Hair</option>
              <option value="Skin & Facial">Skin &amp; Facial</option>
              <option value="Nails & Art">Nails &amp; Art</option>
              <option value="Bridal & Festive">Bridal &amp; Festive</option>
              <option value="Spa & Wellness">Spa &amp; Wellness</option>
              <option value="Beard & Men's Grooming">Beard &amp; Men&apos;s Grooming</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price (₹)"
              type="number"
              required
              value={newServiceData.price}
              onChange={(e) => setNewServiceData({ ...newServiceData, price: Number(e.target.value) })}
            />
            <Input
              label="Duration (Minutes)"
              type="number"
              required
              value={newServiceData.durationMinutes}
              onChange={(e) => setNewServiceData({ ...newServiceData, durationMinutes: Number(e.target.value) })}
            />
          </div>

          <Input
            label="Description"
            value={newServiceData.description}
            onChange={(e) => setNewServiceData({ ...newServiceData, description: e.target.value })}
            placeholder="Brief description of the ritual and benefits"
          />

          <Button type="submit" className="w-full">
            Save Service
          </Button>
        </form>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 4: BOOK APPOINTMENT / CREATE BOOKING
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Schedule Salon Appointment"
        description="Select salon, service ritual, date, and preferred time slot."
      >
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">Select Salon</label>
            <select
              value={newBookingData.salonId}
              onChange={(e) => setNewBookingData({ ...newBookingData, salonId: e.target.value })}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-xs font-bold text-[var(--heading)]"
            >
              {salons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.type}) — {s.city}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">Select Service</label>
            <select
              value={newBookingData.serviceId}
              onChange={(e) => setNewBookingData({ ...newBookingData, serviceId: e.target.value })}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2 text-xs text-[var(--foreground)]"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} — ₹{srv.price} ({srv.durationMinutes} mins)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Client Name"
              required
              value={newBookingData.customerName}
              onChange={(e) => setNewBookingData({ ...newBookingData, customerName: e.target.value })}
            />
            <Input
              label="Phone Number"
              required
              value={newBookingData.customerPhone}
              onChange={(e) => setNewBookingData({ ...newBookingData, customerPhone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              required
              value={newBookingData.date}
              onChange={(e) => setNewBookingData({ ...newBookingData, date: e.target.value })}
            />
            <Input
              label="Time"
              type="time"
              required
              value={newBookingData.time}
              onChange={(e) => setNewBookingData({ ...newBookingData, time: e.target.value })}
            />
          </div>

          <Input
            label="Preferred Stylist"
            value={newBookingData.stylistName}
            onChange={(e) => setNewBookingData({ ...newBookingData, stylistName: e.target.value })}
            placeholder="e.g. Meera Kapoor or Senior Stylist"
          />

          <Button type="submit" className="w-full">
            Confirm &amp; Reserve Appointment
          </Button>
        </form>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 5: CREATE PROMO OFFER
          ───────────────────────────────────────────────────────────────────── */}
      <Dialog
        isOpen={isNewOfferOpen}
        onClose={() => setIsNewOfferOpen(false)}
        title="Create Promotional Coupon"
        description="Add a discount voucher for your clients."
      >
        <form onSubmit={handleCreateOffer} className="space-y-4">
          <Input
            label="Coupon Code (e.g. FESTIVE25)"
            required
            value={newOfferData.code}
            onChange={(e) => setNewOfferData({ ...newOfferData, code: e.target.value.toUpperCase() })}
            placeholder="ROYALE15"
          />
          <Input
            label="Offer Title"
            required
            value={newOfferData.title}
            onChange={(e) => setNewOfferData({ ...newOfferData, title: e.target.value })}
            placeholder="Special Festive Hair & Spa Privilege"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Discount Percent (%)"
              type="number"
              min="5"
              max="70"
              required
              value={newOfferData.discountPercent}
              onChange={(e) => setNewOfferData({ ...newOfferData, discountPercent: Number(e.target.value) })}
            />
            <Input
              label="Minimum Bill (₹)"
              type="number"
              min="500"
              required
              value={newOfferData.minBillAmount}
              onChange={(e) => setNewOfferData({ ...newOfferData, minBillAmount: Number(e.target.value) })}
            />
          </div>
          <Input
            label="Valid Until"
            type="date"
            required
            value={newOfferData.validUntil}
            onChange={(e) => setNewOfferData({ ...newOfferData, validUntil: e.target.value })}
          />
          <Input
            label="Description"
            value={newOfferData.description}
            onChange={(e) => setNewOfferData({ ...newOfferData, description: e.target.value })}
            placeholder="Short details on applicability"
          />
          <Button type="submit" className="w-full">
            Create Offer
          </Button>
        </form>
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          MODAL 6: USER PERMISSIONS (ADMIN)
          ───────────────────────────────────────────────────────────────────── */}
      {selectedUserForPerms && (
        <Dialog
          isOpen={true}
          onClose={() => setSelectedUserForPerms(null)}
          title={`User Rights: ${selectedUserForPerms.name}`}
          description={`Configure granular system access rights for ${selectedUserForPerms.email}`}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                { id: "manage_salons", label: "Manage Salon Locations (Add/Update/Delete)" },
                { id: "manage_finances", label: "View Financials & Revenue Analytics" },
                { id: "manage_users", label: "Modify User Roles & Credentials" },
                { id: "edit_services", label: "Create & Edit Service Pricing" },
                { id: "delete_records", label: "Permission to Delete Global Records" },
              ].map((perm) => {
                const currentPerms = selectedUserForPerms.permissions || [];
                const hasPerm = currentPerms.includes(perm.id);
                return (
                  <label
                    key={perm.id}
                    className="flex items-center gap-2 p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={hasPerm}
                      onChange={() => {
                        const updated = hasPerm
                          ? currentPerms.filter((p) => p !== perm.id)
                          : [...currentPerms, perm.id];
                        updateUserPermissions(selectedUserForPerms.id, updated);
                        setSelectedUserForPerms({
                          ...selectedUserForPerms,
                          permissions: updated,
                        });
                      }}
                      className="rounded border-[var(--border)] text-[var(--primary)]"
                    />
                    <span className="font-medium text-[var(--foreground)]">{perm.label}</span>
                  </label>
                );
              })}
            </div>

            <Button onClick={() => setSelectedUserForPerms(null)} className="w-full">
              Done
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
