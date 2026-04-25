import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";
import { Children, isValidElement, type ReactNode } from "react";

export type FaqItem = { q: string; a: string | ReactNode; aText?: string };

type Props = {
  name?: string;
  location?: string;
  faqs: FaqItem[];
  emitSchema?: boolean;
};

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children;
    return nodeToText(children);
  }
  return "";
}

const LocalitaFAQ = ({ name, location, faqs, emitSchema = false }: Props) => {
  const heading = name ?? location ?? "";

  const schema = emitSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.aText ?? (typeof f.a === "string" ? f.a : nodeToText(f.a)),
          },
        })),
      }
    : null;

  return (
    <section className="py-24 md:py-32 bg-background relative">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <div className="container px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Domande su {heading}
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
};

export default LocalitaFAQ;
