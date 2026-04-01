import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type ReactNode } from "react";

type FaqItem = { q: string; a: string | ReactNode };

type Props = {
  name: string;
  faqs: FaqItem[];
};

const LocalitaFAQ = ({ name, faqs }: Props) => (
  <section className="py-24 md:py-32 bg-background relative">
    <div className="container px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Domande su {name}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={`rounded-xl border px-6 ${
                i < 2
                  ? "bg-primary text-primary-foreground border-primary/80 [&_svg]:text-primary-foreground"
                  : "bg-background border-border/50"
              }`}
            >
              <AccordionTrigger
                className={`text-left font-semibold hover:no-underline ${
                  i < 2 ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className={i < 2 ? "text-primary-foreground/80 leading-relaxed" : "text-muted-foreground leading-relaxed"}
              >
                <p>{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default LocalitaFAQ;
