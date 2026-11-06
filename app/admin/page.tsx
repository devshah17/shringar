"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  Building2,
  Scissors,
  Calendar,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  TrendingUp,
  Database,
  RefreshCw,
  Eye,
  Check,
} from "lucide-react";
import { useShringar } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { User, UserRole } from "@/lib/types";

export default function AdminDashboardPage() {
  const {
    users,
    salons,
    services,
    bookings,
    updateUserRole,
    toggleUserStatus,
    updateUserPermissions,
    deleteSalon,
    deleteService,
    syncWithDatabase,
    isDbConnected,
  } = useShringar();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPermModalOpen, setIsPermModalOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const totalGMV = bookings.reduce((sum, b) => sum + b.price, 0);

  const allAvailablePermissions = [
    { id: "manage_salons", label: "Manage Salons & Branches", desc: "Create, edit, and delete salon branches" },
    { id: "manage_finances", label: "Financial Records & Payouts", desc: "View gross revenue and settlement ledger" },
    { id: "manage_users", label: "User Access & Permissions", desc: "Suspend accounts and assign security roles" },
    { id: "edit_services", label: "Treatment Catalog Oversight", desc: "Modify treatments, pricing, and timing" },
    { id: "delete_records", label: "Purge Platform Records", desc: "Permanent deletion of appointments and data" },
  ];

  const handleOpenPermissions = (user: User) => {
    setSelectedUser(user);
    setSelectedPermissions(user.permissions || []);
    setIsPermModalOpen(true);
  };

  const handleTogglePermission = (permId: string) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const handleSavePermissions = () => {
    if (selectedUser) {
      updateUserPermissions(selectedUser.id, selectedPermissions);
      setIsPermModalOpen(false);
    }
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    await syncWithDatabase();
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
              Super Admin Console
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs text-white/60">Full Access Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
            Platform Master Operations &amp; Governance
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Universal control across all customer accounts, salon proprietor studios, and system data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-emerald-400 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync MongoDB"}
          </Button>
        </div>
      </div>

      {/* Platform KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#20040a] p-4 rounded-xl border border-white/10 shadow-sm">
          <span className="text-[10px] uppercase font-mono text-white/60">
            Platform GMV (Bookings)
          </span>
          <p className="text-2xl font-bold font-serif text-emerald-400 mt-1">
            ₹{totalGMV.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-white/60">Total network revenue</span>
        </div>

        <div className="bg-[#20040a] p-4 rounded-xl border border-white/10 shadow-sm">
          <span className="text-[10px] uppercase font-mono text-white/60">
            Network Studios
          </span>
          <p className="text-2xl font-bold font-serif text-white mt-1">
            {salons.length}
          </p>
          <span className="text-[11px] text-white/60">Active branches in Mumbai</span>
        </div>

        <div className="bg-[#20040a] p-4 rounded-xl border border-white/10 shadow-sm">
          <span className="text-[10px] uppercase font-mono text-white/60">
            Platform Treatments
          </span>
          <p className="text-2xl font-bold font-serif text-white mt-1">
            {services.length}
          </p>
          <span className="text-[11px] text-white/60">Curated service catalog</span>
        </div>

        <div className="bg-[#20040a] p-4 rounded-xl border border-white/10 shadow-sm">
          <span className="text-[10px] uppercase font-mono text-white/60">
            Registered Users
          </span>
          <p className="text-2xl font-bold font-serif text-white mt-1">
            {users.length}
          </p>
          <span className="text-[11px] text-emerald-400 font-medium">Owners &amp; Customers</span>
        </div>
      </div>

      {/* User Directory & Access Rights Matrix */}
      <section className="bg-[#20040a] rounded-2xl border border-white/10 p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              User Access &amp; Permissions Matrix ({users.length})
            </h2>
            <p className="text-xs text-white/70">
              Change user roles, toggle account status (Active / Suspended), and manage security rights.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 border-b border-white/10 font-semibold text-white/80">
              <tr>
                <th className="p-3">User Profile</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Account Status</th>
                <th className="p-3">Permissions</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-white block">{u.name}</span>
                    <span className="text-[10px] text-white/50 font-mono">{u.id}</span>
                  </td>
                  <td className="p-3 font-mono">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                      className="bg-black/50 text-white border border-white/20 rounded px-2 py-1 text-xs cursor-pointer capitalize"
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Salon Owner</option>
                      <option value="admin">Platform Admin</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer border ${
                        u.status === "Active"
                          ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/40"
                          : "bg-rose-950/60 text-rose-300 border-rose-500/40"
                      }`}
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {(u.permissions || []).slice(0, 2).map((p) => (
                        <span
                          key={p}
                          className="bg-white/10 text-white/90 text-[10px] px-1.5 py-0.5 rounded font-mono"
                        >
                          {p}
                        </span>
                      ))}
                      {(u.permissions || []).length > 2 && (
                        <span className="text-[10px] text-white/50">
                          +{u.permissions!.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenPermissions(u)}
                      className="text-xs h-7 py-0.5 px-2 gap-1 border-white/30 text-white hover:bg-white/10"
                    >
                      <KeyRound className="h-3 w-3 text-emerald-400" />
                      Edit Rights
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Universal Studios & Catalog Oversight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All Salons */}
        <div className="bg-[#20040a] rounded-2xl border border-white/10 p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Building2 className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-bold font-serif text-white">
              Universal Salon Directory ({salons.length})
            </h2>
          </div>

          <div className="space-y-2">
            {salons.map((salon) => (
              <div
                key={salon.id}
                className="p-3 rounded-xl border border-white/10 bg-black/30 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white">{salon.name}</p>
                  <p className="text-[11px] text-white/60">
                    {salon.city} • {salon.type} Studio • Owner ID: {salon.ownerId}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Delete ${salon.name} across platform?`)) {
                      deleteSalon(salon.id);
                    }
                  }}
                  className="h-7 w-7 p-0 text-rose-400 hover:bg-rose-950/50"
                  title="Delete salon"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* All Services */}
        <div className="bg-[#20040a] rounded-2xl border border-white/10 p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Scissors className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-bold font-serif text-white">
              Platform Service Catalog ({services.length})
            </h2>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-3 rounded-xl border border-white/10 bg-black/30 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white">{srv.name}</p>
                  <p className="text-[11px] text-white/60">
                    ₹{srv.price} • {srv.durationMinutes}m • {srv.category}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteService(srv.id)}
                  className="h-7 w-7 p-0 text-rose-400 hover:bg-rose-950/50"
                  title="Delete service"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT PERMISSIONS MODAL */}
      <Dialog
        isOpen={isPermModalOpen}
        onClose={() => setIsPermModalOpen(false)}
        title={`Edit Platform Rights: ${selectedUser?.name}`}
      >
        <div className="space-y-4 text-xs text-[var(--headings)]">
          <p className="text-xs text-[var(--body-text)]">
            Configure granular permissions for <strong>{selectedUser?.email}</strong>.
          </p>

          <div className="space-y-2">
            {allAvailablePermissions.map((perm) => {
              const isChecked = selectedPermissions.includes(perm.id);
              return (
                <label
                  key={perm.id}
                  onClick={() => handleTogglePermission(perm.id)}
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
                    isChecked
                      ? "bg-[var(--accent)]/15 border-[var(--accent)]"
                      : "bg-[var(--card)] border-[var(--border)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 accent-[var(--primary)]"
                  />
                  <div>
                    <span className="font-bold block">{perm.label}</span>
                    <span className="text-[11px] text-[var(--body-text)] opacity-80">
                      {perm.desc}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsPermModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSavePermissions}>
              Save Permissions
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
