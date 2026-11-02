import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
export async function POST(req: Request) {
 const user = await getCurrentUser();
 if (!user || user.role !== "student") return NextResponse.json({ error: "Sign in with a student account to apply." }, { status: 403 });
 try {
  const d = z.object({ projectId: z.string(), coverLetter: z.string().min(30).max(3000), timelineDays: z.number().int().min(1).max(365) }).parse(await req.json());
  const project = await prisma.project.findUnique({ where: { id: d.projectId } });
  if (!project || project.status !== "published") return NextResponse.json({ error: "This project is not open for applications." }, { status: 404 });
  const proposal = await prisma.proposal.create({ data: { ...d, studentId: user.id } });
  return NextResponse.json({ proposal }, { status: 201 });
 } catch (e) { return NextResponse.json({ error: e instanceof z.ZodError ? e.issues[0]?.message : "You may already have applied to this project." }, { status: 400 }); }
}
