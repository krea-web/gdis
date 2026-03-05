import { Mail, MapPin, Phone } from "lucide-react";
import gdisLogo from "@/assets/gdis-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src={gdisLogo} alt="GDIS Rent e Service" className="h-12 w-auto mb-3 brightness-0 invert" />
            <p className="text-sm opacity-70 leading-relaxed">
              Noleggio auto, scooter, quad, veicoli di lusso e trasporto merci in Sardegna.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg">Contatti</h4>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Mail size={16} />
              <a href="mailto:gdis.noleggi@gmail.com">gdis.noleggi@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Phone size={16} />
              <a href="tel:+393520459150">+39 352 045 9150</a>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <MapPin size={16} />
              <span>Via Annibale Caro 52, Olbia</span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-lg">Legale</h4>
            <p className="text-sm opacity-70">P.IVA: 03047140904</p>
            <p className="text-sm opacity-70">© {new Date().getFullYear()} GDIS Rent e Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
