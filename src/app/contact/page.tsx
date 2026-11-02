import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export default function ContactPage(){return <div className="min-h-screen bg-white"><Navbar/><main className="mx-auto max-w-3xl px-5 py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">Support</p><h1 className="mt-3 text-4xl font-extrabold text-navy-950">Let’s make good work happen.</h1><p className="mt-5 text-base leading-7 text-slate-500">For now, contact support details have not been configured. Add a verified support email before launching the platform publicly.</p><Link href="/" className="mt-7 inline-flex rounded-xl bg-navy-950 px-5 py-3 text-sm font-semibold text-white">Back to home</Link></main><Footer/></div>;}
