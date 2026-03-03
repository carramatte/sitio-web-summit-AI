import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Summit AI | Software · Automatizaciones · Inteligencia Artificial",
  description:
    "En Summit AI combinamos tecnología de punta con visión estratégica. Especialistas en desarrollo web, automatizaciones e inteligencia artificial.",
  keywords: ["Summit AI", "inteligencia artificial", "automatizaciones", "desarrollo web", "software"],
  themeColor: "#0D1B2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} antialiased`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
