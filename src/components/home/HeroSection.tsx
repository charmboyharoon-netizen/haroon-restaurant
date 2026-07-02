"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Calendar, ShoppingBag, MessageCircle, Star } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Bonjour%20Délices%20d'Africana%2C%20je%20souhaite%20faire%20une%20commande.`;

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 parallax-slow">
        <Image
          src="https://dctqvomciirmjrkyrihe.supabase.co/storage/v1/object/public/backround%20home%20page/images%20(22).jpg"
          alt="Délices d'Africana - Cuisine Africaine Premium"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2E]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Decoration */}
      <div className="absolute top-1/4 right-10 hidden xl:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border border-[#D4AF37]/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-[#D4AF37]/10"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
        >
          <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
            Restaurant Premium · Conakry, Guinée
          </span>
          <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Délices{" "}
          <span className="italic text-gradient-gold">d&apos;Africana</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl text-[#F4E8C1]/80 mb-4 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Le plaisir de bien manger
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Saveurs authentiques guinéennes, cuisine internationale, traiteur événementiel et hébergement de luxe au cœur de Conakry.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/reservation"
            className="group flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/30 w-full sm:w-auto justify-center"
          >
            <Calendar size={18} />
            Réserver une Table
          </Link>
          <Link
            href="/menu"
            className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <ShoppingBag size={18} />
            Commander maintenant
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-500/50 text-green-400 px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </motion.div>

        {/* Info Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Ouvert {RESTAURANT_INFO.hours.display}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Lambanyi, Conakry
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            {RESTAURANT_INFO.phone}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#D4AF37]/60"
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Découvrir
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
