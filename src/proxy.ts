import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["es", "en"];
const DEFAULT_LANG: Lang = "es";

function getPreferredLang(request: NextRequest): Lang {
  const cookieLang = request.cookies.get("lang")?.value;
  if (cookieLang === "es" || cookieLang === "en") return cookieLang;

  const acceptLang = request.headers.get("accept-language") ?? "";
  if (acceptLang.toLowerCase().startsWith("en")) return "en";

  return DEFAULT_LANG;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLangPrefix = LANGS.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (!hasLangPrefix) {
    const lang = getPreferredLang(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, { status: 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
