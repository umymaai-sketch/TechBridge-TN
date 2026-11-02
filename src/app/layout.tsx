import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TechBridge Tn — Student talent, real projects", description: "Connect university students with meaningful SME projects." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="en"><body>{children}</body></html>;
}
