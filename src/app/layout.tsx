import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Samuel Ponce Luna | Programador en Las Palmas de Gran Canaria",
    template: "%s | Samuel Ponce Luna",
  },
  description:
    "Programador backend y Node.js en Las Palmas de Gran Canaria. Portfolio de Samuel Ponce Luna con proyectos, experiencia y stack.",
  keywords: [
    "programador las palmas de gran canaria",
    "samuel ponce",
    "nodejs las palmas",
    "desarrollador backend las palmas",
    "programador web las palmas",
    "samuel ponce luna",
    "portfolio programador",
    "next.js las palmas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://samuelponce.es",
    siteName: "Samuel Ponce Luna",
    title: "Samuel Ponce Luna | Programador en Las Palmas de Gran Canaria",
    description:
      "Programador backend y Node.js en Las Palmas de Gran Canaria. Proyectos, experiencia y stack tecnológico.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Ponce Luna | Programador en Las Palmas de Gran Canaria",
    description:
      "Programador backend y Node.js en Las Palmas de Gran Canaria. Portfolio profesional.",
  },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://samuelponce.es/#person",
      name: "Samuel Ponce Luna",
      url: "https://samuelponce.es",
      jobTitle: "Programador Backend",
      description:
        "Programador backend y Node.js en Las Palmas de Gran Canaria.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
      sameAs: [
        "https://github.com/s-pl",
        "https://www.linkedin.com/in/samuel-ponce-luna-aba75b2b8/",
      ],
      knowsAbout: [
        "Node.js",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Redis",
        "Next.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://samuelponce.es/#website",
      url: "https://samuelponce.es",
      name: "Samuel Ponce Luna",
      inLanguage: ["es", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

