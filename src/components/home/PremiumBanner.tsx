import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import premiumBg from "@/assets/premium-banner-bg.jpg";

const PremiumBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={premiumBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/60" />
      </div>

      <div className="relative z-10 container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Premium Collection
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Noleggia Premium Car
            <br />
            con <span className="text-gradient-blue">GDIS</span>
          </h2>
          <p className="text-primary-foreground/50 text-lg mb-10 max-w-lg leading-relaxed">
            Esperienza di guida senza compromessi. Eleganza, potenza e comfort in ogni dettaglio.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/prenotaora">Scopri la Collezione</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumBanner;
