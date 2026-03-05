import { motion } from "framer-motion";
import { Check } from "lucide-react";
import fleetCitycar from "@/assets/fleet-citycar.jpg";
import fleetScooter from "@/assets/fleet-scooter.jpg";
import fleetQuad from "@/assets/fleet-quad.jpg";

type Vehicle = {
  id: string;
  name: string;
  image: string;
  pricePerDay: number;
  category: string;
};

const vehicles: Vehicle[] = [
  { id: "1", name: "Fiat 500", image: fleetCitycar, pricePerDay: 35, category: "Citycar" },
  { id: "2", name: "Fiat Panda", image: fleetCitycar, pricePerDay: 30, category: "Citycar" },
  { id: "3", name: "Vespa 125", image: fleetScooter, pricePerDay: 25, category: "Scooter" },
  { id: "4", name: "Honda SH 300", image: fleetScooter, pricePerDay: 35, category: "Scooter" },
  { id: "5", name: "Quad 450", image: fleetQuad, pricePerDay: 55, category: "Quad" },
  { id: "6", name: "Quad Sport 700", image: fleetQuad, pricePerDay: 75, category: "Quad" },
];

type Props = {
  selected: { id: string; name: string; image: string; pricePerDay: number } | null;
  onSelect: (v: { id: string; name: string; image: string; pricePerDay: number }) => void;
};

const VehicleSelection = ({ selected, onSelect }: Props) => {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Scegli il veicolo
      </h2>
      <p className="text-muted-foreground mb-8">Seleziona il mezzo che preferisci per il tuo viaggio.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(v)}
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
                src={v.image}
                alt={v.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{v.category}</span>
              <h3 className="font-display font-semibold text-foreground text-lg">{v.name}</h3>
              <p className="text-primary font-bold mt-1">€{v.pricePerDay}<span className="text-muted-foreground font-normal text-sm">/giorno</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;
