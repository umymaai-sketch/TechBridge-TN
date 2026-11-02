import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
 const user=await getCurrentUser();if(!user)redirect("/login");if(user.role!=="admin")redirect(user.role==="student"?"/student":"/sme");
 const [users,students,smes,projects,proposals]=await Promise.all([prisma.user.count(),prisma.user.count({where:{role:"student"}}),prisma.user.count({where:{role:"sme"}}),prisma.project.count(),prisma.proposal.count()]);
 const stats=[["Total accounts",users],["Students",students],["SMEs",smes],["Projects",projects],["Applications",proposals]];
 return <div className="min-h-screen bg-slate-50"><Navbar user={user}/><main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">Restricted area</p><h1 className="mt-2 text-3xl font-extrabold text-navy-950">Administration</h1><p className="mt-2 text-sm text-slate-500">Operational metrics calculated from database records only.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{stats.map(([label,value])=><Card key={label as string}><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-extrabold text-navy-950">{value}</p></Card>)}</div><div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900"><strong>Payments and revenue:</strong> no financial totals are shown because payment provider integration and verified transaction records are not implemented in this starter build. Do not treat commission estimates as collected revenue.</div></main><Footer/></div>;
}
