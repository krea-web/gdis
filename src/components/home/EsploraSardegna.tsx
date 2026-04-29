import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabaseImg } from "@/lib/img";

type Destination = {
  name: string;
  desc: string;
  path: string;
  to: string;
  span: string;
  imgWidth: number;
  imgHeight: number;
  size: "lg" | "md" | "sm";
};

const destinations: Destination[] = [
  {
    name: "Porto Cervo",
    desc: "Lusso, yacht e la Promenade du Port.",
    path: "locations/porto-cervo/gdisrent-noleggio-porto-cervo.webp",
    to: "/noleggio-auto-a-porto-cervo",
    span: "md:col-span-2 md:row-span-2",
    imgWidth: 900,
    imgHeight: 900,
    size: "lg",
  },
  {
    name: "San Teodoro",
    desc: "La Cinta, movida e spiagge infinite.",
    path: "locations/san-teodoro/gdisrent-noleggio-san-teodoro.webp",
    to: "/noleggio-auto-a-san-teodoro",
    span: "md:col-span-2",
    imgWidth: 900,
    imgHeight: 450,
    size: "md",
  },
  {
    name: "Baja Sardinia",
    desc: "Phi Beach e tramonti leggendari.",
    path: "locations/baja-sardinia/gdisrent-noleggio-baja-sardinia.webp",
    to: "/noleggio-auto-a-baja-sardinia",
    span: "",
    imgWidth: 450,
    imgHeight: 450,
    size: "sm",
  },
  {
    name: "Olbia",
    desc: "Aeroporto e gateway Costa Smeralda.",
    path: "locations/olbia/gdisrent-noleggio-auto-olbia.webp",
    to: "/noleggio-auto-a-olbia",
    span: "",
    imgWidth: 450,
    imgHeight: 450,
    size: "sm",
  },
  {
    name: "Porto Rotondo",
    desc: "Cale segrete e avventura off-road.",
    path: "locations/porto-rotondo/gdisrent-noleggio-porto-rotondo.webp",
    to: "/noleggio-auto-a-porto-rotondo",
    span: "",
    imgWidth: 450,
    imgHeight: 450,
    size: "sm",
  },
  {
    name: "San Pantaleo",
    desc: "Borgo bohémien e mercato del giovedì.",
    path: "locations/san-pantaleo/gdisrent-noleggio-san-pantaleo.webp",
    to: "/noleggio-auto-a-san-pantaleo",
    span: "",
    imgWidth: 450,
    imgHeight: 450,
    size: "sm",
  },
  {
    name: "Golfo Aranci",
    desc: "Traghetti, delfini e Cala Moresca.",
    path: "locations/golfo-aranci/gdisrent-noleggio-golfo-aranci.webp",
    to: "/noleggio-auto-a-golfo-aranci",
    span: "",
    imgWidth: 450,
    imgHeight: 450,
    size: "sm",
  },
];

const EsploraSardegna = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Destinazioni</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Esplora la Sardegna</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          I nostri veicoli ti portano ovunque. Dalle spiagge nascoste alle strade panoramiche della Costa Smeralda.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={dest.span}
          >
            <Link
              to={dest.to}
              className={`relative w-full rounded-3xl overflow-hidden group cursor-pointer block border border-white/10 ${
                dest.size === "md" ? "aspect-[2/1]" : "aspect-square"
              }`}
              aria-label={`Scopri il noleggio auto a ${dest.name}`}
            >
              <img
                src={supabaseImg(dest.path, {
                  width: dest.imgWidth,
                  height: dest.imgHeight,
                  resize: "cover",
                  quality: 75,
                })}
                alt={`Noleggio auto ${dest.name}`}
                width={dest.imgWidth}
                height={dest.imgHeight}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className={`text-primary ${dest.size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
                  <h3
                    className={`font-display font-semibold text-white ${
                      dest.size === "lg" ? "text-2xl" : dest.size === "md" ? "text-xl" : "text-base"
                    }`}
                  >
                    {dest.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <p className={`text-white/70 ${dest.size === "sm" ? "text-xs" : "text-sm"}`}>{dest.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EsploraSardegna;
