const items = [
  "Affidabilità Garantita",
  "✦",
  "Flotta Premium",
  "✦",
  "Assistenza 24/7",
  "✦",
  "Prezzi Trasparenti",
  "✦",
  "100+ Clienti Soddisfatti",
  "✦",
  "Sardegna & Oltre",
  "✦",
];

const TrustMarquee = () => {
  return (
    <section className="skew-banner bg-primary py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 text-primary-foreground font-display font-semibold text-sm md:text-base tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrustMarquee;
