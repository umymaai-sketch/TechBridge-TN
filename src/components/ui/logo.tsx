import Link from "next/link";
import { GraduationCap } from "lucide-react";
export function PlatformLogo({ light = false }: { light?: boolean }) {
 return <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight">
  <span className="grid h-10 w-10 place-items-center rounded-xl bg-aqua text-navy-950 shadow-glow"><GraduationCap className="h-6 w-6" /></span>
  <span className={`text-lg ${light ? "text-white" : "text-navy-950"}`}><span className={light ? "text-white" : "text-navy-950"}>Bridge </span><span className={light ? "text-aqua" : "text-sky-600"}>Tech Tn</span></span>
 </Link>;
}
