import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-20">
    <SEOHead
      title="Pagina non trovata — GDIS Rent"
      description="La pagina che cerchi non esiste. Torna alla home o esplora il nostro noleggio auto a Olbia e Costa Smeralda."
      robots="noindex,follow"
    />
    <div className="max-w-xl text-center">
      <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
        Errore 404
      </p>
      <h1 className="mb-4 font-display text-5xl md:text-6xl font-bold">Pagina non trovata</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        La pagina che stai cercando non esiste o è stata spostata. Ti suggeriamo di tornare alla home
        o di scoprire il nostro servizio di noleggio.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button variant="hero" size="lg" asChild>
          <Link to="/">Torna alla Home</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/prenotaora">Prenota ora</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-sm text-left">
        <Link to="/noleggio-auto-a-olbia" className="text-primary hover:underline">
          → Noleggio auto a Olbia
        </Link>
        <Link to="/noleggio-auto-in-costa-smeralda" className="text-primary hover:underline">
          → Noleggio in Costa Smeralda
        </Link>
        <Link to="/flotta/fiat-panda" className="text-primary hover:underline">
          → Fiat Panda Hybrid
        </Link>
        <Link to="/flotta/mercedes-classe-a180d" className="text-primary hover:underline">
          → Mercedes Classe A 180d
        </Link>
        <Link to="/flotta/honda-sh" className="text-primary hover:underline">
          → Scooter Honda SH
        </Link>
        <Link to="/contatti" className="text-primary hover:underline">
          → Contatti
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
