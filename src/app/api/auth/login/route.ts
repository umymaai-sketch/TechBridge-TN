import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
export async function POST(req: Request) {
 try {
  const data = z.object({ email: z.string().email().transform(v=>v.toLowerCase()), password: z.string().min(1) }).parse(await req.json());
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !user.isActive || !(await bcrypt.compare(data.password, user.passwordHash))) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  await createSession(user);
  return NextResponse.json({ redirectTo: user.role === "student" ? "/student" : user.role === "sme" ? "/sme" : "/admin" });
 } catch { return NextResponse.json({ error: "Please check your email and password." }, { status: 400 }); }
}
