"use client";
import { motion } from "framer-motion";
import { type SkillData } from "@/lib/data";

interface SkillBadgeProps {
  skill: SkillData;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="glass rounded-xl p-4 border border-white/8 hover:border-indigo-500/40 transition-colors duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-medium text-zinc-500 group-hover:text-indigo-400 transition-colors">
          {skill.level}%
        </span>
      </div>
      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}66`,
          }}
        />
      </div>
    </motion.div>
  );
}
