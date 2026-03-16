const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
import { motion } from "framer-motion";

const items = [
  "Affidabilità",
  "Flotta Premium",
  "Assistenza 24/7",
  "Prezzi Trasparenti",
  "Sardegna",
  "Noleggio Facile",
];

const MarqueeContent = () => (
  <>
    {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
      <div key={i} className="flex items-center px-6 md:px-10 flex-shrink-0">
        <span className="text-white font-display font-black text-sm md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
          {item}
        </span>
        <img src={gdisLogo} alt="GDIS" className="h-6 md:h-8 w-auto opacity-90 drop-shadow-md ml-6 md:ml-10 flex-shrink-0" />
      </div>
    ))}
  </>
);

const TrustMarquee = () => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-14 bg-transparent z-20 -mt-16">
      <div className="absolute w-[200%] left-1/2 -translate-x-1/2 bg-blue-600 transform -rotate-2 py-5 shadow-[0_10px_40px_rgba(0,0,255,0.3)] border-y border-blue-400/30 overflow-hidden">
        <div className="flex w-max overflow-hidden">
          <motion.div
            className="flex items-center flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            <MarqueeContent />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;
