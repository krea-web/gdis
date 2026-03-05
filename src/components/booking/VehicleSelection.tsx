import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useVehicles, type Vehicle } from "@/hooks/useVehicles";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import VehicleFallbackCard from "@/components/VehicleFallbackCard";

type SelectedVehicle = { id: string; name: string; image: string; pricePerDay: number };

type Props = {
  selected: SelectedVehicle | null;
  onSelect: (v: SelectedVehicle) => void;
};

function toSelected(v: Vehicle): SelectedVehicle {
  return {
    id: v.id,
    name: `${v.brand} ${v.model}`,
    image: v.image_url ?? "",
    pricePerDay: v.price_mid_season,
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
                    src="INSERISCI_QUI_URL_FOTO"
                    alt={`${v.brand} ${v.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{v.type}</span>
                  <h3 className="font-display font-semibold text-foreground text-lg">{v.brand} {v.model}</h3>
                  <p className="text-primary font-bold mt-1">
                    A partire da €{v.price_mid_season}
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
