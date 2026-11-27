import type { NextConfig } from "next";

/*
 * Materiais "não listados": PDFs servidos num endereço limpo, sem link em nenhum lugar do site
 * e com aviso para o Google não indexar. Só abre quem recebeu o link.
 */
const unlisted = [{ path: "/lagunitassessions", file: "/docs/lagunitassessions.pdf" }];

const nextConfig: NextConfig = {
  async rewrites() {
    return { beforeFiles: unlisted.map(({ path, file }) => ({ source: path, destination: file })), afterFiles: [], fallback: [] };
  },
  async headers() {
    return [
      { source: "/docs/:file*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      ...unlisted.map(({ path }) => ({
        source: path,
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Content-Disposition", value: `inline; filename="${path.slice(1)}.pdf"` },
        ],
      })),
    ];
  },
};

export default nextConfig;
