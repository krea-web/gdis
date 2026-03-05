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
    // 1. WRAPPER DRITTO (Nasconde gli angoli che sbordano)
    // Il margine negativo (-mt-8) lo fa sovrapporre fluidamente alla Hero
    <section className="relative w-full overflow-hidden flex items-center justify-center py-16 bg-transparent z-20 -mt-8">
      {/* 2. BARRA BLU RUOTATA (Larga 110% e spostata a sinistra per coprire i buchi) */}
      <div className="absolute w-[110%] -left-[5%] bg-blue-600 transform -rotate-2 py-4 md:py-5 shadow-[0_10px_40px_rgba(0,0,255,0.3)] border-y border-blue-400/30">
        {/* 3. ANIMAZIONE INFINITA CON FRAMER MOTION */}
        <div className="flex w-max">
          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }} // Abbassa la duration per farlo andare più veloce
          >
            {/* Duplichiamo l'array 4 volte per garantire che lo scroll non si svuoti mai */}
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <div key={i} className="flex items-center px-8 md:px-12">
                {/* TESTO */}
                <span className="text-white font-display font-black text-sm md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
                  {item}
                </span>

                {/* LOGO CENTRATO (La spaziatura è gestita dal px-8 del contenitore padre) */}
                <img
                  src={gdisLogo}
                  alt="GDIS"
                  className="h-6 md:h-8 w-auto opacity-90 drop-shadow-md ml-16 md:ml-24" // Margine sinistro per distanziarlo dal testo
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;
