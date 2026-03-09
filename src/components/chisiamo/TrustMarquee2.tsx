const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
import { motion } from "framer-motion";

// Copywriting potenziato e mirato per Rent & Trasporti
const items = [
  "Oltre 500 Clienti Soddisfatti",
  "Nessun Costo Nascosto",
  "Copertura in Tutta la Sardegna",
  "Assistenza Stradale H24",
  "Flotta Costantemente Rinnovata",
  "Citycar, Luxury & Furgoni",
  "Logistica Dedicata",
  "Trasparenza Totale",
];

const TrustMarquee2 = () => {
  return (
    // 1. WRAPPER DRITTO: py-24 dà respiro, overflow-hidden nasconde le punte ruotate
    <section className="relative w-full overflow-hidden flex items-center justify-center py-24 bg-transparent z-20">
      {/* 2. BARRA BLU GIGANTE: w-150% centrata e ruotata in senso OPPOSTO (+2 gradi) */}
      <div className="absolute w-[150%] left-1/2 -translate-x-1/2 bg-blue-600 transform rotate-2 py-6 md:py-8 shadow-[0_15px_50px_rgba(0,0,255,0.4)] border-y border-blue-400/40">
        {/* 3. ANIMAZIONE FLUIDA (Scorre al contrario: da -50% a 0%) */}
        <div className="flex w-max">
          <motion.div
            className="flex items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {/* Moltiplichiamo l'array per garantire lo scroll infinito in reverse */}
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <div key={i} className="flex items-center px-8 md:px-16">
                {/* TESTO MASSICCIO */}
                <span className="text-white font-display font-black text-lg md:text-3xl uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-md">
                  {item}
                </span>

                {/* LOGO INGRANDITO */}
                <img src={gdisLogo} alt="GDIS" className="h-8 md:h-12 w-auto opacity-90 drop-shadow-lg ml-8 md:ml-16" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee2;
