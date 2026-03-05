import gdisLogo from "@/assets/gdis-logo.png";

const items = [
  "+500 Noleggi",
  "100% Soddisfatti",
  "Sardegna & Oltre",
  "Assistenza H24",
  "Flotta Premium",
  "Dal 2020",
];

const TrustMarquee2 = () => {
  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 mx-6">
        <span className="text-primary-foreground font-display font-bold text-sm uppercase tracking-[0.2em]">
          {item}
        </span>
        <img src={gdisLogo} alt="" className="h-4 w-auto opacity-60" />
      </span>
    ));

  return (
    <section className="bg-primary py-4 rotate-1 scale-[1.02] z-10 relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderItems()}
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
};

export default TrustMarquee2;
