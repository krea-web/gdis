import { useMemo, useState } from "react";
import {
  Check,
  Download,
  Eye,
  FileSignature,
  Printer,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useToast } from "@/components/ui/use-toast";
import {
  useAdminBookings,
  type BookingStatus,
  type BookingWithVehicle,
} from "../hooks/useAdminBookings";
import BookingDetail from "./BookingDetail";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "In attesa", className: "bg-amber-500/15 text-amber-700" },
  confirmed: { label: "Confermata", className: "bg-blue-500/15 text-blue-700" },
  signed: { label: "Firmata", className: "bg-green-500/15 text-green-700" },
  completed: { label: "Completata", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Annullata", className: "bg-rose-500/15 text-rose-700" },
};

function downloadCSV(rows: BookingWithVehicle[]) {
  const headers = [
    "id",
    "created_at",
    "status",
    "customer_name",
    "customer_surname",
    "email",
    "phone",
    "vehicle",
    "license_plate",
    "start_date",
    "end_date",
    "pickup_location",
    "dropoff_location",
    "total_price",
  ];
  const escape = (v: unknown) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return `"${s}"`;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.id,
      r.created_at,
      r.status,
      r.customer_name,
      r.customer_surname,
      r.email,
      r.phone,
      r.vehicles ? `${r.vehicles.make} ${r.vehicles.model}` : "",
      r.vehicles?.license_plate,
      r.start_date,
      r.end_date,
      r.pickup_location,
      r.dropoff_location,
      r.total_price,
    ].map(escape).join(","));
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prenotazioni-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const BookingsManager = () => {
  const { bookings, loading, error, setStatus, remove } = useAdminBookings();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [detail, setDetail] = useState<BookingWithVehicle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BookingWithVehicle | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (!q) return true;
      const name = `${b.customer_name ?? ""} ${b.customer_surname ?? ""}`.toLowerCase();
      const vehicle = b.vehicles ? `${b.vehicles.make} ${b.vehicles.model} ${b.vehicles.license_plate}` : "";
      return (
        name.includes(q) ||
        (b.email ?? "").toLowerCase().includes(q) ||
        (b.phone ?? "").toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        vehicle.toLowerCase().includes(q)
      );
    });
  }, [bookings, search, statusFilter]);

  const handleStatus = async (b: BookingWithVehicle, next: BookingStatus) => {
    try {
      await setStatus(b.id, next);
      toast({ title: `Stato aggiornato: ${STATUS_LABELS[next]?.label ?? next}` });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore";
      toast({ title: "Errore", description: msg, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      toast({ title: "Prenotazione eliminata" });
      setDeleteTarget(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore";
      toast({ title: "Errore", description: msg, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Prenotazioni & Contratti</h1>
          <p className="text-muted-foreground text-sm">
            Tutti i contratti firmati e le prenotazioni in arrivo.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => downloadCSV(filtered)}>
            <Download size={16} /> Esporta CSV
          </Button>
          <Button asChild className="gap-2">
            <a href="/admin/contratto-vuoto" target="_blank" rel="noreferrer">
              <Printer size={16} /> Contratto vuoto
            </a>
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per cliente, email, telefono, targa, ID…"
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="pending">In attesa</SelectItem>
            <SelectItem value="confirmed">Confermate</SelectItem>
            <SelectItem value="signed">Firmate</SelectItem>
            <SelectItem value="completed">Completate</SelectItem>
            <SelectItem value="cancelled">Annullate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Caricamento prenotazioni…</p>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            Nessuna prenotazione corrisponde ai filtri.
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Veicolo</th>
                <th className="text-left py-3 px-4">Periodo</th>
                <th className="text-right py-3 px-4">Totale</th>
                <th className="text-left py-3 px-4">Stato</th>
                <th className="text-center py-3 px-4">Contratto</th>
                <th className="text-right py-3 px-4">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const s = b.status ? STATUS_LABELS[b.status] : null;
                return (
                  <tr key={b.id} className="border-t border-border hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div className="font-medium">{b.customer_name} {b.customer_surname}</div>
                      <div className="text-xs text-muted-foreground">{b.email ?? "—"}</div>
                    </td>
                    <td className="py-3 px-4">
                      {b.vehicles ? (
                        <>
                          <div className="font-medium">{b.vehicles.make} {b.vehicles.model}</div>
                          <div className="text-xs text-muted-foreground font-mono">{b.vehicles.license_plate}</div>
                        </>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div>{b.start_date}</div>
                      <div className="text-muted-foreground">→ {b.end_date}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">€ {b.total_price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      {s ? <Badge variant="secondary" className={s.className}>{s.label}</Badge> : <Badge variant="secondary">—</Badge>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {b.signed_pdf_url ? (
                        <FileSignature size={16} className="inline text-green-600" />
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex gap-1 justify-end w-full">
                        <Button size="icon" variant="ghost" onClick={() => setDetail(b)} aria-label="Dettagli">
                          <Eye size={16} />
                        </Button>
                        {b.status !== "confirmed" && b.status !== "signed" && (
                          <Button size="icon" variant="ghost" onClick={() => handleStatus(b, "confirmed")} aria-label="Conferma" className="text-green-600">
                            <Check size={16} />
                          </Button>
                        )}
                        {b.status !== "cancelled" && (
                          <Button size="icon" variant="ghost" onClick={() => handleStatus(b, "cancelled")} aria-label="Annulla" className="text-amber-600">
                            <X size={16} />
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(b)} aria-label="Elimina" className="text-destructive">
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

      <BookingDetail booking={detail} onClose={() => setDetail(null)} />

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare la prenotazione?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  Stai per eliminare la prenotazione di <strong>{deleteTarget.customer_name} {deleteTarget.customer_surname}</strong>
                  {" "}per il periodo {deleteTarget.start_date} → {deleteTarget.end_date}.
                  L'azione non è reversibile.
                </>
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

export default BookingsManager;
