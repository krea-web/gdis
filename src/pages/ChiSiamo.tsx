import SEOHead from "@/components/SEOHead";
import ChiSiamoHero from "@/components/chisiamo/ChiSiamoHero";
import SplitTimeline from "@/components/chisiamo/SplitTimeline";
import TrustMarquee2 from "@/components/chisiamo/TrustMarquee2";
import FaqSection from "@/components/chisiamo/FaqSection";
import SocialProof from "@/components/chisiamo/SocialProof";
import LuxuryCta from "@/components/chisiamo/LuxuryCta";
import FinalCta from "@/components/chisiamo/FinalCta";

const ChiSiamo = () => {
  return (
    <>
      <SEOHead
        title="Chi Siamo — GDIS Rent e Service | Noleggio in Sardegna"
        description="Scopri GDIS Rent e Service: noleggio auto, scooter, quad e trasporti in Sardegna. Assistenza 24/7, flotta premium e consegna VIP in Costa Smeralda."
        canonical="/chisiamo"
      />
      <ChiSiamoHero />
      <SplitTimeline />
      <TrustMarquee2 />
      <FaqSection />
      <SocialProof />
      <LuxuryCta />
      <FinalCta />
    </>
  );
};

export default ChiSiamo;
