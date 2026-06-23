"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, ChevronDown, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { RESTAURANT_INFO } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Traiteur" },
  { href: "/rooms", label: "Chambres" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "nav-blur bg-[#0F1115]/90 shadow-lg shadow-black/20 border-b border-[#D4AF37]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] border border-[#D4AF37]/40 flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold text-sm">DA</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Délices d&apos;Africana
                </p>
                <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase">
                  Le plaisir de bien manger
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${
                    pathname === link.href
                      ? "text-[#D4AF37]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 bg-[#0B3D2E]/50 border border-[#D4AF37]/20 rounded-lg"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
                aria-label="Panier"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-[#0F1115] text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Reservation CTA */}
              <Link
                href="/reservation"
                className="hidden sm:flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                Réserver
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0F1115]/98 border-t border-[#D4AF37]/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        pathname === link.href
                          ? "bg-[#0B3D2E]/50 text-[#D4AF37] border border-[#D4AF37]/20"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 space-y-2">
                  <Link
                    href="/reservation"
                    className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-[#0F1115] px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    Réserver une Table
                  </Link>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#0B3D2E]/50 border border-[#D4AF37]/20 text-white px-4 py-3 rounded-xl text-sm font-medium"
                  >
                    <Phone size={16} className="text-[#D4AF37]" />
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer />
    </>
  );
}
