import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { money } from "@/lib/fees";
import { ApplyForm } from "./apply-form";
export const dynamic = "force-dynamic";
export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
 const [user,project]=await Promise.all([getCurrentUser(),prisma.project.findUnique({where:{id:params.id},include:{sme:{include:{smeProfile:true}}}})]);
 if(!project||project.status!=="published") notFound();
 let skills:string[]=[];try{skills=JSON.parse(project.requiredSkills)}catch{}
 return <div className="min-h-screen bg-slate-50"><Navbar user={user}/><main className="mx-auto max-w-4xl px-5 py-14"><Link href="/projects" className="text-sm font-semibold text-sky-700">← All projects</Link><div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"><div className="flex flex-wrap items-center justify-between gap-3"><Badge>{project.category}</Badge><span className="text-xl font-extrabold text-navy-950">{money(project.budgetCents)}</span></div><h1 className="mt-5 text-3xl font-extrabold text-navy-950">{project.title}</h1><p className="mt-3 text-sm text-slate-500">{project.sme.smeProfile?.companyName ?? "SME"} · Deadline {project.deadline.toLocaleDateString()}</p><div className="prose prose-slate mt-8 max-w-none"><h2 className="text-lg font-bold">About this project</h2><p className="whitespace-pre-wrap text-sm leading-7">{project.description}</p><h2 className="mt-6 text-lg font-bold">Expected deliverables</h2><p className="whitespace-pre-wrap text-sm leading-7">{project.deliverablesSpec}</p></div><div className="mt-6 flex flex-wrap gap-2">{skills.map(s=><Badge key={s} tone="slate">{s}</Badge>)}</div>{user?.role==="student"?<ApplyForm projectId={project.id}/>:!user?<p className="mt-8 rounded-xl bg-sky-50 p-4 text-sm text-sky-800">Sign in with a student account to apply.</p>:<p className="mt-8 text-sm text-slate-500">Applications are available to student accounts.</p>}</div></main><Footer/></div>;
}
