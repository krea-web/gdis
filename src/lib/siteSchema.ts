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
