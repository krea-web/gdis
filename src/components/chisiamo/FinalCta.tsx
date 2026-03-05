import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import luxuryCar from "@/assets/luxury-car.jpg";

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden h-[60vh] flex items-center">
      <div className="absolute inset-0">
        <img src={luxuryCar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />
      </div>
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Pronto a
            <br />
            <span className="text-gradient-blue">partire?</span>
          </h2>
          <Button variant="hero" size="xl" asChild>
            <Link to="/prenotaora">
              Prenota Ora
              <ArrowRight size={20} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
