import { useMemo, useState } from "react";
import { AlertTriangle, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useAdminVehicles,
  VEHICLE_CATEGORIES,
  type Vehicle,
  type VehicleCategory,
  type VehicleInsert,
} from "../hooks/useAdminVehicles";
import FleetVehicleForm from "./FleetVehicleForm";

const isRevisionExpiring = (date: string | null): boolean => {
  if (!date) return false;
  const now = new Date();
  const target = new Date(date);
  const diffDays = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
};

const FleetManager = () => {
  const { vehicles, loading, error, create, update, remove } = useAdminVehicles();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<VehicleCategory | "all">("all");
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchCat = activeTab === "all" || v.category === activeTab;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        v.license_plate.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        (v.color ?? "").toLowerCase().includes(q)
      );
    });
  }, [vehicles, search, activeTab]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: vehicles.length };
    VEHICLE_CATEGORIES.forEach((c) => {
      map[c.id] = vehicles.filter((v) => v.category === c.id).length;
    });
    return map;
  }, [vehicles]);

  const handleSubmit = async (payload: VehicleInsert) => {
    if (editing) {
      await update(editing.id, payload);
    } else {
      await create(payload);
    }
    setDialogOpen(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      toast({ title: "Veicolo eliminato" });
      setDeleteTarget(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore";
      toast({ title: "Errore", description: msg, variant: "destructive" });
    }
  };

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditing(v);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Gestione Flotta</h1>
          <p className="text-muted-foreground text-sm">
            Una riga per ogni veicolo fisico. La quantità per categoria è il conteggio.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Aggiungi veicolo
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {VEHICLE_CATEGORIES.map((c) => {
          const list = vehicles.filter((v) => v.category === c.id);
          const available = list.filter((v) => v.available !== false).length;
          return (
            <Card key={c.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setActiveTab(c.id)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {c.label}
                  <Badge variant="secondary">{list.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{available} disponibili</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per targa, marca, modello, colore…"
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as VehicleCategory | "all")}>
        <TabsList>
          <TabsTrigger value="all">Tutti ({counts.all})</TabsTrigger>
          {VEHICLE_CATEGORIES.map((c) => (
            <TabsTrigger key={c.id} value={c.id}>
              {c.label} ({counts[c.id] ?? 0})
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Caricamento veicoli…</p>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground text-sm">
                Nessun veicolo nella selezione corrente.
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left py-3 px-4">Targa</th>
                    <th className="text-left py-3 px-4">Veicolo</th>
                    <th className="text-left py-3 px-4">Categoria</th>
                    <th className="text-left py-3 px-4">Colore</th>
                    <th className="text-right py-3 px-4">Km</th>
                    <th className="text-left py-3 px-4">Revisione</th>
                    <th className="text-right py-3 px-4">€/giorno</th>
                    <th className="text-left py-3 px-4">Stato</th>
                    <th className="text-right py-3 px-4">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => {
                    const expiring = isRevisionExpiring(v.next_revision_date);
                    return (
                      <tr key={v.id} className="border-t border-border hover:bg-muted/20">
                        <td className="py-3 px-4 font-mono font-medium">{v.license_plate}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{v.make} {v.model}</div>
                          <div className="text-xs text-muted-foreground">{v.year ?? "—"} · {v.fuel_type ?? "—"}</div>
                        </td>
                        <td className="py-3 px-4 capitalize">{v.category}</td>
                        <td className="py-3 px-4">{v.color ?? "—"}</td>
                        <td className="py-3 px-4 text-right">
                          {v.km_current != null ? v.km_current.toLocaleString("it-IT") : "—"}
                        </td>
                        <td className="py-3 px-4">
                          {v.next_revision_date ? (
                            <span className={expiring ? "text-amber-600 font-medium inline-flex items-center gap-1" : ""}>
                              {expiring && <AlertTriangle size={14} />}
                              {v.next_revision_date}
                            </span>
                          ) : "—"}
                        </td>
                        <td className="py-3 px-4 text-right">{v.daily_rate != null ? `€${v.daily_rate}` : "—"}</td>
                        <td className="py-3 px-4">
                          {v.available !== false ? (
                            <Badge variant="secondary" className="bg-green-500/15 text-green-700">disponibile</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-muted">fuori servizio</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => openEdit(v)} aria-label="Modifica">
                              <Pencil size={16} />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(v)} aria-label="Elimina" className="text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Modifica ${editing.make} ${editing.model}` : "Nuovo veicolo"}</DialogTitle>
          </DialogHeader>
          <FleetVehicleForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setDialogOpen(false); setEditing(null); }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare il veicolo?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>Stai per eliminare <strong>{deleteTarget.make} {deleteTarget.model}</strong> ({deleteTarget.license_plate}).
                L'azione non è reversibile e fallirà se ci sono prenotazioni collegate.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FleetManager;
