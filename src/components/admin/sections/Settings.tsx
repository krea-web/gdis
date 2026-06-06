import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Period = Tables<"pricing_periods">;

const SEASONS = ["low", "mid", "high"] as const;

const Settings = () => {
  const { toast } = useToast();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState<typeof SEASONS[number]>("low");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [multiplier, setMultiplier] = useState("1.0");
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pricing_periods")
      .select("*")
      .order("start_date", { ascending: true });
    if (error) toast({ title: "Errore", description: error.message, variant: "destructive" });
    setPeriods(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addPeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end || !multiplier) return;
    setAdding(true);
    const { error } = await supabase.from("pricing_periods").insert({
      season,
      start_date: start,
      end_date: end,
      price_multiplier: Number(multiplier),
    });
    setAdding(false);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
      return;
    }
    setStart(""); setEnd(""); setMultiplier("1.0");
    toast({ title: "Periodo aggiunto" });
    await load();
  };

  const removePeriod = async (id: string) => {
    const { error } = await supabase.from("pricing_periods").delete().eq("id", id);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Periodo rimosso" });
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Impostazioni</h1>
        <p className="text-muted-foreground text-sm">Periodi tariffari stagionali.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Aggiungi periodo</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={addPeriod} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
            <div>
              <Label>Stagione</Label>
              <Select value={season} onValueChange={(v) => setSeason(v as typeof SEASONS[number])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SEASONS.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Da</Label>
              <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
            </div>
            <div>
              <Label>A</Label>
              <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} required />
            </div>
            <div>
              <Label>Moltiplicatore</Label>
              <Input type="number" step="0.05" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} required />
            </div>
            <Button type="submit" disabled={adding} className="gap-2">
              {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Aggiungi
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Periodi configurati</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Caricamento…</p>
          ) : periods.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessun periodo configurato.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left py-2">Stagione</th>
                  <th className="text-left py-2">Da</th>
                  <th className="text-left py-2">A</th>
                  <th className="text-right py-2">Moltiplicatore</th>
                  <th className="text-right py-2"></th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="py-2 capitalize">{p.season}</td>
                    <td className="py-2">{p.start_date}</td>
                    <td className="py-2">{p.end_date}</td>
                    <td className="py-2 text-right">×{p.price_multiplier}</td>
                    <td className="py-2 text-right">
                      <Button size="icon" variant="ghost" onClick={() => removePeriod(p.id)} className="text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
