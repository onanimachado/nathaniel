import { NextResponse, type NextRequest } from "next/server";

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
  return NextResponse.next();
}

export const config = { matcher: ["/", "/pt", "/pt/:path*"] };
