import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (start: Date | null, end: Date | null) => void;
};

const DateSelection = ({ startDate, endDate, onSelect }: Props) => {
  const dateRange: DateRange | undefined =
    startDate ? { from: startDate, to: endDate || undefined } : undefined;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Seleziona le date
      </h2>
      <p className="text-muted-foreground mb-8">Scegli il periodo del noleggio.</p>

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
            {startDate.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
            {" → "}
            {endDate.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
            <span className="text-muted-foreground ml-2">
              ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} giorni)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DateSelection;
