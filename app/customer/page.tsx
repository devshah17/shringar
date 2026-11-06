"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Gift,
  ArrowRight,
  Filter,
  Search,
  Phone,
  Tag,
  Building2,
} from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Salon, SalonType, Service } from "@/lib/types";

export default function CustomerHomePage() {
  const { salons, services, currentUser, offers, createBooking } = useShringar();

  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingSalonId, setBookingSalonId] = useState<string>(salons[0]?.id || "salon-1");
  const [bookingServiceId, setBookingServiceId] = useState<string>(services[0]?.id || "srv-1");
  const [bookingDate, setBookingDate] = useState<string>("2026-11-20");
  const [bookingTime, setBookingTime] = useState<string>("14:00");
  const [bookingStylist, setBookingStylist] = useState<string>("Senior Stylist");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Filtered Salons
  const filteredSalons = salons.filter((s) => {
    const matchesType = selectedType === "all" || s.type === selectedType;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const selectedSalon = salons.find((s) => s.id === bookingSalonId) || salons[0];
  const salonServices = services.filter((srv) => srv.salonId === bookingSalonId);
  const selectedService = services.find((s) => s.id === bookingServiceId) || salonServices[0];

  const handleOpenBooking = (salonId?: string, serviceId?: string) => {
    if (salonId) setBookingSalonId(salonId);
    if (serviceId) setBookingServiceId(serviceId);
    setBookingSuccess(false);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedSalon || !selectedService) return;
    createBooking({
      salonId: selectedSalon.id,
      salonName: selectedSalon.name,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone || "+91 98201 00000",
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      stylistName: bookingStylist,
      date: bookingDate,
      time: bookingTime,
      price: selectedService.price,
      status: "Confirmed",
    });
    setBookingSuccess(true);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Opulent Customer Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#520817] via-[#3b0710] to-[#24050b] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/50 shadow-md bg-[#520817]">
                <img
                  src="/logo.png"
                  alt="Shringar Logo"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-[var(--accent)] text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Royale 2 Luxury Grooming Network</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif leading-tight">
              India&apos;s Premier Salon Digitization &amp; Booking Network
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We bring top unisex parlours, women-only studios, and gentlemen grooming lounges into the digital era. Discover verified studios in Mumbai, reserve appointments online, and earn loyalty points on every visit.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                variant="accent"
                onClick={() => handleOpenBooking()}
                className="shadow-lg gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book an Appointment
              </Button>
              <Link href="/customer/bookings">
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 gap-2">
                  <Gift className="h-4 w-4 text-[var(--accent)]" />
                  My Rewards ({currentUser.rewardPoints ?? 480} Pts)
                </Button>
              </Link>
              <a href="/owner" className="inline-flex">
                <Button size="lg" variant="ghost" className="text-[var(--accent)] hover:text-white hover:bg-white/10 gap-1.5 border border-[var(--accent)]/40 text-xs">
                  <Building2 className="h-4 w-4" />
                  List Your Salon &amp; Analyze Sales →
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center">
              <p className="text-2xl font-bold font-serif text-[var(--accent)]">
                {salons.length}+
              </p>
              <p className="text-xs text-white/70">Luxury Studios</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center">
              <p className="text-2xl font-bold font-serif text-[var(--accent)]">
                {services.length}+
              </p>
              <p className="text-xs text-white/70">Curated Rituals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center">
              <p className="text-2xl font-bold font-serif text-[var(--accent)]">4.9 ★</p>
              <p className="text-xs text-white/70">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-center">
              <p className="text-2xl font-bold font-serif text-[var(--accent)]">5%</p>
              <p className="text-xs text-white/70">Loyalty Cashback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[var(--headings)]">
              Discover Premier Studios
            </h2>
            <p className="text-xs text-[var(--body-text)]">
              Choose from unisex parlours, women-only sanctuaries, and bespoke gentlemen lounges.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--body-text)] opacity-60" />
              <Input
                placeholder="Search studio or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs h-8 w-48"
              />
            </div>
            <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5 bg-[var(--card)] text-xs">
              {(["all", "unisex", "ladies", "men"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                    selectedType === type
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                      : "text-[var(--body-text)] hover:bg-[var(--border)]/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  className={`absolute top-3 left-3 capitalize text-xs shadow-md ${
                    salon.type === "ladies"
                      ? "bg-[#741B32] text-[#EED8B0]"
                      : salon.type === "men"
                      ? "bg-[#321019] text-[#EED8B0]"
                      : "bg-[#520817] text-white"
                  }`}
                >
                  {salon.type} Studio
                </Badge>
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" />
                  <span>{salon.rating}</span>
                  <span className="opacity-70 text-[10px]">({salon.reviewCount})</span>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base font-bold font-serif line-clamp-1">
                  {salon.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <MapPin className="h-3 w-3 text-[var(--accent)] shrink-0" />
                  <span className="truncate">{salon.address}, {salon.city}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[var(--body-text)]">
                  <Phone className="h-3 w-3 text-[var(--accent)]" />
                  <span>{salon.phone}</span>
                </div>

                {/* Popular Treatments at this Salon */}
                <div className="border-t border-[var(--border)] pt-2.5 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75">
                    Popular Treatments:
                  </span>
                  <div className="space-y-1">
                    {services
                      .filter((s) => s.salonId === salon.id)
                      .slice(0, 2)
                      .map((srv) => (
                        <div key={srv.id} className="flex items-center justify-between text-xs">
                          <span className="truncate pr-2">{srv.name}</span>
                          <span className="font-bold text-[var(--primary)] shrink-0">
                            ₹{srv.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 border-t border-[var(--border)] mt-auto flex items-center justify-between gap-2">
                <span className="text-[11px] text-[var(--body-text)]">
                  Est. {salon.establishedYear}
                </span>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleOpenBooking(salon.id)}
                  className="gap-1.5 text-xs"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Signature Services Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="text-2xl font-bold font-serif text-[var(--headings)]">
            Signature Beauty &amp; Grooming Menu
          </h2>
          <p className="text-xs text-[var(--body-text)]">
            Transparent pricing, skilled stylists, and genuine organic care products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const salon = salons.find((s) => s.id === service.salonId);
            return (
              <div
                key={service.id}
                className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)] flex flex-col justify-between hover:border-[var(--accent)] transition-colors shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold font-serif text-[var(--headings)]">
                      {service.name}
                    </h3>
                    <Badge variant="accent" className="text-[10px] shrink-0">
                      {service.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--body-text)] line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-[10px] text-[var(--body-text)] opacity-80 flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5 text-[var(--accent)]" />
                    Available at: {salon?.name || "All Branches"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border)]/60">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-[var(--primary)] font-serif">
                      ₹{service.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-[var(--body-text)] flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {service.durationMinutes}m
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenBooking(service.salonId, service.id)}
                    className="text-xs py-1 h-7 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
                  >
                    Select
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Promotional Privileges */}
      {offers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-[var(--accent)]" />
            <h2 className="text-xl font-bold font-serif text-[var(--headings)]">
              Exclusive Vouchers &amp; Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.filter((o) => o.isActive).map((offer) => (
              <div
                key={offer.id}
                className="bg-gradient-to-r from-[#520817] to-[#741B32] text-white p-4 rounded-xl border border-[var(--accent)]/30 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/40 text-[var(--accent)]">
                    {offer.code}
                  </span>
                  <p className="text-sm font-bold font-serif pt-1">{offer.title}</p>
                  <p className="text-[11px] opacity-80">
                    Min bill ₹{offer.minBillAmount} • Valid until {offer.validUntil}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-extrabold text-[var(--accent)] font-serif">
                    {offer.discountPercent}%
                  </span>
                  <span className="block text-[10px] uppercase opacity-75">OFF</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Booking Modal */}
      <Dialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title="Schedule Your Salon Appointment"
      >
        <div className="space-y-4">
          {bookingSuccess ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[var(--headings)] font-serif">
                Appointment Confirmed!
              </h3>
              <p className="text-xs text-[var(--body-text)]">
                Your reservation for <strong>{selectedService?.name}</strong> at <strong>{selectedSalon?.name}</strong> on <strong>{bookingDate} at {bookingTime}</strong> has been saved.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <Button variant="accent" onClick={() => setIsBookingOpen(false)}>
                  Done
                </Button>
                <Link href="/customer/bookings">
                  <Button variant="outline">View in My Appointments</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Salon Select */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Select Studio / Parlour
                </label>
                <select
                  value={bookingSalonId}
                  onChange={(e) => {
                    setBookingSalonId(e.target.value);
                    const newSalonServices = services.filter((s) => s.salonId === e.target.value);
                    if (newSalonServices.length > 0) {
                      setBookingServiceId(newSalonServices[0].id);
                    }
                  }}
                  className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
                >
                  {salons.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Select */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Select Treatment / Service
                </label>
                <select
                  value={bookingServiceId}
                  onChange={(e) => setBookingServiceId(e.target.value)}
                  className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
                >
                  {salonServices.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — ₹{srv.price} ({srv.durationMinutes} mins)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--headings)]">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--headings)]">
                    Time Slot
                  </label>
                  <Input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Stylist */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--headings)]">
                  Preferred Stylist / Specialist
                </label>
                <select
                  value={bookingStylist}
                  onChange={(e) => setBookingStylist(e.target.value)}
                  className="w-full text-xs rounded-md border border-[var(--border)] p-2 bg-[var(--card)]"
                >
                  <option value="Meera Kapoor (Master Stylist)">Meera Kapoor (Master Stylist)</option>
                  <option value="Ananya Sen (Bridal Lead)">Ananya Sen (Bridal Lead)</option>
                  <option value="Kabir Khan (Beard Artisan)">Kabir Khan (Beard Artisan)</option>
                  <option value="Pooja Varma (Skin Specialist)">Pooja Varma (Skin Specialist)</option>
                </select>
              </div>

              {/* Pricing & Points summary */}
              <div className="bg-[var(--border)]/30 p-3 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="text-[var(--body-text)]">Total Bill:</span>
                  <span className="font-bold text-base text-[var(--primary)] block">
                    ₹{selectedService?.price ?? 0}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--accent)] font-semibold flex items-center gap-1 justify-end">
                    <Gift className="h-3 w-3" />
                    +{Math.floor(((selectedService?.price ?? 0) / 100) * 5)} Points
                  </span>
                  <span className="text-[10px] text-[var(--body-text)] opacity-70">
                    Earned upon appointment
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmBooking}>
                  Confirm Reservation
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
