import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthState = "loading" | "authorized" | "unauthorized";

const AdminApp = () => {
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (!cancelled) setState("unauthorized");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .maybeSingle();

      if (cancelled) return;
      setState(profile?.is_admin === true ? "authorized" : "unauthorized");
    }

    check();
    const { data: listener } = supabase.auth.onAuthStateChange(() => check());

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (state === "unauthorized") {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">Accesso riservato</h1>
        <p className="text-muted-foreground mb-8">
          Questa area è riservata agli amministratori. Effettua il login con un account autorizzato.
        </p>
        <Button asChild variant="hero" size="lg">
          <a href="/">Torna alla home</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <h1 className="font-display text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground">Pagina in costruzione.</p>
    </div>
  );
};

export default AdminApp;
