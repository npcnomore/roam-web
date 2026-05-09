export default function StatStrip() {
  const stats = [
    { n: "12K+", l: "Active drivers" },
    { n: "1.2M", l: "Miles roamed" },
    { n: "4.8★", l: "App Store rating" },
    { n: "99.9%", l: "PTT delivery" },
    { n: "<200ms", l: "Pin update latency" },
  ];
  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container">
        <div className="stat-strip reveal">
          {stats.map((s, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
