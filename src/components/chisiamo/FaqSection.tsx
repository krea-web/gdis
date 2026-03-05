import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dati base (verranno mescolati dinamicamente)
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
    highlighted: true,
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
    q: "Offrite servizio di trasporto merci?",
    a: "Sì, GDIS offre servizi di trasporto merci con furgoni e camion in tutta la Sardegna. Contattaci per un preventivo personalizzato.",
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

  // Algoritmo per mescolare le domande in ordine casuale al caricamento
  useEffect(() => {
    const highlighted = initialFaqs.filter((f) => f.highlighted);
    const normal = initialFaqs.filter((f) => !f.highlighted);

    // Mescola solo le 3 domande principali
    const shuffledHighlighted = [...highlighted].sort(() => Math.random() - 0.5);

    // Unisce le domande mescolate con quelle normali
    setFaqs([...shuffledHighlighted, ...normal]);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* COLONNA SINISTRA: Sticky Header & CTA */}
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky top-32"
            >
              <span className="text-blue-600 font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                Supporto
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Domande <br />
                <span className="italic font-light text-blue-600">Frequenti.</span>
              </h2>
              <p className="text-slate-500 text-lg font-light mb-10 leading-relaxed">
                Tutto quello che devi sapere prima di metterti alla guida. Trasparenza totale, zero sorprese.
              </p>

              {/* Box Contatto Rapido */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-display font-semibold text-slate-900 mb-2">Hai altre domande?</h4>
                <p className="text-sm text-slate-500 mb-6 font-light">
                  Il nostro team è a tua disposizione su WhatsApp per chiarire ogni dubbio.
                </p>
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full py-6 group shadow-md hover:shadow-lg transition-all"
                  onClick={() => window.open("https://wa.me/393520459150", "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Chatta con noi
                </Button>
              </div>
            </motion.div>
          </div>

          {/* COLONNA DESTRA: Accordion List */}
          <div className="w-full lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-6 w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  // Usiamo la domanda come chiave per evitare glitch grafici durante lo shuffle
                  key={`faq-${faq.q}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className={`transition-all duration-300 ${
                      faq.highlighted
                        ? // DESIGN CARD BLU
                          "bg-blue-600 border border-blue-500 shadow-[0_10px_30px_rgba(0,0,255,0.2)] rounded-2xl px-6 data-[state=open]:shadow-[0_15px_40px_rgba(0,0,255,0.35)] data-[state=open]:scale-[1.02]"
                        : // DESIGN CARD STANDARD
                          "bg-transparent border-b border-slate-200 px-2 rounded-none hover:bg-white/50"
                    }`}
                  >
                    <AccordionTrigger
                      className={`text-left font-display text-lg hover:no-underline py-6 ${
                        faq.highlighted ? "font-semibold text-white [&>svg]:text-white" : "font-medium text-slate-800"
                      }`}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className={`font-light leading-relaxed pb-8 ${
                        faq.highlighted
                          ? "text-blue-50 text-base pt-4 border-t border-blue-400/50"
                          : "text-slate-500 text-sm"
                      }`}
                    >
                      {faq.a}
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
