"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ShieldCheck, CreditCard, Smartphone, Landmark, LockKeyhole, ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

type Method = "visa" | "international" | "d17";
const methods: { id: Method; title: string; subtitle: string; icon: typeof CreditCard; badge: string }[] = [
 { id: "visa", title: "Visa card", subtitle: "Pay using a Visa bank card", icon: CreditCard, badge: "VISA" },
 { id: "international", title: "International card", subtitle: "Internationally enabled payment card", icon: Landmark, badge: "CARD" },
 { id: "d17", title: "D17 — Poste Tunisienne", subtitle: "Tunisian Post mobile payment", icon: Smartphone, badge: "D17" },
];
export default function PaymentPage() {
 const [method, setMethod] = useState<Method>("visa");
 const [amount, setAmount] = useState("150.000");
 const [purpose, setPurpose] = useState("Project publication fee");
 const [notice, setNotice] = useState(false);
 const parsed = Number(amount);
 const valid = Number.isFinite(parsed) && parsed > 0;
 const selected = useMemo(() => methods.find(m => m.id === method)!, [method]);
 function handleSubmit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setNotice(true); }
 return <div className="min-h-screen bg-slate-50"><Navbar/><main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
  <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy-950"><ArrowLeft className="h-4 w-4"/> Back to home</Link>
  <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
   <section><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">Secure checkout</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-950">Electronic payment</h1><p className="mt-4 max-w-xl leading-7 text-slate-600">Choose your preferred payment method for TechBridge Tn. This checkout screen is prepared for gateway integration; live transactions are not enabled yet.</p>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
     <div><h2 className="text-lg font-bold text-navy-950">1. Select a payment method</h2><p className="mt-1 text-sm text-slate-500">Choose one of the supported methods below.</p>
      <div className="mt-4 space-y-3">{methods.map(m=>{const Icon=m.icon;return <button type="button" key={m.id} onClick={()=>{setMethod(m.id);setNotice(false)}} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${method===m.id?'border-sky-600 bg-sky-50 ring-2 ring-sky-100':'border-slate-200 hover:border-slate-300'}`}><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${method===m.id?'bg-navy-950 text-white':'bg-slate-100 text-slate-600'}`}><Icon className="h-5 w-5"/></span><span className="min-w-0 flex-1"><span className="block font-bold text-navy-950">{m.title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{m.subtitle}</span></span><span className="rounded-md bg-white px-2 py-1 text-[10px] font-extrabold tracking-wide text-slate-600">{m.badge}</span><span className={`grid h-5 w-5 place-items-center rounded-full border ${method===m.id?'border-sky-600 bg-sky-600 text-white':'border-slate-300'}`}>{method===m.id&&<CheckCircle2 className="h-4 w-4"/>}</span></button>})}</div>
     </div>
     <div><h2 className="text-lg font-bold text-navy-950">2. Payment details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Payment purpose<select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-sky-500" value={purpose} onChange={e=>setPurpose(e.target.value)}><option>Project publication fee</option><option>Project completion commission</option><option>Other platform fee</option></select></label><label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Amount (TND)<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-sky-500" inputMode="decimal" type="number" min="0.001" step="0.001" required value={amount} onChange={e=>{setAmount(e.target.value);setNotice(false)}}/><span className="mt-1 block text-xs font-normal text-slate-500">Enter the amount shown in your project or invoice.</span></label></div></div>
     {notice&&<div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><b>Payment gateway not connected yet.</b><br/>Your selection ({selected.title}) and amount are ready for integration, but no payment was made. A provider account, merchant credentials, and server-side verification must be configured before this button can initiate a real transaction.</div>}
     <Button type="submit" className="w-full" disabled={!valid}>Continue with {selected.title} <span aria-hidden="true">→</span></Button>
     <p className="text-center text-xs leading-5 text-slate-500">No card number, PIN, CVV, or password is collected on this preview page.</p>
    </form>
   </section>
   <aside className="space-y-4 lg:sticky lg:top-28"><div className="overflow-hidden rounded-3xl bg-navy-950 p-6 text-white sm:p-7"><div className="flex items-center justify-between"><span className="text-sm text-slate-300">Payment summary</span><ShieldCheck className="h-5 w-5 text-aqua"/></div><p className="mt-7 text-sm text-slate-300">Total to pay</p><div className="mt-1 text-4xl font-extrabold tracking-tight">{valid?parsed.toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3}):'0.000'} <span className="text-base font-semibold text-slate-300">TND</span></div><div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm"><div className="flex justify-between gap-4"><span className="text-slate-300">Purpose</span><span className="text-right font-semibold">{purpose}</span></div><div className="flex justify-between gap-4"><span className="text-slate-300">Method</span><span className="font-semibold">{selected.title}</span></div><div className="flex justify-between gap-4"><span className="text-slate-300">Currency</span><span className="font-semibold">TND</span></div></div></div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex gap-3"><LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-sky-700"/><div><h3 className="font-bold text-navy-950">Security first</h3><p className="mt-2 text-sm leading-6 text-slate-600">In production, card payments should be handled on the approved payment provider’s hosted checkout, with signed callbacks and server-side payment verification.</p></div></div></div>
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex gap-3"><Info className="mt-1 h-5 w-5 shrink-0 text-amber-700"/><div><h3 className="font-bold text-amber-950">Before going live</h3><p className="mt-2 text-sm leading-6 text-amber-900">Connect an eligible Tunisian payment provider for D17 and card payments, add merchant credentials to server environment variables, and verify transaction status server-side. Availability depends on your merchant agreement.</p></div></div></div>
   </aside>
  </div>
 </main><Footer/></div>;
}
