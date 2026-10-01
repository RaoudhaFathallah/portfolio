"use client";
import { motion } from "framer-motion";
import { type SkillData } from "@/lib/data";
import TechLogo, { hasTechLogo } from "@/components/ui/TechLogo";

interface SkillBadgeProps {
  skill: SkillData;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="glass inline-flex items-center gap-2 rounded-lg border border-white/8 px-3.5 py-2 text-sm font-medium text-zinc-300 hover:border-indigo-500/40 hover:text-white transition-colors duration-300"
    >
      {hasTechLogo(skill.name) && (
        <span className="shrink-0" style={{ color: skill.color }}>
          <TechLogo name={skill.name} />
        </span>
      )}
      {skill.name}
    </motion.span>
  );
}
