import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { money } from "@/lib/fees";

const projects = [
 {
  id: "project-1",
  title: "Build a Modern Business Website",
  category: "Web Development",
  budgetCents: 150000,
  company: "Demo Business",
  description: "Create a modern and responsive website for a small business.",
  skills: ["HTML", "CSS", "JavaScript", "React"],
 },
 {
  id: "project-2",
  title: "Design a Mobile Application UI",
  category: "UI/UX Design",
  budgetCents: 200000,
  company: "Creative Studio",
  description: "Design a clean and user-friendly interface for a mobile application.",
  skills: ["Figma", "UI Design", "UX Design"],
 },
 {
  id: "project-3",
  title: "Develop a Data Analysis Dashboard",
  category: "Data Science",
  budgetCents: 180000,
  company: "Tech Solutions",
  description: "Create a dashboard to visualize and analyze business data.",
  skills: ["Python", "SQL", "Data Analysis"],
 },
];

export default function ProjectsPage() {
 const user = null;

 return (
  <div className="min-h-screen bg-slate-50">
   <Navbar user={user}/>
   <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-sky-700">
     Opportunities
    </p>

    <h1 className="mt-3 text-4xl font-extrabold text-navy-950">
     Explore projects
    </h1>

    <p className="mt-3 max-w-2xl text-slate-500">
     Browse currently published projects from businesses on TechBridge Tn.
    </p>

    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
     {projects.map((project) => (
      <div
       key={project.id}
       className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
      >
       <div className="flex items-center justify-between gap-3">
        <Badge>{project.category}</Badge>
        <BriefcaseBusiness className="h-5 w-5 text-sky-700"/>
       </div>

       <h2 className="mt-5 text-xl font-bold text-navy-950">
        {project.title}
       </h2>

       <p className="mt-2 text-xs font-medium text-slate-400">
        {project.company}
       </p>

       <p className="mt-4 min-h-12 text-sm leading-6 text-slate-500">
        {project.description}
       </p>

       <div className="mt-5 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
         <Badge key={skill} tone="slate">{skill}</Badge>
        ))}
       </div>

       <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div>
         <p className="text-xs text-slate-400">Project budget</p>
         <p className="mt-1 text-lg font-extrabold text-navy-950">
          {money(project.budgetCents)}
         </p>
        </div>

        <Link
         href={`/projects/${project.id}`}
         className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-sky-900"
        >
         Explore Project
         <ArrowRight className="h-4 w-4"/>
        </Link>
       </div>
      </div>
     ))}
    </div>
   </main>
   <Footer/>
  </div>
 );
}