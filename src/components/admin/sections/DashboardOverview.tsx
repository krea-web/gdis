import { useMemo } from "react";
import { AlertTriangle, Car, FileText, Wallet, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminVehicles, VEHICLE_CATEGORIES } from "../hooks/useAdminVehicles";
import { useAdminBookings } from "../hooks/useAdminBookings";

const fmtEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const DashboardOverview = () => {
  const { vehicles, loading: vLoading } = useAdminVehicles();
  const { bookings, loading: bLoading } = useAdminBookings();

  const stats = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthBookings = bookings.filter((b) => new Date(b.created_at) >= startOfMonth);
    const monthRevenue = monthBookings.reduce((sum, b) => sum + (b.total_price ?? 0), 0);
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed" || b.status === "signed").length;

    const expiringRevisions = vehicles.filter((v) => {
      if (!v.next_revision_date) return false;
      const d = new Date(v.next_revision_date);
      return d <= thirtyDaysFromNow;
    });

    const todayPickups = bookings.filter((b) => {
      const d = new Date(b.start_date);
      return d.toDateString() === now.toDateString();
    }).length;

    const todayDropoffs = bookings.filter((b) => {
      const d = new Date(b.end_date);
      return d.toDateString() === now.toDateString();
    }).length;

    const byCategory = VEHICLE_CATEGORIES.map(({ id, label }) => ({
      id,
      label,
      total: vehicles.filter((v) => v.category === id).length,
      available: vehicles.filter((v) => v.category === id && v.available !== false).length,
      avgKm: (() => {
        const list = vehicles.filter((v) => v.category === id && v.km_current != null);
        if (list.length === 0) return 0;
        return Math.round(list.reduce((s, v) => s + (v.km_current ?? 0), 0) / list.length);
      })(),
    }));

    return {
      monthRevenue,
      monthCount: monthBookings.length,
      pending,
      confirmed,
      expiringRevisions,
      todayPickups,
      todayDropoffs,
      byCategory,
    };
  }, [vehicles, bookings]);

  const loading = vLoading || bLoading;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Panoramica operativa GDIS Rent.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Caricamento dati…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fatturato del mese</CardTitle>
                <Wallet size={16} className="text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{fmtEUR(stats.monthRevenue)}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.monthCount} prenotazioni</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">In attesa</CardTitle>
                <FileText size={16} className="text-amber-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.confirmed} confermate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Movimenti oggi</CardTitle>
                <Car size={16} className="text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.todayPickups + stats.todayDropoffs}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.todayPickups} ritiri · {stats.todayDropoffs} consegne
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revisioni in scadenza</CardTitle>
                <Wrench size={16} className="text-rose-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.expiringRevisions.length}</p>
                <p className="text-xs text-muted-foreground mt-1">entro 30 giorni</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-3">Flotta per categoria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.byCategory.map((cat) => (
                <Card key={cat.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{cat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {cat.available}
                      <span className="text-base font-normal text-muted-foreground"> / {cat.total}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">disponibili · km medi {cat.avgKm.toLocaleString("it-IT")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {stats.expiringRevisions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle size={18} className="text-amber-500" />
                  Revisioni in scadenza nei prossimi 30 giorni
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats.expiringRevisions.map((v) => (
                  <div key={v.id} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                    <span className="font-medium">{v.make} {v.model} <span className="text-muted-foreground">({v.license_plate})</span></span>
                    <span className="text-muted-foreground">{v.next_revision_date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
