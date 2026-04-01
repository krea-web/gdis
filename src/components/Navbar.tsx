import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Car, Bike, Mountain, MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";

const flottaItems = [
  { label: "City Car", to: "/flotta/fiat-panda", icon: Car, desc: "Fiat Panda Hybrid" },
  { label: "Scooter", to: "/flotta/honda-sh", icon: Bike, desc: "Honda SH 125 / 350" },
  { label: "Quad", to: "/flotta/yamaha-raptor", icon: Mountain, desc: "Yamaha Raptor 700" },
];

const destinazioniItems = [
  { label: "Costa Smeralda", to: "/noleggio-in-costa-smeralda", desc: "Panoramica Completa" },
  { label: "Porto Cervo", to: "/localita/noleggio-porto-cervo", desc: "Lusso & Marina" },
  { label: "San Teodoro", to: "/localita/noleggio-san-teodoro", desc: "Spiagge & Movida" },
  { label: "San Pantaleo", to: "/localita/noleggio-san-pantaleo", desc: "Borgo Bohémien" },
  { label: "Porto Rotondo", to: "/localita/noleggio-porto-rotondo", desc: "Eleganza Discreta" },
  { label: "Golfo Aranci", to: "/localita/noleggio-golfo-aranci", desc: "Terminal Traghetti" },
  { label: "Baja Sardinia", to: "/localita/noleggio-baja-sardinia", desc: "Phi Beach & Party" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flottaOpen, setFlottaOpen] = useState(false);
  const [destinazioniOpen, setDestinazioniOpen] = useState(false);
  const [mobileFlottaOpen, setMobileFlottaOpen] = useState(false);
  const [mobileDestinazioniOpen, setMobileDestinazioniOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const destDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFlottaOpen(false);
      }
      if (destDropdownRef.current && !destDropdownRef.current.contains(e.target as Node)) {
        setDestinazioniOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setFlottaOpen(false);
    setDestinazioniOpen(false);
    setMobileFlottaOpen(false);
    setMobileDestinazioniOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isDestinazioniActive =
    location.pathname.startsWith("/localita") || location.pathname === "/noleggio-in-costa-smeralda";
  const isFlottaActive = location.pathname.startsWith("/flotta");

  const links = [
    { label: "Home", to: "/" },
    { label: "Chi Siamo", to: "/chisiamo" },
  ];

  const textClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      active
        ? "text-primary"
        : scrolled
          ? "text-foreground/70 hover:text-foreground"
          : "text-background/80 hover:text-background"
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-foreground/5" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-18 py-4">
          <Link to="/" className="flex items-center gap-2 relative z-10">
            <img src={gdisLogo} alt="GDIS Rent e Service" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={textClass(location.pathname === l.to)}>
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Flotta Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setFlottaOpen(!flottaOpen)}
                className={`${textClass(isFlottaActive)} flex items-center gap-1`}
                aria-expanded={flottaOpen}
                aria-label="Menu flotta veicoli"
              >
                Flotta
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${flottaOpen ? "rotate-180" : ""}`}
                />
                {isFlottaActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
              <AnimatePresence>
                {flottaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-3 -left-4 w-64 glass rounded-xl shadow-xl shadow-foreground/10 border border-border/50 overflow-hidden"
                  >
                    {flottaItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent/60 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Destinazioni Dropdown */}
            <div ref={destDropdownRef} className="relative">
              <button
                onClick={() => setDestinazioniOpen(!destinazioniOpen)}
                className={`${textClass(isDestinazioniActive)} flex items-center gap-1`}
                aria-expanded={destinazioniOpen}
                aria-label="Menu destinazioni"
              >
                Destinazioni
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${destinazioniOpen ? "rotate-180" : ""}`}
                />
                {isDestinazioniActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
              <AnimatePresence>
                {destinazioniOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-3 -left-4 w-64 glass rounded-xl shadow-xl shadow-foreground/10 border border-border/50 overflow-hidden"
                  >
                    {destinazioniItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent/60 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:block">
            <Button variant="hero" size="default" asChild>
              <Link to="/prenotaora">Prenota Ora</Link>
            </Button>
          </div>

          <button
            className={`md:hidden relative z-[60] ${scrolled ? "text-foreground" : "text-background"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          >
            {mobileOpen ? <X size={28} className="text-white" /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-xl overflow-y-auto h-[100dvh] w-full"
          >
            {/* Header with logo & close */}
            <div className="container flex items-center justify-between py-4 h-18">
              <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
                <img src={gdisLogo} alt="GDIS Rent e Service" className="h-10 w-auto" />
              </Link>
              <button
                onClick={closeMobile}
                className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Chiudi menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Divider */}
            <div className="container">
              <div className="h-px bg-white/10" />
            </div>

            {/* Navigation Links */}
            <div className="container flex flex-col gap-1 pt-8 pb-32">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={closeMobile}
                    className={`block text-3xl font-semibold py-3 transition-colors ${
                      location.pathname === l.to ? "text-primary" : "text-white hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Flotta Accordion */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <button
                  onClick={() => setMobileFlottaOpen(!mobileFlottaOpen)}
                  className={`flex items-center justify-between w-full text-3xl font-semibold py-3 transition-colors ${
                    isFlottaActive ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  Flotta
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-300 ${mobileFlottaOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileFlottaOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-primary/30 ml-2 flex flex-col gap-1 py-2">
                        {flottaItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeMobile}
                            className="flex items-center gap-3 py-2.5 group"
                          >
                            <item.icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                            <div>
                              <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                                {item.label}
                              </span>
                              <span className="block text-sm text-slate-500">{item.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Destinazioni Accordion */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <button
                  onClick={() => setMobileDestinazioniOpen(!mobileDestinazioniOpen)}
                  className={`flex items-center justify-between w-full text-3xl font-semibold py-3 transition-colors ${
                    isDestinazioniActive ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  Destinazioni
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-300 ${mobileDestinazioniOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileDestinazioniOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-primary/30 ml-2 flex flex-col gap-1 py-2">
                        {destinazioniItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeMobile}
                            className="flex items-center gap-3 py-2.5 group"
                          >
                            <MapPin className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                            <div>
                              <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                                {item.label}
                              </span>
                              <span className="block text-sm text-slate-500">{item.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <Button variant="hero" size="lg" asChild className="w-full text-lg py-6">
                  <Link to="/prenotaora" onClick={closeMobile}>
                    Prenota Ora
                  </Link>
                </Button>
              </motion.div>

              {/* Bottom contact footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3"
              >
                <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">Contattaci</p>
                <a
                  href="https://wa.me/393520459150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors py-2"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-base font-medium">WhatsApp</span>
                </a>
                <a
                  href="mailto:gdis.noleggi@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors py-2"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-base font-medium">gdis.noleggi@gmail.com</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
