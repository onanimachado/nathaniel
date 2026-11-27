import { NextResponse, type NextRequest } from "next/server";
import { pageSlugs } from "./content/site";

/*
 * Português mora na raiz: "/" é servido pela rota /pt sem mudar o endereço,
 * e quem acessar /pt é redirecionado para "/".
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/pt";
    return NextResponse.rewrite(url);
  }
  /* páginas do menu em português também moram na raiz: /loja é servido por /pt/loja */
  if ((pageSlugs as readonly string[]).includes(pathname.slice(1))) {
    const url = req.nextUrl.clone();
    url.pathname = `/pt${pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/", "/pt", "/pt/:path*", "/loja", "/historia", "/governanca", "/comunidade", "/projetos-sociais"] };
