"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Perpetual Movement",
    copy: "The self-winding Calibre 3255 winds itself through the natural motion of the wrist, never requiring manual intervention.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <polyline points="14,8 14,14 18,16" />
      </svg>
    ),
  },
  {
    title: "Everose Gold",
    copy: "Rolex's proprietary 18 ct pink gold alloy is uniquely resistant to fading, retaining its warm, rose hue across generations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="14,4 17,11 25,11 19,16 21,23 14,19 7,23 9,16 3,11 11,11" />
      </svg>
    ),
  },
  {
    title: "Oyster Waterproofing",
    copy: "The Oyster case is hermetically sealed to 100 metres, protecting the movement from water, dust, and pressure.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4 C6 10 6 20 14 24 C22 20 22 10 14 4Z" />
      </svg>
    ),
  },
  {
    title: "President Bracelet",
    copy: "The three-piece semi-circular link bracelet, created exclusively for the Day-Date, remains one of the most recognised in haute horlogerie.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="20" height="6" rx="3" />
        <line x1="4" y1="14" x2="2" y2="14" />
        <line x1="24" y1="14" x2="26" y2="14" />
      </svg>
    ),
  },
  {
    title: "Superlative Chronometer",
    copy: "Certified by Rolex to a precision of −2/+2 seconds per day — twice as accurate as the official COSC chronometer standard.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <circle cx="14" cy="14" r="3" fill="#C8A96E" />
        <line x1="14" y1="4" x2="14" y2="7" />
        <line x1="14" y1="21" x2="14" y2="24" />
        <line x1="4" y1="14" x2="7" y2="14" />
        <line x1="21" y1="14" x2="24" y2="14" />
      </svg>
    ),
  },
  {
    title: "Cyclops Date",
    copy: "A magnifying lens positioned over the date aperture enlarges it 2.5× for effortless legibility — a Rolex hallmark since 1953.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="14" cy="14" rx="10" ry="6" />
        <circle cx="14" cy="14" r="3" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, delay }: { feature: typeof features[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0, 0, 1] }}
      style={{
        borderTop: "1px solid rgba(200,169,110,0.2)",
        paddingTop: "2rem",
        paddingBottom: "0.5rem",
      }}
    >
      <div style={{ marginBottom: "1.1rem" }}>{feature.icon}</div>
      <h3
        style={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 400,
          fontSize: "1.15rem",
          marginBottom: "0.65rem",
          color: "#fff",
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 300,
          fontSize: "0.92rem",
          lineHeight: 1.7,
          color: "#E5E5E5",
        }}
      >
        {feature.copy}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="collection"
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 7vw, 7rem)",
      }}
    >
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
        style={{ marginBottom: "4rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8A96E",
            marginBottom: "1rem",
          }}
        >
          Crafted Without Compromise
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            maxWidth: "620px",
          }}
        >
          Six reasons the Day-Date stands alone.
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "3rem 4rem",
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
