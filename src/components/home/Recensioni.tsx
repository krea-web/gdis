import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Marco R.",
    location: "Milano",
    text: "Servizio impeccabile! La Panda ci aspettava direttamente al porto di Olbia. Tutto perfetto, torneremo sicuramente.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    location: "Parigi",
    text: "Le scooter Honda SH sono in condizioni perfette. Abbiamo esplorato la Costa Smeralda in totale libertà. Consegna VIP fantastica!",
    rating: 5,
  },
  {
    name: "Alessandro D.",
    location: "Roma",
    text: "Il quad Yamaha Raptor è una bestia! Spiagge nascoste raggiungibili solo off-road. Esperienza unica, staff gentilissimo.",
    rating: 5,
  },
];

const Recensioni = () => (
  <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Testimonianze</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Cosa Dicono di Noi</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative group rounded-2xl p-8 bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:shadow-[0_10px_40px_hsl(var(--primary)/0.1)] transition-all duration-300"
          >
            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 italic text-base">"{review.text}"</p>
              <div className="border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Google Review CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-3 px-10 h-14 shadow-[0_10px_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_15px_40px_hsl(var(--primary)/0.4)] transition-all duration-300"
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Lascia una recensione su Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default Recensioni;
