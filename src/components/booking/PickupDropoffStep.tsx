import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type PickupDropoffData = {
  pickupLocation: "sede" | "custom";
  pickupCustomAddress: string;
  pickupTime: string;
  dropoffTime: string;
};

type Props = {
  data: PickupDropoffData;
  onChange: (data: PickupDropoffData) => void;
};

const SEDE_LABEL = "Sede GDIS Rent — Olbia";

const PickupDropoffStep = ({ data, onChange }: Props) => {
  const update = (partial: Partial<PickupDropoffData>) =>
    onChange({ ...data, ...partial });

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Ritiro e Consegna
      </h2>
      <p className="text-muted-foreground mb-8">
        Scegli dove e quando ritirare e riconsegnare il veicolo.
      </p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-8">
        {/* Pickup */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Luogo di Ritiro
          </h3>

          <RadioGroup
            value={data.pickupLocation}
            onValueChange={(v) =>
              update({ pickupLocation: v as "sede" | "custom", pickupCustomAddress: "" })
            }
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors">
              <RadioGroupItem value="sede" id="pickup-sede" />
              <Label htmlFor="pickup-sede" className="cursor-pointer flex-1">
                {SEDE_LABEL}
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors">
              <RadioGroupItem value="custom" id="pickup-custom" />
              <Label htmlFor="pickup-custom" className="cursor-pointer flex-1">
                Luogo personalizzato
              </Label>
            </div>
          </RadioGroup>

          {data.pickupLocation === "custom" && (
            <Input
              placeholder="Inserisci indirizzo di ritiro (es. Aeroporto di Olbia)"
              value={data.pickupCustomAddress}
              onChange={(e) => update({ pickupCustomAddress: e.target.value })}
              className="mt-2"
            />
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              Ora di Ritiro
            </Label>
            <Input
              type="time"
              value={data.pickupTime}
              onChange={(e) => update({ pickupTime: e.target.value })}
            />
          </div>
        </div>

        {/* Dropoff */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Luogo di Consegna
          </h3>

          <div className="p-3 rounded-xl border border-border bg-muted/30">
            <p className="text-sm font-medium text-foreground">{SEDE_LABEL}</p>
            <p className="text-xs text-muted-foreground mt-1">
              La riconsegna avviene esclusivamente presso la nostra sede.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              Ora di Consegna
            </Label>
            <Input
              type="time"
              value={data.dropoffTime}
              onChange={(e) => update({ dropoffTime: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDropoffStep;
