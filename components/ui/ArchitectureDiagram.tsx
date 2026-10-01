"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { architectureLayers, architecturePractices } from "@/lib/data";

interface ArchitectureDiagramProps {
  /** One description per layer, in the same order as `architectureLayers`. */
  descriptions: string[];
  practicesLabel: string;
  note: string;
}

export default function ArchitectureDiagram({ descriptions, practicesLabel, note }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl mx-auto">
        {architectureLayers.map((layer, i) => (
          <div key={layer.name}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.015 }}
              className="glass rounded-xl border border-white/8 hover:border-indigo-500/40 transition-colors duration-300 px-5 py-4 flex items-center gap-4"
              style={{ borderLeft: `3px solid ${layer.color}` }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}aa` }}
              />
              <div className="min-w-0">
                <div className="text-sm font-bold text-white">{layer.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{descriptions[i]}</div>
              </div>
            </motion.div>

            {i < architectureLayers.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                className="flex justify-center py-1.5"
                aria-hidden="true"
              >
                <ChevronDown size={16} className="text-zinc-700" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{practicesLabel}</h3>
        <div className="flex flex-wrap justify-center gap-2.5">
          {architecturePractices.map((practice, i) => (
            <motion.span
              key={practice}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass inline-flex items-center rounded-lg border border-white/8 px-3.5 py-2 text-sm font-medium text-zinc-300"
            >
              {practice}
            </motion.span>
          ))}
        </div>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed pt-2">{note}</p>
      </div>
    </div>
  );
}
