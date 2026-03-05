import { motion } from "framer-motion";
import { Instagram, ArrowRight, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialProof = () => {
  return (
    <section className="relative bg-blue-600 py-24 md:py-32 overflow-hidden">
      {/* Pattern di sfondo geometrico leggerissimo per dare texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-between">
          {/* COLONNA TESTO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Instagram className="text-white w-6 h-6" />
              </div>
              <span className="text-blue-100 font-display text-sm font-bold uppercase tracking-[0.3em]">Community</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Unisciti alla <br />
              <span className="italic font-light opacity-90">nostra strada.</span>
            </h2>

            <p className="text-blue-100 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-lg">
              La Sardegna vissuta al massimo. Scopri i retroscena della nostra flotta luxury, le avventure dei nostri
              clienti e le novità in arrivo sul nostro canale Instagram ufficiale.
            </p>

            <a href="https://instagram.com/gdis.rent" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-50 text-blue-600 rounded-full px-8 py-6 text-lg font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] group"
              >
                Seguici su @gdis.rent
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          {/* COLONNA MOCKUP SMARTPHONE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-[1200px]"
          >
            {/* Animazione "Floating" Continua */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-[300px] md:w-[340px] transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              {/* Ombra del telefono */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/40 blur-2xl rounded-full" />

              {/* Scocca Telefono in Vetro (Glassmorphism) */}
              <div className="relative rounded-[3rem] p-3 bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
                {/* Schermo Interno */}
                <div className="rounded-[2.2rem] bg-white overflow-hidden shadow-inner flex flex-col h-[600px]">
                  {/* Header Instagram */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white z-10">
                    <span className="font-bold text-slate-800 tracking-tight">gdis.rent</span>
                    <Instagram size={24} className="text-slate-800" />
                  </div>

                  {/* Bio Area */}
                  <div className="px-4 py-6 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full rounded-full border-2 border-white bg-blue-50 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">G</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">GDIS Rent e Service</h4>
                      <p className="text-xs text-slate-500">Auto, Scooter & Luxury in Sardegna 🌴</p>
                    </div>
                  </div>

                  {/* Grid Foto Finta */}
                  <div className="grid grid-cols-3 gap-1 px-1 flex-1 bg-slate-50">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        // Gradiente alternato per dare senso di foto diverse
                        className={`aspect-square relative group overflow-hidden ${
                          i % 3 === 0
                            ? "bg-gradient-to-br from-blue-400 to-blue-600"
                            : i % 2 === 0
                              ? "bg-gradient-to-br from-slate-700 to-slate-900"
                              : "bg-gradient-to-tr from-slate-200 to-slate-400"
                        }`}
                      >
                        {/* Overlay al passaggio del mouse */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                          <Heart size={16} className="fill-white" />
                          <MessageCircle size={16} className="fill-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notch superiore dell'iPhone finto */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-white/20 backdrop-blur-md rounded-b-3xl z-20 border-b border-white/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
