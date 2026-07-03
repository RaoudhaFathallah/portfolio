"use client";
import { motion } from "framer-motion";
import { Code2, Briefcase, Globe, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const socials = [
  { icon: Code2, label: "GitHub", href: "https://github.com" },
  { icon: Briefcase, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Globe, label: "X / Twitter", href: "https://x.com" },
  { icon: Mail, label: "Email", href: "mailto:raoudha@arofex.info" },
];

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("projects"), href: "/projects" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-white/8 mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black gradient-text">
                Raoudha<span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">{tf("tagline")}</p>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              {tf("navigate")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              {tf("connect")}
            </h3>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Raoudha Fathallah. {tf("copyright")}
          </p>
          <p className="text-xs text-zinc-700">{tf("hiring")}</p>
        </div>
      </div>
    </footer>
  );
}
