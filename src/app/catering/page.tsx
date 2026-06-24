"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Briefcase, Star, Users, MessageCircle, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { CATERING_SERVICES, RESTAURANT_INFO } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Briefcase,
  Cake: Star,
  Star,
  Users,
};

const packages = [
  {
    name: "Essentiel",
    price: "À partir de 500,000 GNF",
    description: "Idéal pour les événements de 30-50 personnes",
    features: [
      "Menu 3 services",
      "Service de salle professionnel",
      "Vaisselle et couverts",
      "Personnel de service (2 serveurs)",
      "Installation et démontage",
    ],
  },
  {
    name: "Premium",
    price: "À partir de 1,000,000 GNF",
    description: "Parfait pour les événements de 50-150 personnes",
    features: [
      "Menu 5 services",
      "Service de salle premium",
      "Décoration de table incluse",
      "Personnel de service (5 serveurs)",
      "Coordination d'événement",
      "Gâteau de cérémonie",
    ],
    popular: true,
  },
  {
    name: "Luxe",
    price: "Sur devis",
    description: "Pour les grands événements de 150+ personnes",
    features: [
      "Menu gastronomique illimité",
      "Chef privatif",
      "Décoration complète",
      "Personnel illimité",
      "Animation musicale",
      "Photographe événementiel",
      "Coordination complète",
    ],
  },
];

export default function CateringPage() {
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20un%20événement%20traiteur.`;

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/36766850/pexels-photo-36766850.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
            alt="Catering"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F1115]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1115]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block"
          >
            Services Traiteur
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Votre Événement,{" "}
            <span className="italic text-gradient-gold">Notre Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm max-w-2xl mx-auto mb-8"
          >
            Faites confiance à Délices d&apos;Africana pour transformer votre événement en une expérience culinaire mémorable. Mariages, conférences, anniversaires — nous gérons tout.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/30"
            >
              <MessageCircle size={18} />
              Demander un Devis
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all"
            >
              <Phone size={18} />
              {RESTAURANT_INFO.phone}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Services */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Nos Spécialités
            </span>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Types d&apos;Événements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATERING_SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon] || Star;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group glass-card rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-[#141720]/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-white font-bold text-lg mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Packages */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Tarification
            </span>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nos Formules{" "}
              <span className="italic text-gradient-gold">Traiteur</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-2xl p-6 relative ${pkg.popular ? "border-[#D4AF37]/40 shadow-xl shadow-[#D4AF37]/10" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0F1115] px-4 py-1 rounded-full text-xs font-bold">
                    Le plus demandé
                  </div>
                )}
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pkg.name}
                </h3>
                <p className="text-[#D4AF37] font-bold text-lg mb-2">{pkg.price}</p>
                <p className="text-gray-400 text-xs mb-6">{pkg.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle size={14} className="text-[#D4AF37] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    pkg.popular
                      ? "bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115]"
                      : "bg-white/5 hover:bg-white/10 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 text-white"
                  }`}
                >
                  Demander ce forfait
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-10 text-center border-[#D4AF37]/20"
        >
          <h3
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Un projet en tête?
          </h3>
          <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
            Contactez notre équipe événementielle pour un devis personnalisé. Nous étudions chaque demande avec attention et créons des menus sur mesure pour votre événement.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-10 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/30"
          >
            <MessageCircle size={18} />
            Contacter via WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
