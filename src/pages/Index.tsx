import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import {
  buildLocalBusinessSchema,
  SITE_URL,
  BUSINESS_PHONE,
  BUSINESS_LEGAL_NAME,
} from "@/lib/siteSchema";

const TrustMarquee = lazy(() => import("@/components/home/TrustMarquee"));
const MinimalIntro = lazy(() => import("@/components/home/MinimalIntro"));
const ComeFunziona = lazy(() => import("@/components/home/ComeFunziona"));
const FleetShowcase = lazy(() => import("@/components/home/FleetShowcase"));
const LuxurySection = lazy(() => import("@/components/home/LuxurySection"));
const PremiumBanner = lazy(() => import("@/components/home/PremiumBanner"));
const EsploraSardegna = lazy(() => import("@/components/home/EsploraSardegna"));
const Recensioni = lazy(() => import("@/components/home/Recensioni"));

const homeLocalBusinessSchema = buildLocalBusinessSchema({
  id: `${SITE_URL}/#localbusiness`,
  description:
    "GDIS Rent & Service — Noleggio auto, scooter e quad a Olbia e in Costa Smeralda. Consegna VIP in aeroporto, porto, hotel o villa.",
});

const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio auto",
    provider: { "@type": "Organization", name: BUSINESS_LEGAL_NAME, telephone: BUSINESS_PHONE },
    areaServed: [
      { "@type": "City", name: "Olbia" },
      { "@type": "AdministrativeArea", name: "Costa Smeralda" },
    ],
    url: `${SITE_URL}/noleggio-auto-a-olbia`,
    name: "Noleggio auto a Olbia e Costa Smeralda",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio scooter",
    provider: { "@type": "Organization", name: BUSINESS_LEGAL_NAME, telephone: BUSINESS_PHONE },
    areaServed: [{ "@type": "City", name: "Olbia" }],
    url: `${SITE_URL}/flotta/honda-sh`,
    name: "Noleggio scooter Honda SH a Olbia",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio quad",
    provider: { "@type": "Organization", name: BUSINESS_LEGAL_NAME, telephone: BUSINESS_PHONE },
    areaServed: [{ "@type": "AdministrativeArea", name: "Gallura" }],
    url: `${SITE_URL}/flotta/yamaha-raptor`,
    name: "Noleggio quad Yamaha Raptor in Sardegna",
  },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Noleggio Auto Olbia e Costa Smeralda | Consegna VIP H24 | GDIS Rent"
        description="Noleggio auto a Olbia e Costa Smeralda ✓ Consegna VIP in Aeroporto e Porto Isola Bianca ✓ Fiat Panda, Mercedes, scooter, quad ✓ Zero code. WhatsApp H24."
        canonical="/"
        jsonLd={[homeLocalBusinessSchema, ...serviceSchemas]}
      />
      <HeroSection />
      <Suspense fallback={<div className="h-32" aria-hidden="true" />}>
        <TrustMarquee />
        <MinimalIntro />
        <ComeFunziona />
        <FleetShowcase />
        <LuxurySection />
        <PremiumBanner />
        <EsploraSardegna />
        <Recensioni />
      </Suspense>
    </>
  );
};

export default Index;
