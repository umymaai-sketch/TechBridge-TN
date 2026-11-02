import Link from "next/link";
import { ArrowUpRight, CalendarDays, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { money } from "@/lib/fees";
export function ProjectCard({ project }: { project: { id: string; title: string; category: string; description: string; budgetCents: number; deadline: Date; requiredSkills: string; sme?: { smeProfile?: { companyName: string } | null } | null } }) {
 let skills: string[] = []; try { skills = JSON.parse(project.requiredSkills); } catch {}
 return <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/5">
  <div className="flex items-center justify-between gap-3"><Badge>{project.category}</Badge><span className="inline-flex items-center gap-1 text-sm font-bold text-navy-900"><Wallet className="h-4 w-4 text-sky-600" />{money(project.budgetCents)}</span></div>
  <h3 className="mt-5 text-lg font-bold text-navy-950 group-hover:text-sky-700">{project.title}</h3>
  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">{project.description}</p>
  {project.sme?.smeProfile?.companyName && <p className="mt-4 text-xs font-semibold text-slate-500">{project.sme.smeProfile.companyName}</p>}
  <div className="mt-4 flex flex-wrap gap-2">{skills.slice(0, 3).map(s => <span key={s} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{s}</span>)}</div>
  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500"><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(project.deadline).toLocaleDateString()}</span><Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1 font-bold text-sky-700">Details <ArrowUpRight className="h-4 w-4" /></Link></div>
 </article>;
}
