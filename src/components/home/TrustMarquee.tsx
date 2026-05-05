import { supabaseImg } from "@/lib/img";

const gdisLogo = supabaseImg("asset/GDISlogo.webp", { raw: true });

const DEFAULT_ITEMS = [
  "Affidabilità",
  "Flotta Premium",
  "Assistenza 24/7",
  "Prezzi Trasparenti",
  "Sardegna",
  "Noleggio Facile",
];

type Props = {
  /** Override dei trust items mostrati nella marquee. Default: branding generico. */
  items?: string[];
};

const TrustMarquee = ({ items = DEFAULT_ITEMS }: Props) => {
  const repeated = Array.from({ length: 6 }).flatMap(() => items);
  return (
    <section className="relative w-full flex items-center justify-center py-14 bg-transparent z-20 -mt-16 pointer-events-none">
      <div className="absolute w-[200%] left-1/2 -translate-x-1/2 bg-primary transform -rotate-2 py-5 shadow-[0_10px_40px_hsl(var(--primary)/0.3)] border-y border-primary/30 overflow-hidden pointer-events-auto">
        <div className="flex w-max overflow-hidden">
          <div className="flex items-center flex-shrink-0 animate-marquee">
            {repeated.map((item, i) => (
              <div key={i} className="flex items-center px-6 md:px-10 flex-shrink-0">
                <span className="text-white font-display font-black text-sm md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
                  {item}
                </span>
                <img
                  src={gdisLogo}
                  alt="GDIS"
                  width={60}
                  height={26}
                  loading="lazy"
                  decoding="async"
                  className="h-6 md:h-8 w-auto opacity-90 drop-shadow-md ml-6 md:ml-10 flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;
