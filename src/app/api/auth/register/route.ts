import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
const schema = z.object({ role: z.enum(["student","sme"]), email: z.string().email().transform(v=>v.toLowerCase()), password: z.string().min(8), fullName: z.string().optional(), institution: z.string().optional(), fieldOfStudy: z.string().optional(), companyName: z.string().optional(), registrationNo: z.string().optional(), industry: z.string().optional() });
export async function POST(req: Request) {
 try {
  const input = schema.parse(await req.json());
  if (input.role === "student" && !input.fullName?.trim()) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (input.role === "sme" && !input.companyName?.trim()) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email: input.email } });
  if (exists) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({ data: { email: input.email, passwordHash, role: input.role,
   ...(input.role === "student" ? { studentProfile: { create: { fullName: input.fullName!.trim(), institution: input.institution, fieldOfStudy: input.fieldOfStudy } } } : { smeProfile: { create: { companyName: input.companyName!.trim(), registrationNo: input.registrationNo, industry: input.industry } } })
  }, select: { id: true, email: true, role: true } });
  await createSession(user);
  return NextResponse.json({ user, redirectTo: input.role === "student" ? "/student" : "/sme" }, { status: 201 });
 } catch (e) { if (e instanceof z.ZodError) return NextResponse.json({ error: e.issues[0]?.message ?? "Invalid input." }, { status: 400 }); console.error(e); return NextResponse.json({ error: "Could not create the account." }, { status: 500 }); }
}
