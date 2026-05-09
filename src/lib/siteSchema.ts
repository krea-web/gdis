export const SITE_URL = "https://www.gdisrentservice.com";
export const BUSINESS_LEGAL_NAME = "GDIS SERVICE S.R.L.";
export const BUSINESS_NAME = "GDIS Rent & Service";
export const BUSINESS_VAT = "IT03047140904";
export const BUSINESS_TAX_ID = "03047140904";
export const BUSINESS_PHONE = "+39-352-045-9150";
export const BUSINESS_PHONE_WHATSAPP = "+393520459150";
export const BUSINESS_EMAIL = "gdis.noleggi@gmail.com";
export const BUSINESS_FOUNDING = "2025-10-01";
export const BUSINESS_LOGO =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
export const BUSINESS_INSTAGRAM = "https://instagram.com/gdis.service";

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
  alternateName: "GDIS Rent",
  url: SITE_URL,
  logo: BUSINESS_LOGO,
  sameAs: [BUSINESS_INSTAGRAM],
  foundingDate: BUSINESS_FOUNDING,
  vatID: BUSINESS_VAT,
  taxID: BUSINESS_TAX_ID,
  address: BUSINESS_ADDRESS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    contactType: "customer service",
    areaServed: "IT",
    availableLanguage: ["Italian", "English"],
  },
};

/** Build a full LocalBusiness / AutoRental block. Accepts optional overrides. */
export function buildLocalBusinessSchema(options: {
  id?: string;
  areaServed?: Array<Record<string, string>>;
  image?: string;
  description?: string;
  priceRange?: string;
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
    priceRange: options.priceRange ?? "€€",
    ...(options.description ? { description: options.description } : {}),
    address: BUSINESS_ADDRESS,
    geo: BUSINESS_GEO,
    openingHoursSpecification: BUSINESS_HOURS,
    areaServed: options.areaServed ?? DEFAULT_AREA_SERVED,
    hasMap: "https://www.google.com/maps?q=40.929258,9.483627",
    sameAs: [BUSINESS_INSTAGRAM],
    vatID: BUSINESS_VAT,
  };
}

/** WebSite + potentialAction (sitelinks search box) — useful once on homepage. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS_NAME,
  inLanguage: "it-IT",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

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
  opts: { speakable?: boolean } = {},
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

/** Build a Service schema for a transport hub (airport/port/station/region). */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed: Array<{ "@type": string; name: string }> | string;
}) {
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
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/prenotaora`,
      servicePhone: BUSINESS_PHONE,
    },
  };
}

/** Build a HowTo schema describing the GDIS booking flow (6 steps). */
export function buildHowToBookingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/prenotaora#howto`,
    name: "Come prenotare un'auto a Olbia con GDIS Rent",
    description:
      "Procedura online in 6 step per prenotare auto, scooter o quad a Olbia e in Costa Smeralda con consegna VIP.",
    totalTime: "PT3M",
    inLanguage: "it-IT",
    image: BUSINESS_LOGO,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Scegli il veicolo",
        text: "Seleziona auto, scooter o quad dalla nostra flotta in base al tipo di viaggio (city car, premium, off-road).",
        url: `${SITE_URL}/prenotaora#step-veicolo`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Imposta date e luogo di consegna",
        text: "Inserisci data e ora di ritiro/riconsegna e scegli dove vuoi ricevere il veicolo: aeroporto Olbia, porto, stazione, hotel o villa.",
        url: `${SITE_URL}/prenotaora#step-date`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Aggiungi extra opzionali",
        text: "Seggiolino bambino, secondo guidatore, copertura kasko, GPS o altri extra inclusi nella prenotazione.",
        url: `${SITE_URL}/prenotaora#step-extra`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Inserisci i tuoi dati",
        text: "Compila nome, cognome, contatti e numero della patente. I dati sono protetti e usati solo per il contratto.",
        url: `${SITE_URL}/prenotaora#step-dati`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Conferma e pagamento",
        text: "Verifica il riepilogo, accetta termini e condizioni, completa il pagamento sicuro o lascia la cauzione concordata.",
        url: `${SITE_URL}/prenotaora#step-pagamento`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Ricevi conferma e ritira il veicolo",
        text: "Riceverai email e messaggio WhatsApp con dettagli del ritiro. Al momento concordato il veicolo è consegnato dove preferisci.",
        url: `${SITE_URL}/prenotaora#step-conferma`,
      },
    ],
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
