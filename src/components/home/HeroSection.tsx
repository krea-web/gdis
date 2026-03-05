import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-foreground">
      {/* Video placeholder overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/70 to-foreground/95" />

      {/* Content */}
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 border border-primary/30">
            Noleggio in Sardegna
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-background leading-tight mb-6">
            Il tuo viaggio
            <br />
            <span className="text-primary">inizia qui.</span>
          </h1>
          <p className="text-lg md:text-xl text-background/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Auto, scooter, quad, veicoli di lusso e trasporto merci. Scegli il mezzo perfetto per la tua avventura.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/prenotaora">Prenota Ora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-background/20 text-background hover:bg-background/10">
              <Link to="/chisiamo">Scopri di più</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
