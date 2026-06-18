export const SITE_URL = "https://gdisrentservice.com";
export const BUSINESS_LEGAL_NAME = "GDIS SERVICE S.R.L.";
export const BUSINESS_NAME = "GDIS Rent";
export const BUSINESS_VAT = "IT03047140904";
export const BUSINESS_TAX_ID = "03047140904";
export const BUSINESS_PHONE = "+393520459150";
export const BUSINESS_PHONE_WHATSAPP = "+393520459150";
export const BUSINESS_PHONE_DISPLAY = "+39 352 045 9150";
export const BUSINESS_EMAIL = "gdis.noleggi@gmail.com";
export const BUSINESS_FOUNDING = "2025-10-01";
export const BUSINESS_LOGO =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
export const BUSINESS_INSTAGRAM = "https://instagram.com/gdis.service";
export const BUSINESS_GBP = "https://maps.app.goo.gl/mmKSjQChHSKX32XU8";

/**
 * Verified third-party citations / directory listings — emitted in `sameAs` on
 * both the Organization and LocalBusiness schemas. Google reads `sameAs` as a
 * signal that consolidates the entity in its Knowledge Graph: every URL here
 * has to point to a profile that names GDIS Service S.R.L. + same address +
 * same phone (NAP consistency = mandatory). Add a new URL ONLY after the
 * directory has actually verified the listing — pending submissions don't
 * belong here.
 *
 * Tracker / status: docs/seo-playbook/03-citations-tracker.md
 */
export const VERIFIED_CITATIONS = [
  BUSINESS_GBP,
  BUSINESS_INSTAGRAM,
  // T1 high-trust verified (June 2026)
  "https://atoka.io/public/it/azienda/gdis-service-srl/75a7c7c7ce33",
  "https://www.ufficiocamerale.it/7118/gdis-service-srl",
  // T2 mid-trust verified
  "https://www.provenexpert.com/it-it/gdis-rent-service/",
  "https://www.hotfrog.it/company/6f961e21ce1b0d14a037fe7d68ffce94/gdis-rent-service/olbia/car-rental-companies",
  "https://www.cylex-italia.it/olbia/gdis-rent---service-16336115.html",
  // T3 filler citations
  "https://www.empresite.it/GDIS-SERVICE-SRL.html",
  "https://firmania.it/olbia/gdis-rent-service-5237712",
  "https://aziendeeasy.it/aziendaselezionata15903618-GDIS%20SERVICE%20S.R.L.",
  "https://trova-aperto.it/olbia/gdis-rent-service-2970421",
];
export const BUSINESS_REA = "SS-225492";
export const BUSINESS_FOUNDER = {
  "@type": "Person" as const,
  name: "Giuseppe Deiana",
  jobTitle: "Amministratore Unico",
};

export const BUSINESS_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "Via Annibale Caro 52",
  addressLocality: "Olbia",
  addressRegion: "SS",
  postalCode: "07026",
  addressCountry: "IT",
};

export const BUSINESS_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 40.92925882924902,
  longitude: 9.48362796931018,
};

export const BUSINESS_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "11:30",
    closes: "17:30",
  },
];

export const DEFAULT_AREA_SERVED = [
  { "@type": "City", name: "Olbia" },
  { "@type": "AdministrativeArea", name: "Costa Smeralda" },
  { "@type": "City", name: "Porto Cervo" },
  { "@type": "City", name: "San Teodoro" },
  { "@type": "City", name: "Porto Rotondo" },
  { "@type": "City", name: "Golfo Aranci" },
  { "@type": "City", name: "Baja Sardinia" },
  { "@type": "City", name: "San Pantaleo" },
];

/** Global Organization schema — emitted once via <Layout>. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS_NAME,
  legalName: BUSINESS_LEGAL_NAME,
  alternateName: "GDIS Service",
  url: SITE_URL,
  logo: BUSINESS_LOGO,
  sameAs: VERIFIED_CITATIONS,
  foundingDate: BUSINESS_FOUNDING,
  founder: BUSINESS_FOUNDER,
  vatID: BUSINESS_VAT,
  taxID: BUSINESS_TAX_ID,
  identifier: { "@type": "PropertyValue", propertyID: "REA", value: BUSINESS_REA },
  address: BUSINESS_ADDRESS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    contactType: "customer service",
    areaServed: "IT",
    availableLanguage: ["Italian", "English", "German", "French"],
  },
};

/**
 * Build a Review schema block for a single verified Google review.
 * Used on the homepage to mark up the 3 testimonials shown on-page.
 * `itemReviewed` points to the global LocalBusiness `@id` so Google links
 * the review to the entity rather than to a generic Product.
 */
