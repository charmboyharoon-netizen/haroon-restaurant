"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Utensils, Globe, Award, Home, Users, Star, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "Cuisine Guinéenne Authentique",
    description: "Des recettes transmises de génération en génération, préparées avec des ingrédients locaux frais.",
  },
  {
    icon: Globe,
    title: "Plats Internationaux",
    description: "Une sélection de plats du monde entier pour satisfaire tous les palais.",
  },
  {
    icon: Award,
    title: "Traiteur Professionnel",
    description: "Service traiteur haut de gamme pour tous vos événements spéciaux.",
  },
  {
    icon: Home,
    title: "Hébergement Premium",
    description: "Des chambres et suites luxueuses au cœur de Conakry pour un séjour parfait.",
  },
  {
    icon: Users,
    title: "Environnement Familial",
    description: "Un cadre chaleureux et accueillant pour toute la famille, des petits aux grands.",
  },
  {
    icon: Star,
    title: "Expérience Gastronomique",
    description: "Une expérience culinaire d'exception avec un service digne des plus grands restaurants.",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group glass-card rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} className="text-[#D4AF37]" />
      </div>
      <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        {feature.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-[#0F1115] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#0B3D2E]/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/28736731/pexels-photo-28736731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                alt="Cuisine Africaine Authentique"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/50 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <CheckCircle size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">15+ Années</p>
                  <p className="text-gray-400 text-xs">d&apos;Excellence Culinaire</p>
                </div>
              </div>
            </motion.div>

            {/* Second floating card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -left-6 glass-card rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {["MD", "IC", "FK"].map((init) => (
                    <div key={init} className="w-7 h-7 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/30 flex items-center justify-center">
                      <span className="text-[#D4AF37] text-[8px] font-bold">{init}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">500+ Clients</p>
                  <p className="text-gray-400 text-xs">Satisfaits chaque mois</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
              Notre Histoire
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              La Guinée dans{" "}
              <span className="italic text-gradient-gold">chaque assiette</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-6" />
            <p className="text-gray-300 leading-relaxed mb-4">
              Fondé au cœur de Conakry, Délices d&apos;Africana est bien plus qu&apos;un restaurant — c&apos;est une célébration de la richesse culinaire guinéenne. Depuis notre création, nous avons toujours eu pour mission de vous faire vivre une expérience gastronomique authentique.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Nos chefs passionnés sélectionnent chaque jour des ingrédients frais et locaux pour créer des plats qui honorent les traditions de la Guinée tout en apportant une touche de modernité et d&apos;élégance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Plats au menu", value: "50+" },
                { label: "Événements catering", value: "200+" },
                { label: "Chambres disponibles", value: "3 types" },
                { label: "Clients satisfaits", value: "10,000+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#141720] rounded-xl p-4 border border-[#D4AF37]/10">
                  <p className="text-[#D4AF37] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Ce que nous offrons
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Une Expérience Complète
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
