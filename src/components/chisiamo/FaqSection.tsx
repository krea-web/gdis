import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Quali documenti servono per noleggiare?", a: "Patente di guida valida, carta d'identità o passaporto, e carta di credito intestata al conducente. Per i cittadini extra-UE serve anche il permesso internazionale di guida.", highlighted: true },
  { q: "È possibile aggiungere un secondo guidatore?", a: "Sì, è possibile aggiungere un secondo guidatore al momento della prenotazione o al ritiro del veicolo. Il secondo guidatore deve presentare gli stessi documenti del conducente principale.", highlighted: true },
  { q: "Qual è la politica di cancellazione?", a: "La cancellazione è gratuita fino a 48 ore prima del ritiro. Per cancellazioni tardive viene applicata una penale pari al 50% del costo totale del noleggio.", highlighted: true },
  { q: "Quali sono i metodi di pagamento accettati?", a: "Accettiamo carte di credito Visa, Mastercard e American Express. Il pagamento avviene al ritiro del veicolo. Per le prenotazioni online è richiesta una pre-autorizzazione sulla carta.", highlighted: false },
  { q: "I veicoli sono coperti da assicurazione?", a: "Tutti i veicoli includono RCA, furto e incendio. È possibile acquistare coperture aggiuntive come la Kasko e la riduzione della franchigia.", highlighted: false },
  { q: "È possibile riconsegnare il veicolo in un luogo diverso?", a: "Sì, offriamo il servizio di riconsegna in location diverse con un piccolo supplemento. Contattaci per conoscere le location disponibili.", highlighted: false },
  { q: "Offrite servizio di trasporto merci?", a: "Sì, GDIS offre servizi di trasporto merci con furgoni e camion in tutta la Sardegna. Contattaci per un preventivo personalizzato.", highlighted: false },
  { q: "Come posso contattarvi per le auto luxury?", a: "Per le auto luxury ti consigliamo di contattarci direttamente via WhatsApp al +39 352 045 9150 per verificare disponibilità e ricevere un preventivo dedicato.", highlighted: false },
];

const FaqSection = () => {
  return (
    <section className="section-padding bg-transparent">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Domande frequenti
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={`faq-${faq.q.slice(0, 20)}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className={`rounded-xl border px-6 ${
                  faq.highlighted
                    ? "border-primary/30 bg-accent blue-glow-sm"
                    : "border-border bg-card"
                }`}
              >
                <AccordionTrigger className="text-left font-display font-medium text-foreground py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
