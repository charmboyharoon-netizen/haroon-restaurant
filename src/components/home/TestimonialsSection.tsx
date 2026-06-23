"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 relative"
    >
      <div className="absolute top-4 right-4 text-[#D4AF37]/20">
        <Quote size={32} />
      </div>

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
        ))}
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] border border-[#D4AF37]/30 flex items-center justify-center">
          <span className="text-[#D4AF37] font-bold text-xs">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#080A0D] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37]/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0B3D2E]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
            Témoignages
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ce que disent{" "}
            <span className="italic text-gradient-gold">nos clients</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Des milliers de clients nous font confiance. Voici ce qu&apos;ils pensent de leur expérience chez Délices d&apos;Africana.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 glass-card rounded-2xl p-6 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
              4.9
            </div>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-1">Note moyenne</p>
          </div>
          <div className="w-px h-16 bg-[#D4AF37]/20 hidden sm:block" />
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg">10,000+ avis</p>
            <p className="text-gray-400 text-sm">de clients satisfaits</p>
            <p className="text-[#D4AF37] text-xs mt-2">✓ 98% recommandent Délices d&apos;Africana</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
