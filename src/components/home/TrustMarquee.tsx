import gdisLogo from "@/assets/gdis-logo.png";
import { motion } from "framer-motion";

const items = [
  "Affidabilità",
  "Flotta Premium",
  "Assistenza 24/7",
  "Prezzi Trasparenti",
  "Sardegna",
  "Noleggio Facile",
];

const TrustMarquee = () => {
  return (
    // 1. WRAPPER DRITTO: -mt-12 tira la sezione su per "mangiare" il buco bianco
    // py-20 dà spazio interno affinché la barra non venga tagliata sopra o sotto
    <section className="relative w-full overflow-hidden flex items-center justify-center py-14 bg-transparent z-20 -mt-16">
      {/* 2. BARRA BLU GIGANTE: Larghezza 150%, centrata e ruotata */}
      <div className="absolute w-[150%] left-1/2 -translate-x-1/2 bg-blue-600 transform -rotate-2 py-5 shadow-[0_10px_40px_rgba(0,0,255,0.3)] border-y border-blue-400/30">
        {/* 3. ANIMAZIONE FLUIDA */}
        <div className="flex w-max">
          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* Array moltiplicato per garantire lo scroll infinito continuo */}
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <div key={i} className="flex items-center px-8 md:px-12">
                <span className="text-white font-display font-black text-sm md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
                  {item}
                </span>
                {/* Logo centrato tra le parole */}
                <img src={gdisLogo} alt="GDIS" className="h-6 md:h-8 w-auto opacity-90 drop-shadow-md ml-8 md:ml-12" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;
