"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Star, ArrowRight, Flame } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/constants";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toaster";

function MenuCard({ item, index }: { item: typeof MENU_ITEMS[0]; index: number }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
    showToast({
      type: "success",
      title: "Ajouté au panier!",
      description: item.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/5"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image || "https://images.pexels.com/photos/8166269/pexels-photo-8166269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-transparent to-transparent" />

        {item.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#D4AF37] text-[#0F1115] px-2 py-1 rounded-lg text-[10px] font-bold">
            <Flame size={10} />
            Populaire
          </div>
        )}

        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-9 h-9 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="text-white font-bold text-base mb-1 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.name}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-[#D4AF37] font-bold text-sm">{formatPrice(item.price)}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-[#0B3D2E]/50 hover:bg-[#0B3D2E] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
          >
            <ShoppingCart size={12} />
            Ajouter
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? MENU_ITEMS.slice(0, 9)
    : MENU_ITEMS.filter((item) => item.category === activeCategory).slice(0, 9);

  const displayCategories = MENU_CATEGORIES.filter(c => c.id !== "all" || true);

  return (
    <section className="py-24 bg-[#0F1115] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0B3D2E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
            Notre Menu
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Saveurs{" "}
            <span className="italic text-gradient-gold">Inoubliables</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Chaque plat est une invitation à voyager au cœur de la Guinée et de ses traditions culinaires les plus riches.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {displayCategories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] text-[#0F1115] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-400 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:text-white"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-xl hover:shadow-[#D4AF37]/20"
          >
            Voir tout le menu
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
