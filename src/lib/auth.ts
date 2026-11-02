import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
const COOKIE = "campusbridge_session";
function secret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw new Error("JWT_SECRET must be set to at least 32 characters.");
  return new TextEncoder().encode(value);
}
export async function createSession(user: { id: string; email: string; role: string }) {
  const token = await new SignJWT({ email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" }).setSubject(user.id)
    .setIssuedAt().setExpirationTime("7d").sign(secret());
  cookies().set(COOKIE, token, { httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function destroySession() {
  cookies().set(COOKIE, "", { httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax", path: "/", maxAge: 0 });
}
export async function getCurrentUser() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub) return null;
    return await prisma.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, role: true, isActive: true } }).then(u => u?.isActive ? u : null);
  } catch { return null; }
}
