"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border border-blue-500/30 animate-pulse" />
    </div>
  ),
});

function TypedRole() {
  const t = useTranslations("home");
  const roles = [t("role0"), t("role1"), t("role2"), t("role3")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.5 }}
        className="inline-block gradient-text"
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
  );
}

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const letterV = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AnimatedName({ name }: { name: string }) {
  return (
    <motion.span variants={containerV} initial="hidden" animate="show" className="inline-flex flex-wrap">
      {name.split("").map((char, i) => (
        <motion.span key={i} variants={letterV} className={char === " " ? "w-3" : ""}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function HomePage() {
  const t = useTranslations("home");

  const stats = [
    { value: "4+", label: t("stats_years") },
    { value: "10+", label: t("stats_projects") },
    { value: "5", label: t("stats_clients") },
    { value: "20+", label: t("stats_satisfaction") },
  ];

  const features = [
    { icon: "⚙️", title: t("f1_title"), desc: t("f1_desc"), color: "from-blue-500/20 to-indigo-500/10" },
    { icon: "🎨", title: t("f2_title"), desc: t("f2_desc"), color: "from-green-500/20 to-emerald-500/10" },
    { icon: "☁️", title: t("f3_title"), desc: t("f3_desc"), color: "from-cyan-500/20 to-blue-500/10" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(33,150,243,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-emerald-500/30"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">{t("badge")}</span>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-zinc-400 font-mono text-sm">
              {t("greeting")}
            </motion.p>

            {/* Name — two lines for readability */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white">
                <AnimatedName name="Raoudha" />
              </h1>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] gradient-text"
              >
                Fathallah
              </motion.h1>
            </div>

            <div className="text-xl sm:text-2xl font-bold h-9 overflow-hidden">
              <TypedRole />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-zinc-400 text-base leading-relaxed max-w-xl"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              <Button href="/projects" size="lg">
                {t("cta_projects")} <ArrowRight size={18} />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                {t("cta_contact")}
              </Button>
              <Button href="/cv-raoudha-fathallah.pdf" variant="ghost" size="lg" external>
                <Download size={16} /> {t("cta_resume")}
              </Button>
            </motion.div>
          </div>

          {/* Right — 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative h-[420px] lg:h-[560px]"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl" />
            <HeroCanvas />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 font-mono">{t("scroll")}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={18} className="text-zinc-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-14 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <SectionWrapper key={s.label} delay={i * 0.1}>
                <div className="text-center space-y-1">
                  <div className="text-4xl font-black gradient-text">{s.value}</div>
                  <div className="text-sm text-zinc-500">{s.label}</div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper className="text-center mb-14 space-y-4">
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest">{t("section_label")}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              {t("section_title")} <span className="gradient-text">{t("section_highlight")}</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">{t("section_desc")}</p>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((c, i) => (
              <SectionWrapper key={c.title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                  className="glass rounded-2xl p-6 border border-white/8 hover:border-indigo-500/30 transition-colors duration-300 h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl mb-4 border border-white/10`}>
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              </SectionWrapper>
            ))}
          </div>

          <SectionWrapper className="text-center mt-12">
            <Button href="/about" variant="outline">
              {t("cta_about")} <ArrowRight size={16} />
            </Button>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
