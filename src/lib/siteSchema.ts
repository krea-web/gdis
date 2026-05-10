export const SITE_URL = "https://gdisrentservice.com";
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

type SiteLocale = "it" | "en" | "de" | "fr";
const LOCALE_IETF: Record<SiteLocale, string> = {
  it: "it-IT",
  en: "en-GB",
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
  areaServed: Array<{ "@type": string; name: string }> | string;
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
  en: "en-GB",
  de: "de-DE",
  fr: "fr-FR",
};

const BOOKING_HOWTO_COPY: Record<BookingLocale, {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}> = {
  it: {
    name: "Come prenotare un'auto a Olbia con GDIS Rent",
    description:
      "Procedura online in 6 step per prenotare auto, scooter o quad a Olbia e in Costa Smeralda con consegna VIP.",
    steps: [
      { name: "Scegli il veicolo", text: "Seleziona auto, scooter o quad dalla nostra flotta in base al tipo di viaggio (city car, premium, off-road)." },
      { name: "Imposta date e luogo di consegna", text: "Inserisci data e ora di ritiro/riconsegna e scegli dove vuoi ricevere il veicolo: aeroporto Olbia, porto, stazione, hotel o villa." },
      { name: "Aggiungi extra opzionali", text: "Seggiolino bambino, secondo guidatore, copertura kasko, GPS o altri extra inclusi nella prenotazione." },
      { name: "Inserisci i tuoi dati", text: "Compila nome, cognome, contatti e numero della patente. I dati sono protetti e usati solo per il contratto." },
      { name: "Conferma e pagamento", text: "Verifica il riepilogo, accetta termini e condizioni, completa il pagamento sicuro o lascia la cauzione concordata." },
      { name: "Ricevi conferma e ritira il veicolo", text: "Riceverai email e messaggio WhatsApp con dettagli del ritiro. Al momento concordato il veicolo è consegnato dove preferisci." },
    ],
  },
  en: {
    name: "How to book a car in Olbia with GDIS Rent",
    description:
      "6-step online procedure to book a car, scooter or quad in Olbia and Costa Smeralda with VIP delivery.",
    steps: [
      { name: "Choose your vehicle", text: "Pick a car, scooter or quad from our fleet based on your trip type (city car, premium, off-road)." },
      { name: "Set dates and delivery location", text: "Enter pick-up/drop-off date and time and choose where you want the vehicle delivered: Olbia airport, port, station, hotel or villa." },
      { name: "Add optional extras", text: "Child seat, second driver, full insurance cover, GPS or other extras included in your booking." },
      { name: "Enter your details", text: "Fill in name, surname, contact info and driving licence number. Data is protected and used only for the rental contract." },
      { name: "Confirm and pay", text: "Review the summary, accept the terms and conditions, complete the secure payment or leave the agreed deposit." },
      { name: "Get confirmation and pick up your vehicle", text: "You'll receive an email and WhatsApp message with collection details. At the agreed time we deliver the vehicle wherever you prefer." },
    ],
  },
  de: {
    name: "So buchen Sie ein Auto in Olbia bei GDIS Rent",
    description:
      "6-stufiger Online-Buchungsablauf für Auto-, Roller- oder Quad-Vermietung in Olbia und der Costa Smeralda mit VIP-Lieferung.",
    steps: [
      { name: "Fahrzeug auswählen", text: "Wählen Sie aus unserer Flotte Auto, Roller oder Quad — passend zu Ihrer Reise (Stadtauto, Premium, Offroad)." },
      { name: "Datum und Lieferort festlegen", text: "Geben Sie Abhol- und Rückgabedatum ein und wählen Sie den Lieferort: Flughafen Olbia, Hafen, Bahnhof, Hotel oder Villa." },
      { name: "Optionale Extras hinzufügen", text: "Kindersitz, Zweitfahrer, Vollkaskoschutz, GPS oder weitere Extras in Ihre Buchung aufnehmen." },
      { name: "Ihre Daten eingeben", text: "Tragen Sie Vorname, Nachname, Kontakt und Führerscheinnummer ein. Die Daten sind geschützt und werden nur für den Mietvertrag verwendet." },
      { name: "Bestätigen und bezahlen", text: "Übersicht prüfen, AGB akzeptieren, sichere Zahlung abschließen oder die vereinbarte Kaution hinterlegen." },
      { name: "Bestätigung erhalten und Fahrzeug abholen", text: "Sie erhalten E-Mail und WhatsApp-Nachricht mit den Abholdetails. Zur vereinbarten Zeit liefern wir das Fahrzeug wohin Sie möchten." },
    ],
  },
  fr: {
    name: "Comment réserver une voiture à Olbia avec GDIS Rent",
    description:
      "Procédure en ligne en 6 étapes pour réserver voiture, scooter ou quad à Olbia et en Costa Smeralda avec livraison VIP.",
    steps: [
      { name: "Choisissez votre véhicule", text: "Sélectionnez voiture, scooter ou quad dans notre flotte selon le type de voyage (citadine, premium, tout-terrain)." },
      { name: "Définissez les dates et le lieu de livraison", text: "Saisissez date et heure de prise en charge/restitution et choisissez le lieu de livraison : aéroport d'Olbia, port, gare, hôtel ou villa." },
      { name: "Ajoutez des extras optionnels", text: "Siège enfant, deuxième conducteur, assurance tous risques, GPS ou autres extras inclus dans votre réservation." },
      { name: "Renseignez vos coordonnées", text: "Remplissez nom, prénom, contacts et numéro de permis. Les données sont protégées et servent uniquement au contrat de location." },
      { name: "Confirmez et payez", text: "Vérifiez le récapitulatif, acceptez les conditions générales, complétez le paiement sécurisé ou laissez la caution convenue." },
      { name: "Recevez la confirmation et récupérez le véhicule", text: "Vous recevrez un e-mail et un message WhatsApp avec les détails de la prise en charge. À l'heure convenue nous livrons le véhicule où vous le souhaitez." },
    ],
  },
};

const BOOKING_HOWTO_STEP_ANCHOR = ["#step-veicolo", "#step-date", "#step-extra", "#step-dati", "#step-pagamento", "#step-conferma"];

/** Build a HowTo schema describing the GDIS booking flow (6 steps). */
export function buildHowToBookingSchema(locale: BookingLocale = "it") {
  const path = BOOKING_HOWTO_PATH[locale];
  const copy = BOOKING_HOWTO_COPY[locale];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}${path}#howto`,
    name: copy.name,
    description: copy.description,
    totalTime: "PT3M",
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
