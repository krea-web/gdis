import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 relative overflow-hidden flex flex-col items-center justify-end min-h-[500px] pt-20">
      {/* 1. SEZIONE INFORMAZIONI ESSENZIALI (Centrate e minimal) */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center px-4 mb-20">
        {/* Contatti in linea per desktop, impilati per mobile */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
          <a
            href="tel:+393520459150"
            className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <Phone size={18} />
            </div>
            <span className="font-medium tracking-wide">+39 352 045 9150</span>
          </a>

          <a
            href="mailto:gdis.noleggi@gmail.com"
            className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <Mail size={18} />
            </div>
            <span className="font-medium tracking-wide">gdis.noleggi@gmail.com</span>
          </a>

          <div className="flex items-center gap-3 text-white/80">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <span className="font-medium tracking-wide">Via Annibale Caro 52, Olbia</span>
          </div>
        </div>

        {/* Info Legali */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs md:text-sm text-blue-200/60 uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} GDIS RENT E SERVICE BY @KREA.</p>
          <span className="hidden md:block">•</span>
          <p>P.IVA: 03047140904</p>
        </div>
      </div>

      {/* 2. LOGO GIGANTE INFERIORE (Effetto "Watermark" massiccio tagliato alla base) */}
      <div className="w-full flex justify-center translate-y-[15%] md:translate-y-[20%] pointer-events-none">
        <img
          src="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.png"
          alt="GDIS Logo"
          className="w-[90%] md:w-[70%] max-w-[1200px] h-auto object-contain opacity-20 mix-blend-overlay drop-shadow-2xl"
        />
      </div>
    </footer>
  );
};

export default Footer;
