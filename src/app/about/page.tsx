"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Heart, Award, Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";

const values = [
  {
    icon: Utensils,
    title: "Authenticité",
    description: "Recettes transmises de génération en génération, fidèles aux traditions culinaires guinéennes.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Chaque plat est préparé avec amour et dédication pour offrir la meilleure expérience.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Des standards gastronomiques élevés dans chaque assiette servie.",
  },
  {
    icon: Users,
    title: "Hospitalité",
    description: "L'accueil chaleureux fait partie de notre identité guinéenne.",
  },
];

const team = [
  {
    name: "Mamadou Diallo",
    role: "Chef Exécutif",
    bio: "15 ans d'expérience en cuisine guinéenne et internationale",
    avatar: "MD",
    color: "from-[#0B3D2E] to-[#1a6b4e]",
  },
  {
    name: "Fatoumata Bah",
    role: "Directrice",
    bio: "Fondatrice et âme de Délices d'Africana",
    avatar: "FB",
    color: "from-[#4a2800] to-[#7a4500]",
  },
  {
    name: "Ibrahim Kourouma",
    role: "Chef Pâtissier",
    bio: "Spécialiste en desserts africains et créations sucrées",
    avatar: "IK",
    color: "from-[#1a0B3D] to-[#2e1a6b]",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/28736727/pexels-photo-28736727.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
            alt="À Propos"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/60 to-[#0F1115]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block"
          >
            Notre Histoire
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            L&apos;Âme de{" "}
            <span className="italic text-gradient-gold">Délices d&apos;Africana</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm max-w-2xl mx-auto"
          >
            Une aventure culinaire née de la passion pour la cuisine guinéenne, devenue l&apos;une des tables les plus prisées de Conakry.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
              Notre Fondation
            </span>
            <h2
              className="text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Un rêve devenu réalité
            </h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                Délices d&apos;Africana est né d&apos;un rêve simple mais puissant : créer un espace où la richesse culinaire de la Guinée serait célébrée et partagée avec le monde.
              </p>
              <p>
                Fondé par Fatoumata Bah, ce restaurant est le fruit de son amour profond pour la cuisine de sa grand-mère et de sa volonté de préserver les traditions culinaires guinéennes tout en les modernisant pour un public contemporain.
              </p>
              <p>
                Aujourd&apos;hui, situé au cœur de Lambanyi à Conakry, Délices d&apos;Africana est bien plus qu&apos;un restaurant. C&apos;est un lieu de rencontre, de célébration et de découverte culturelle où chaque repas raconte une histoire.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/24742604/pexels-photo-24742604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                alt="Notre Restaurant"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Nos Valeurs
            </span>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ce qui nous guide
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
              L&apos;Équipe
            </span>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Les Visages de{" "}
              <span className="italic text-gradient-gold">Notre Excellence</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} border-2 border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-[#D4AF37] font-bold text-xl">{member.avatar}</span>
                </div>
                <h3
                  className="text-white font-bold text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
                <p className="text-[#D4AF37] text-xs font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Clock, label: "Horaires", value: RESTAURANT_INFO.hours.display },
            { icon: MapPin, label: "Adresse", value: RESTAURANT_INFO.address },
            { icon: Utensils, label: "Spécialité", value: "Cuisine Guinéenne & Internationale" },
            { icon: Star, label: "Note Moyenne", value: "4.9/5 (10,000+ avis)" },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-5"
            >
              <Icon size={18} className="text-[#D4AF37] mb-3" />
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className="text-white text-sm font-medium">{value}</p>
            </motion.div>
          ))}
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
            Venez nous rendre visite
          </h3>
          <p className="text-gray-400 text-sm mb-8">
            Nous serons ravis de vous accueillir et de vous faire découvrir les saveurs authentiques de la Guinée.
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-10 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/30"
          >
            Réserver une Table
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
