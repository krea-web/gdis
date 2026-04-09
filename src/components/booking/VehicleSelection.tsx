
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
                <CarouselItem key={v.id} className="pl-0 basis-full">
                  <button
                    type="button"
                    onClick={() => onSelect(sel)}
                    aria-pressed={selected?.id === v.id}
                    className="relative flex w-full flex-col items-center text-center py-4 group cursor-pointer"
                  >
                    {selected?.id === v.id && (
                      <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <Check size={16} className="text-primary-foreground" />
                      </div>
                    )}

                    <div className="w-full max-w-md mx-auto">
                      <img
                        src={imageUrl}
                        alt={`${v.make} ${v.model}`}
                        loading="lazy"
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                      />
                    </div>

                    <span className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {v.category.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-foreground mt-1">{v.make} {v.model}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">
                      A partire da €{v.daily_rate ?? 0}
                      <span className="text-sm font-normal text-muted-foreground">/giorno</span>
                    </p>

                    {selected?.id === v.id && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                        <Check size={14} /> Selezionato
                      </span>
                    )}
                  </button>
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
