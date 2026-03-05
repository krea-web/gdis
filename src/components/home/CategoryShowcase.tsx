import { Card, CardContent } from "@/components/ui/card";
import { Car, Bike, Truck, Crown } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: Car,
    title: "Auto",
    description: "Utilitarie, berline e SUV per ogni esigenza.",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Bike,
    title: "Scooter & Quad",
    description: "Libertà su due e quattro ruote in Sardegna.",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Crown,
    title: "Luxury",
    description: "Veicoli esclusivi per occasioni speciali.",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Truck,
    title: "Trasporti",
    description: "Furgoni e camion per traslochi e logistica.",
    gradient: "from-primary/10 to-primary/5",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategoryShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            La nostra <span className="text-primary">flotta</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Scegli tra le nostre categorie di veicoli per trovare quello perfetto per te.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={item}>
              <Card className="group border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
