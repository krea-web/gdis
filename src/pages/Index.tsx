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

const Index = () => {
  return (
    <>
      <SEOHead
        title="GDIS Rent — Noleggio Auto, Scooter e Quad in Sardegna"
        description="Noleggio auto, scooter, quad e veicoli luxury in Sardegna. Consegna VIP in Costa Smeralda, Porto Cervo, Palau e San Teodoro. Prenota online in 2 minuti."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: "GDIS Rent e Service",
          description: "Noleggio auto, scooter, quad e luxury in Sardegna",
          areaServed: { "@type": "Place", name: "Sardegna, Italia" },
          url: "https://gdisrentservice.com",
        }}
      />
      <HeroSection />
      <TrustMarquee />
      <MinimalIntro />
      <ComeFunziona />
      <FleetShowcase />
      <EsploraSardegna />
      <Recensioni />
      <LuxurySection />
      <PremiumBanner />
    </>
  );
};

export default Index;
