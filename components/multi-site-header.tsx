"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe, Crown, Shield, ExternalLink, ArrowRight } from "lucide-react";

interface MultiSiteHeaderProps {
  currentSite: "customer" | "owner" | "admin";
}

export function MultiSiteHeader({ currentSite }: MultiSiteHeaderProps) {
  const pathname = usePathname();
  const [currentHost, setCurrentHost] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHost(window.location.host);
    }
  }, []);

  // Compute URLs based on whether user is on a subdomain or path
  const isSubdomain =
    currentHost.includes("owner.") ||
    currentHost.includes("admin.") ||
    currentHost.includes("partner.");

  const customerUrl = isSubdomain
    ? `http://${currentHost.replace(/^(owner|partner|admin)\./, "")}`
    : "/customer";

  const ownerUrl = isSubdomain
    ? `http://owner.${currentHost.replace(/^(owner|partner|admin)\./, "")}`
    : "/owner";

  const adminUrl = isSubdomain
    ? `http://admin.${currentHost.replace(/^(owner|partner|admin)\./, "")}`
    : "/admin";

  const sites = [
    {
      id: "customer",
      name: "Customer Website",
      subdomain: "shringar.com",
      url: customerUrl,
      icon: <Globe className="h-3 w-3" />,
      color: "text-amber-200",
      activeBg: "bg-white/20 text-white font-bold",
    },
    {
      id: "owner",
      name: "Salon Owner Portal",
      subdomain: "owner.shringar.com",
      url: ownerUrl,
      icon: <Crown className="h-3 w-3 text-[#C58B3C]" />,
      color: "text-[#EED8B0]",
      activeBg: "bg-[#741B32] text-[#EED8B0] font-bold border border-[#EED8B0]/40",
    },
    {
      id: "admin",
      name: "Admin Platform",
      subdomain: "admin.shringar.com",
      url: adminUrl,
      icon: <Shield className="h-3 w-3 text-emerald-300" />,
      color: "text-emerald-200",
      activeBg: "bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40",
    },
  ];

  return (
    <div className="bg-[#24050b] text-white/90 border-b border-white/10 px-4 py-1.5 text-[11px] font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Multi-Tenant Network:
          </span>
          <span className="text-white/80 hidden sm:inline">
            1 Next.js App running 3 Independent Websites
          </span>
        </div>

        {/* Site Switcher Buttons */}
        <div className="flex items-center gap-1.5">
          {sites.map((site) => {
            const isActive = currentSite === site.id;
            return (
              <a
                key={site.id}
                href={site.url}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  isActive
                    ? site.activeBg
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title={`Switch to ${site.name} (${site.subdomain})`}
              >
                {site.icon}
                <span className="font-medium">{site.name}</span>
                <span className="text-[9px] opacity-60 font-mono hidden md:inline">
                  [{site.subdomain}]
                </span>
                {isActive && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-white/20 text-white font-mono">
                    LIVE
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
