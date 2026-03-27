import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const destinations = [
  {
    name: "Porto Cervo",
    desc: "Il cuore della Costa Smeralda, boutique di lusso e yacht club esclusivi.",
    img: "https://images.unsplash.com/photo-1600430188203-bbb8dac84547?w=600&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "San Teodoro",
    desc: "Spiagge caraibiche e vita notturna nel nord-est sardo.",
    img: "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?w=600&q=80",
    span: "",
  },
  {
    name: "La Maddalena",
    desc: "Arcipelago cristallino, raggiungibile via ferry da Palau.",
    img: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80",
    span: "",
  },
  {
    name: "Cala Luna",
    desc: "Una delle spiagge più iconiche del Mediterraneo.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    span: "md:col-span-2",
  },
];

const EsploraSardegna = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Destinazioni</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Esplora la Sardegna</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          I nostri veicoli ti portano ovunque. Dalle spiagge nascoste alle strade panoramiche della Costa Smeralda.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${dest.span} ${
              dest.span.includes("row-span-2") ? "min-h-[400px]" : "min-h-[200px]"
            }`}
          >
            <img
              src={dest.img}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-display font-semibold text-primary-foreground">{dest.name}</h3>
              </div>
              <p className="text-sm text-primary-foreground/80">{dest.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EsploraSardegna;