export function buildReviewSchema(input: {
  authorName: string;
  datePublished: string;
  reviewBody: string;
  ratingValue?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: input.authorName },
    datePublished: input.datePublished,
    reviewBody: input.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(input.ratingValue ?? 5),
      bestRating: "5",
      worstRating: "1",
    },
    itemReviewed: { "@id": `${SITE_URL}/#localbusiness` },
    publisher: { "@type": "Organization", name: "Google Business Profile" },
  };
}

/**
 * Real GBP review counters (8 June 2026). Source: maps.app.goo.gl/mmKSjQChHSKX32XU8
 * All reviews are 5-star — average is exactly 5.0. UPDATE THESE NUMBERS WHEN
 * THE GBP REVIEW COUNT CHANGES — otherwise the schema misrepresents reality and
 * may trigger a manual action from Google.
 */
export const GBP_RATING_VALUE = 5.0;
export const GBP_REVIEW_COUNT = 12;

/**
 * Top 3 GBP reviews selected for on-page rendering AND Review schema emission.
 * Text is kept in Italian (original language) across all locales — translating
 * GBP reviews destroys the trust signal. Only display labels (location) are
 * localized in the caller.
 *
 * UPDATE THIS ARRAY when better reviews come in (more detailed, more recent,
 * better mention of vehicles/locations for internal link targeting).
 */
export const GBP_TOP_REVIEWS = [
  {
    authorName: "Antonio S.",
    date: "2026-06-04",
    text: "Ho usufruito della macchina Mercedes Classe A per 3 giorni, confortevole, ve lo consiglio.",
  },
  {
    authorName: "Mihail F.",
    date: "2026-06-04",
    text: "Servizio eccellente, personale sempre super disponibile, auto pulite e moderne. Nessun ritardo e prezzi buonissimi.",
  },
  {
    authorName: "Dario D.",
    date: "2026-06-03",
    text: "Ottimo noleggio in Costa Smeralda, mi sono trovato benissimo nel noleggiare i veicoli con loro soprattutto per il servizio di noleggio direttamente a domicilio e a costo zero a Olbia, super consigliato!",
  },
] as const;

/** Build all 3 Review JSON-LD schemas in one call (used on every page that wants the boost). */
export function buildAllReviewSchemas() {
  return GBP_TOP_REVIEWS.map((r) =>
    buildReviewSchema({
      authorName: r.authorName,
      datePublished: r.date,
      reviewBody: r.text,
    }),
  );
}

/** Build a full LocalBusiness / AutoRental block. Accepts optional overrides. */
export function buildLocalBusinessSchema(options: {
  id?: string;
  areaServed?: Array<Record<string, string>>;
  image?: string;
  description?: string;
  priceRange?: string;
  includeAggregateRating?: boolean;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": options.id ?? `${SITE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    legalName: BUSINESS_LEGAL_NAME,
    image: options.image ?? BUSINESS_LOGO,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    url: SITE_URL,
    // Real price corridor: scooter from €50/d up to quad/Mercedes from €120-250/d in high season.
    priceRange: options.priceRange ?? "€50–€250",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    knowsLanguage: ["it", "en", "de", "fr"],
    ...(options.description ? { description: options.description } : {}),
    ...(options.includeAggregateRating ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(GBP_RATING_VALUE),
        reviewCount: String(GBP_REVIEW_COUNT),
        bestRating: "5",
        worstRating: "1",
      },
    } : {}),
    address: BUSINESS_ADDRESS,
    geo: BUSINESS_GEO,
    openingHoursSpecification: BUSINESS_HOURS,
    areaServed: options.areaServed ?? DEFAULT_AREA_SERVED,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: BUSINESS_GEO,
      geoRadius: "60000",
    },
    hasMap: "https://www.google.com/maps?q=40.929258,9.483627",
    sameAs: VERIFIED_CITATIONS,
    vatID: BUSINESS_VAT,
    identifier: { "@type": "PropertyValue", propertyID: "REA", value: BUSINESS_REA },
  };
}

