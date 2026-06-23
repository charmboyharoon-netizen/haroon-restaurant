"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { useState } from "react";
import { RESTAURANT_INFO } from "@/lib/constants";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Bonjour%20Délices%20d'Africana%2C%20je%20souhaite%20faire%20une%20réservation.`;

  return (
    <>
      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-[#141720] border border-[#D4AF37]/20 rounded-2xl p-4 shadow-2xl w-72"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#0B3D2E] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-sm">DA</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Délices d&apos;Africana</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                    En ligne maintenant
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="bg-[#1A1D24] rounded-xl p-3 mb-3">
                <p className="text-gray-300 text-sm">
                  👋 Bonjour! Comment puis-je vous aider? Réservation, commande ou question?
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
              >
                <MessageCircle size={16} />
                Démarrer la conversation
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
          aria-label="WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="wa" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Sticky call button on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex items-center justify-center gap-2 w-full bg-[#0B3D2E] text-white py-3 text-sm font-semibold border-t border-[#D4AF37]/20"
        >
          <Phone size={16} className="text-[#D4AF37]" />
          <span>Appeler Maintenant: {RESTAURANT_INFO.phone}</span>
        </a>
      </div>
    </>
  );
}
