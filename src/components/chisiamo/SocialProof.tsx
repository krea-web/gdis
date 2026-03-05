import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const SocialProof = () => {
  return (
    <section className="section-padding bg-transparent">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
              Social
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Seguici su Instagram
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Scopri la nostra flotta, le storie dei nostri clienti e le bellezze della Sardegna nel nostro feed.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Instagram size={20} />
              @gdis.rent
            </a>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative" style={{ perspective: "1000px" }}>
              <div className="w-[260px] h-[520px] bg-brand-dark rounded-[2.5rem] p-3 shadow-2xl relative">
                {/* Phone frame */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-brand-dark rounded-b-2xl z-20" />
                <div className="w-full h-full rounded-[2rem] bg-background overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="h-10 bg-background flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground/60">Instagram</span>
                  </div>
                  {/* Feed simulation */}
                  <div className="flex-1 p-3 space-y-3 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">G</span>
                      </div>
                      <span className="text-xs font-semibold text-foreground">gdis.rent</span>
                    </div>
                    <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
                      <Instagram size={40} className="text-primary/30" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-3/4 bg-muted rounded" />
                      <div className="h-2 w-1/2 bg-muted rounded" />
                    </div>
                    <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-accent to-primary/5" />
                    <div className="space-y-1">
                      <div className="h-2 w-2/3 bg-muted rounded" />
                      <div className="h-2 w-1/3 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Shadow/reflection */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-brand-dark/10 blur-xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
