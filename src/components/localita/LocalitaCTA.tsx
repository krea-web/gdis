import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  name: string;
};

const LocalitaCTA = ({ name }: Props) => (
  <section className="relative py-32 md:py-40 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-slate-900" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.4),transparent_60%)]" />

    <div className="container relative z-10 text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4"
      >
        Pronto a esplorare {name}?
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-display font-black text-white mb-6"
      >
        Il Tuo Veicolo Ti Aspetta
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-lg text-white/70 max-w-xl mx-auto mb-10"
      >
        Consegna VIP direttamente al tuo hotel, villa o porto a {name}. Prenota in 2 minuti.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-5"
      >
        <Button
          size="lg"
          asChild
          className="rounded-full bg-white text-primary hover:bg-white/90 font-bold gap-3 px-12 h-16 text-lg shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.3)] transition-all duration-300 animate-[pulse_3s_ease-in-out_infinite]"
        >
          <Link to="/prenotaora">
            Prenota Ora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <p className="text-sm text-white/70">
          Hai dubbi?{" "}
          <Link to="/contatti" className="text-white font-semibold underline-offset-4 hover:underline">
            Scrivici
          </Link>{" "}
          o torna alla{" "}
          <Link to="/" className="text-white font-semibold underline-offset-4 hover:underline">
            home
          </Link>{" "}
          per esplorare la flotta.
        </p>
      </motion.div>
    </div>
  </section>
);

export default LocalitaCTA;