type SiteLocale = "it" | "en" | "de" | "fr";
const LOCALE_IETF: Record<SiteLocale, string> = {
  it: "it-IT",
  en: "en",
  de: "de-DE",
  fr: "fr-FR",
};

/** WebSite schema — emit one per page, customised by locale. */
export function buildWebsiteSchema(locale: SiteLocale = "it") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    inLanguage: LOCALE_IETF[locale],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Backwards-compatible IT WebSite schema (used by BaseLayout's default emit). */
export const websiteSchema = buildWebsiteSchema("it");

/** Build a Product schema for a fleet vehicle. */
export function buildProductSchema(opts: {
  slug: string;
  name: string;
  description: string;
  image: string;
  pricePerDay: number;
  priceValidUntil: string;
  category?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/flotta/${opts.slug}#product`,
    name: opts.name,
    description: opts.description,
    image: opts.image,
    brand: opts.brand
      ? { "@type": "Brand", name: opts.brand }
      : { "@type": "Brand", name: BUSINESS_NAME },
    category: opts.category ?? "Vehicle Rental",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/flotta/${opts.slug}`,
      priceCurrency: "EUR",
      price: opts.pricePerDay,
      priceValidUntil: opts.priceValidUntil,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

/** Build a FAQPage schema from a list of {q,a} pairs. Optional speakable hint for AI/voice. */
export function buildFaqSchema(
  faq: Array<{ q: string; a: string }>,
  opts: { speakable?: boolean; locale?: SiteLocale } = {},
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LOCALE_IETF[opts.locale ?? "it"],
    ...(opts.speakable && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".faq-item summary", ".faq-item p", ".faq-item .faq-answer"],
      },
    }),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

const BOOKING_PATH_BY_LOCALE: Record<SiteLocale, string> = {
  it: "/prenotaora",
  en: "/en/book-now",
  de: "/de/jetzt-buchen",
  fr: "/fr/reserver",
};

/** Build a Service schema for a transport hub (airport/port/station/region). */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed: Array<{ "@type": string; name: string; [k: string]: string }> | string;
  locale?: SiteLocale;
}) {
  const locale = opts.locale ?? "it";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? "Car Rental",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: opts.areaServed,
    url: `${SITE_URL}${opts.url}`,
    inLanguage: LOCALE_IETF[locale],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}${BOOKING_PATH_BY_LOCALE[locale]}`,
      servicePhone: BUSINESS_PHONE,
    },
  };
}

type BookingLocale = "it" | "en" | "de" | "fr";

const BOOKING_HOWTO_PATH: Record<BookingLocale, string> = {
  it: "/prenotaora",
  en: "/en/book-now",
  de: "/de/jetzt-buchen",
  fr: "/fr/reserver",
};

const BOOKING_HOWTO_LANG: Record<BookingLocale, string> = {
  it: "it-IT",
  en: "en",
  de: "de-DE",
  fr: "fr-FR",
};

