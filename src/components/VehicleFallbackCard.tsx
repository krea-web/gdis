import { Car } from "lucide-react";

const VehicleFallbackCard = ({ brand }: { brand?: string }) => (
  <div className="w-full h-full bg-muted/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 border border-border/30">
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
      <Car size={28} className="text-primary" />
    </div>
    {brand && (
      <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest">
        {brand}
      </span>
    )}
  </div>
);

export default VehicleFallbackCard;
