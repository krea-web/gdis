import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminBookings } from "../hooks/useAdminBookings";

type CustomerSummary = {
  key: string;
  name: string;
  email: string | null;
  phone: string | null;
  taxCode: string | null;
  bookingsCount: number;
  totalSpent: number;
  lastBooking: string;
};

const CustomersManager = () => {
  const { bookings, loading } = useAdminBookings();
  const [search, setSearch] = useState("");

  const customers: CustomerSummary[] = useMemo(() => {
    const map = new Map<string, CustomerSummary>();
    for (const b of bookings) {
      const key = (b.email || b.tax_code || `${b.customer_name}-${b.customer_surname}` || b.id).toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.bookingsCount++;
        existing.totalSpent += b.total_price ?? 0;
        if (b.created_at > existing.lastBooking) existing.lastBooking = b.created_at;
      } else {
        map.set(key, {
          key,
          name: `${b.customer_name ?? ""} ${b.customer_surname ?? ""}`.trim() || "—",
          email: b.email,
          phone: b.phone,
          taxCode: b.tax_code,
          bookingsCount: 1,
          totalSpent: b.total_price ?? 0,
          lastBooking: b.created_at,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => (a.lastBooking < b.lastBooking ? 1 : -1));
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.email ?? "").toLowerCase().includes(q) ||
      (c.phone ?? "").toLowerCase().includes(q) ||
      (c.taxCode ?? "").toLowerCase().includes(q),
    );
  }, [customers, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Clienti</h1>
        <p className="text-muted-foreground text-sm">Lista deduplicata su email / codice fiscale.</p>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca cliente…" className="pl-9" />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Caricamento…</p>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">Nessun cliente.</CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Telefono</th>
                <th className="text-left py-3 px-4">CF</th>
                <th className="text-right py-3 px-4">Prenotazioni</th>
                <th className="text-right py-3 px-4">Speso</th>
                <th className="text-left py-3 px-4">Ultima</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.key} className="border-t border-border hover:bg-muted/20">
                  <td className="py-3 px-4 font-medium">{c.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.email ?? "—"}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.phone ?? "—"}</td>
                  <td className="py-3 px-4 font-mono text-xs">{c.taxCode ?? "—"}</td>
                  <td className="py-3 px-4 text-right">{c.bookingsCount}</td>
                  <td className="py-3 px-4 text-right">€ {c.totalSpent.toFixed(2)}</td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(c.lastBooking).toLocaleDateString("it-IT")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomersManager;
