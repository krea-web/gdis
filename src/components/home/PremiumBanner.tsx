import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Link } from "react-router-dom";
import { supabaseImg } from "@/lib/img";

const luxuryCarMobile = supabaseImg("vehicles/gdisrent-exclusive-car-for-rent.webp", { width: 600, quality: 70 });
const luxuryCarDesktop = supabaseImg("vehicles/gdisrent-exclusive-car-for-rent.webp", { width: 1400, quality: 70 });

const PremiumBanner = () => {
  return (
    <div className="flex flex-col w-full">
      {/* PARTE 1: THE LUXURY EXPERIENCE */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-center overflow-hidden" aria-label="Collezione esclusiva GDIS">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={luxuryCarMobile} />
            <source media="(min-width: 769px)" srcSet={luxuryCarDesktop} />
            <img
              src={luxuryCarDesktop}
              alt="GDIS Luxury Fleet - Collezione esclusiva in Costa Smeralda"
              width={1400}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[70%_center]"
            />
          </picture>
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

        <div className="relative z-10 container px-4 sm:px-6 py-20">
          <div className="max-w-2xl border-l-[3px] border-primary pl-6 md:pl-10">
            <span className="text-primary font-display text-sm md:text-base font-bold uppercase tracking-[0.4em] mb-4 block drop-shadow-md">
              GDIS Exclusive Collection
            </span>

            <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">
              Lusso, <br />
              <span className="font-light italic text-white/80">Senza Compromessi.</span>
            </h2>

            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light">
              Accedi alla nostra flotta di veicoli di altissima gamma. Supercar, SUV premium e berline di rappresentanza
              per vivere la Sardegna al livello che meriti.
            </p>

            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-8 py-7 md:px-10 md:py-8 text-lg md:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] group hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => window.open("https://wa.me/393520459150", "_blank")}
              aria-label="Contattaci su WhatsApp per veicoli luxury"
            >
              <WhatsAppIcon className="mr-3 h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" size={24} />
              Richiedi Disponibilità VIP
            </Button>
          </div>
        </div>
      </section>

      {/* PARTE 2: FAST BOOKING ACTION */}
      <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden flex items-center justify-center" aria-label="Prenotazione rapida digitale">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        <div className="relative z-10 container px-4 flex justify-center">
          <div className="w-full max-w-5xl rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

            <div className="text-left max-w-xl relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Noleggio Smart</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Senza Fila. <br />
                <span className="italic font-light text-white/70">100% Digitale.</span>
              </h3>

              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-8">
                <Link to="/flotta/fiat-panda" className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all cursor-pointer">Citycar</Link>,{" "}
                <Link to="/flotta/honda-sh" className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all cursor-pointer">Scooter</Link> e{" "}
                <Link to="/flotta/yamaha-raptor" className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all cursor-pointer">Quad</Link> pronti in meno di 2 minuti. Scegli il veicolo, firma online e ritira le chiavi.
                Il tuo tempo è prezioso.
              </p>

              <ul className="flex items-center gap-4 text-sm text-white/50 font-medium list-none">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" /> Assicurazione inclusa
                </li>
                <li aria-hidden="true"><span className="w-1 h-1 bg-white/20 rounded-full block" /></li>
                <li className="flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> Conferma Istantanea
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-auto shrink-0 relative z-10">
              <Link to="/prenotaora" className="block">
                <Button
                  size="xl"
                  className="relative w-full lg:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-8 md:px-14 md:py-10 text-xl md:text-2xl font-bold transition-all duration-300 shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] group hover:-translate-y-2 flex items-center justify-center gap-4 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className="relative z-10">Prenota Ora</span>
                  <ArrowRight className="relative z-10 w-7 h-7 group-hover:translate-x-3 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumBanner;
