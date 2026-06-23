"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("fr-FR"));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: "+", label: "Clients Satisfaits", sub: "Depuis notre ouverture" },
  { value: 50, suffix: "+", label: "Plats au Menu", sub: "Guinéens et internationaux" },
  { value: 200, suffix: "+", label: "Événements Catering", sub: "Mariages & corporatifs" },
  { value: 15, suffix: " ans", label: "D'Excellence", sub: "Au service de la gastronomie" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0B3D2E]/30 via-[#0F1115] to-[#0B3D2E]/30 border-y border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl sm:text-5xl font-bold text-gradient-gold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white font-semibold mb-1">{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