const BOOKING_HOWTO_COPY: Record<BookingLocale, {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}> = {
  it: {
    name: "Come richiedere un veicolo a Olbia con GDIS Rent",
    description:
      "Procedura in 3 step per richiedere auto, scooter o quad a Olbia e in Costa Smeralda: scegli, compili una mini-richiesta e invii un messaggio WhatsApp precompilato. Ti rispondiamo noi di persona con disponibilità, kasko/franchigia ed eventuale costo di consegna.",
    steps: [
      { name: "Scegli il veicolo", text: "Seleziona auto, scooter o quad dalla nostra flotta in base al tipo di viaggio (city car, premium, off-road)." },
      { name: "Indica date e luogo di ritiro", text: "Inserisci date di noleggio e scegli se preferisci il ritiro in sede a Olbia oppure la consegna in aeroporto, porto, stazione, hotel o villa." },
      { name: "Invia la richiesta su WhatsApp", text: "Con un tocco apri WhatsApp con un messaggio già pronto: vediamo la richiesta, confermiamo disponibilità, coperture (kasko/franchigia) ed eventuale costo di consegna direttamente in chat. Nessun pagamento anticipato, nessuna carta di credito richiesta sul sito." },
    ],
  },
  en: {
    name: "How to request a vehicle in Olbia with GDIS Rent",
    description:
      "3-step procedure to request a car, scooter or quad in Olbia and Costa Smeralda: pick, fill in a mini-request and send a pre-filled WhatsApp message. We reply in person with availability, kasko/excess and any delivery cost.",
    steps: [
      { name: "Choose your vehicle", text: "Pick a car, scooter or quad from our fleet based on your trip type (city car, premium, off-road)." },
      { name: "Set dates and pickup location", text: "Enter rental dates and choose whether you want to collect the vehicle at our Olbia office or have it delivered to the airport, port, station, hotel or villa." },
      { name: "Send your request on WhatsApp", text: "One tap opens WhatsApp with a pre-filled message: we receive the request, confirm availability, coverage (kasko/excess) and any delivery cost directly in chat. No upfront payment, no credit card required on the website." },
    ],
  },
  de: {
    name: "So fragen Sie ein Fahrzeug in Olbia bei GDIS Rent an",
    description:
      "3-stufiger Ablauf, um in Olbia und an der Costa Smeralda ein Auto, einen Roller oder ein Quad anzufragen: auswählen, kurze Anfrage ausfüllen und eine vorausgefüllte WhatsApp-Nachricht senden. Wir antworten persönlich mit Verfügbarkeit, Vollkasko/Selbstbeteiligung und eventuellen Lieferkosten.",
    steps: [
      { name: "Fahrzeug auswählen", text: "Wählen Sie aus unserer Flotte Auto, Roller oder Quad — passend zu Ihrer Reise (Stadtauto, Premium, Offroad)." },
      { name: "Daten und Abholort festlegen", text: "Geben Sie Mietzeitraum an und wählen Sie zwischen Abholung am Sitz in Olbia oder Lieferung an Flughafen, Hafen, Bahnhof, Hotel oder Villa." },
      { name: "Anfrage per WhatsApp senden", text: "Ein Tippen öffnet WhatsApp mit einer vorausgefüllten Nachricht: Wir prüfen die Anfrage und bestätigen Verfügbarkeit, Versicherung (Vollkasko/Selbstbeteiligung) und eventuelle Lieferkosten direkt im Chat. Keine Vorauszahlung, keine Kreditkarte auf der Website nötig." },
    ],
  },
  fr: {
    name: "Comment demander un véhicule à Olbia avec GDIS Rent",
    description:
      "Procédure en 3 étapes pour demander voiture, scooter ou quad à Olbia et en Costa Smeralda : choisir, remplir une mini-demande et envoyer un message WhatsApp pré-rempli. Nous répondons en personne avec disponibilité, kasko/franchise et frais de livraison éventuels.",
    steps: [
      { name: "Choisissez votre véhicule", text: "Sélectionnez voiture, scooter ou quad dans notre flotte selon le type de voyage (citadine, premium, tout-terrain)." },
      { name: "Indiquez dates et lieu de prise en charge", text: "Saisissez les dates de location et choisissez entre prise en charge à notre siège d'Olbia ou livraison à l'aéroport, au port, à la gare, à l'hôtel ou à la villa." },
      { name: "Envoyez la demande sur WhatsApp", text: "Un appui ouvre WhatsApp avec un message pré-rempli : nous recevons la demande et confirmons disponibilité, couverture (kasko/franchise) et frais de livraison éventuels directement dans la conversation. Pas de paiement à l'avance, pas de carte de crédit requise sur le site." },
    ],
  },
};

const BOOKING_HOWTO_STEP_ANCHOR = ["#step-veicolo", "#step-date", "#step-ritiro"];

/** Build a HowTo schema describing the GDIS booking request flow (3 steps). */
export function buildHowToBookingSchema(locale: BookingLocale = "it") {
  const path = BOOKING_HOWTO_PATH[locale];
  const copy = BOOKING_HOWTO_COPY[locale];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}${path}#howto`,
    name: copy.name,
    description: copy.description,
    totalTime: "PT2M",
    inLanguage: BOOKING_HOWTO_LANG[locale],
    image: BUSINESS_LOGO,
    step: copy.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}${path}${BOOKING_HOWTO_STEP_ANCHOR[i]}`,
    })),
  };
}

/** Build a BreadcrumbList schema from an ordered list of items. */
export function buildBreadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
    })),
  };
}
