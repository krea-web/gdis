import { motion } from "framer-motion";

type Props = {
  image: string;
  alt: string;
  className?: string;
};

const FloatingVehicle = ({ image, alt, className = "" }: Props) => (
  <motion.div
    className={`relative ${className}`}
    animate={{ y: [-10, 10, -10] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
  >
    <img
      src={image}
      alt={alt}
      className="w-full h-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)] relative z-10"
      loading="eager"
    />

    {/* Soft ground shadow under wheels (radial, no hard edges) */}
    <div
      aria-hidden
      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-2xl rounded-[50%] bg-black/40"
    />
  </motion.div>
);

export default FloatingVehicle;
