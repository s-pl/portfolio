import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    default: "Samuel Ponce Luna | Desarrollador de software en Las Palmas de Gran Canaria",
    template: "%s | Samuel Ponce Luna",
  },
  description:
    "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria. Portfolio de Samuel Ponce Luna con proyectos, experiencia y stack.",
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
    title: "Samuel Ponce Luna | Desarrollador de software en Las Palmas de Gran Canaria",
    description:
      "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria. Proyectos, experiencia y stack tecnológico.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Ponce Luna | Desarrollador de software en Las Palmas de Gran Canaria",
    description:
      "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria. Portfolio profesional.",
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
      jobTitle: "Desarrollador de software",
      description:
        "Desarrollador de software backend y Node.js en Las Palmas de Gran Canaria.",
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

const themeInitScript = `(() => {
  try {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    document.documentElement.classList.add("dark");
  }
})();`;

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-consent-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied'
                });
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

