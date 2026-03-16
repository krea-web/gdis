import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VipDeliveryBanner = () => {
  return (
    <section className="relative py-16 md:py-20 bg-transparent overflow-hidden z-10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/30 backdrop-blur-sm p-8 md:p-14"
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="text-primary font-display text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-3 block">
                Esclusiva GDIS
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                Servizio Consegna{" "}
                <span className="text-primary italic">VIP</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-2xl">
                Portiamo il tuo veicolo ovunque: da <strong className="text-foreground">Palau</strong> a{" "}
                <strong className="text-foreground">San Teodoro</strong>, passando per{" "}
                <strong className="text-foreground">Porto Cervo</strong> e la{" "}
                <strong className="text-foreground">Costa Smeralda</strong>. Direttamente in hotel, villa o yacht.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="lg" asChild className="gap-2">
                  <Link to="/prenotaora">
                    Prenota con Consegna
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VipDeliveryBanner;
