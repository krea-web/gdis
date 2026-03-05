import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gdisLogo from "@/assets/gdis-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Large decorative text */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <p className="font-display font-bold text-[20vw] leading-none whitespace-nowrap -translate-y-1/4">
          GDIS RENT
        </p>
      </div>

      <div className="container relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <img src={gdisLogo} alt="GDIS" className="h-14 w-auto mb-6 brightness-0 invert" />
            <p className="text-primary-foreground/60 text-lg leading-relaxed max-w-sm">
              Noleggio auto, scooter, quad, veicoli di lusso e trasporto merci in Sardegna.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-lg mb-6">Navigazione</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", to: "/" },
                { label: "Chi Siamo", to: "/chisiamo" },
                { label: "Prenota Ora", to: "/prenotaora" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1 group"
                >
                  {l.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-lg mb-6">Contatti</h4>
            <div className="space-y-4">
              <a href="mailto:gdis.noleggi@gmail.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                gdis.noleggi@gmail.com
              </a>
              <a href="tel:+393520459150" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                +39 352 045 9150
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                Via Annibale Caro 52, Olbia
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} GDIS Rent e Service. Tutti i diritti riservati.
          </p>
          <p className="text-sm text-primary-foreground/40">
            P.IVA: 03047140904
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
