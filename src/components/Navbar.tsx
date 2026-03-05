import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gdisLogo from "@/assets/gdis-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Chi Siamo", to: "/chisiamo" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-18 py-4">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <img src={gdisLogo} alt="GDIS Rent e Service" className="h-10 w-auto brightness-0 invert" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                location.pathname === l.to
                  ? "text-primary"
                  : scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-background/80 hover:text-background"
              }`}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
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
