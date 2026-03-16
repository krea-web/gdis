import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicles, groupByCategory, getLowestRate } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";

// Mappatura dei nuovi PNG trasparenti per categoria
const transparentImageMap: Record<string, string> = {
  city_car: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png",
  quad: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-yamahaquadraptor.png",
  scooter: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-hondascooter350.png",
};

// Meta Info per ogni categoria
const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  city_car: {
    title: "City Car",
    subtitle: "Praticità & Stile",
    description:
      "Design compatto ed eleganza per muoverti in città e scoprire la costa con il massimo comfort. L'opzione perfetta per la Costa Smeralda.",
  },
  quad: {
    title: "Quad Raptor",
    subtitle: "Avventura off-road",
    description:
      "Potenza e adrenalina pura. Esplora sentieri sterrati e spiagge nascoste che le auto non possono raggiungere.",
  },
  scooter: {
    title: "Scooter Premium",
    subtitle: "Libertà a 2 Ruote",
    description:
      "Evita il traffico e goditi la libertà assoluta. Senti la brezza mediterranea sulla pelle in ogni tuo spostamento.",
  },
};

// Ordine esatto richiesto
const DESIRED_ORDER = ["city_car", "quad", "scooter"];

const FleetShowcase = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const grouped = vehicles ? groupByCategory(vehicles) : {};

  // Filtriamo le categorie disponibili
  const availableCategories = DESIRED_ORDER.filter((cat) => grouped[cat] && grouped[cat].length > 0);

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden relative">
      {/* Texture di sfondo invisibile per dare profondità */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container px-4 relative z-10">
        {/* HEADER SEZIONE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 md:mb-32 text-center max-w-3xl mx-auto"
        >
          <span className="text-blue-600 font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            La Nostra Flotta
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Scegli la tua <br className="hidden md:block" />
            <span className="italic font-light text-blue-600">Prossima Avventura.</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col gap-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center">
                <Skeleton className="w-full md:w-1/2 h-[300px] rounded-3xl" />
                <div className="w-full md:w-1/2 space-y-4">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-3/4 h-12" />
                  <Skeleton className="w-full h-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-24 md:gap-40">
            {availableCategories.map((cat, i) => {
              const meta = categoryMeta[cat];
              const image = transparentImageMap[cat];
              const lowestPrice = Math.min(...grouped[cat].map((v) => v.daily_rate ?? 0));

              // Logica Alternata: I pari hanno immagine a destra, i dispari a sinistra
              const isEven = i % 2 === 0;

              return (
                <div
                  key={cat}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 md:gap-20 group`}
                >
                  {/* COLONNA TESTO */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-3 block">
                      {meta.subtitle}
                    </span>
                    <h3 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                      {meta.title}
                    </h3>
                    <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
                      {meta.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Link to="/prenotaora">
                        <div className="flex items-center gap-4 bg-blue-600 text-white rounded-full px-8 py-4 font-bold shadow-[0_10px_30px_rgba(0,0,255,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,255,0.4)] hover:-translate-y-1 transition-all duration-300">
                          <span>Prenota Ora</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                      <span className="text-slate-600 font-medium">
                        Da <strong className="text-2xl text-slate-900">€{lowestPrice}</strong>
                        <span className="text-sm">/giorno</span>
                      </span>
                    </div>
                  </motion.div>

                  {/* COLONNA IMMAGINE (PNG TRASPARENTE) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: isEven ? 5 : -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-1/2 relative flex justify-center items-center perspective-[1000px]"
                  >
                    {/* Bagliore "Studio Lighting" dietro al veicolo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-400/20 blur-[80px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />

                    {/* Immagine del veicolo con effetto Float e Ombra realistica */}
                    <motion.img
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: i * 0.5 }}
                      src={image}
                      alt={meta.title}
                      className="relative z-10 w-[90%] md:w-full max-w-[600px] h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetShowcase;
