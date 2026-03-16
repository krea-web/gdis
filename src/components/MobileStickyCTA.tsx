import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MobileStickyCTA = () => {
  const { pathname } = useLocation();
  if (pathname === "/prenotaora") return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 block md:hidden bg-background/90 backdrop-blur-md border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <Button
        asChild
        variant="hero"
        size="lg"
        className="w-full animate-pulse-glow"
      >
        <Link to="/prenotaora">
          Prenota Ora
          <ArrowRight size={18} />
        </Link>
      </Button>
    </div>
  );
};

export default MobileStickyCTA;
