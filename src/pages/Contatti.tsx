import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildLocalBusinessSchema,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_WHATSAPP,
} from "@/lib/siteSchema";
import { trackWhatsAppClick } from "@/lib/analytics";

const Contatti = () => {
  const breadcrumbs = [{ name: "Contatti", url: "/contatti" }];
  const localBusinessSchema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/contatti#localbusiness",
    description:
      "Contatti e sede di GDIS Rent & Service: noleggio auto, scooter e quad a Olbia e Costa Smeralda.",
  });

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contatti — Noleggio Auto Olbia | GDIS Rent & Service"
        description="Contatta GDIS Rent & Service: sede in Via Annibale Caro 52 a Olbia, WhatsApp H24 +39 352 045 9150, email gdis.noleggi@gmail.com. Consegna veicoli in aeroporto e porto."
        canonical="/contatti"
        breadcrumbs={breadcrumbs}
        jsonLd={localBusinessSchema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="container pt-6 pb-12 md:pt-10 md:pb-20">
        <header className="max-w-3xl mb-10">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Contatti — Noleggio Auto Olbia
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Siamo a Olbia, a pochi minuti dall'aeroporto Costa Smeralda e dal Porto Isola Bianca.
            Rispondiamo su WhatsApp 24 ore su 24 e consegniamo il veicolo dove preferisci.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-4">
            <article className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-1">Sede</h2>
                <p className="text-muted-foreground">Via Annibale Caro 52 — 07026 Olbia (SS), Italia</p>
                <a
                  href="https://www.google.com/maps?q=40.929258,9.483627"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Apri in Google Maps
                </a>
              </div>
            </article>

            <article className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-1">WhatsApp H24</h2>
                <a
                  href={`https://wa.me/${BUSINESS_PHONE_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                  onClick={() => trackWhatsAppClick("contatti_card")}
                >
                  +39 352 045 9150
                </a>
                <p className="text-sm text-muted-foreground mt-1">Risposta rapida per prenotazioni e consegne.</p>
              </div>
            </article>

            <article className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-1">Telefono</h2>
                <a href={`tel:${BUSINESS_PHONE.replace(/[^+\d]/g, "")}`} className="text-primary hover:underline">
                  {BUSINESS_PHONE.replace(/-/g, " ")}
                </a>
              </div>
            </article>

            <article className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-1">Email</h2>
                <a href={`mailto:${BUSINESS_EMAIL}`} className="text-primary hover:underline">
                  {BUSINESS_EMAIL}
                </a>
              </div>
            </article>

            <article className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-1">Orari ufficio</h2>
                <ul className="text-muted-foreground text-sm space-y-0.5">
                  <li>Lun–Ven: 09:00 – 19:00</li>
                  <li>Sab–Dom: 11:30 – 17:30</li>
                  <li className="text-primary font-medium">Consegna veicoli H24 su prenotazione WhatsApp</li>
                </ul>
              </div>
            </article>

            <div className="pt-2">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <a
                  href={`https://wa.me/${BUSINESS_PHONE_WHATSAPP}?text=${encodeURIComponent(
                    "Ciao GDIS Rent, vorrei informazioni su un noleggio",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick("contatti_cta")}
                >
                  Scrivici su WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border aspect-[4/5] md:aspect-auto min-h-[420px]">
            <iframe
              title="Sede GDIS Rent & Service — Olbia"
              src="https://www.google.com/maps?q=40.929258,9.483627&hl=it&z=16&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
