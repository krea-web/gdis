import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import AdminLayout, { type AdminSection } from "./AdminLayout";
import DashboardOverview from "./sections/DashboardOverview";
import FleetManager from "./sections/FleetManager";
import BookingsManager from "./sections/BookingsManager";
import CalendarView from "./sections/CalendarView";
import CustomersManager from "./sections/CustomersManager";
import Settings from "./sections/Settings";

type AuthState = "loading" | "authorized" | "error";

const AdminApp = () => {
  const [state, setState] = useState<AuthState>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>();
  const [section, setSection] = useState<AdminSection>("dashboard");

  useEffect(() => {
    let cancelled = false;
    let initialized = false;

    async function check() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) {
          if (!cancelled) window.location.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .maybeSingle();

        if (cancelled) return;
        if (profileError) throw profileError;

        if (profile?.is_admin !== true) {
          await supabase.auth.signOut();
          window.location.replace("/login");
          return;
        }

        setEmail(session.user.email ?? undefined);
        setState("authorized");
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Errore sconosciuto durante il controllo permessi.";
        console.error("[AdminApp] auth check failed:", err);
        setErrorMsg(msg);
        setState("error");
      }
    }

    check().finally(() => { initialized = true; });

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      // Skip the synthetic INITIAL_SESSION emitted right after subscribe
      // to avoid running check() twice and creating perceived loops.
      if (!initialized && event === "INITIAL_SESSION") return;
      check();
    });

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

  if (state === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-card border border-destructive/40 rounded-2xl p-6 text-center">
          <h1 className="font-display text-xl font-bold mb-2">Errore di accesso</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Non è stato possibile verificare i permessi amministrativi.
          </p>
          <pre className="text-xs text-left bg-muted/40 border border-border rounded p-3 overflow-x-auto whitespace-pre-wrap">
            {errorMsg}
          </pre>
          <div className="mt-4 flex gap-2 justify-center">
            <a href="/login" className="text-sm text-primary hover:underline">Torna al login</a>
            <span className="text-muted-foreground">·</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm text-primary hover:underline"
            >
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminLayout active={section} onSelect={setSection} userEmail={email}>
        {section === "dashboard" && <DashboardOverview />}
        {section === "fleet" && <FleetManager />}
        {section === "bookings" && <BookingsManager />}
        {section === "calendar" && <CalendarView />}
        {section === "customers" && <CustomersManager />}
        {section === "settings" && <Settings />}
      </AdminLayout>
      <Toaster />
    </>
  );
};

export default AdminApp;
