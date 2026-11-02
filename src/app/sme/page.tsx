import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, BriefcaseBusiness, Users, ArrowUpRight } from "lucide-react";
export const dynamic = "force-dynamic";
export default async function SmeDashboard() {
 const user=await getCurrentUser();if(!user)redirect("/login");if(user.role!=="sme")redirect(user.role==="student"?"/student":"/admin");
 const [profile,projects,applications]=await Promise.all([prisma.smeProfile.findUnique({where:{userId:user.id}}),prisma.project.findMany({where:{smeId:user.id},include:{_count:{select:{proposals:true}}},orderBy:{createdAt:"desc"}}),prisma.proposal.count({where:{project:{smeId:user.id}}})]);
 return <div className="min-h-screen bg-slate-50"><Navbar user={user}/><main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">SME workspace</p><h1 className="mt-2 text-3xl font-extrabold text-navy-950">{profile?.companyName||"Business dashboard"}</h1><p className="mt-2 text-sm text-slate-500">Manage project drafts and review student interest.</p></div><Link href="/sme/projects/new"><Button><Plus className="h-4 w-4"/> Create project</Button></Link></div>
 <div className="mt-8 grid gap-4 sm:grid-cols-3"><Card><BriefcaseBusiness className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Projects created</p><p className="mt-1 text-2xl font-extrabold">{projects.length}</p></Card><Card><Users className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Total applications</p><p className="mt-1 text-2xl font-extrabold">{applications}</p></Card><Card><BriefcaseBusiness className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Published projects</p><p className="mt-1 text-2xl font-extrabold">{projects.filter(p=>p.status==="published").length}</p></Card></div>
 <section className="mt-12"><h2 className="text-xl font-extrabold text-navy-950">Your projects</h2>{projects.length?<div className="mt-4 space-y-3">{projects.map(p=><Card key={p.id} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h3 className="font-bold text-navy-950">{p.title}</h3><p className="mt-1 text-xs text-slate-500">{p.category} · {p._count.proposals} applications · Budget {(p.budgetCents/1000).toFixed(3)} TND</p></div><Badge tone={p.status==="published"?"green":"amber"}>{p.status}</Badge></Card>)}</div>:<Card className="mt-4 text-center"><p className="font-bold">No projects created yet</p><p className="mt-2 text-sm text-slate-500">Start with a clear brief, budget, and deadline.</p><Link href="/sme/projects/new" className="mt-4 inline-flex text-sm font-bold text-sky-700">Create your first project <ArrowUpRight className="ml-1 h-4 w-4"/></Link></Card>}</section>
 <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Publishing payments are not enabled in this build. New projects remain drafts until a verified payment workflow is implemented.</p>
 </main><Footer/></div>;
}
