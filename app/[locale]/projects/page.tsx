"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects, type ProjectData } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Layers, Globe, Server } from "lucide-react";

type Filter = "all" | ProjectData["category"];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<Filter>("all");

  const filters: { label: string; value: Filter; icon: React.ReactNode }[] = [
    { label: t("filter_all"), value: "all", icon: <Layers size={14} /> },
    { label: t("filter_frontend"), value: "frontend", icon: <Globe size={14} /> },
    { label: t("filter_backend"), value: "backend", icon: <Server size={14} /> },
    { label: t("filter_fullstack"), value: "fullstack", icon: <Layers size={14} /> },
  ];

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            {t("label")}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-black text-white">
            {t("title")} <span className="gradient-text">{t("title_highlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {active === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-full"
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-1.5 ${active === f.value ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {f.icon} {f.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-10 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  title={t(`${project.id}_title`)}
                  description={t(`${project.id}_desc`)}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-zinc-500">{t("empty")}</div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="glass rounded-3xl border border-white/10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5" />
              <div className="relative z-10 space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white">{t("cta_title")}</h2>
                <p className="text-zinc-400">{t("cta_desc")}</p>
              </div>
              <div className="relative z-10 flex gap-3 shrink-0">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-11 px-7 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  {t("cta_start")}
                </motion.a>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-11 px-7 rounded-full border border-white/15 hover:border-indigo-500/40 text-zinc-400 hover:text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  {t("cta_github")}
                </motion.a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
