"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShringarLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;
  imageClassName?: string;
}

export function ShringarLogo({
  size = "md",
  showText = true,
  title = "Shringar",
  subtitle,
  href,
  className = "",
  imageClassName = "",
}: ShringarLogoProps) {
  const sizeMap = {
    xs: { box: "h-7 w-7", text: "text-sm", sub: "text-[9px]" },
    sm: { box: "h-9 w-9", text: "text-base", sub: "text-[10px]" },
    md: { box: "h-11 w-11", text: "text-lg", sub: "text-[11px]" },
    lg: { box: "h-14 w-14", text: "text-xl", sub: "text-xs" },
    xl: { box: "h-20 w-20", text: "text-2xl", sub: "text-sm" },
  };

  const { box, text, sub } = sizeMap[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group cursor-pointer", className)}>
      {/* Rounded Logo Image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/50 shadow-md transition-transform duration-300 group-hover:scale-105 bg-[#520817]",
          box,
          imageClassName
        )}
      >
        <img
          src="/logo.png"
          alt="Shringar — Luxury Salon & Parlour Management"
          className="h-full w-full object-cover rounded-full select-none"
          loading="eager"
        />
      </div>

      {/* Optional Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-extrabold font-serif tracking-tight leading-none text-inherit",
              text
            )}
          >
            {title}
          </span>
          {subtitle && (
            <span
              className={cn(
                "opacity-75 tracking-wider uppercase font-mono mt-0.5 text-inherit",
                sub
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
