const vehicleImageMap: Record<string, string> = {
  "500": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20500%20BIANCA.jpg",
  "Panda Hybrid": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/FIAT%20PANDA.jpeg",
  "SH 125i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH125.jpg",
  "SH 350i": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/HONDA%20SH350.webp",
  "Raptor 700R": "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/YAMAHA%20RAPTOR%20QUAD%20BLU.jpg",
};

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useVehicles, type Vehicle } from "@/hooks/useVehicles";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";

type SelectedVehicle = { id: string; name: string; image: string; pricePerDay: number };

type Props = {
  selected: SelectedVehicle | null;
  onSelect: (v: SelectedVehicle) => void;
};

function toSelected(v: Vehicle): SelectedVehicle {
  return {
    id: v.id,
    name: `${v.make} ${v.model}`,
    image: vehicleImageMap[v.model] || v.image_url || "",
    pricePerDay: v.daily_rate ?? 0,
  };
}

const VehicleSelection = ({ selected, onSelect }: Props) => {
  const { data: vehicles, isLoading } = useVehicles();

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Scegli il veicolo
      </h2>
      <p className="text-muted-foreground mb-8">Seleziona il mezzo che preferisci per il tuo viaggio.</p>

      {isLoading ? (
        <VehicleCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vehicles?.map((v, i) => {
            const sel = toSelected(v);
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelect(sel)}
                className={`relative group rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                  selected?.id === v.id
                    ? "border-primary blue-glow-sm"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {selected?.id === v.id && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Check size={14} className="text-primary-foreground" />
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={vehicleImageMap[v.model] || v.image_url || "/placeholder.svg"}
                    alt={`${v.make} ${v.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {v.category.replace(/_/g, " ").toUpperCase()}
                  </span>
                  <h3 className="font-display font-semibold text-foreground text-lg">{v.make} {v.model}</h3>
                  <p className="text-primary font-bold mt-1">
                    A partire da €{v.daily_rate ?? 0}
                    <span className="text-muted-foreground font-normal text-sm">/giorno</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehicleSelection;
