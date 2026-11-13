import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Chapters from "@/components/Chapters";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <Shell t={t} locale={lang} page="">
      <Chapters t={t} locale={lang} />
    </Shell>
  );
}
