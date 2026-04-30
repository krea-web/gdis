import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

type Vehicle = {
  name: string;
  to: string;
  patente: string;
  posti: string;
  ztlReady: boolean;
  bagagliFamiglia: boolean;
  offRoad: boolean;
  pricePerDayFrom: number;
};

const DEFAULT_VEHICLES: Vehicle[] = [
  {
    name: "Fiat Panda",
    to: "/flotta/fiat-panda",
    patente: "B",
    posti: "4-5",
    ztlReady: false,
    bagagliFamiglia: true,
    offRoad: false,
    pricePerDayFrom: 39,
  },
  {
    name: "Mercedes A 180d",
    to: "/flotta/mercedes-classe-a180d",
    patente: "B",
    posti: "5",
    ztlReady: false,
    bagagliFamiglia: true,
    offRoad: false,
    pricePerDayFrom: 89,
  },
  {
    name: "Honda SH",
    to: "/flotta/honda-sh",
    patente: "B / A2",
    posti: "2",
    ztlReady: true,
    bagagliFamiglia: false,
    offRoad: false,
    pricePerDayFrom: 35,
  },
  {
    name: "Yamaha Raptor",
    to: "/flotta/yamaha-raptor",
    patente: "B",
    posti: "1",
    ztlReady: true,
    bagagliFamiglia: false,
    offRoad: true,
    pricePerDayFrom: 90,
  },
];

const Cell = ({ on }: { on: boolean }) =>
  on ? (
    <Check className="h-5 w-5 text-primary mx-auto" aria-label="sì" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground/40 mx-auto" aria-label="no" />
  );

type Props = {
  /** Override opzionale: passare un sottoinsieme o ordine custom dei veicoli */
  vehicles?: Vehicle[];
  title?: string;
  subtitle?: string;
};

const VehicleComparisonTable = ({
  vehicles = DEFAULT_VEHICLES,
  title = "Quale veicolo scegliere?",
  subtitle = "Confronto rapido per decidere in 30 secondi.",
}: Props) => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-foreground">Caratteristica</th>
              {vehicles.map((v) => (
                <th key={v.name} className="p-4 text-center font-semibold text-foreground min-w-[120px]">
                  <Link to={v.to} className="hover:text-primary transition-colors">
                    {v.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60">
              <td className="p-4 text-muted-foreground">Patente</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4 text-center font-medium text-foreground">
                  {v.patente}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border/60">
              <td className="p-4 text-muted-foreground">Posti</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4 text-center font-medium text-foreground">
                  {v.posti}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border/60">
              <td className="p-4 text-muted-foreground">ZTL / parcheggi gratis</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4">
                  <Cell on={v.ztlReady} />
                </td>
              ))}
            </tr>
            <tr className="border-b border-border/60">
              <td className="p-4 text-muted-foreground">Famiglia + bagagli</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4">
                  <Cell on={v.bagagliFamiglia} />
                </td>
              ))}
            </tr>
            <tr className="border-b border-border/60">
              <td className="p-4 text-muted-foreground">Off-road / sterrati</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4">
                  <Cell on={v.offRoad} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground">Prezzo da</td>
              {vehicles.map((v) => (
                <td key={v.name} className="p-4 text-center">
                  <span className="font-display text-lg font-bold text-primary">€{v.pricePerDayFrom}</span>
                  <span className="text-xs text-muted-foreground">/g</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Tariffe indicative dalla bassa stagione. Prezzo finale calcolato sulle date selezionate al momento della prenotazione.
      </p>
    </div>
  </section>
);

export default VehicleComparisonTable;
