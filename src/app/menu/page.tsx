"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, Star, Flame, Search, Filter } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/constants";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toaster";

function MenuItemCard({ item, index }: { item: typeof MENU_ITEMS[0]; index: number }) {
  const { addItem, state, updateQuantity, openCart } = useCart();
  const cartItem = state.items.find((i) => i.id === item.id);
  const qty = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
    showToast({ type: "success", title: "Ajouté au panier!", description: item.name });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.image || ""}
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
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-white text-[10px]">4.8</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3
            className="text-white font-bold text-base mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {item.name}
          </h3>
          <p className="text-gray-500 text-xs">{item.nameEn}</p>
          <p className="text-gray-400 text-xs leading-relaxed mt-1.5 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#D4AF37] font-bold">{formatPrice(item.price)}</span>

          {qty > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, qty - 1)}
                className="w-8 h-8 rounded-lg bg-[#0B3D2E]/50 hover:bg-[#0B3D2E] border border-[#D4AF37]/20 flex items-center justify-center text-white transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-white font-bold w-6 text-center">{qty}</span>
              <button
                onClick={() => updateQuantity(item.id, qty + 1)}
                className="w-8 h-8 rounded-lg bg-[#D4AF37] hover:bg-[#B8962E] flex items-center justify-center text-[#0F1115] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-4 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20"
            >
              <ShoppingCart size={14} />
              Ajouter
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, toggleCart } = useCart();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/28736731/pexels-photo-28736731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1600"
            alt="Menu"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/80 via-[#0F1115]/70 to-[#0F1115]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block"
          >
            Notre Cuisine
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Notre <span className="italic text-gradient-gold">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm max-w-xl mx-auto"
          >
            Explorez notre sélection de plats guinéens et internationaux, préparés avec passion et des ingrédients frais chaque jour.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141720] border border-[#D4AF37]/20 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          {totalItems > 0 && (
            <button
              onClick={toggleCart}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <ShoppingCart size={16} />
              Panier ({totalItems})
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] text-[#0F1115] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-400 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items count */}
        <p className="text-gray-500 text-xs mb-6">{filteredItems.length} plat{filteredItems.length > 1 ? "s" : ""} trouvé{filteredItems.length > 1 ? "s" : ""}</p>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">Aucun plat trouvé</p>
            <p className="text-gray-500 text-sm">Essayez une autre recherche ou catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
}
