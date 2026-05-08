import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Car, Bike, Mountain, MapPin, Mail } from "lucide-react";

const flottaItems = [
  { label: "City Car", to: "/flotta/fiat-panda", icon: Car, desc: "Fiat Panda Hybrid" },
  { label: "Premium", to: "/flotta/mercedes-classe-a180d", icon: Car, desc: "Mercedes Classe A 180d" },
  { label: "Scooter", to: "/flotta/honda-sh", icon: Bike, desc: "Honda SH 125 / 350" },
  { label: "Quad", to: "/flotta/yamaha-raptor", icon: Mountain, desc: "Yamaha Raptor 700" },
];

const destinazioniItems = [
  { label: "Costa Smeralda", to: "/noleggio-auto-in-costa-smeralda", desc: "Panoramica Completa" },
  { label: "Porto Cervo", to: "/noleggio-auto-a-porto-cervo", desc: "Lusso & Marina" },
  { label: "San Teodoro", to: "/noleggio-auto-a-san-teodoro", desc: "Spiagge & Movida" },
  { label: "San Pantaleo", to: "/noleggio-auto-a-san-pantaleo", desc: "Borgo Bohémien" },
  { label: "Porto Rotondo", to: "/noleggio-auto-a-porto-rotondo", desc: "Eleganza Discreta" },
  { label: "Golfo Aranci", to: "/noleggio-auto-a-golfo-aranci", desc: "Terminal Traghetti" },
  { label: "Baja Sardinia", to: "/noleggio-auto-a-baja-sardinia", desc: "Phi Beach & Party" },
  { label: "Olbia", to: "/noleggio-auto-a-olbia", desc: "Famiglie & Coppie" },
];

const links = [
  { label: "Home", to: "/" },
  { label: "Chi Siamo", to: "/chisiamo" },
  { label: "Contatti", to: "/contatti" },
];

const GDIS_LOGO =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";

type Props = { pathname: string; logoSrc?: string };

const MobileMenu = ({ pathname, logoSrc = GDIS_LOGO }: Props) => {
  const [open, setOpen] = useState(false);
  const [flottaOpen, setFlottaOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const isDestActive = pathname.startsWith("/noleggio-auto-");
  const isFlottaActive = pathname.startsWith("/flotta");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const trackWA = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { location: "navbar_mobile" } as never);
    }
  };

  return (
    <>
      <button
        type="button"
        className="md:hidden relative z-[60] text-foreground"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
      >
        {open ? <X size={28} className="text-white" /> : <Menu size={26} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-xl overflow-y-auto h-[100dvh] w-full animate-fade-in">
          <div className="container flex items-center justify-between py-4 h-18">
            <a href="/" onClick={close} className="flex items-center gap-2">
              <img
                src={logoSrc}
                alt="GDIS Rent e Service"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <button
              onClick={close}
              className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Chiudi menu"
            >
              <X size={28} />
            </button>
          </div>
          <div className="container">
            <div className="h-px bg-white/10" />
          </div>
          <div className="container pt-6">
            <a
              href="/prenotaora"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 w-full h-12 px-8 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-brand-blue-deep shadow-lg shadow-primary/30 transition-all py-5"
            >
              Prenota Ora
            </a>
          </div>
          <div className="container flex flex-col gap-1 pt-6 pb-32">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={close}
                className={`block text-3xl font-semibold py-3 transition-colors ${
                  pathname === l.to ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                {l.label}
              </a>
            ))}

            <div>
              <button
                onClick={() => setFlottaOpen((v) => !v)}
                className={`flex items-center justify-between w-full text-3xl font-semibold py-3 transition-colors ${
                  isFlottaActive ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                Flotta
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ${flottaOpen ? "rotate-180" : ""}`}
                />
              </button>
              {flottaOpen && (
                <div className="pl-4 border-l-2 border-primary/30 ml-2 flex flex-col gap-1 py-2">
                  {flottaItems.map((item) => (
                    <a
                      key={item.to}
                      href={item.to}
                      onClick={close}
                      className="flex items-center gap-3 py-2.5 group"
                    >
                      <item.icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                      <div>
                        <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        <span className="block text-sm text-slate-500">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setDestOpen((v) => !v)}
                className={`flex items-center justify-between w-full text-3xl font-semibold py-3 transition-colors ${
                  isDestActive ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                Destinazioni
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ${destOpen ? "rotate-180" : ""}`}
                />
              </button>
              {destOpen && (
                <div className="pl-4 border-l-2 border-primary/30 ml-2 flex flex-col gap-1 py-2">
                  {destinazioniItems.map((item) => (
                    <a
                      key={item.to}
                      href={item.to}
                      onClick={close}
                      className="flex items-center gap-3 py-2.5 group"
                    >
                      <MapPin className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                      <div>
                        <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        <span className="block text-sm text-slate-500">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <a
                href="/prenotaora"
                onClick={close}
                className="inline-flex items-center justify-center gap-2 w-full h-12 px-8 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-brand-blue-deep shadow-lg shadow-primary/30 transition-all py-6"
              >
                Prenota Ora
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                Contattaci
              </p>
              <a
                href="https://wa.me/393520459150"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWA}
                className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors py-2"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.907 15.907 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.302 22.602c-.388 1.092-1.938 1.998-3.146 2.264-.826.178-1.904.32-5.534-1.19-4.646-1.932-7.634-6.634-7.866-6.942-.222-.308-1.87-2.494-1.87-4.756 0-2.264 1.184-3.378 1.604-3.838.388-.424.916-.616 1.222-.616.152 0 .286.008.41.014.42.018.63.042.906.7.346.824 1.19 2.908 1.296 3.12.106.214.214.504.066.796-.138.3-.258.486-.472.744-.214.258-.44.458-.654.74-.196.244-.416.504-.178.924.238.42 1.058 1.746 2.272 2.83 1.562 1.394 2.876 1.826 3.286 2.03.308.152.674.128.922-.132.31-.336.694-.892 1.084-1.442.278-.392.628-.44.966-.306.342.128 2.164 1.02 2.534 1.208.37.186.616.278.708.434.09.156.09.892-.298 1.984z"/>
                </svg>
                <span className="text-base font-medium">WhatsApp</span>
              </a>
              <a
                href="mailto:gdis.noleggi@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors py-2"
              >
                <Mail className="h-5 w-5" />
                <span className="text-base font-medium">gdis.noleggi@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
