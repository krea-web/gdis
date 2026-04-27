import { Mail, MapPin, Phone } from "lucide-react";
import { supabaseImg } from "@/lib/img";

const Footer = () => {
  return (
    <footer className="bg-primary relative overflow-hidden flex flex-col items-center justify-end min-h-[500px] pt-20" role="contentinfo" aria-label="Footer GDIS Rent">
      <div className="container relative z-10 flex flex-col items-center justify-center text-center px-4 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
          <a
            href="tel:+393520459150"
            className="group flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
              <Phone size={18} />
            </div>
            <span className="font-medium tracking-wide">+39 352 045 9150</span>
          </a>

          <a
            href="mailto:gdis.noleggi@gmail.com"
            className="group flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
              <Mail size={18} />
            </div>
            <span className="font-medium tracking-wide">gdis.noleggi@gmail.com</span>
          </a>

          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <span className="font-medium tracking-wide">Via Annibale Caro 52, Olbia</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs md:text-sm text-primary-foreground/40 uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} GDIS RENT E SERVICE BY @KREA.</p>
          <span className="hidden md:block">•</span>
          <p>P.IVA: 03047140904</p>
        </div>
      </div>

      <div className="w-full flex justify-center translate-y-[15%] md:translate-y-[20%] pointer-events-none">
        <img
          src={supabaseImg("asset/GDISlogo.webp", { width: 1200, quality: 70 })}
          alt="GDIS Logo"
          width={1200}
          height={517}
          loading="lazy"
          decoding="async"
          className="w-[90%] md:w-[70%] max-w-[1200px] h-auto object-contain opacity-15 mix-blend-overlay drop-shadow-2xl"
        />
      </div>
    </footer>
  );
};

export default Footer;
