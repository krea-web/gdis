import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Car, Bike, Mountain, MapPin } from "lucide-react";
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

  const isDestinazioniActive = location.pathname.startsWith("/localita") || location.pathname === "/noleggio-in-costa-smeralda";

  const links = [
    { label: "Home", to: "/" },
    { label: "Chi Siamo", to: "/chisiamo" },
  ];

  const isFlottaActive = location.pathname.startsWith("/flotta");
  const textClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      active
        ? "text-primary"
        : scrolled
        ? "text-foreground/70 hover:text-foreground"
        : "text-background/80 hover:text-background"
    }`;

  return (
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
                <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}

          {/* Flotta Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setFlottaOpen(!flottaOpen)}
              className={`${textClass(isFlottaActive)} flex items-center gap-1`}
            >
              Flotta
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${flottaOpen ? "rotate-180" : ""}`} />
              {isFlottaActive && (
                <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
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
            >
              Destinazioni
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${destinazioniOpen ? "rotate-180" : ""}`} />
              {isDestinazioniActive && (
                <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
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
          className={`md:hidden relative z-10 ${scrolled ? "text-foreground" : "text-background"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground/70 hover:text-primary py-2 transition-colors"
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile Flotta Accordion */}
              <button
                onClick={() => setMobileFlottaOpen(!mobileFlottaOpen)}
                className="flex items-center justify-between text-base font-medium text-foreground/70 hover:text-primary py-2 transition-colors w-full"
              >
                Flotta
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileFlottaOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileFlottaOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 flex flex-col gap-1 overflow-hidden"
                  >
                    {flottaItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Destinazioni Accordion */}
              <button
                onClick={() => setMobileDestinazioniOpen(!mobileDestinazioniOpen)}
                className="flex items-center justify-between text-base font-medium text-foreground/70 hover:text-primary py-2 transition-colors w-full"
              >
                Destinazioni
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDestinazioniOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileDestinazioniOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 flex flex-col gap-1 overflow-hidden"
                  >
                    {destinazioniItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button variant="hero" size="lg" asChild className="mt-2">
                <Link to="/prenotaora" onClick={() => setMobileOpen(false)}>
                  Prenota Ora
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
