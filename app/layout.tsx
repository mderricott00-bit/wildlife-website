import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bru Pet Supply",
  description: "Visit Bru Pet Supplies for quality pet supplies and learn about our work with Jacobs Scottish Wildlife Rescue Centre. Sponsor native wildlife, attend events, and support conservation efforts in Scotland.",
  keywords: "pet shop, wildlife rescue, Scottish wildlife, red squirrel, pine marten, wildcat, wildlife sponsorship, Scotland conservation, pet supplies",
  authors: [{ name: "Bru Pet Supply" }],
  openGraph: {
    title: "Bru Pet Supply",
    description: "Quality pet supplies and Scottish wildlife conservation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
