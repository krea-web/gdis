import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dati Google Business Profile reali al 2026-05.
// Aggiornare RATING_VALUE/RATING_COUNT man mano che arrivano nuove recensioni.
// Quando le recensioni saranno >= 5, attivare anche lo schema.org AggregateRating
// mettendo emitSchema su true (Google policy: serve un campione minimo per il rich snippet).
const RATING_VALUE = "5.0";
const RATING_COUNT_LABEL = "Cliente verificato Google";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/mmKSjQChHSKX32XU8";

type Props = {
  name: string;
  /** Se attivato, emette schema.org AggregateRating. Solo con dati reali (Google Policy). */
  emitSchema?: boolean;
};

const LocalitaTrustBlock = ({ name, emitSchema = false }: Props) => {
  const aggregateRatingSchema = emitSchema
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent & Service",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: RATING_VALUE,
          reviewCount: "1",
          bestRating: "5",
        },
      }
    : null;

  return (
    <section className="py-20 md:py-24 bg-muted/20">
      <div className="container px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center gap-1 mb-4" aria-label={`Rating ${RATING_VALUE} su 5`}>
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {RATING_VALUE}
            <span className="text-muted-foreground text-2xl font-medium">/5</span>
          </p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            {RATING_COUNT_LABEL}
          </p>

          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            I clienti che hanno noleggiato auto, scooter o quad a <span className="text-primary font-semibold">{name}</span>{" "}
            raccontano la loro esperienza direttamente su Google. Trasparenza totale, niente filtri.
          </p>

          <div className="flex justify-center">
            <Button asChild variant="hero" size="lg" className="gap-2">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Vedi GDIS Service SRL su Google
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {aggregateRatingSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      )}
    </section>
  );
};

export default LocalitaTrustBlock;
