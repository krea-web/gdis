import { useEffect, useState } from "react";
import { Download, FileSignature, Loader2, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { BookingWithVehicle } from "../hooks/useAdminBookings";

const LICENSE_BUCKET = "licenses";
const CONTRACT_BUCKET = "contracts";

async function getSignedUrl(path: string | null, bucket: string): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

type Props = {
  booking: BookingWithVehicle | null;
  onClose: () => void;
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
    <p className="text-sm font-medium">{value || "—"}</p>
  </div>
);

const BookingDetail = ({ booking, onClose }: Props) => {
  const [licenseFront, setLicenseFront] = useState<string | null>(null);
  const [licenseBack, setLicenseBack] = useState<string | null>(null);
  const [contractUrl, setContractUrl] = useState<string | null>(null);
  const [loadingUrls, setLoadingUrls] = useState(false);

  useEffect(() => {
    if (!booking) return;
    let cancelled = false;
    (async () => {
      setLoadingUrls(true);
      const [front, back, contract] = await Promise.all([
        getSignedUrl(booking.license_front_url, LICENSE_BUCKET),
        getSignedUrl(booking.license_back_url, LICENSE_BUCKET),
        booking.signed_pdf_url ? getSignedUrl(booking.signed_pdf_url, CONTRACT_BUCKET) : Promise.resolve(null),
      ]);
      if (cancelled) return;
      setLicenseFront(front);
      setLicenseBack(back);
      setContractUrl(contract);
      setLoadingUrls(false);
    })();
    return () => { cancelled = true; };
  }, [booking]);

  if (!booking) return null;

  return (
    <Sheet open={!!booking} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Prenotazione {booking.id.slice(0, 8)}…
            {booking.status && <Badge variant="secondary" className="capitalize">{booking.status}</Badge>}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <section>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><User size={16} /> Conducente</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nome" value={`${booking.customer_name ?? ""} ${booking.customer_surname ?? ""}`.trim()} />
              <Field label="Codice fiscale" value={booking.tax_code} />
              <Field label="Email" value={booking.email && <a href={`mailto:${booking.email}`} className="text-primary hover:underline inline-flex items-center gap-1"><Mail size={12} />{booking.email}</a>} />
              <Field label="Telefono" value={booking.phone && <a href={`tel:${booking.phone}`} className="text-primary hover:underline inline-flex items-center gap-1"><Phone size={12} />{booking.phone}</a>} />
              <Field label="Data nascita" value={booking.birth_date} />
              <Field label="Luogo nascita" value={booking.birth_place} />
              <Field label="Residenza" value={booking.residence_address} />
              <Field label="Città" value={booking.city} />
            </div>
          </section>

          {booking.has_second_driver && (
            <section>
              <h3 className="font-semibold text-sm mb-3">Secondo conducente</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nome" value={`${booking.second_driver_name ?? ""} ${booking.second_driver_surname ?? ""}`.trim()} />
                <Field label="Codice fiscale" value={booking.second_driver_cf} />
                <Field label="Email" value={booking.second_driver_email} />
                <Field label="Telefono" value={booking.second_driver_phone} />
              </div>
            </section>
          )}

          <section>
            <h3 className="font-semibold text-sm mb-3">Noleggio</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Veicolo" value={booking.vehicles ? `${booking.vehicles.make} ${booking.vehicles.model} (${booking.vehicles.license_plate})` : booking.vehicle_id} />
              <Field label="Categoria" value={booking.vehicles?.category} />
              <Field label="Ritiro" value={`${booking.start_date} ${booking.pickup_time ?? ""}`} />
              <Field label="Riconsegna" value={`${booking.end_date} ${booking.dropoff_time ?? ""}`} />
              <Field label="Luogo ritiro" value={booking.pickup_location} />
              <Field label="Luogo consegna" value={booking.dropoff_location} />
              <Field label="Totale" value={`€ ${booking.total_price.toFixed(2)}`} />
              <Field label="Firmato il" value={booking.signed_at ?? "—"} />
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-3">Patenti</h3>
            {loadingUrls ? (
              <p className="text-sm text-muted-foreground inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Generazione link…</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {licenseFront ? (
                  <a href={licenseFront} target="_blank" rel="noreferrer" className="block">
                    <img src={licenseFront} alt="Patente fronte" className="rounded-lg border border-border w-full" />
                    <p className="text-xs text-muted-foreground mt-1">Fronte</p>
                  </a>
                ) : <div className="text-xs text-muted-foreground">Fronte: non disponibile</div>}
                {licenseBack ? (
                  <a href={licenseBack} target="_blank" rel="noreferrer" className="block">
                    <img src={licenseBack} alt="Patente retro" className="rounded-lg border border-border w-full" />
                    <p className="text-xs text-muted-foreground mt-1">Retro</p>
                  </a>
                ) : <div className="text-xs text-muted-foreground">Retro: non disponibile</div>}
              </div>
            )}
          </section>

          <section>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><FileSignature size={16} /> Contratto firmato</h3>
            {contractUrl ? (
              <Button asChild className="gap-2" variant="outline">
                <a href={contractUrl} target="_blank" rel="noreferrer">
                  <Download size={16} /> Apri / scarica PDF firmato
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Nessun contratto firmato ancora caricato per questa prenotazione.</p>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDetail;
