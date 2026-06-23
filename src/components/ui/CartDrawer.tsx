"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-[#141720] border-l border-[#D4AF37]/20 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#D4AF37]" size={24} />
                <div>
                  <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Votre Panier
                  </h2>
                  <p className="text-gray-400 text-xs">{totalItems} article{totalItems > 1 ? "s" : ""}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#0B3D2E]/30 flex items-center justify-center">
                    <ShoppingBag className="text-[#D4AF37]/50" size={32} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Votre panier est vide</p>
                    <p className="text-gray-400 text-sm mt-1">Découvrez notre menu délicieux</p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="bg-[#D4AF37] text-[#0F1115] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#B8962E] transition-colors"
                  >
                    Voir le Menu
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-3 bg-[#1A1D24] rounded-xl p-3"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#0B3D2E]/30 flex items-center justify-center">
                            <ShoppingBag size={20} className="text-[#D4AF37]/50" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-[#D4AF37] text-sm font-bold mt-0.5">{formatPrice(item.price)}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white text-sm w-5 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sous-total</span>
                  <span className="text-white font-bold text-lg">{formatPrice(totalAmount)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] py-3.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20"
                >
                  Commander maintenant
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
