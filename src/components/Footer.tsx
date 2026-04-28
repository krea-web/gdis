import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { supabaseImg } from "@/lib/img";
import { trackWhatsAppClick } from "@/lib/analytics";
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_VAT,
  BUSINESS_TAX_ID,
  BUSINESS_EMAIL,
  BUSINESS_INSTAGRAM,
} from "@/lib/siteSchema";

const navColumns = [
  {
    title: "Esplora",
    links: [
      { label: "Home", to: "/" },
      { label: "Chi Siamo", to: "/chisiamo" },
      { label: "Prenota Ora", to: "/prenotaora" },
      { label: "Contatti", to: "/contatti" },
      { label: "Costa Smeralda", to: "/noleggio-auto-in-costa-smeralda" },
    ],
  },
  {
    title: "La Flotta",
    links: [
      { label: "Fiat Panda Hybrid", to: "/flotta/fiat-panda" },
      { label: "Mercedes Classe A", to: "/flotta/mercedes-classe-a180d" },
      { label: "Honda SH 125 / 350", to: "/flotta/honda-sh" },
      { label: "Yamaha Raptor 700", to: "/flotta/yamaha-raptor" },
    ],
  },
  {
    title: "Destinazioni",
    links: [
      { label: "Olbia", to: "/noleggio-auto-a-olbia" },
      { label: "Porto Cervo", to: "/noleggio-auto-a-porto-cervo" },
      { label: "San Teodoro", to: "/noleggio-auto-a-san-teodoro" },
      { label: "Baja Sardinia", to: "/noleggio-auto-a-baja-sardinia" },
      { label: "Porto Rotondo", to: "/noleggio-auto-a-porto-rotondo" },
      { label: "San Pantaleo", to: "/noleggio-auto-a-san-pantaleo" },
      { label: "Golfo Aranci", to: "/noleggio-auto-a-golfo-aranci" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Cookie Policy", to: "/cookie" },
      { label: "Termini e Condizioni", to: "/termini" },
    ],
  },
];

const Footer = () => (
  <footer
    className="bg-primary text-primary-foreground relative overflow-hidden"
    role="contentinfo"
    aria-label="Footer GDIS Rent"
  >
    <div className="container relative z-10 px-4 pt-20 pb-10">
      {/* Top: Logo + Brand + Contatti veloci */}
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Torna alla home GDIS Rent">
            <img
              src={supabaseImg("asset/GDISlogo.webp", { raw: true })}
              alt="GDIS Rent e Service"
              width={220}
              height={95}
              loading="lazy"
              decoding="async"
              className="h-20 w-auto mb-6"
            />
          </Link>
          <p className="text-primary-foreground/80 text-base leading-relaxed font-light max-w-sm mb-6">
            Noleggio auto, scooter e quad in Costa Smeralda. Consegna VIP h24 in Aeroporto Olbia, Porto Isola Bianca
            e in tutta la Sardegna nord-orientale.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="tel:+393520459150"
              className="inline-flex items-center gap-3 text-primary-foreground/90 hover:text-white transition-colors"
            >
              <Phone size={16} className="flex-shrink-0" />
              <span className="font-medium">+39 352 045 9150</span>
            </a>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="inline-flex items-center gap-3 text-primary-foreground/90 hover:text-white transition-colors break-all"
            >
              <Mail size={16} className="flex-shrink-0" />
              <span className="font-medium">{BUSINESS_EMAIL}</span>
            </a>
            <div className="inline-flex items-start gap-3 text-primary-foreground/90">
              <MapPin size={16} className="flex-shrink-0 mt-1" />
              <span className="font-medium">Via Annibale Caro 52, 07026 Olbia (SS)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://wa.me/393520459150"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("footer")}
              aria-label="Contattaci su WhatsApp"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            >
              <WhatsAppIcon size={18} />
            </a>
            <a
              href={BUSINESS_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <nav className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Footer navigation">
          {navColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Dati fiscali — obbligo art. 2250 c.c. + D.Lgs. 70/2003 */}
      <div className="border-t border-primary-foreground/15 pt-8 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground/60 mb-4">
          Dati Societari
        </h4>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">Ragione Sociale</dt>
            <dd className="text-primary-foreground font-medium">{BUSINESS_LEGAL_NAME}</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">Sede Legale</dt>
            <dd className="text-primary-foreground font-medium">Via Annibale Caro 52, 07026 Olbia (SS)</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">Partita IVA</dt>
            <dd className="text-primary-foreground font-medium">{BUSINESS_VAT}</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">Codice Fiscale</dt>
            <dd className="text-primary-foreground font-medium">{BUSINESS_TAX_ID}</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">REA</dt>
            <dd className="text-primary-foreground font-medium">SS-225492</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/50 text-xs uppercase tracking-wider mb-1">Capitale Sociale</dt>
            <dd className="text-primary-foreground font-medium">€ 10.000 i.v.</dd>
          </div>
        </dl>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/15 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-primary-foreground/60">
        <p>
          © {new Date().getFullYear()} {BUSINESS_LEGAL_NAME} — Tutti i diritti riservati.
        </p>
        <p className="md:text-right">
          Sito realizzato da{" "}
          <a
            href="https://kreareweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-white font-medium transition-colors"
          >
            Krea
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
