"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PlatformLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
type User = { id: string; email: string; role: string } | null;
export function Navbar({ user = null }: { user?: User }) {
 const [open, setOpen] = useState(false);
 const dashboard = user?.role === "student" ? "/student" : user?.role === "sme" ? "/sme" : "/admin";
 const links = [{ href: "/projects", label: "Explore projects" }, { href: "/payment", label: "Payments" }, { href: "/#how-it-works", label: "How it works" }, { href: "/#fees", label: "Fees" }];
 async function logout() { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }
 return <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 text-white backdrop-blur-xl">
  <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
   <PlatformLogo light />
   <nav className="hidden items-center gap-8 md:flex">{links.map(l => <Link key={l.href} href={l.href} className="text-sm text-slate-300 transition hover:text-aqua">{l.label}</Link>)}</nav>
   <div className="hidden items-center gap-3 md:flex">{user ? <><Link href={dashboard} className="text-sm font-semibold text-white hover:text-aqua">Dashboard <ArrowUpRight className="inline h-4 w-4" /></Link><button onClick={logout} className="text-sm text-slate-400 hover:text-white">Log out</button></> : <><Link href="/login" className="text-sm font-semibold text-slate-200 hover:text-aqua">Sign in</Link><Link href="/register/student"><Button>Get started <ArrowUpRight className="h-4 w-4" /></Button></Link></>}</div>
   <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white md:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
  </div>
  {open && <div className="space-y-4 border-t border-white/10 px-5 py-5 md:hidden">{links.map(l => <Link key={l.href} onClick={() => setOpen(false)} className="block text-sm text-slate-200" href={l.href}>{l.label}</Link>)}{user ? <Link href={dashboard} className="block text-aqua">Open dashboard</Link> : <div className="flex gap-3"><Link href="/login">Sign in</Link><Link href="/register/student">Join</Link></div>}</div>}
 </header>;
}
