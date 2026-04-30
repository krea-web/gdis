import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  name: string;
  /** opzionale: query string da passare a /prenotaora (es. luogo pre-selezionato) */
  prenotaQuery?: string;
};

const LocalitaInlineCTA = ({ name, prenotaQuery }: Props) => (
  <section className="py-10 md:py-14 bg-primary/5 border-y border-primary/10">
    <div className="container px-4 max-w-3xl mx-auto text-center">
      <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
        Pronto per {name}?
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
        Prenota ora la tua esperienza a {name}
      </h3>
      <Button variant="hero" size="lg" asChild className="gap-2">
        <Link to={prenotaQuery ? `/prenotaora?${prenotaQuery}` : "/prenotaora"}>
          Prenota Auto a {name}
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  </section>
);

export default LocalitaInlineCTA;
