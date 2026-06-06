import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  VEHICLE_CATEGORIES,
  type Vehicle,
  type VehicleCategory,
  type VehicleInsert,
} from "../hooks/useAdminVehicles";

const FUEL_OPTIONS = ["benzina", "diesel", "elettrico", "ibrido", "GPL"];
const TRANSMISSION_OPTIONS = ["manuale", "automatico"];
const MONTHLY_RATES: Array<keyof Vehicle> = [
  "rate_april",
  "rate_may",
  "rate_june",
  "rate_july",
  "rate_august",
  "rate_september",
  "rate_october",
];
const MONTH_LABELS: Record<string, string> = {
  rate_april: "Aprile",
  rate_may: "Maggio",
  rate_june: "Giugno",
  rate_july: "Luglio",
  rate_august: "Agosto",
  rate_september: "Settembre",
  rate_october: "Ottobre",
};

type Characteristics = {
  seats?: number;
  transmission?: string;
  air_conditioning?: boolean;
  luggage?: number;
  notes?: string;
};

function parseCharacteristics(raw: string | null): Characteristics {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Characteristics;
  } catch {
    return { notes: raw };
  }
}

type Props = {
  initial: Vehicle | null;
  onSubmit: (payload: VehicleInsert) => Promise<void>;
  onCancel: () => void;
};

