import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
  <section className="py-24 bg-muted/30 relative overflow-hidden">
    <div className="container">
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

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6 italic">"{review.text}"</p>
            <div>
              <p className="font-semibold text-foreground">{review.name}</p>
              <p className="text-sm text-muted-foreground">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Recensioni;
