import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const LuxuryCta = () => {
  return (
    <section className="bg-brand-dark section-padding">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Luxury Experience
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Vuoi un'auto esclusiva?
          </h2>
          <p className="text-primary-foreground/40 text-lg mb-10 leading-relaxed">
            Contattaci su WhatsApp per scoprire la disponibilità delle nostre supercar e luxury cars.
          </p>
          <Button variant="whatsapp" size="xl" asChild>
            <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
              Scrivici su WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryCta;