const FleetVehicleForm = ({ initial, onSubmit, onCancel }: Props) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState<VehicleCategory>((initial?.category as VehicleCategory) ?? "auto");
  const [make, setMake] = useState(initial?.make ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [licensePlate, setLicensePlate] = useState(initial?.license_plate ?? "");
  const [year, setYear] = useState<string>(initial?.year ? String(initial.year) : "");
  const [color, setColor] = useState(initial?.color ?? "");
  const [kmCurrent, setKmCurrent] = useState<string>(initial?.km_current != null ? String(initial.km_current) : "");
  const [lastRevision, setLastRevision] = useState(initial?.last_revision_date ?? "");
  const [nextRevision, setNextRevision] = useState(initial?.next_revision_date ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [fuelType, setFuelType] = useState(initial?.fuel_type ?? "benzina");
  const [dailyRate, setDailyRate] = useState<string>(initial?.daily_rate != null ? String(initial.daily_rate) : "");
  const [available, setAvailable] = useState(initial?.available ?? true);
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [logoUrl, setLogoUrl] = useState(initial?.logo_url ?? "");
  const [damagePolicy, setDamagePolicy] = useState(initial?.damage_policy ?? "");
  const [franchise, setFranchise] = useState<string>(initial?.franchise_amount != null ? String(initial.franchise_amount) : "");

  const initialChars = parseCharacteristics(initial?.characteristics ?? null);
  const [seats, setSeats] = useState<string>(initialChars.seats ? String(initialChars.seats) : "");
  const [transmission, setTransmission] = useState<string>(initialChars.transmission ?? "manuale");
  const [airConditioning, setAirConditioning] = useState<boolean>(initialChars.air_conditioning ?? true);
  const [luggage, setLuggage] = useState<string>(initialChars.luggage ? String(initialChars.luggage) : "");
  const [charNotes, setCharNotes] = useState(initialChars.notes ?? "");

  const [monthlyRates, setMonthlyRates] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    MONTHLY_RATES.forEach((k) => {
      const v = initial?.[k];
      o[k as string] = v != null ? String(v) : "";
    });
    return o;
  });

  useEffect(() => {
    // Premium: forziamo che almeno la categoria sia coerente
    if (initial && initial.category) setCategory(initial.category as VehicleCategory);
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make.trim() || !model.trim() || !licensePlate.trim()) {
      toast({ title: "Campi obbligatori", description: "Marca, modello e targa sono richiesti.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const characteristics: Characteristics = {
        seats: seats ? Number(seats) : undefined,
        transmission: transmission || undefined,
        air_conditioning: airConditioning,
        luggage: luggage ? Number(luggage) : undefined,
        notes: charNotes || undefined,
      };

      const payload: VehicleInsert = {
        category,
        make: make.trim(),
        model: model.trim(),
        license_plate: licensePlate.trim().toUpperCase(),
        year: year ? Number(year) : null,
        color: color.trim() || null,
        km_current: kmCurrent ? Number(kmCurrent) : null,
        last_revision_date: lastRevision || null,
        next_revision_date: nextRevision || null,
        notes: notes.trim() || null,
        fuel_type: fuelType,
        daily_rate: dailyRate ? Number(dailyRate) : null,
        available,
        image_url: imageUrl.trim() || null,
        logo_url: logoUrl.trim() || null,
        damage_policy: damagePolicy.trim() || null,
        franchise_amount: franchise ? Number(franchise) : null,
        characteristics: JSON.stringify(characteristics),
      };

      MONTHLY_RATES.forEach((k) => {
        const raw = monthlyRates[k as string];
        (payload as Record<string, unknown>)[k as string] = raw ? Number(raw) : null;
      });

      await onSubmit(payload);
      toast({ title: initial ? "Veicolo aggiornato" : "Veicolo aggiunto" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore sconosciuto";
      toast({ title: "Errore", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Categoria</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as VehicleCategory)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {VEHICLE_CATEGORIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Targa *</Label>
          <Input value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} placeholder="AB123CD" required />
        </div>
        <div>
          <Label>Marca *</Label>
          <Input value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <div>
          <Label>Modello *</Label>
          <Input value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div>
          <Label>Anno</Label>
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <Label>Colore</Label>
          <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Bianco, Nero…" />
        </div>
        <div>
          <Label>Carburante</Label>
          <Select value={fuelType ?? ""} onValueChange={setFuelType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FUEL_OPTIONS.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Cambio</Label>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TRANSMISSION_OPTIONS.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Posti</Label>
          <Input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} />
        </div>
        <div>
          <Label>Bagagli</Label>
          <Input type="number" value={luggage} onChange={(e) => setLuggage(e.target.value)} />
        </div>
        <div>
          <Label>Km attuali</Label>
          <Input type="number" value={kmCurrent} onChange={(e) => setKmCurrent(e.target.value)} />
        </div>
        <div>
          <Label>Ultima revisione</Label>
          <Input type="date" value={lastRevision ?? ""} onChange={(e) => setLastRevision(e.target.value)} />
        </div>
        <div>
          <Label>Prossima revisione</Label>
          <Input type="date" value={nextRevision ?? ""} onChange={(e) => setNextRevision(e.target.value)} />
        </div>
        <div>
          <Label>Tariffa base / giorno (€)</Label>
          <Input type="number" step="0.01" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} />
        </div>
        <div>
          <Label>Franchigia (€)</Label>
          <Input type="number" value={franchise} onChange={(e) => setFranchise(e.target.value)} />
        </div>
        <div>
          <Label>Foto URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div>
          <Label>Logo URL</Label>
          <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label>Damage policy</Label>
          <Textarea value={damagePolicy ?? ""} onChange={(e) => setDamagePolicy(e.target.value)} rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label>Caratteristiche aggiuntive (mostrate al cliente)</Label>
          <Textarea value={charNotes} onChange={(e) => setCharNotes(e.target.value)} rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label>Note interne officina</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Tagliando, riparazioni, appunti privati…" />
        </div>
        <div className="flex items-center gap-3 md:col-span-2">
          <Switch checked={airConditioning} onCheckedChange={setAirConditioning} id="ac" />
          <Label htmlFor="ac" className="cursor-pointer">Aria condizionata</Label>
          <div className="ml-auto flex items-center gap-3">
            <Switch checked={available} onCheckedChange={setAvailable} id="available" />
            <Label htmlFor="available" className="cursor-pointer">Disponibile per noleggio</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Tariffe stagionali (€ / giorno)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {MONTHLY_RATES.map((k) => (
            <div key={k as string}>
              <Label className="text-xs">{MONTH_LABELS[k as string]}</Label>
              <Input
                type="number"
                step="0.01"
                value={monthlyRates[k as string] ?? ""}
                onChange={(e) => setMonthlyRates((m) => ({ ...m, [k as string]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Annulla
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {initial ? "Salva modifiche" : "Aggiungi veicolo"}
        </Button>
      </div>
    </form>
  );
};

export default FleetVehicleForm;
