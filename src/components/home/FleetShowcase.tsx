import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicles, groupByCategory } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";

// Mappatura Immagini (assicurati che i nomi corrispondano al DB)
const vehicleImageMap: Record<string, string> = {
  "500": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20500%20BIANCA.jpg",
  "Panda Hybrid": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20PANDA.jpeg",
  "SH 125i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH125.jpg",
  "SH 350i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH350.webp",
  "Raptor 700R":
    "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/YAMAHA%20RAPTOR%20QUAD%20BLU.jpg",
};

// Meta Info per ogni categoria
const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  city_car: {
    title: "City Car",
    subtitle: "Utilitarie e berline",
    description: "Design compatto ed eleganza per muoverti in città e scoprire la costa con il massimo comfort.",
  },
  quad: {
    title: "Quad",
    subtitle: "Avventura off-road",
    description:
      "Potenza e adrenalina pura. Esplora sentieri sterrati e spiagge nascoste che le auto non possono raggiungere.",
  },
  scooter: {
    title: "Scooter",
    subtitle: "Due ruote",
    description:
      "Evita il traffico e goditi la libertà assoluta. La brezza mediterranea sulla pelle in ogni tuo spostamento.",
  },
};

// L'ORDINE ESATTO RICHIESTO
const DESIRED_ORDER = ["city_car", "quad", "scooter"];

const FleetShowcase = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const grouped = vehicles ? groupByCategory(vehicles) : {};

  // Filtriamo le categorie disponibili rispettando rigorosamente l'ordine desiderato
  const availableCategories = DESIRED_ORDER.filter((cat) => grouped[cat] && grouped[cat].length > 0);

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
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
          <div className="flex flex-col gap-16 md:gap-24">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-[500px] md:h-[600px] rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-16 md:gap-24">
            {availableCategories.map((cat, i) => {
              const meta = categoryMeta[cat];
              const firstVehicle = grouped[cat][0];
              const image = vehicleImageMap[firstVehicle?.model ?? ""] || firstVehicle?.image_url || "/placeholder.jpg";
              const lowestPrice = Math.min(...grouped[cat].map((v) => v.daily_rate ?? 0));

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  <Link
                    to="/prenotaora"
                    className="group relative block w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,255,0.2)] hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-slate-200">
                      <img
                        src={image}
                        alt={`Noleggio ${meta.title} in Costa Smeralda`}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="max-w-2xl">
                        <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-3 block drop-shadow-md">
                          {meta.subtitle}
                        </span>
                        <h3 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
                          {meta.title}
                        </h3>
                        <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-6">
                          {meta.description}
                        </p>
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
                          <span className="text-white font-medium">
                            A partire da <strong className="text-xl">€{lowestPrice}</strong>/giorno
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <div className="flex items-center gap-4 bg-white text-slate-900 rounded-full px-8 py-4 font-bold shadow-lg transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                          <span>Prenota Ora</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetShowcase;
