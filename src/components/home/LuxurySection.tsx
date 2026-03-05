import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Crown } from "lucide-react";
import luxuryCar from "@/assets/luxury-car.jpg";

const LuxurySection = () => {
  return (
    <section className="relative bg-brand-dark overflow-hidden">
      <div className="container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown size={18} className="text-primary" />
              </div>
              <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em]">
                Luxury
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Guida
              <br />
              l'eccellenza.
            </h2>
            <p className="text-primary-foreground/40 text-lg mb-10 max-w-md leading-relaxed">
              La nostra selezione premium per chi cerca un'esperienza di guida unica. Contattaci per scoprire le disponibilità.
            </p>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                Contattaci per le disponibilità Luxury
              </a>
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden blue-glow">
              <img
                src={luxuryCar}
                alt="Luxury car"
                className="w-full h-auto object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>
            {/* Decorative ring */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-primary/20 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-primary/10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxurySection;
