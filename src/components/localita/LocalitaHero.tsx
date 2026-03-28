import { motion } from "framer-motion";
import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  subtitle: string;
  bgImage: string;
};

const LocalitaHero = ({ name, subtitle, bgImage }: Props) => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15),transparent_70%)]" />

    <div className="container relative z-10 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <MapPin className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">
          {name}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6"
      >
        Noleggio Auto, Scooter e Quad
        <br />
        <span className="text-primary">a {name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button variant="hero" size="lg" asChild>
          <Link to="/prenotaora">Prenota il Tuo Veicolo</Link>
        </Button>
        <Button
          size="lg"
          asChild
          className="rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
        >
          <a href="https://wa.me/393200625543" target="_blank" rel="noopener noreferrer">
            <Truck className="mr-2 h-5 w-5" />
            Consegna VIP a {name}
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default LocalitaHero;
