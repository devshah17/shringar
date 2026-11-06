"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Gift,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Tag,
  Repeat,
  ShieldCheck,
} from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomerBookingsPage() {
  const { bookings, currentUser, rewardConfig, offers, updateBookingStatus, createBooking } =
    useShringar();

  const customerBookings = bookings.filter((b) => b.customerId === currentUser.id);
  const upcomingBookings = customerBookings.filter((b) => b.status === "Confirmed");
  const pastBookings = customerBookings.filter(
    (b) => b.status === "Completed" || b.status === "Cancelled"
  );

  const points = currentUser.rewardPoints ?? 480;
  const rupeeValue = points * rewardConfig.pointValueRupees;

  const currentTier =
    points >= rewardConfig.tierThresholds.gold
      ? "Royale Gold"
      : points >= rewardConfig.tierThresholds.silver
      ? "Royale Silver"
      : "Bronze Privilege";

  const handleRebook = (past: (typeof bookings)[0]) => {
    createBooking({
      salonId: past.salonId,
      salonName: past.salonName,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone || "+91 98201 54321",
      serviceId: past.serviceId,
      serviceName: past.serviceName,
      stylistName: past.stylistName,
      date: "2026-11-25",
      time: "15:00",
      price: past.price,
      status: "Confirmed",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[var(--headings)]">
            My Appointments &amp; Rewards
          </h1>
          <p className="text-xs text-[var(--body-text)]">
            Track your upcoming luxury appointments, past visited salons, and Royale loyalty points.
          </p>
        </div>
        <Link href="/customer">
          <Button variant="accent" size="sm" className="gap-1.5 shadow-sm">
            <Calendar className="h-3.5 w-3.5" />
            Book New Treatment
          </Button>
        </Link>
      </div>

      {/* Rewards Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-r from-[#520817] via-[#650b1b] to-[#3b0710] text-white p-6 rounded-2xl shadow-md border border-[var(--accent)]/30 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-mono text-[var(--accent)] flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Loyalty &amp; Privilege Balance
              </span>
              <h2 className="text-3xl font-bold font-serif">{points} Points</h2>
              <p className="text-xs text-white/80">
                Worth <strong className="text-[var(--accent)]">₹{rupeeValue}</strong> in redemption discount on your next visit
              </p>
            </div>
            <Badge className="bg-[var(--accent)] text-[#520817] font-bold text-xs">
              {currentTier}
            </Badge>
          </div>

          <div className="bg-black/30 p-3 rounded-xl border border-white/10 text-xs flex items-center justify-between">
            <div>
              <span className="opacity-75 block text-[11px]">Next Tier Upgrade:</span>
              <span className="font-semibold text-white">
                {points >= 500 ? "Maximum Royale Tier" : `${500 - points} more points to Royale Gold`}
              </span>
            </div>
            <div className="text-right">
              <span className="opacity-75 block text-[11px]">Earning Policy:</span>
              <span className="font-semibold text-[var(--accent)]">
                {rewardConfig.earnRate} Pts / ₹100 spent
              </span>
            </div>
          </div>
        </div>

        {/* Quick Offer Teaser */}
        <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex flex-col justify-between space-y-3 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-[var(--body-text)] opacity-75 flex items-center gap-1">
              <Tag className="h-3 w-3 text-[var(--accent)]" />
              Available Privilege Code
            </span>
            <p className="text-lg font-bold font-serif text-[var(--headings)]">
              ROYALE20
            </p>
            <p className="text-xs text-[var(--body-text)]">
              Get flat 20% off on premium bridal styling &amp; Moroccan Argan hair spa treatments.
            </p>
          </div>
          <div className="text-[11px] font-mono text-[var(--body-text)] opacity-70">
            Min bill ₹3,000 • Code auto-applies at checkout
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[var(--headings)] flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--accent)]" />
          Upcoming Reservations
        </h2>

        {upcomingBookings.length === 0 ? (
          <div className="bg-[var(--card)] p-8 rounded-xl border border-dashed border-[var(--border)] text-center space-y-3">
            <Calendar className="h-8 w-8 text-[var(--body-text)] opacity-40 mx-auto" />
            <p className="text-xs text-[var(--body-text)]">No upcoming appointments scheduled.</p>
            <Link href="/customer">
              <Button size="sm" variant="accent">Explore &amp; Book Now</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map((bk) => (
              <div
                key={bk.id}
                className="bg-[var(--card)] p-5 rounded-xl border border-[var(--border)] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold font-serif text-[var(--headings)]">
                      {bk.serviceName}
                    </h3>
                    <p className="text-xs text-[var(--body-text)] flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-[var(--accent)]" />
                      {bk.salonName}
                    </p>
                  </div>
                  <Badge variant="accent" className="text-xs">
                    {bk.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[var(--border)]/60">
                  <div>
                    <span className="text-[var(--body-text)] opacity-75 block text-[10px]">
                      Date &amp; Time
                    </span>
                    <span className="font-semibold text-[var(--headings)]">
                      {bk.date} at {bk.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--body-text)] opacity-75 block text-[10px]">
                      Assigned Stylist
                    </span>
                    <span className="font-semibold text-[var(--headings)]">
                      {bk.stylistName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-base font-bold text-[var(--primary)] font-serif">
                      ₹{bk.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[var(--accent)] font-medium block">
                      +{bk.pointsEarned ?? Math.floor((bk.price / 100) * 5)} Loyalty Pts
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateBookingStatus(bk.id, "Cancelled")}
                    className="text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Services & Visited Salons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[var(--headings)] flex items-center gap-2">
          <Repeat className="h-4 w-4 text-[var(--accent)]" />
          Previous Services &amp; Visited Studios
        </h2>

        {pastBookings.length === 0 ? (
          <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] text-center text-xs text-[var(--body-text)]">
            No previous appointment history found.
          </div>
        ) : (
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--border)]/30 border-b border-[var(--border)] text-[var(--headings)] font-semibold">
                  <tr>
                    <th className="p-3">Treatment / Service</th>
                    <th className="p-3">Studio &amp; Location</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Stylist</th>
                    <th className="p-3">Bill Paid</th>
                    <th className="p-3">Points Earned</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/60 text-[var(--body-text)]">
                  {pastBookings.map((past) => (
                    <tr key={past.id} className="hover:bg-[var(--border)]/20 transition-colors">
                      <td className="p-3 font-semibold text-[var(--headings)]">
                        {past.serviceName}
                      </td>
                      <td className="p-3">{past.salonName}</td>
                      <td className="p-3 font-mono">{past.date}</td>
                      <td className="p-3">{past.stylistName}</td>
                      <td className="p-3 font-bold text-[var(--primary)] font-serif">
                        ₹{past.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 font-semibold text-[var(--accent)]">
                        +{past.pointsEarned ?? 0} Pts
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={past.status === "Completed" ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {past.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRebook(past)}
                          className="text-xs h-7 py-0.5 px-2 gap-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                        >
                          <Repeat className="h-3 w-3" />
                          Rebook
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
