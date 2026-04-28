import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingVehicle from "./FloatingVehicle";
import { trackWhatsAppClick } from "@/lib/analytics";

type Props = {
  name: string;
  subtitle: string;
  bgImage: string;
  vehicleImage: string;
  vehicleAlt: string;
  h1Prefix?: string;
  h1Accent?: string;
};

const LocalitaHeroV2 = ({
  name,
  subtitle,
  bgImage,
  vehicleImage,
  vehicleAlt,
  h1Prefix = "Noleggio Auto a",
  h1Accent,
}: Props) => (
  <section className="relative min-h-[90vh] flex items-end pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.2),transparent_60%)]" />

    <div className="container relative z-10 px-4">
      <div className="grid lg:grid-cols-2 gap-8 items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-4"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">{name}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.95] mb-6"
          >
            {h1Prefix}<br />
            <span className="text-primary">{h1Accent ?? name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/60 max-w-md mb-8"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/prenotaora">Prenota Ora</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
            >
              <a
                href="https://wa.me/393200625543"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`localita_hero_${name.toLowerCase().replace(/\s+/g, "_")}`)}
              >
                Consegna VIP
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:flex lg:justify-end lg:pr-4 xl:pr-8"
        >
          <FloatingVehicle image={vehicleImage} alt={vehicleAlt} className="w-full max-w-sm xl:max-w-md" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default LocalitaHeroV2;
