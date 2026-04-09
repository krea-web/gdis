
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useVehicles, type Vehicle } from "@/hooks/useVehicles";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SelectedVehicle = { id: string; name: string; image: string; pricePerDay: number; vehicleData?: Vehicle };

type Props = {
  selected: SelectedVehicle | null;
  onSelect: (v: SelectedVehicle) => void;
};

const sanitizeImageUrl = (url?: string | null) => url?.replace(/^"|"$/g, "") || "/placeholder.svg";

function toSelected(v: Vehicle): SelectedVehicle {
  return {
    id: v.id,
    name: `${v.make} ${v.model}`,
    image: v.image_url || "",
    pricePerDay: v.daily_rate ?? 0,
    vehicleData: v,
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
        <Carousel
          opts={{ align: "start", loop: (vehicles?.length ?? 0) > 1 }}
          className="w-full px-12 sm:px-14"
        >
          <CarouselContent className="-ml-0">
            {vehicles?.map((v, i) => {
              const sel = toSelected(v);
              const imageUrl = sanitizeImageUrl(v.image_url);

              return (
                <CarouselItem key={v.id} className="pl-0 md:basis-1/2 xl:basis-1/3">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onSelect(sel)}
                    aria-pressed={selected?.id === v.id}
                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 bg-card text-left transition-all duration-300 hover:-translate-y-2 ${
                      selected?.id === v.id
                        ? "border-primary blue-glow-sm"
                        : "border-border hover:border-primary/30 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.15)]"
                    }`}
                  >
                    {selected?.id === v.id && (
                      <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                        <Check size={14} className="text-primary-foreground" />
                      </div>
                    )}

                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={`${v.make} ${v.model}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {v.category.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground">{v.make} {v.model}</h3>
                      <p className="mt-1 font-bold text-primary">
                        A partire da €{v.daily_rate ?? 0}
                        <span className="text-sm font-normal text-muted-foreground">/giorno</span>
                      </p>
                    </div>
                  </motion.button>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="left-2 h-10 w-10 border-border/80 bg-background/95 backdrop-blur-sm" />
          <CarouselNext className="right-2 h-10 w-10 border-border/80 bg-background/95 backdrop-blur-sm" />
        </Carousel>
      )}
    </div>
  );
};

export default VehicleSelection;
