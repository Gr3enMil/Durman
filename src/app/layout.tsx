import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ASSETS } from "@/lib/assets";
import { CookieConsent } from "@/components/cookie-consent";
import { SITE } from "@/lib/site-content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://durisasyn.cz";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Kompletní pokrývačské a klempířské práce`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "pokrývačství Karlovarský kraj",
    "střechy Karlovarský kraj",
    "rekonstrukce střech",
    "rekonstrukce domu",
    "tesařské práce",
    "střešní klempířina",
    "klempířství",
    "izolace střech",
    "nové střechy",
    "klempířské práce",
    "opravy střech",
    "havarijní opravy střech",
    "střecha na klíč",
    "D&D Pokrývačství",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE.name} | Pokrývačské a klempířské práce`,
    description: SITE.description,
    url: siteUrl,
    siteName: SITE.name,
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: ASSETS.openGraphImage,
        width: 1800,
        height: 1200,
        alt: `Realizace střechy od ${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Pokrývačské a klempířské práce`,
    description: SITE.description,
    images: [ASSETS.openGraphImage],
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={plusJakartaSans.variable} data-scroll-behavior="smooth">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

