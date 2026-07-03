"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { type ProjectData } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
  title: string;
  description: string;
  index: number;
}

export default function ProjectCard({ project, title, description, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -16, y: (x - 0.5) * 16 });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.1s ease" : "transform 0.5s ease",
      }}
      className="relative group rounded-2xl overflow-hidden cursor-default"
    >
      {/* Glow spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 glass rounded-2xl p-6 h-full flex flex-col gap-4 border border-white/8 group-hover:border-indigo-500/40 transition-colors duration-300">
        <div className={cn("h-0.5 w-12 rounded-full bg-gradient-to-r", project.color)} />

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Code2 size={17} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="text-zinc-500 hover:text-indigo-400 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={17} />
            </motion.a>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed flex-1">{description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/8 text-zinc-400 group-hover:border-indigo-500/30 group-hover:text-zinc-300 transition-colors duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
