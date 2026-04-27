import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";

const gdisLogo =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp?width=450&quality=75";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-blue-deep to-brand-dark"
      aria-label="Hero principale GDIS Rent"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[150px] z-0 pointer-events-none"
      />

      <div className="relative z-10 container text-center flex flex-col items-center justify-center h-full px-4">
        <img
          src={gdisLogo}
          alt="GDIS Rent e Service - Noleggio veicoli in Sardegna"
          width={450}
          height={193}
          fetchPriority="high"
          decoding="async"
          className="w-64 md:w-80 lg:w-[450px] h-auto mb-6 drop-shadow-2xl"
        />

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Noleggio in Costa Smeralda.
        </h1>

        <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          <Link
            to="/flotta/fiat-panda"
            className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all"
          >
            Citycar
          </Link>
          ,{" "}
          <Link
            to="/flotta/honda-sh"
            className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all"
          >
            Scooter
          </Link>
          ,{" "}
          <Link
            to="/flotta/yamaha-raptor"
            className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-all"
          >
            Quad
          </Link>{" "}
          e Luxury. <br className="hidden md:block" /> Esplora la Sardegna senza limiti.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link to="/prenotaora">
            <Button
              size="lg"
              className="relative group bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Prenota Ora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link to="/chisiamo">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-md rounded-full px-10 py-7 text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Scopri la Flotta
            </Button>
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        aria-hidden="true"
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
