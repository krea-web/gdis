import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  tag: string;
  title: string;
  description: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
};

const VehicleSpotlight = ({ tag, title, description, children, image, imageAlt, reverse }: Props) => (
  <section className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="container px-4">
      <div className={`grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto ${reverse ? "direction-rtl" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={reverse ? "lg:order-2" : ""}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">{tag}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{description}</p>
          {children}
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative ${reverse ? "lg:order-1" : ""}`}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/3] md:aspect-[16/10]">
              <img src={image} alt={imageAlt || title} className="w-full h-full object-cover object-center" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10" />
          </motion.div>
        )}
      </div>
    </div>
  </section>
);

export default VehicleSpotlight;
