import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
  aspect?: string;
};

const VehicleCardSkeleton = ({ count = 4, aspect = "aspect-[4/3]" }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
        className="rounded-2xl border-2 border-border overflow-hidden"
      >
        <Skeleton className={`${aspect} w-full rounded-none`} />
        <div className="p-4 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </motion.div>
    ))}
  </div>
);

export default VehicleCardSkeleton;
