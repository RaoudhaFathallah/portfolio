"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  direction?: "up" | "left" | "right";
}

export default function SectionWrapper({
  children,
  className,
  delay = 0,
  id,
  direction = "up",
}: SectionWrapperProps) {
  const initial = {
    up: { opacity: 0, y: 48 },
    left: { opacity: 0, x: -48 },
    right: { opacity: 0, x: 48 },
  };

  return (
    <motion.div
      id={id}
      initial={initial[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
