import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muito Bala · O seu paraíso audiovisual",
  description:
    "Produtora audiovisual de Porto Alegre. Design, música, filme e foto com cara de verão em Miami dos anos 90. Bem-vindo ao nosso clima.",
  openGraph: {
    title: "Muito Bala · O seu paraíso audiovisual",
    description: "Design, música, filme e foto. Bem-vindo ao nosso clima.",
    locale: "pt_BR",
    type: "website",
    images: ["/miv/neon.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#E972CB" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
