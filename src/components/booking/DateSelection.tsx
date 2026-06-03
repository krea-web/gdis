import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (start: Date | null, end: Date | null) => void;
  lang?: Locale;
};

const DateSelection = ({ startDate, endDate, onSelect, lang = "it" }: Props) => {
  const t = useTranslations(lang);
  const dateRange: DateRange | undefined =
    startDate ? { from: startDate, to: endDate || undefined } : undefined;

  const dateLocale = t("booking.date.locale");

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {t("booking.date.title")}
      </h2>
      <p className="text-muted-foreground mb-8">{t("booking.date.subtitle")}</p>

      <div className="bg-card rounded-2xl border border-border p-4 md:p-6 inline-block">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            onSelect(range?.from || null, range?.to || null);
          }}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          className={cn("p-3 pointer-events-auto")}
        />
      </div>

      {startDate && endDate && (
        <div className="mt-6 p-4 rounded-xl bg-accent border border-primary/20">
          <p className="text-sm text-foreground font-medium">
            {startDate.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })}
            {" → "}
            {endDate.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })}
            <span className="text-muted-foreground ml-2">
              ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} {t("booking.date.daysSuffix")})
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DateSelection;
