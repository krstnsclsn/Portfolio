"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(6rem, 14vw, 12rem) clamp(1.5rem, 7vw, 7rem)",
        textAlign: "center",
        position: "relative",
        borderTop: "1px solid rgba(200,169,110,0.1)",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(200,169,110,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ staggerChildren: 0.12 }}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.4rem" }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8A96E",
          }}
        >
          Yours to Command
        </motion.p>

        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            lineHeight: 1.15,
            maxWidth: "700px",
          }}
        >
          A century of mastery.{" "}
          <em style={{ color: "#E5E5E5", fontStyle: "italic" }}>
            One expression of it.
          </em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "#E5E5E5",
            maxWidth: "480px",
            lineHeight: 1.7,
            fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          }}
        >
          Every component of the Day-Date 40 is conceived, manufactured, and
          certified in-house — an unbroken chain of excellence that begins in
          Geneva and ends on your wrist.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
        >
          <motion.a
            href="#"
            whileHover={{
              background: "#000",
              color: "#C8A96E",
            }}
            style={{
              display: "inline-block",
              background: "#000",
              color: "#C8A96E",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.9rem 2.6rem",
              border: "1px solid #C8A96E",
              textDecoration: "none",
              transition: "background 0.25s, color 0.25s",
            }}
          >
            Find an Authorised Retailer
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
