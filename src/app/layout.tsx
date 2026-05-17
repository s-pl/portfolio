import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import VercelAnalytics from "@/components/VercelAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samuelponce.es"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const themeInitScript = `(() => {
  try {
    const savedTheme = localStorage.getItem("theme");
    let isDark;
    if (savedTheme === "dark" || savedTheme === "light") {
      isDark = savedTheme === "dark";
    } else {
      const hour = new Date().getHours();
      isDark = hour < 7 || hour >= 20;
    }
    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    document.documentElement.classList.add("dark");
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido
        </a>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
