"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";
import { showToast } from "@/components/ui/Toaster";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00",
];

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          guests: parseInt(form.guests),
          specialRequests: form.specialRequests,
        }),
      });
      if (res.ok) {
        setShowSuccess(true);
      } else {
        showToast({ type: "error", title: "Erreur", description: "Veuillez réessayer" });
      }
    } catch {
      showToast({ type: "error", title: "Erreur de connexion", description: "Vérifiez votre connexion internet" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/17001777/pexels-photo-17001777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1600"
            alt="Réservation"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/80 to-[#0F1115]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block"
          >
            Réservation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Réservez votre{" "}
            <span className="italic text-gradient-gold">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm"
          >
            Assurez votre place et préparez-vous à vivre une expérience gastronomique inoubliable
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h2
                className="text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Réservation Confirmée!
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                Merci <strong className="text-white">{form.name}</strong>, votre réservation a été reçue.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Nous vous confirmerons par téléphone au <strong className="text-[#D4AF37]">{form.phone}</strong>.
              </p>
              <div className="glass-card rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
                <h4 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest mb-4">Détails</h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white font-medium">{form.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Heure</span>
                    <span className="text-white font-medium">{form.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Personnes</span>
                    <span className="text-white font-medium">{form.guests}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setShowSuccess(false); setForm({ name: "", phone: "", email: "", date: "", time: "", guests: "2", specialRequests: "" }); setStep(1); }}
                className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                Nouvelle Réservation
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 sm:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <User size={12} className="text-[#D4AF37]" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Phone size={12} className="text-[#D4AF37]" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+224 621 56 76 76"
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Mail size={12} className="text-[#D4AF37]" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                </div>
                {/* Guests */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Users size={12} className="text-[#D4AF37]" />
                    Nombre de personnes *
                  </label>
                  <select
                    required
                    value={form.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n} className="bg-[#0F1115]">
                        {n} personne{n > 1 ? "s" : ""}
                      </option>
                    ))}
                    <option value="10+" className="bg-[#0F1115]">10+ personnes</option>
                  </select>
                </div>
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Calendar size={12} className="text-[#D4AF37]" />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors [color-scheme:dark]"
                  />
                </div>
                {/* Time */}
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Clock size={12} className="text-[#D4AF37]" />
                    Heure *
                  </label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    <option value="" className="bg-[#0F1115]">Choisir une heure</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#0F1115]">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <MessageSquare size={12} className="text-[#D4AF37]" />
                  Demandes spéciales
                </label>
                <textarea
                  value={form.specialRequests}
                  onChange={(e) => handleChange("specialRequests", e.target.value)}
                  placeholder="Allergies, régimes particuliers, occasions spéciales..."
                  rows={4}
                  className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                />
              </div>

              {/* Info */}
              <div className="glass-card rounded-xl p-4 mb-8 flex items-start gap-3">
                <CheckCircle size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  Votre réservation sera confirmée par téléphone dans les 30 minutes. Nous vous contacterons au numéro fourni. En cas de modification, appelez-nous au{" "}
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#D4AF37] hover:underline">
                    {RESTAURANT_INFO.phone}
                  </a>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-60 text-[#0F1115] py-4 rounded-2xl font-bold transition-all hover:shadow-xl hover:shadow-[#D4AF37]/20"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0F1115]/30 border-t-[#0F1115] rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    Confirmer la Réservation
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
