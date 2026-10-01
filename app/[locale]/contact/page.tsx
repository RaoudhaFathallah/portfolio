"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, Code2, Briefcase, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_EMAIL = "fathallah.raoudha@gmail.com";
// Web3Forms access key (public by design — it only allows posting to this address).
// Without it the message is handed to the visitor's mail client instead.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const INPUT_BASE =
  "w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-white/6 focus:ring-1 focus:ring-indigo-500/30";

export default function ContactPage() {
  const t = useTranslations("contact");

  const socials = [
    { icon: Code2, label: "GitHub", handle: "@raoudha-dev", href: "https://github.com", color: "hover:text-white" },
    { icon: Briefcase, label: "LinkedIn", handle: "raoudha Developer", href: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: Globe, label: "X / Twitter", handle: "@raoudha_codes", href: "https://x.com", color: "hover:text-sky-400" },
    { icon: Mail, label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: "hover:text-indigo-400" },
  ];

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = t("err_name");
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = t("err_email");
    if (!form.subject.trim()) e.subject = t("err_subject");
    if (form.message.trim().length < 20) e.message = t("err_message");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message ?? `Contact request failed: ${res.status}`);
      } else {
        const body = `${form.message}\n\n— ${form.name} <${form.email}>`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

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

      {/* ── Content ── */}
      <section className="py-10 pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Info sidebar */}
            <SectionWrapper direction="left" className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl border border-white/8 p-6 space-y-5">
                <h2 className="text-xl font-bold text-white">{t("info_title")}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{t("info_desc")}</p>
                <div className="space-y-3">
                  {socials.map(({ icon: Icon, label, handle, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                      className={`flex items-center gap-3 text-zinc-400 ${color} transition-colors duration-200 group`}
                    >
                      <div className="w-9 h-9 rounded-xl glass border border-white/8 group-hover:border-indigo-500/30 flex items-center justify-center shrink-0 transition-colors duration-200">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-600">{label}</div>
                        <div className="text-sm font-medium">{handle}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl border border-emerald-500/20 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-400">{t("available_title")}</span>
                </div>
                <p className="text-xs text-zinc-500">{t("available_desc")}</p>
              </div>
            </SectionWrapper>

            {/* Form */}
            <SectionWrapper direction="right" className="lg:col-span-3">
              <div className="glass rounded-2xl border border-white/8 p-8">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-4">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" as const, delay: 0.1 }} className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                        <CheckCircle size={32} className="text-emerald-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">{t("success_title")}</h3>
                      <p className="text-zinc-400 text-sm">{t("success_desc")}</p>
                      <button
                        onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        {t("success_again")}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" noValidate onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label={t("label_name")} error={errors.name}>
                          <input name="name" value={form.name} onChange={handleChange} placeholder={t("ph_name")} className={INPUT_BASE} autoComplete="name" />
                        </Field>
                        <Field label={t("label_email")} error={errors.email}>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t("ph_email")} className={INPUT_BASE} autoComplete="email" />
                        </Field>
                      </div>

                      <Field label={t("label_subject")} error={errors.subject}>
                        <div className="relative">
                          <MessageSquare size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                          <input name="subject" value={form.subject} onChange={handleChange} placeholder={t("ph_subject")} className={`${INPUT_BASE} pl-10`} />
                        </div>
                      </Field>

                      <Field label={t("label_message")} error={errors.message}>
                        <textarea name="message" value={form.message} onChange={handleChange} placeholder={t("ph_message")} rows={6} className={`${INPUT_BASE} resize-none`} />
                        <div className="text-right">
                          <span className={`text-xs ${form.message.length < 20 ? "text-zinc-700" : "text-emerald-500/70"}`}>
                            {form.message.length}/20 {t("char_min")}
                          </span>
                        </div>
                      </Field>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                          <AlertCircle size={16} /> {t("error_generic")}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: status !== "loading" ? 1.02 : 1 }}
                        whileTap={{ scale: status !== "loading" ? 0.98 : 1 }}
                        className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                      >
                        {status === "loading" ? (
                          <><Spinner /> {t("sending")}</>
                        ) : (
                          <><Send size={16} /> {t("send")}</>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-400">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-rose-400 flex items-center gap-1">
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
    />
  );
}
