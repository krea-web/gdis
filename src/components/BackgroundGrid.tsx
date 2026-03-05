const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Perspective wrapper */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1000px" }}
      >
        {/* 3D tilted grid */}
        <div
          className="absolute w-[200%] h-[200%] -left-1/2 top-0 animate-grid-flow"
          style={{
            transformOrigin: "center top",
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, transparent 5%, black 40%, black 70%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 5%, black 40%, black 70%, transparent 95%)",
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundGrid;
