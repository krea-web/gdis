import { motion } from "framer-motion";
import { Star, ExternalLink, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

// AGGIORNA con i dati reali del tuo Google Business Profile.
// Quando hai dati reali, attiva anche lo schema.org AggregateRating mettendo emitSchema su true.
const RATING_VALUE = "4.9";
const RATING_COUNT = "100+";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=GDIS+Rent+Service+Olbia#lrd=0x0:0x0,1";
const GOOGLE_LEAVE_REVIEW_URL = "https://g.page/r/CQ_REPLACE_WITH_REAL_PLACE_ID/review";

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
          reviewCount: RATING_COUNT.replace(/\+/g, ""),
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
            {RATING_COUNT} recensioni verificate su Google
          </p>

          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            I clienti che hanno noleggiato auto, scooter o quad a <span className="text-primary font-semibold">{name}</span>{" "}
            raccontano la loro esperienza direttamente su Google. Recensioni autentiche, prima e dopo la consegna VIP.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="hero" size="lg" className="gap-2">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Leggi le recensioni Google
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 rounded-full"
            >
              <a href={GOOGLE_LEAVE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                <MessageSquarePlus className="h-4 w-4" />
                Lascia la tua recensione
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
