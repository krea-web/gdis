import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminVehicles } from "../hooks/useAdminVehicles";
import { useAdminBookings } from "../hooks/useAdminBookings";

const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_VISIBLE = 14;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function fmtDay(d: Date) {
  return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short" });
}

const CalendarView = () => {
  const { vehicles } = useAdminVehicles();
  const { bookings } = useAdminBookings();
  const [anchor, setAnchor] = useState(() => startOfDay(new Date()));

  const days = useMemo(() => {
    return Array.from({ length: DAYS_VISIBLE }, (_, i) => new Date(anchor.getTime() + i * DAY_MS));
  }, [anchor]);

  const rows = useMemo(() => {
    return vehicles.map((v) => {
      const myBookings = bookings.filter(
        (b) => b.vehicle_id === v.id && b.status !== "cancelled",
      );
      return { vehicle: v, bookings: myBookings };
    });
  }, [vehicles, bookings]);

  const cellState = (vehicleId: string, day: Date): { booked: boolean; isPickup: boolean; isDrop: boolean } => {
    const t = day.getTime();
    const list = bookings.filter((b) => b.vehicle_id === vehicleId && b.status !== "cancelled");
    let booked = false;
    let isPickup = false;
    let isDrop = false;
    for (const b of list) {
      const s = startOfDay(new Date(b.start_date)).getTime();
      const e = startOfDay(new Date(b.end_date)).getTime();
      if (t >= s && t <= e) booked = true;
      if (t === s) isPickup = true;
      if (t === e) isDrop = true;
    }
    return { booked, isPickup, isDrop };
  };

  const shift = (delta: number) => setAnchor(new Date(anchor.getTime() + delta * DAY_MS));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Calendario flotta</h1>
        <p className="text-muted-foreground text-sm">Planning prossimi {DAYS_VISIBLE} giorni per veicolo.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">
            {fmtDay(days[0])} — {fmtDay(days[days.length - 1])}
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => shift(-7)}><ChevronLeft size={14} /> -7</Button>
            <Button size="sm" variant="outline" onClick={() => setAnchor(startOfDay(new Date()))}>Oggi</Button>
            <Button size="sm" variant="outline" onClick={() => shift(7)}>+7 <ChevronRight size={14} /></Button>
          </div>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessun veicolo in flotta.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="text-xs border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-3 sticky left-0 bg-card z-10">Veicolo</th>
                    {days.map((d) => (
                      <th key={d.toISOString()} className="px-1 text-center font-medium text-muted-foreground min-w-[36px]">
                        <div>{d.getDate()}</div>
                        <div className="text-[10px]">{d.toLocaleDateString("it-IT", { weekday: "short" })}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ vehicle }) => (
                    <tr key={vehicle.id}>
                      <td className="py-1.5 pr-3 sticky left-0 bg-card z-10 whitespace-nowrap">
                        <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{vehicle.license_plate}</div>
                      </td>
                      {days.map((d) => {
                        const s = cellState(vehicle.id, d);
                        let bg = "bg-muted/20";
                        if (s.booked) bg = "bg-primary/40";
                        if (s.isPickup) bg = "bg-green-500/60";
                        if (s.isDrop) bg = "bg-amber-500/60";
                        return (
                          <td key={d.toISOString()} className="px-0.5 py-0.5">
                            <div className={`h-6 rounded-sm ${bg}`} title={d.toDateString()} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-green-500/60" /> Ritiro</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary/40" /> Noleggiato</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-amber-500/60" /> Riconsegna</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-muted/40 border border-border" /> Libero</span>
      </div>
    </div>
  );
};

export default CalendarView;
