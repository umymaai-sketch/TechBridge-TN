"use client";
import React from "react";
import { LoaderCircle } from "lucide-react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost"; loading?: boolean };
export function Button({ children, variant = "primary", loading, className = "", disabled, ...props }: Props) {
  const styles = { primary: "bg-aqua text-navy-950 hover:bg-white", secondary: "bg-white/10 text-white border border-white/15 hover:bg-white/15", outline: "border border-slate-300 text-slate-700 hover:border-aqua hover:text-navy-900", ghost: "text-slate-600 hover:bg-slate-100" };
  return <button disabled={disabled || loading} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60 ${styles[variant]} ${className}`} {...props}>{loading && <LoaderCircle className="h-4 w-4 animate-spin" />}{children}</button>;
}
