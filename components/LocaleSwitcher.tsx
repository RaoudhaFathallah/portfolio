"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switch_ = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center glass rounded-full p-1 border border-white/10 gap-0.5">
      {(["en", "fr"] as const).map((l) => (
        <motion.button
          key={l}
          onClick={() => switch_(l)}
          whileTap={{ scale: 0.93 }}
          className={cn(
            "h-7 w-9 rounded-full text-xs font-bold transition-all duration-200",
            locale === l
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/40"
              : "text-zinc-500 hover:text-zinc-200"
          )}
        >
          {l.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}
