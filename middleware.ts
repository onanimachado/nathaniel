import { NextResponse, type NextRequest } from "next/server";

/*
 * Português mora na raiz: "/" e "/sobre" são servidos pelas rotas /pt e /pt/sobre
 * sem mudar o endereço, e quem acessar /pt... é redirecionado para a versão sem /pt.
 * Inglês e espanhol ficam em /en e /es.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/") || pathname === "/es" || pathname.startsWith("/es/")) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
