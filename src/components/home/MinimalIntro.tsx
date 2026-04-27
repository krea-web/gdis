import { supabaseImg } from "@/lib/img";

const logos = [
  { path: "asset/loghi/Audi.webp", alt: "Audi" },
  { path: "asset/loghi/bmw.webp", alt: "BMW" },
  { path: "asset/loghi/fiat.webp", alt: "Fiat" },
  { path: "asset/loghi/honda.webp", alt: "Honda" },
  { path: "asset/loghi/jeep.webp", alt: "Jeep" },
  { path: "asset/loghi/mercedes.webp", alt: "Mercedes" },
  { path: "asset/loghi/Yamaha.webp", alt: "Yamaha" },
];

const MinimalIntro = () => {
  return (
    <section className="relative py-20 md:py-28 flex items-center justify-center bg-transparent z-10">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="block uppercase tracking-[0.3em] text-blue-600 text-xs md:text-sm font-semibold mb-6">
            L'Eccellenza in Movimento
          </span>

          <h2 className="font-display text-5xl sm:text-7xl md:text-[6rem] leading-[1.1] tracking-tighter text-slate-900 mb-8">
            <span className="block font-light">Il tuo noleggio</span>
            <span className="block font-bold text-blue-600 drop-shadow-sm">parte da qui.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed mb-10">
            Dimentica le code e la burocrazia. Un'esperienza digitale fluida per portarti sulla strada in pochi
            istanti.
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-10 mb-12 flex-wrap">
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={supabaseImg(logo.path, { width: 120, quality: 80 })}
                alt={logo.alt}
                width={84}
                height={56}
                loading="lazy"
                decoding="async"
                className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                  logo.alt === "BMW"
                    ? "opacity-70 hover:opacity-100 drop-shadow-[0_0_1px_rgba(0,0,0,0.6)]"
                    : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
              />
            ))}
          </div>

          <div className="h-[1px] w-[120px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default MinimalIntro;
