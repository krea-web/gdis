import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Truck, Ship, Train, AlertTriangle, Warehouse, Car, Bike, Anchor, ParkingCircle, Droplets, Wrench, ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FaqSection from "@/components/chisiamo/FaqSection";

const bgImageUrl = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/premium-banner-bg.jpg";

const trasportiServices = [
  { icon: Truck, title: "Trasporto Conto Terzi", desc: "Servizio completo di trasporto merci su gomma in tutta la Sardegna e verso il continente." },
  { icon: Ship, title: "Intermodale Terra/Mare", desc: "Logistica integrata terra-mare per spedizioni efficienti verso qualsiasi destinazione." },
  { icon: Train, title: "Intermodale Rotaia", desc: "Soluzioni combinate strada-ferrovia per carichi voluminosi e tratte nazionali." },
  { icon: AlertTriangle, title: "Merci Pericolose & Deperibili", desc: "Trasporto specializzato ADR e catena del freddo per merci che richiedono certificazioni specifiche." },
  { icon: Warehouse, title: "Logistica & Magazzini", desc: "Gestione magazzini, stoccaggio e distribuzione. Soluzioni complete per la tua supply chain." },
];

const flottaItems = [
  { icon: Truck, title: "Veicoli Industriali", desc: "Noleggio e permuta di furgoni, camion e rimorchi per ogni esigenza commerciale." },
  { icon: Car, title: "Auto & City Car", desc: "Flotta turistica moderna: utilitarie, berline e SUV per vacanze e spostamenti." },
  { icon: Bike, title: "Scooter & Quad", desc: "Due e quattro ruote per esplorare la costa in totale libertà e divertimento." },
  { icon: Anchor, title: "Imbarcazioni & Yacht", desc: "Noleggio imbarcazioni da diporto e yacht per vivere il mare sardo con stile." },
];

const serviziExtra = [
  { icon: ParkingCircle, title: "Aree di Parcheggio", desc: "Parcheggi custoditi e sicuri per veicoli commerciali e privati." },
  { icon: Warehouse, title: "Rimessaggio", desc: "Spazi di rimessaggio coperti e scoperti per veicoli, rimorchi e imbarcazioni." },
  { icon: Droplets, title: "Lavaggio Industriale", desc: "Servizio di lavaggio professionale per veicoli industriali e commerciali." },
];

const ChiSiamo = () => {
  return (
    <>
      <SEOHead
        title="Chi Siamo — GDIS Service Srl | Trasporti, Logistica e Noleggio in Sardegna"
        description="GDIS Service Srl: leader nei trasporti conto terzi, logistica intermodale, noleggio veicoli industriali e turistici in Sardegna. Scopri i nostri servizi."
        canonical="/chisiamo"
      />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[hsl(var(--brand-dark))]">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={bgImageUrl} alt="GDIS Service Srl" className="w-full h-full object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-black/60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            DAL 2025 IN SARDEGNA
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight mb-6">
            GDIS Service <span className="text-primary italic font-light">Srl</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Leader nei trasporti, logistica e noleggio in Sardegna. Un ecosistema completo di servizi per aziende e privati.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
            className="w-24 md:w-32 h-[3px] bg-primary mx-auto mt-8 shadow-[0_0_15px_hsl(var(--primary)/0.6)]"
          />
        </motion.div>
      </section>

      {/* MISSION */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Affidabilità", desc: "Certificazioni ADR, flotta controllata e assicurazioni complete per ogni servizio." },
              { icon: Clock, title: "Operatività 24/7", desc: "Assistenza continua per trasporti urgenti, noleggi last-minute e logistica time-critical." },
              { icon: MapPin, title: "Copertura Totale", desc: "Dalla Gallura al Campidano, dalle isole minori al continente. Ovunque in Sardegna e oltre." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRASPORTI & LOGISTICA */}
      <section className="py-24 md:py-32 bg-[hsl(var(--brand-dark))] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_60%)]" />
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-3 block">Core Business</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Trasporti & <span className="italic font-light text-primary">Logistica</span></h2>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto font-light">
              Soluzioni complete per il trasporto merci conto terzi, logistica integrata e gestione magazzini in tutta la Sardegna.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trasportiServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl p-8 bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-300"
              >
                <s.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-lg text-primary-foreground mb-2">{s.title}</h3>
                <p className="text-primary-foreground/60 font-light leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOTTA COMMERCIALE & TURISTICA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-3 block">Noleggio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Flotta Commerciale <span className="italic font-light text-primary">& Turistica</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Noleggio e permuta veicoli industriali, rimorchi, auto, scooter, furgoni commerciali e imbarcazioni da diporto.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {flottaItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl p-8 bg-muted/50 border border-border/50 hover:border-primary/30 hover:shadow-[0_10px_40px_hsl(var(--primary)/0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <item.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI COMPLEMENTARI */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-3 block">Plus</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Servizi <span className="italic font-light text-primary">Complementari</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {serviziExtra.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl p-8 bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <item.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* GRAND CTA */}
      <section className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,hsl(0_0%_100%/0.03)_20px,hsl(0_0%_100%/0.03)_40px)]" />
        </div>
        <div className="container relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
              Parliamo del tuo progetto
            </h2>
            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
              Trasporti, noleggio o logistica — contattaci per una soluzione su misura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] transition-all duration-300">
                <Link to="/prenotaora">Prenota un Veicolo <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-lg rounded-full px-12 h-16 transition-all duration-300">
                <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">Contattaci su WhatsApp</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ChiSiamo;
