import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getCurrentUser } from "@/lib/auth";
import { ProjectCard } from "@/components/ui/project-card";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
 const [user,projects]=await Promise.all([getCurrentUser(),prisma.project.findMany({where:{status:"published"},orderBy:{createdAt:"desc"},include:{sme:{include:{smeProfile:true}}}})]);
 return <div className="min-h-screen bg-slate-50"><Navbar user={user}/><main className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">Opportunities</p><h1 className="mt-3 text-4xl font-extrabold text-navy-950">Explore projects</h1><p className="mt-3 max-w-2xl text-slate-500">Browse currently published projects from businesses on TechBridge Tn.</p>{projects.length?<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div>:<div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center"><h2 className="text-lg font-bold">No projects published yet</h2><p className="mt-2 text-sm text-slate-500">Check back soon or invite a business to join.</p></div>}</main><Footer/></div>;
}
