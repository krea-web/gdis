import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type AuthState = "loading" | "authorized" | "unauthorized";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const location = useLocation();
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (!cancelled) setState("unauthorized");
        return;
      }
      if (!requireAdmin) {
        if (!cancelled) setState("authorized");
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
  }, [requireAdmin]);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (state === "unauthorized") {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
