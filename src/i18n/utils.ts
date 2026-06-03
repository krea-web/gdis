import it from "./it.json";
import en from "./en.json";
import de from "./de.json";
import fr from "./fr.json";

export const LOCALES = ["it", "en", "de", "fr"] as const;
export const DEFAULT_LOCALE = "it";

export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
  fr: "Français",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  it: "🇮🇹",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export const OG_LOCALES: Record<Locale, string> = {
  it: "it_IT",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
};

export const HREFLANG_TAGS: Record<Locale, string> = {
  it: "it-IT",
  en: "en",
  de: "de-DE",
  fr: "fr-FR",
};

export const ROUTES = {
  home: { it: "/", en: "/en", de: "/de", fr: "/fr" },
  booking: { it: "/prenotaora", en: "/en/book-now", de: "/de/jetzt-buchen", fr: "/fr/reserver" },
  contact: { it: "/contatti", en: "/en/contact", de: "/de/kontakt", fr: "/fr/contact" },
  about: { it: "/chisiamo", en: "/en/about-us", de: "/de/ueber-uns", fr: "/fr/a-propos" },
  sitemap: { it: "/mappa-sito", en: "/en/sitemap", de: "/de/sitemap", fr: "/fr/plan-du-site" },
  privacy: { it: "/privacy", en: "/en/privacy-policy", de: "/de/datenschutz", fr: "/fr/confidentialite" },
  cookie: { it: "/cookie", en: "/en/cookie-policy", de: "/de/cookie-richtlinie", fr: "/fr/cookies" },
  terms: { it: "/termini", en: "/en/terms", de: "/de/agb", fr: "/fr/conditions-generales" },
  hubCostaSmeralda: {
    it: "/noleggio-auto-in-costa-smeralda",
    en: "/en/car-rental-costa-smeralda",
    de: "/de/autovermietung-costa-smeralda",
    fr: "/fr/location-voiture-costa-smeralda",
  },
  hubAirport: {
    it: "/noleggio-auto-aeroporto-olbia",
    en: "/en/car-rental-olbia-airport",
    de: "/de/autovermietung-flughafen-olbia",
    fr: "/fr/location-voiture-aeroport-olbia",
  },
  hubPort: {
    it: "/noleggio-auto-porto-olbia",
    en: "/en/car-rental-olbia-port",
    de: "/de/autovermietung-hafen-olbia",
    fr: "/fr/location-voiture-port-olbia",
  },
  hubStation: {
    it: "/noleggio-auto-stazione-olbia",
    en: "/en/car-rental-olbia-station",
    de: "/de/autovermietung-bahnhof-olbia",
    fr: "/fr/location-voiture-gare-olbia",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function getRoute(key: RouteKey, lang: Locale): string {
  return ROUTES[key][lang];
}

const FLEET_PATH_PREFIX: Record<Locale, string> = {
  it: "/flotta",
  en: "/en/fleet",
  de: "/de/flotte",
  fr: "/fr/flotte",
};

export function getFleetPath(slug: string, lang: Locale): string {
  return `${FLEET_PATH_PREFIX[lang]}/${slug}`;
}

const LOCATION_PATH_PREFIX: Record<Locale, string> = {
  it: "/noleggio-auto-a",
  en: "/en/car-rental-in",
  de: "/de/autovermietung",
  fr: "/fr/location-voiture-a",
};

export function getLocationPath(slug: string, lang: Locale): string {
  return `${LOCATION_PATH_PREFIX[lang]}-${slug}`;
}

const dictionaries = { it, en, de, fr } as const;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLangFromUrl(url: URL): Locale {
  const segments = url.pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) return first;
  return DEFAULT_LOCALE;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(path: string, lang: Locale): string {
  const clean = getPathWithoutLocale(path);
  if (lang === DEFAULT_LOCALE) {
    return clean === "/" ? "/" : clean;
  }
  if (clean === "/") return `/${lang}`;
  return `/${lang}${clean}`;
}

type Dict = Record<string, unknown>;

function lookupRaw(dict: Dict, key: string): unknown {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Dict)) {
      cur = (cur as Dict)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

function format(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}

export function useTranslations(lang: Locale) {
  const primary = dictionaries[lang] as Dict;
  const fallback = dictionaries[DEFAULT_LOCALE] as Dict;
  function resolveString(key: string): string | undefined {
    const raw = lookupRaw(primary, key) ?? lookupRaw(fallback, key);
    return typeof raw === "string" ? raw : undefined;
  }
  function t(key: string, vars?: Record<string, string | number>): string {
    const str = resolveString(key);
    return str ? format(str, vars) : key;
  }
  function tArray(key: string): string[] {
    const raw = lookupRaw(primary, key) ?? lookupRaw(fallback, key);
    if (Array.isArray(raw)) return raw.filter((v): v is string => typeof v === "string");
    return [];
  }
  return Object.assign(t, { array: tArray });
}
