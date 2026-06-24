"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Frame config ───────────────────────────────────────────────────────────
// Drop extracted video frames into /public/frames/ as frame_0001.jpg … frame_XXXX.jpg
// then update FRAME_COUNT to match. Until then the two Higgsfield reference images
// are used as a 2-frame scrub (assembled → exploded).
const FRAME_COUNT = 2;
const FRAME_URLS: string[] = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FaPjP7iap811W8JT8B8y1TcwNl/hf_20260624_151205_1f65daa4-85d9-4b5f-a4f0-f1db2c153168.png",
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FaPjP7iap811W8JT8B8y1TcwNl/hf_20260624_151318_1613100b-45e7-4bc8-bbf4-6d80be2143e5.png",
];

function frameUrl(i: number): string {
  // When /public/frames/ is populated swap to: `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`
  return FRAME_URLS[i] ?? FRAME_URLS[FRAME_URLS.length - 1];
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIdxRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;

    function setSize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }

    function drawFrame(img: HTMLImageElement) {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    setSize();

    // Preload all frames
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = frameUrl(i);
      img.onload = () => {
        loaded++;
        if (loaded === 1) drawFrame(images[0]);
      };
      images.push(img);
    }
    imagesRef.current = images;

    function tick() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = scrollable > 0
        ? Math.max(0, Math.min(1, -rect.top / scrollable))
        : 0;
      const target = Math.round(progress * (FRAME_COUNT - 1));

      if (target !== currentIdxRef.current && images[target]?.complete) {
        currentIdxRef.current = target;
        drawFrame(images[target]);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function onResize() {
      setSize();
      const img = images[currentIdxRef.current];
      if (img?.complete) drawFrame(img);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* Gradient scrim behind overlay text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Overlay content */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(2rem, 5vw, 5rem)",
            gap: "1.2rem",
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ ease: "easeOut", duration: 0.7 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C8A96E",
            }}
          >
            Est. 1905 · Geneva
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ ease: "easeOut", duration: 0.7 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Day-Date 40
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ ease: "easeOut", duration: 0.7 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              color: "#E5E5E5",
              maxWidth: "460px",
              lineHeight: 1.65,
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            }}
          >
            Forged in Everose gold, driven by perpetual precision — a timepiece
            that has crowned the wrist of the world's most consequential figures
            for over six decades.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ease: "easeOut", duration: 0.7 }}
          >
            <a
              href="#collection"
              style={{
                display: "inline-block",
                background: "#C8A96E",
                color: "#000",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.9rem 2.6rem",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              Explore Collection
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
