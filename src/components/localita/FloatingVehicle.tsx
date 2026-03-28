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
    {/* Blue studio glow */}
    <div className="absolute inset-0 scale-90 blur-3xl bg-primary/30 rounded-full -z-10" />

    <img
      src={image}
      alt={alt}
      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10"
      loading="eager"
    />

    {/* Floor reflection */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-t from-primary/20 to-transparent blur-xl rounded-full" />
  </motion.div>
);

export default FloatingVehicle;
