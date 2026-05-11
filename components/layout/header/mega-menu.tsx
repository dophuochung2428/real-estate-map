"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Section {
  title: string;
  items: string[];
}

interface Props {
  open: boolean;
  sections: Section[];
}

export default function MegaMenu({ open, sections }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.2,
          }}
          className="absolute left-0 top-full mt-4 w-[760px] rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                  <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">{section.title}</h3>

                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <button
                        key={item}
                        className="block text-sm text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
