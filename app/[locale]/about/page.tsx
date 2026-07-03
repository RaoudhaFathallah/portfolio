"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { skillsList, experienceList } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SkillBadge from "@/components/ui/SkillBadge";
import Button from "@/components/ui/Button";
import { ArrowRight, MapPin, Calendar, Briefcase, GraduationCap, Award, Languages } from "lucide-react";
import type { SkillCategory } from "@/lib/data";

/* ── Helpers ───────────────────────────────────────────────────── */
function SectionHeader({ label, title, highlight }: { label: string; title: string; highlight: string }) {
  return (
    <SectionWrapper className="text-center space-y-3">
      <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest">{label}</p>
      <h2 className="text-4xl font-black text-white">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
    </SectionWrapper>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

  /* ── Skills categories ── */
  const skillCategories: { key: SkillCategory; label: string; icon: string }[] = [
    { key: "frontend", label: t("cat_frontend"), icon: "🎨" },
    { key: "backend", label: t("cat_backend"), icon: "⚙️" },
    { key: "mobile", label: t("cat_mobile"), icon: "📱" },
    { key: "database", label: t("cat_database"), icon: "🗄️" },
    { key: "devops", label: t("cat_devops"), icon: "☁️" },
    { key: "design", label: t("cat_design"), icon: "✏️" },
  ];

  /* ── Experiences (7 entries) ── */
  const exps = experienceList.map((e) => ({
    role: t(`exp${e.index}_role`),
    company: t(`exp${e.index}_company`),
    period: t(`exp${e.index}_period`),
    desc: t(`exp${e.index}_desc`),
    tech: e.tech,
  }));

  /* ── Education (3 entries) ── */
  const education = [0, 1, 2].map((i) => ({
    degree: t(`edu${i}_degree`),
    school: t(`edu${i}_school`),
    year: t(`edu${i}_year`),
    desc: t(`edu${i}_desc`),
  }));

  /* ── Certifications ── */
  const certs = [t("cert0"), t("cert1"), t("cert2")];

  /* ── Languages ── */
  const languages = [0, 1, 2, 3].map((i) => ({
    name: t(`lang${i}_name`),
    level: t(`lang${i}_level`),
    pct: Number(t(`lang${i}_pct`)),
  }));

  return (
    <div className="min-h-screen">

      {/* ── Page hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(33,150,243,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-indigo-400 uppercase tracking-widest">{t("label")}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-black text-white">
            {t("title")} <span className="gradient-text">{t("title_highlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg max-w-2xl mx-auto">{t("subtitle")}</motion.p>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Card */}
            <SectionWrapper direction="left" className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-green-500/10 to-cyan-500/10 blur-2xl" />
                <div className="relative glass rounded-3xl border border-white/10 p-8 space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-blue-500/30">
                    RF
                  </div>
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold text-white">Raoudha Fathallah</h2>
                    <p className="text-sm text-indigo-400">{t("card_role")}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-zinc-400"><MapPin size={15} className="text-indigo-400 shrink-0" /><span>{t("card_location")}</span></div>
                    <div className="flex items-center gap-3 text-zinc-400"><Calendar size={15} className="text-indigo-400 shrink-0" /><span>{t("card_experience")}</span></div>
                    <div className="flex items-center gap-3 text-zinc-400"><Briefcase size={15} className="text-indigo-400 shrink-0" /><span>{t("card_open")}</span></div>
                  </div>
                  <div className="pt-2">
                    <Button href="/contact" className="w-full justify-center">{t("card_cta")} <ArrowRight size={15} /></Button>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Bio text */}
            <SectionWrapper direction="right" className="lg:col-span-3 space-y-5">
              <h2 className="text-3xl font-bold text-white">{t("bio_title")} <span className="gradient-text">{t("bio_highlight")}</span></h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed text-[15px]">
                <p>{t("bio_p1")}</p>
                <p>{t("bio_p2")}</p>
                <p>{t("bio_p3")}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {[t("tag1"), t("tag2"), t("tag3"), t("tag4")].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 text-zinc-300">{tag}</span>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <SectionHeader label={t("values_label")} title={t("values_title")} highlight={t("values_highlight")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <SectionWrapper key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring" as const, stiffness: 300, damping: 20 }} className="glass rounded-2xl p-6 border border-white/8 hover:border-indigo-500/30 transition-colors duration-300 h-full text-center space-y-3">
                  <div className="text-3xl">{t(`val${i + 1}_icon`)}</div>
                  <h3 className="text-base font-bold text-white">{t(`val${i + 1}_title`)}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{t(`val${i + 1}_desc`)}</p>
                </motion.div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-14">
          <SectionHeader label={t("skills_label")} title={t("skills_title")} highlight={t("skills_highlight")} />
          {skillCategories.map((cat) => {
            const catSkills = skillsList.filter((s) => s.category === cat.key);
            if (!catSkills.length) return null;
            return (
              <div key={cat.key} className="space-y-4">
                <SectionWrapper>
                  <h3 className="text-sm font-semibold text-zinc-500 flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="uppercase tracking-widest">{cat.label}</span>
                  </h3>
                </SectionWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {catSkills.map((skill, i) => <SkillBadge key={skill.name} skill={skill} index={i} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Experience timeline ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-14">
          <SectionHeader label={t("exp_label")} title={t("exp_title")} highlight={t("exp_highlight")} />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-green-500/30 to-transparent" />
            <div className="space-y-10">
              {exps.map((exp, i) => (
                <SectionWrapper key={i} delay={i * 0.1}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1.5 mt-6 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 z-10" />
                    <div className={`hidden md:flex md:w-1/2 items-start ${i % 2 === 0 ? "justify-end pr-12" : "justify-start pl-12"} pt-4`}>
                      <span className="text-sm font-mono text-indigo-400">{exp.period}</span>
                    </div>
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                      <motion.div whileHover={{ x: i % 2 === 0 ? 4 : -4 }} transition={{ type: "spring" as const, stiffness: 300, damping: 20 }} className="glass rounded-2xl p-6 border border-white/8 hover:border-indigo-500/30 transition-colors duration-300">
                        <span className="md:hidden text-xs font-mono text-indigo-400 block mb-2">{exp.period}</span>
                        <h3 className="text-base font-bold text-white">{exp.role}</h3>
                        <p className="text-indigo-400 text-sm font-semibold mb-3">{exp.company}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{exp.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">{tech}</span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </SectionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <SectionHeader label={t("edu_label")} title={t("edu_title")} highlight={t("edu_highlight")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <SectionWrapper key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring" as const, stiffness: 300, damping: 20 }} className="glass rounded-2xl p-6 border border-white/8 hover:border-indigo-500/30 transition-colors duration-300 h-full space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/10 border border-white/10 flex items-center justify-center">
                    <GraduationCap size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-indigo-400 text-sm font-medium">{edu.school}</p>
                    <span className="text-xs font-mono text-zinc-500">{edu.year}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{edu.desc}</p>
                </motion.div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Languages ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <SectionHeader label={t("cert_label")} title={t("cert_title")} highlight={t("cert_highlight")} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Certifications */}
            <SectionWrapper direction="left" className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 flex items-center gap-2 uppercase tracking-widest">
                <Award size={15} className="text-indigo-400" /> Certifications
              </h3>
              <div className="space-y-3">
                {certs.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-white/8 hover:border-indigo-500/30 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-green-400 shrink-0" />
                    <span className="text-sm text-zinc-300 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Languages */}
            <SectionWrapper direction="right" className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 flex items-center gap-2 uppercase tracking-widest">
                <Languages size={15} className="text-indigo-400" /> {t("lang_label")}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, i) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-200">{lang.name}</span>
                      <span className="text-xs text-zinc-500">{lang.level}</span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #2196F3, #4CAF50)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="glass rounded-3xl border border-white/10 p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-transparent" />
              <div className="relative z-10 space-y-4">
                <h2 className="text-4xl font-black text-white">
                  {t("cta_title")} <span className="gradient-text">{t("cta_highlight")}</span>
                </h2>
                <p className="text-zinc-400 max-w-xl mx-auto">{t("cta_desc")}</p>
                <div className="flex justify-center gap-4 pt-2">
                  <Button href="/contact" size="lg">{t("cta_contact")} <ArrowRight size={18} /></Button>
                  <Button href="/projects" variant="outline" size="lg">{t("cta_work")}</Button>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  );
}
