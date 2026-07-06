"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specs = [
  ["Reference No.", "228235"],
  ["Case Diameter", "40 mm"],
  ["Case Material", "Everose gold (18 ct)"],
  ["Movement", "Calibre 3255, Perpetual, self-winding"],
  ["Power Reserve", "Approximately 70 hours"],
  ["Accuracy", "−2/+2 sec per day (Superlative Chronometer)"],
  ["Crystal", "Scratch-resistant sapphire, Cyclops lens over date"],
  ["Water Resistance", "100 metres / 330 feet"],
  ["Dial", "Chocolate sunburst, set hour markers, Roman numerals"],
  ["Bracelet", "President, three-piece semi-circular links, hidden clasp"],
];

export default function SpecsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const tableRef = useRef<HTMLDivElement>(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  return (
    <section
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 7vw, 7rem)",
        borderTop: "1px solid rgba(200,169,110,0.1)",
      }}
    >
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
        style={{ marginBottom: "3.5rem" }}
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
          Technical Specifications
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.15,
          }}
        >
          The architecture of precision.
        </h2>
      </motion.div>

      <motion.div
        ref={tableRef}
        initial={{ opacity: 0, y: 24 }}
        animate={tableInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0, 0, 1] }}
        style={{ maxWidth: "860px" }}
      >
        {specs.map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: "1rem",
              padding: "1.1rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C8A96E",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 300,
                fontSize: "0.95rem",
                color: "#E5E5E5",
                lineHeight: 1.5,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
