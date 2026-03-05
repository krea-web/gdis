const vehicleImageMap: Record<string, string> = {
  "500": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20500%20BIANCA.jpg",
  "Panda Hybrid": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20PANDA.jpeg",
  "SH 125i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH125.jpg",
  "SH 350i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH350.webp",
  "Raptor 700R": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/YAMAHA%20RAPTOR%20QUAD%20BLU.jpg",
};

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicles, groupByType } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import VehicleFallbackCard from "@/components/VehicleFallbackCard";

const categoryMeta: Record<string, { subtitle: string; description: string }> = {
  Citycar: { subtitle: "Utilitarie e berline", description: "Perfette per muoverti in città e lungo la costa." },
  Scooter: { subtitle: "Due ruote", description: "Libertà su due ruote nella brezza mediterranea." },
  Quad: { subtitle: "Avventura off-road", description: "Esplora sentieri e spiagge nascoste." },
};

const spanMap: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2",
};

const FleetShowcase = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const grouped = vehicles ? groupByType(vehicles) : {};
  const categories = Object.keys(grouped).length > 0 ? Object.keys(grouped) : [];

  return (
    <section className="py-16 md:py-20 bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            La Flotta
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Scegli il tuo mezzo
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[220px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
                className={`${i === 0 ? "md:col-span-2 md:row-span-2" : ""} rounded-2xl overflow-hidden`}
              >
                <Skeleton className="w-full h-full rounded-2xl" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[220px]">
            {categories.map((cat, i) => {
              const meta = categoryMeta[cat] ?? { subtitle: cat, description: "" };
              const firstVehicle = grouped[cat]?.[0];
              const image = vehicleImageMap[firstVehicle?.model ?? ""] || firstVehicle?.image_url || "/placeholder.svg";
              const lowestPrice = Math.min(...grouped[cat].map((v) => v.price_low_season));

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={spanMap[i] ?? "md:col-span-1"}
                >
                  <Link
                    to="/prenotaora"
                    className="group relative rounded-2xl overflow-hidden h-full flex flex-col justify-end p-6 md:p-8 cursor-pointer"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={vehicleImageMap[firstVehicle?.model ?? ""] || image || "/placeholder.svg"}
                        alt={cat}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10 mix-blend-overlay" />
                    <div className="relative z-10">
                      <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest">
                        {meta.subtitle}
                      </span>
                      <div className="flex items-end justify-between mt-1">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                            {cat}
                          </h3>
                          <p className="text-primary-foreground/70 text-sm mt-1">
                            A partire da €{lowestPrice}/giorno
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                          <ArrowUpRight size={18} className="text-primary-foreground" />
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
