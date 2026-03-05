import gdisLogo from "@/assets/gdis-logo.png";

const items = [
  "Affidabilità",
  "Flotta Premium",
  "Assistenza 24/7",
  "Prezzi Trasparenti",
  "Sardegna",
  "Noleggio Facile",
];

const TrustMarquee = () => {
  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 mx-6">
        <span className="text-primary-foreground font-display font-bold text-sm md:text-base uppercase tracking-[0.2em]">
          {item}
        </span>
        <img src={gdisLogo} alt="" className="h-5 w-auto brightness-0 invert opacity-60" />
      </span>
    ));

  return (
    <section className="relative bg-primary py-4 -rotate-1 scale-[1.02] z-10">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderItems()}
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
};

export default TrustMarquee;
