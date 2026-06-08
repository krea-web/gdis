import { useState } from "react";
import { MapPin, Clock, AlertCircle, Info, Building2, Plane, Anchor, Train, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

export type PickupDropoffData = {
  pickupLocation: "sede" | "custom";
  pickupCustomAddress: string;
  pickupTime: string;
  /**
   * Always kept in sync with pickupTime — the owner handles the booking via
   * WhatsApp and wants the dropoff to default to the same time so they don't
   * have to do arithmetic during chat. Existing field shape preserved for
   * downstream consumers (whatsappRequest helper, summary card).
   */
  dropoffTime: string;
};

type Props = {
  data: PickupDropoffData;
  onChange: (data: PickupDropoffData) => void;
  lang?: Locale;
};

const InlineError = ({ message }: { message?: string }) =>
  message ? (
    <p className="flex items-center gap-1.5 text-xs text-destructive mt-1">
      <AlertCircle size={12} />
      {message}
    </p>
  ) : null;

// Pickup quick-select presets. Each preset auto-fills the pickupCustomAddress.
// Same labels are used in the WhatsApp message so the owner knows immediately
// where to meet the customer.
const PRESETS = [
  { key: "sede" as const, icon: Building2, labelKey: "booking.pickup.presets.sede" },
  { key: "aeroporto" as const, icon: Plane, labelKey: "booking.pickup.presets.airport", addr: "Aeroporto Costa Smeralda (OLB)" },
  { key: "porto" as const, icon: Anchor, labelKey: "booking.pickup.presets.port", addr: "Porto Olbia — Isola Bianca" },
  { key: "stazione" as const, icon: Train, labelKey: "booking.pickup.presets.station", addr: "Stazione FS Olbia" },
];

type PresetKey = "sede" | "aeroporto" | "porto" | "stazione" | "custom";

/** Best-effort detection of which preset is active from current data. */
function detectPreset(d: PickupDropoffData): PresetKey {
  if (d.pickupLocation === "sede") return "sede";
  const addr = d.pickupCustomAddress.trim();
  if (!addr) return "custom";
  for (const p of PRESETS) {
    if (p.addr && p.addr === addr) return p.key;
  }
  return "custom";
}

const PickupDropoffStep = ({ data, onChange, lang = "it" }: Props) => {
  const t = useTranslations(lang);
  const sedeLabel = t("booking.pickup.sedeLabel");
  const [touched, setTouched] = useState({
    address: false,
    pickupTime: false,
  });

  const update = (partial: Partial<PickupDropoffData>) =>
    onChange({ ...data, ...partial });

  // Pickup time is now the single source of truth: dropoffTime mirrors it.
  const updatePickupTime = (value: string) => update({ pickupTime: value, dropoffTime: value });

  const activePreset = detectPreset(data);

  const selectPreset = (key: PresetKey) => {
    if (key === "sede") {
      update({ pickupLocation: "sede", pickupCustomAddress: "" });
      return;
    }
    if (key === "custom") {
      update({ pickupLocation: "custom", pickupCustomAddress: "" });
      return;
    }
    const preset = PRESETS.find((p) => p.key === key);
    if (preset && preset.addr) {
      update({ pickupLocation: "custom", pickupCustomAddress: preset.addr });
    }
  };

  const addressError =
    touched.address && data.pickupLocation === "custom" && data.pickupCustomAddress.trim().length === 0
      ? t("booking.pickup.errors.address")
      : undefined;
  const pickupTimeError =
    touched.pickupTime && data.pickupTime.length === 0 ? t("booking.pickup.errors.pickupTime") : undefined;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {t("booking.pickup.title")}
      </h2>
      <p className="text-muted-foreground mb-8">
        {t("booking.pickup.subtitle")}
      </p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-8">
        {/* Pickup */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            {t("booking.pickup.pickupHeading")}
          </h3>

          {/* Quick-select preset chips: 4 most common + custom */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((preset) => {
              const isActive = activePreset === preset.key;
              const Icon = preset.icon;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => selectPreset(preset.key)}
                  aria-pressed={isActive}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all duration-200 active:scale-[0.97] ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground shadow-sm shadow-primary/20"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground/70"} />
                  <span className="text-center leading-tight">
                    {preset.key === "sede" ? sedeLabel.replace(" — Olbia", "") : t(preset.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
          {/* "Altro" toggle row, full-width, shows when none of the 4 are active or when user already chose custom */}
          <button
            type="button"
            onClick={() => selectPreset("custom")}
            aria-pressed={activePreset === "custom"}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-[0.99] ${
              activePreset === "custom"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border border-dashed text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <Sparkles size={16} />
            {t("booking.pickup.customLabel")}
          </button>

          {data.pickupLocation === "custom" && (
            <div>
              <Input
                placeholder={t("booking.pickup.customPlaceholder")}
                value={data.pickupCustomAddress}
                onChange={(e) => update({ pickupCustomAddress: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                aria-invalid={!!addressError}
                className={`mt-2 ${addressError ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <InlineError message={addressError} />
            </div>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              {t("booking.pickup.pickupTime")}
            </Label>
            <Input
              type="time"
              value={data.pickupTime}
              onChange={(e) => updatePickupTime(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, pickupTime: true }))}
              aria-invalid={!!pickupTimeError}
              className={pickupTimeError ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            <InlineError message={pickupTimeError} />
          </div>
        </div>

        {/* Dropoff — same time as pickup (auto-synced) */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            {t("booking.pickup.dropoffHeading")}
          </h3>

          <div className="p-3 rounded-xl border border-border bg-muted/30">
            <p className="text-sm font-medium text-foreground">{sedeLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t("booking.pickup.dropoffNote")}
            </p>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                {t("booking.pickup.dropoffSameAsPickupTitle")}
                {data.pickupTime ? (
                  <span className="ml-2 inline-flex items-center gap-1 text-primary">
                    <Clock size={12} />
                    {data.pickupTime}
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t("booking.pickup.dropoffSameAsPickupNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDropoffStep;
