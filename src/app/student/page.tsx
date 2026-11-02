import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/ui/project-card";
import { GraduationCap, BriefcaseBusiness, ArrowUpRight } from "lucide-react";
export const dynamic = "force-dynamic";
export default async function StudentDashboard() {
 const user=await getCurrentUser();if(!user)redirect("/login");if(user.role!=="student")redirect(user.role==="sme"?"/sme":"/admin");
 const [profile,proposals,projects]=await Promise.all([prisma.studentProfile.findUnique({where:{userId:user.id}}),prisma.proposal.findMany({where:{studentId:user.id},include:{project:{include:{sme:{include:{smeProfile:true}}}}},orderBy:{createdAt:"desc"}}),prisma.project.findMany({where:{status:"published"},take:3,orderBy:{createdAt:"desc"},include:{sme:{include:{smeProfile:true}}}})]);
 return <div className="min-h-screen bg-slate-50"><Navbar user={user}/><main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">Student workspace</p><h1 className="mt-2 text-3xl font-extrabold text-navy-950">Welcome, {profile?.fullName||"student"}.</h1><p className="mt-2 text-sm text-slate-500">Track your applications and discover new opportunities.</p></div><Link href="/projects" className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-5 py-3 text-sm font-semibold text-white">Explore projects <ArrowUpRight className="h-4 w-4"/></Link></div>
 <div className="mt-8 grid gap-4 sm:grid-cols-3"><Card><GraduationCap className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Institution</p><p className="mt-1 font-bold">{profile?.institution||"Not added yet"}</p></Card><Card><BriefcaseBusiness className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Applications sent</p><p className="mt-1 text-2xl font-extrabold">{proposals.length}</p></Card><Card><GraduationCap className="h-5 w-5 text-sky-700"/><p className="mt-4 text-sm text-slate-500">Field of study</p><p className="mt-1 font-bold">{profile?.fieldOfStudy||"Not added yet"}</p></Card></div>
 <section className="mt-12"><h2 className="text-xl font-extrabold text-navy-950">My applications</h2>{proposals.length?<div className="mt-4 space-y-3">{proposals.map(p=><Card key={p.id} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><Link href={`/projects/${p.projectId}`} className="font-bold text-navy-950 hover:text-sky-700">{p.project.title}</Link><p className="mt-1 text-xs text-slate-500">{p.project.sme.smeProfile?.companyName||"SME"} · {p.timelineDays} day estimate</p></div><Badge tone={p.status==="accepted"?"green":p.status==="rejected"?"amber":"blue"}>{p.status}</Badge></Card>)}</div>:<Card className="mt-4 text-center"><p className="font-bold">Your applications will appear here</p><p className="mt-2 text-sm text-slate-500">Find a project that matches your skills and send a proposal.</p></Card>}</section>
 <section className="mt-12"><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold text-navy-950">Explore opportunities</h2><Link href="/projects" className="text-sm font-bold text-sky-700">View all</Link></div><div className="mt-5 grid gap-5 md:grid-cols-3">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div></section>
 </main><Footer/></div>;
}
