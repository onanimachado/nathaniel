import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import { getDict, isLocale, localeInfo, locales, pathFor } from "@/lib/i18n";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: pathFor(lang),
      languages: Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, pathFor(l)])),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      locale: localeInfo[lang].ogLocale,
      type: "website",
      images: ["/miv/neon.jpg"],
    },
  };
}

export const viewport: Viewport = { themeColor: "#D67BBF" };

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={localeInfo[lang].htmlLang} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
