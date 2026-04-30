import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/analytics";

const initialFaqs = [
  {
    q: "Quali documenti servono per noleggiare?",
    a: "Patente di guida valida, carta d'identità o passaporto, e carta di credito intestata al conducente. Per i cittadini extra-UE serve anche il permesso internazionale di guida.",
    highlighted: true,
  },
  {
    q: "È possibile aggiungere un secondo guidatore?",
    a: "Sì, è possibile aggiungere un secondo guidatore al momento della prenotazione o al ritiro del veicolo. Il secondo guidatore deve presentare gli stessi documenti del conducente principale.",
    highlighted: true,
  },
  {
    q: "Qual è la politica di cancellazione?",
    a: "La cancellazione è gratuita fino a 48 ore prima del ritiro. Per cancellazioni tardive viene applicata una penale pari al 50% del costo totale del noleggio.",
    highlighted: false,
  },
  {
    q: "Quali sono i metodi di pagamento accettati?",
    a: "Accettiamo carte di credito Visa, Mastercard e American Express. Il pagamento avviene al ritiro del veicolo. Per le prenotazioni online è richiesta una pre-autorizzazione sulla carta.",
    highlighted: false,
  },
  {
    q: "I veicoli sono coperti da assicurazione?",
    a: "Tutti i veicoli includono RCA, furto e incendio. È possibile acquistare coperture aggiuntive come la Kasko e la riduzione della franchigia.",
    highlighted: false,
  },
  {
    q: "È possibile riconsegnare il veicolo in un luogo diverso?",
    a: "Sì, offriamo il servizio di riconsegna in location diverse con un piccolo supplemento. Contattaci per conoscere le location disponibili.",
    highlighted: false,
  },
  {
    q: "Offrite consegna VIP a yacht e hotel?",
    a: "Assolutamente sì! Il nostro servizio Consegna VIP porta il veicolo direttamente al tuo yacht, hotel o villa privata in tutta la Costa Smeralda e Gallura.",
    highlighted: false,
  },
  {
    q: "Come posso contattarvi per le auto luxury?",
    a: "Per le auto luxury ti consigliamo di contattarci direttamente via WhatsApp al +39 352 045 9150 per verificare disponibilità e ricevere un preventivo dedicato.",
    highlighted: false,
  },
];

const FaqSection = () => {
  const [faqs, setFaqs] = useState(initialFaqs);

  useEffect(() => {
    const highlighted = initialFaqs.filter((f) => f.highlighted);
    const normal = initialFaqs.filter((f) => !f.highlighted);
    setFaqs([...highlighted, ...normal]);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky top-32"
            >
              <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                Supporto
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Domande <br />
                <span className="italic font-light text-muted-foreground">Frequenti.</span>
              </h2>
              <p className="text-muted-foreground text-lg font-light mb-10 leading-relaxed">
                Tutto quello che devi sapere prima di metterti alla guida. Trasparenza totale, zero sorprese.
              </p>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <h4 className="font-display font-semibold text-foreground mb-2">Hai altre domande?</h4>
                <p className="text-sm text-muted-foreground mb-6 font-light">
                  Il nostro team è a tua disposizione su WhatsApp per chiarire ogni dubbio.
                </p>
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full py-6 group shadow-md hover:shadow-lg transition-all"
                  onClick={() => {
                    trackWhatsAppClick("faq_chisiamo");
                    window.open("https://wa.me/393520459150", "_blank");
                  }}
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" size={20} />
                  Chatta con noi
                </Button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-4 w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  key={`faq-${faq.q}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className={
                      faq.highlighted
                        ? "bg-primary backdrop-blur-md border border-primary rounded-2xl px-6 transition-all duration-300 data-[state=open]:shadow-[0_10px_30px_hsl(var(--primary)/0.3)]"
                        : "bg-muted backdrop-blur-md border border-border rounded-2xl px-6 hover:bg-muted/80 transition-all duration-300 data-[state=open]:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    }
                  >
                    <AccordionTrigger
                      className={
                        faq.highlighted
                          ? "text-left font-display text-lg font-semibold text-primary-foreground hover:no-underline py-6 [&>svg]:text-primary-foreground"
                          : "text-left font-display text-lg font-semibold text-foreground hover:no-underline py-6 [&>svg]:text-foreground"
                      }
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className={
                        faq.highlighted
                          ? "text-primary-foreground/80 font-light leading-relaxed pb-6 text-base"
                          : "text-muted-foreground font-light leading-relaxed pb-6 text-base"
                      }
                    >
                      <p>{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
