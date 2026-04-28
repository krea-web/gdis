import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicles, groupByCategory, getLowestRate } from "@/hooks/useVehicles";
import { Skeleton } from "@/components/ui/skeleton";

const SUPABASE_OBJECT = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles";

const transparentImageMap: Record<string, string> = {
  city_car: `${SUPABASE_OBJECT}/gdis-fiatpandacitycar.png`,
  premium: `${SUPABASE_OBJECT}/gdis-mercedessupercarclassea180d.png`,
  quad: `${SUPABASE_OBJECT}/gdis-yamahaquadraptor.png`,
  scooter: `${SUPABASE_OBJECT}/gdis-hondascooter350.png`,
};

const categoryMeta: Record<string, { title: string; subtitle: string; description: string; link?: string }> = {
  city_car: {
    title: "City Car",
    subtitle: "Praticità & Stile",
    description:
      "Design compatto ed eleganza per muoverti in città e scoprire la costa con il massimo comfort. L'opzione perfetta per la Costa Smeralda.",
  },
  premium: {
    title: "Mercedes Classe A",
    subtitle: "Premium & Comfort",
    description:
      "Eleganza tedesca e tecnologia MBUX per vivere la Costa Smeralda con il massimo del comfort. Cambio automatico, diesel efficiente, 5 posti.",
    link: "/flotta/mercedes-classe-a180d",
  },
  quad: {
    title: "Quad Raptor",
    subtitle: "Avventura off-road",
    description:
      "Potenza e adrenalina pura. Esplora sentieri sterrati e spiagge nascoste che le auto non possono raggiungere.",
  },
  scooter: {
    title: "Scooter Premium",
    subtitle: "Libertà a 2 Ruote",
    description:
      "Evita il traffico e goditi la libertà assoluta. Senti la brezza mediterranea sulla pelle in ogni tuo spostamento.",
  },
};

const DESIRED_ORDER = ["city_car", "premium", "quad", "scooter"];

const FALLBACK_PRICES: Record<string, number> = {
  city_car: 50,
  premium: 75,
  quad: 80,
  scooter: 40,
};

const FleetShowcase = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const grouped = vehicles ? groupByCategory(vehicles) : {};

  return (
    <section className="py-24 md:py-32 bg-muted/30 overflow-hidden relative" aria-label="La nostra flotta di veicoli">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container px-4 relative z-10">
        <div className="mb-20 md:mb-32 text-center max-w-3xl mx-auto">
          <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            La Nostra Flotta
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Scegli la tua <br className="hidden md:block" />
            <span className="italic font-light text-primary">Prossima Avventura.</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-24">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center">
                <Skeleton className="w-full md:w-1/2 h-[300px] rounded-3xl" />
                <div className="w-full md:w-1/2 space-y-4">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-3/4 h-12" />
                  <Skeleton className="w-full h-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-24 md:gap-40">
            {DESIRED_ORDER.map((cat, i) => {
              const meta = categoryMeta[cat];
              const image = transparentImageMap[cat];
              const hasDbData = grouped[cat] && grouped[cat].length > 0;
              const lowestPrice = hasDbData
                ? Math.min(...grouped[cat].map((v) => getLowestRate(v)))
                : FALLBACK_PRICES[cat];

              const isEven = i % 2 === 0;

              return (
                <article
                  key={cat}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 md:gap-20 group`}
                >
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
                      {meta.subtitle}
                    </span>
                    <h3 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                      {meta.title}
                    </h3>
                    <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
                      {meta.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Link
                        to={meta.link || "/prenotaora"}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
                      >
                        <div className="flex items-center gap-4 bg-primary text-primary-foreground rounded-full px-8 py-4 font-bold shadow-[0_10px_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_15px_40px_hsl(var(--primary)/0.4)] hover:-translate-y-1 transition-all duration-300">
                          <span>{meta.link ? "Scopri di più" : "Prenota Ora"}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                      <span className="text-muted-foreground font-medium">
                        Da <strong className="text-2xl text-foreground">€{lowestPrice}</strong>
                        <span className="text-sm">/giorno</span>
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 relative flex justify-center items-center">
                    <img
                      src={image}
                      alt={`Noleggio ${meta.title} in Sardegna - GDIS Rent`}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 w-3/5 sm:w-1/2 md:w-full mx-auto max-w-[260px] sm:max-w-[340px] md:max-w-[600px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetShowcase;
