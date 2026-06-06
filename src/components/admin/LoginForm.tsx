import { useEffect, useState, type FormEvent } from "react";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

type State = "checking" | "ready" | "submitting" | "authorized";

const LoginForm = () => {
  const [state, setState] = useState<State>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .maybeSingle();
        if (profile?.is_admin === true) {
          window.location.href = "/admin";
          return;
        }
      }
      setState("ready");
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("submitting");

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !signInData.session) {
      setState("ready");
      setError(signInError?.message ?? "Credenziali non valide.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", signInData.session.user.id)
      .maybeSingle();

    if (profileError) {
      setState("ready");
      setError(profileError.message);
      return;
    }

    if (profile?.is_admin !== true) {
      await supabase.auth.signOut();
      setState("ready");
      setError("Questo account non ha permessi amministrativi.");
      return;
    }

    setState("authorized");
    window.location.href = "/admin";
  };

  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold mb-1">Accesso amministratore</h1>
          <p className="text-sm text-muted-foreground">Pannello di gestione GDIS Rent.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={state === "submitting" || state === "authorized"}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={state === "submitting" || state === "authorized"}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full gap-2" disabled={state === "submitting" || state === "authorized"}>
            {state === "submitting" || state === "authorized" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogIn size={16} />
            )}
            Entra
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Accesso riservato. Per assistenza contatta l'amministratore.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
