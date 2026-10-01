"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Check, TrendingUp } from "lucide-react";
import { type ProjectData } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
  title: string;
  subtitle: string;
  description: string;
  roles: string[];
  impact: string;
  labels: { roles: string; tech: string; impact: string; featured: string };
  index: number;
  /** The lead case study: spans both columns and splits its blocks side by side. */
  featured?: boolean;
}

export default function ProjectCard({
  project,
  title,
  subtitle,
  description,
  roles,
  impact,
  labels,
  index,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn("relative group rounded-2xl overflow-hidden cursor-default", featured && "lg:col-span-2")}
    >

      <div className="relative z-10 glass rounded-2xl p-7 h-full flex flex-col gap-4 border border-white/8 group-hover:border-indigo-500/40 transition-colors duration-300">
        {project.image && (
          <div className="relative -mx-7 -mt-7 mb-2 aspect-video overflow-hidden border-b border-white/8">
            <Image
              src={project.image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className={cn("h-0.5 w-12 rounded-full bg-gradient-to-r", project.color)} />

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {featured && (
              <span className="inline-block mb-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-r from-indigo-500 to-violet-500">
                {labels.featured}
              </span>
            )}
            <h3 className={cn("font-bold text-white group-hover:text-indigo-300 transition-colors duration-300", featured ? "text-2xl" : "text-xl")}>
              {title}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-400">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
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

        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

        {/* ── My role, technologies and impact ── */}
        {/* Side by side on the featured card; stacked, bottom-aligned otherwise. */}
        <div
          className={cn(
            featured ? "lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start" : "flex flex-1 flex-col"
          )}
        >
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{labels.roles}</h4>
            <ul className="space-y-1.5">
              {roles.map((role) => (
                <li key={role} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed">
                  <Check size={14} className="text-indigo-400 shrink-0 mt-1" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={cn("space-y-5 mt-5", featured ? "lg:mt-0" : "mt-auto pt-5")}>
            {/* ── Technologies ── */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{labels.tech}</h4>
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

            {/* ── Impact ── */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <TrendingUp size={13} /> {labels.impact}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">{impact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
