"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";
import { showToast } from "@/components/ui/Toaster";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        showToast({ type: "error", title: "Erreur d'envoi", description: "Veuillez réessayer" });
      }
    } catch {
      showToast({ type: "error", title: "Erreur de connexion" });
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Bonjour%20Délices%20d'Africana%2C%20j'ai%20une%20question.`;

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block"
          >
            Contactez-nous
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nous sommes{" "}
            <span className="italic text-gradient-gold">là pour vous</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm"
          >
            Une question, une réservation ou un projet? Notre équipe est disponible tous les jours.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Info cards */}
            {[
              {
                icon: Phone,
                title: "Téléphone",
                content: RESTAURANT_INFO.phone,
                href: `tel:${RESTAURANT_INFO.phone}`,
                sub: "Disponible tous les jours",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                content: RESTAURANT_INFO.phone,
                href: whatsappUrl,
                sub: "Réponse rapide garantie",
              },
              {
                icon: Mail,
                title: "Email",
                content: RESTAURANT_INFO.email,
                href: `mailto:${RESTAURANT_INFO.email}`,
                sub: "Réponse sous 24h",
              },
              {
                icon: MapPin,
                title: "Adresse",
                content: RESTAURANT_INFO.address,
                href: "https://maps.google.com/?q=Lambanyi,Conakry,Guinea",
                sub: "Voir sur Google Maps",
              },
              {
                icon: Clock,
                title: "Horaires",
                content: `${RESTAURANT_INFO.hours.days}`,
                href: null,
                sub: RESTAURANT_INFO.hours.display,
              },
            ].map(({ icon: Icon, title, content, href, sub }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/50 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{title}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white font-semibold text-sm hover:text-[#D4AF37] transition-colors block"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="text-white font-semibold text-sm">{content}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-5"
            >
              <p className="text-gray-400 text-xs mb-3">Réseaux Sociaux</p>
              <div className="flex gap-3">
                <a
                  href={RESTAURANT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 text-green-400 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-3xl p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message envoyé!
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Nous vous répondrons dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-[#D4AF37] text-[#0F1115] px-6 py-2.5 rounded-xl font-bold text-sm"
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-bold text-white mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Envoyez-nous un message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-xs mb-1.5 block">Nom complet *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Votre nom"
                          className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1.5 block">Téléphone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+224..."
                          className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Sujet</label>
                      <select
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      >
                        <option value="" className="bg-[#0F1115]">Choisir un sujet</option>
                        <option value="reservation" className="bg-[#0F1115]">Réservation</option>
                        <option value="catering" className="bg-[#0F1115]">Service Traiteur</option>
                        <option value="rooms" className="bg-[#0F1115]">Hébergement</option>
                        <option value="other" className="bg-[#0F1115]">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1.5 block">Message *</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Votre message..."
                        rows={5}
                        className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-60 text-[#0F1115] py-3.5 rounded-xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/20"
                    >
                      {isLoading ? (
                        <><div className="w-4 h-4 border-2 border-[#0F1115]/30 border-t-[#0F1115] rounded-full animate-spin" /> Envoi...</>
                      ) : (
                        <><Send size={16} /> Envoyer le Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-card rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-[#D4AF37]/10">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MapPin size={18} className="text-[#D4AF37]" />
              Nous trouver à Conakry
            </h3>
            <p className="text-gray-400 text-sm mt-1">{RESTAURANT_INFO.address}</p>
          </div>
          <div className="h-64 bg-[#141720] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={40} className="text-[#D4AF37] mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Lambanyi, Route d&apos;Enco 5</p>
              <p className="text-gray-400 text-sm mb-4">Conakry, Guinée</p>
              <a
                href="https://maps.google.com/?q=Lambanyi,Conakry,Guinea"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
