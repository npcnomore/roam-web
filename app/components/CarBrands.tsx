export default function CarBrands() {
  const brands = [
    "BMW",
    "PORSCHE",
    "TOYOTA",
    "HONDA",
    "SUBARU",
    "NISSAN",
    "MAZDA",
    "FORD",
    "CHEVY",
    "AUDI",
    "VW",
    "MITSUBISHI",
  ];
  return (
    <section style={{ padding: "0 0 80px" }}>
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--text-faint)",
            textTransform: "uppercase",
          }}
        >
          Built for every car · Used by every kind of driver
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="brand">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
