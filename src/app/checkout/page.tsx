"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Phone, CreditCard, Banknote, CheckCircle, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toaster";



export default function CheckoutPage() {
  const { state, totalAmount, clearCart, updateQuantity, removeItem } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ id: number } | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) {
      showToast({ type: "error", title: "Panier vide", description: "Ajoutez des articles à votre panier" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          items: JSON.stringify(state.items),
          totalAmount,
          paymentMethod: "contact",
          notes: form.notes,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        clearCart();
        setOrderSuccess({ id: data.id });
      } else {
        showToast({ type: "error", title: "Erreur lors de la commande" });
      }
    } catch {
      showToast({ type: "error", title: "Erreur de connexion" });
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#0F1115] pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Commande Reçue!
          </h2>
          <p className="text-[#D4AF37] font-mono text-sm mb-4">
            Commande #{String(orderSuccess.id).padStart(5, "0")}
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Merci <strong className="text-white">{form.name}</strong>! Nous avons reçu votre commande et vous contacterons au <strong className="text-[#D4AF37]">{form.phone}</strong> pour confirmer.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-8 py-3 rounded-xl font-bold text-sm transition-colors"
          >
            Retour au Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/menu"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Continuer les achats
          </Link>
        </div>

        <h1
          className="text-4xl font-bold text-white mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Votre <span className="italic text-gradient-gold">Commande</span>
        </h1>

        {state.items.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <ShoppingBag size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <p className="text-white font-bold text-xl mb-2">Votre panier est vide</p>
            <p className="text-gray-400 text-sm mb-6">Découvrez notre délicieux menu</p>
            <Link href="/menu" className="bg-[#D4AF37] text-[#0F1115] px-8 py-3 rounded-xl font-bold text-sm inline-block">
              Voir le Menu
            </Link>
          </div>
        ) : (
          <form onSubmit={handleOrder} className="grid lg:grid-cols-5 gap-8">
            {/* Left: Customer Info + Payment */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer Info */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Vos Informations
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Nom complet *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Téléphone *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+224 621 56 76 76"
                      className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Notes (optionnel)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Instructions spéciales..."
                      rows={3}
                      className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Restaurant */}
<div className="glass-card rounded-2xl p-6">
  <h3
    className="text-white font-bold text-lg mb-5"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    Contactez le Restaurant
  </h3>

  <p className="text-gray-400 text-sm mb-6">
    Pour confirmer votre commande, contactez directement notre équipe.
  </p>

  <div className="space-y-4">

    <a
      href="tel:+224621567676"
      className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all"
    >
      <Phone className="text-[#D4AF37]" size={22} />

      <div>
        <p className="text-white font-semibold">
          Appelez-nous
        </p>

        <p className="text-gray-400 text-sm">
          +224 621 56 76 76
        </p>
      </div>
    </a>


    <a
      href="https://wa.me/224623381252"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border border-green-500/20 hover:border-green-500 transition-all"
    >
      <span className="text-2xl">
        💬
      </span>

      <div>
        <p className="text-white font-semibold">
          Commander sur WhatsApp
        </p>

        <p className="text-gray-400 text-sm">
          Réponse rapide
        </p>
      </div>
    </a>


    <a
      href="mailto:delicesdafricanagn.com"
      className="flex items-center gap-4 p-4 rounded-xl border border-blue-500/20 hover:border-blue-500 transition-all"
    >
      <span className="text-2xl">
        ✉️
      </span>

      <div>
        <p className="text-white font-semibold">
          Envoyer un Email
        </p>

        <p className="text-gray-400 text-sm">
          contact@delicesdafricanagn.com
        </p>
      </div>
    </a>
    </div>

  </div>
  </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h3 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Récapitulatif
                </h3>
                <div className="space-y-3 mb-5 max-h-72 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image && (
                          <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-[#D4AF37] text-xs">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors ml-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#D4AF37]/10 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sous-total</span>
                    <span className="text-white">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Service</span>
                    <span className="text-green-400">Gratuit</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-[#D4AF37]/10">
                    <span className="text-white">Total</span>
                    <span className="text-[#D4AF37] text-lg">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-60 text-[#0F1115] py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20"
                >
                  {isLoading ? (
                    <><div className="w-4 h-4 border-2 border-[#0F1115]/30 border-t-[#0F1115] rounded-full animate-spin" /> Traitement...</>
                  ) : (
                    <>Passer la Commande <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
