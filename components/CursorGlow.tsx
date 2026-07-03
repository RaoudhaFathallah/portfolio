"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [dotPos, setDotPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setDotPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Large diffuse glow */}
      <motion.div
        className="pointer-events-none fixed z-40 rounded-full mix-blend-screen"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        animate={{ x: pos.x - 250, y: pos.y - 250 }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.5 }}
      />
      {/* Small crisp dot */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "rgba(99,102,241,0.9)",
          boxShadow: "0 0 10px rgba(99,102,241,0.8)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
        animate={{ x: dotPos.x - 3, y: dotPos.y - 3 }}
        transition={{ type: "spring", damping: 50, stiffness: 600, mass: 0.1 }}
      />
    </>
  );
}
