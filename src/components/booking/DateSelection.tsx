import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarDays, Sparkles } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (start: Date | null, end: Date | null) => void;
  lang?: Locale;
};

/** Quick-pick duration presets. Each adds N days to today's date. */
const DURATION_PRESETS = [
  { days: 3, labelKey: "booking.date.presets.threeDays" },
  { days: 5, labelKey: "booking.date.presets.fiveDays" },
  { days: 7, labelKey: "booking.date.presets.oneWeek" },
  { days: 14, labelKey: "booking.date.presets.twoWeeks" },
] as const;

const DateSelection = ({ startDate, endDate, onSelect, lang = "it" }: Props) => {
  const t = useTranslations(lang);
  // Adapt the calendar to viewport: 1 month on mobile, 2 on desktop.
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setNumberOfMonths(mq.matches ? 2 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const dateRange: DateRange | undefined =
    startDate ? { from: startDate, to: endDate || undefined } : undefined;

  const dateLocale = t("booking.date.locale");

  const applyPreset = (days: number) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    onSelect(start, end);
  };

  const totalDays =
    startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {t("booking.date.title")}
      </h2>
      <p className="text-muted-foreground mb-6">{t("booking.date.subtitle")}</p>

      {/* Duration quick-pick chips */}
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
          <Sparkles size={12} className="text-primary" />
          {t("booking.date.quickPick")}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DURATION_PRESETS.map((preset) => {
            const isActive = totalDays === preset.days;
            return (
              <button
                key={preset.days}
                type="button"
                onClick={() => applyPreset(preset.days)}
                aria-pressed={isActive}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                  isActive
                    ? "border-primary bg-primary/10 text-foreground shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <CalendarDays size={14} className={isActive ? "text-primary" : "text-muted-foreground/70"} />
                <span>{t(preset.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-2 md:p-4 overflow-x-auto">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            onSelect(range?.from || null, range?.to || null);
          }}
          numberOfMonths={numberOfMonths}
          disabled={{ before: new Date() }}
          className={cn("p-1 md:p-3 mx-auto pointer-events-auto")}
        />
      </div>

      {startDate && endDate && (
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <CalendarDays size={18} className="text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug">
              {startDate.toLocaleDateString(dateLocale, { day: "numeric", month: "long" })}
              {" → "}
              {endDate.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totalDays} {t("booking.date.daysSuffix")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;
