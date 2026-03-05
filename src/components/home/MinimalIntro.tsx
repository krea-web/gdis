import { motion } from "framer-motion";

const MinimalIntro = () => {
  return (
    <section className="section-padding bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight">
            Il tuo noleggio
            <br />
            <span className="font-bold text-gradient-blue">parte da qui.</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto mt-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MinimalIntro;
