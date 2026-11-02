import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
 const email = process.env.INITIAL_ADMIN_EMAIL;
 const password = process.env.INITIAL_ADMIN_PASSWORD;
 if (!email || !password || password.length < 12) throw new Error("Set INITIAL_ADMIN_EMAIL and a strong INITIAL_ADMIN_PASSWORD (12+ chars) in .env before seeding.");
 const existing = await prisma.user.findUnique({ where: { email } });
 if (existing) { console.log("Admin already exists; no changes made."); return; }
 await prisma.user.create({ data: { email, passwordHash: await bcrypt.hash(password, 12), role: "admin" } });
 console.log(`Created initial admin: ${email}`);
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>prisma.$disconnect());
