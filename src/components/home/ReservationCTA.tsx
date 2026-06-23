"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Phone, ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";

export function ReservationCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/17001844/pexels-photo-17001844.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
          alt="Restaurant Ambiance"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B3D2E]/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115]/90 to-[#0F1115]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
              Réservation
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Réservez votre{" "}
              <span className="italic text-gradient-gold">Table Dès Maintenant</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
              Assurez-vous une place dans notre restaurant et vivez une expérience culinaire inoubliable. Nous sommes ouverts tous les jours pour vous accueillir dans un cadre d&apos;exception.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Clock size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Horaires</p>
                  <p className="text-gray-400 text-xs">{RESTAURANT_INFO.hours.display}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Téléphone</p>
                  <p className="text-gray-400 text-xs">{RESTAURANT_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reservation"
                className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/30"
              >
                <Calendar size={18} />
                Réserver en ligne
              </Link>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all"
              >
                <Phone size={18} />
                Appeler maintenant
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3
              className="text-white font-bold text-xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Réservation Rapide
            </h3>
            <QuickReservationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickReservationForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = "/reservation";
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">Téléphone</label>
          <input
            type="tel"
            placeholder="+224..."
            className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">Date</label>
          <input
            type="date"
            className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1.5 block">Nombre de personnes</label>
          <select className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50">
            {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
              <option key={n} value={n} className="bg-[#0F1115]">
                {n} personne{n !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] py-3.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20"
      >
        Confirmer la Réservation
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
