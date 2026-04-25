import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TrustMarquee from "@/components/home/TrustMarquee";
import MinimalIntro from "@/components/home/MinimalIntro";
import ComeFunziona from "@/components/home/ComeFunziona";
import FleetShowcase from "@/components/home/FleetShowcase";
import EsploraSardegna from "@/components/home/EsploraSardegna";
import Recensioni from "@/components/home/Recensioni";
import LuxurySection from "@/components/home/LuxurySection";
import PremiumBanner from "@/components/home/PremiumBanner";
import {
  buildLocalBusinessSchema,
  SITE_URL,
  BUSINESS_PHONE,
  BUSINESS_LEGAL_NAME,
} from "@/lib/siteSchema";

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
      <TrustMarquee />
      <MinimalIntro />
      <ComeFunziona />
      <FleetShowcase />
      <LuxurySection />
      <PremiumBanner />
      <EsploraSardegna />
      <Recensioni />
    </>
  );
};

export default Index;
