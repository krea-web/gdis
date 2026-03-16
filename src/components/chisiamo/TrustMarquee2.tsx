const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
import { motion } from "framer-motion";

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

const MarqueeContent = () => (
  <>
    {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
      <div key={i} className="flex items-center px-6 md:px-12 flex-shrink-0">
        <span className="text-white font-display font-black text-lg md:text-3xl uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-md">
          {item}
        </span>
        <img src={gdisLogo} alt="GDIS" className="h-8 md:h-12 w-auto opacity-90 drop-shadow-lg ml-6 md:ml-12 flex-shrink-0" />
      </div>
    ))}
  </>
);

const TrustMarquee2 = () => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-24 bg-transparent z-20">
      <div className="absolute w-[200%] left-1/2 -translate-x-1/2 bg-blue-600 transform rotate-2 py-6 md:py-8 shadow-[0_15px_50px_rgba(0,0,255,0.4)] border-y border-blue-400/40 overflow-hidden">
        <div className="flex w-max overflow-hidden">
          <motion.div
            className="flex items-center flex-shrink-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
          >
            <MarqueeContent />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee2;
