import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
const schema = z.object({ title: z.string().min(4).max(120), category: z.string().min(2), description: z.string().min(20), requiredSkills: z.array(z.string().min(1)).max(20), deliverablesSpec: z.string().min(5), budgetTnd: z.number().min(50).max(1000000), deadline: z.string().datetime() });
export async function GET() {
 const projects = await prisma.project.findMany({ where: { status: "published" }, orderBy: { createdAt: "desc" }, include: { sme: { select: { smeProfile: { select: { companyName: true } } } } } });
 return NextResponse.json({ projects });
}
export async function POST(req: Request) {
 const user = await getCurrentUser();
 if (!user || user.role !== "sme") return NextResponse.json({ error: "Only signed-in SMEs can create projects." }, { status: 403 });
 try {
  const d = schema.parse(await req.json());
  const project = await prisma.project.create({ data: { title: d.title, category: d.category, description: d.description, requiredSkills: JSON.stringify(d.requiredSkills), deliverablesSpec: d.deliverablesSpec, budgetCents: Math.round(d.budgetTnd * 1000), deadline: new Date(d.deadline), status: "draft", smeId: user.id } });
  return NextResponse.json({ project, note: "Project saved as draft. Publishing payment is not enabled in this starter build." }, { status: 201 });
 } catch (e) { return NextResponse.json({ error: e instanceof z.ZodError ? e.issues[0]?.message : "Could not save project." }, { status: 400 }); }
}
