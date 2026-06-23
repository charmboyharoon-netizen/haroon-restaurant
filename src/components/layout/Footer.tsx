"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Heart } from "lucide-react";
import { RESTAURANT_INFO } from "@/lib/constants";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };

  const footerLinks = {
    navigation: [
      { href: "/", label: "Accueil" },
      { href: "/menu", label: "Notre Menu" },
      { href: "/catering", label: "Traiteur" },
      { href: "/rooms", label: "Chambres" },
      { href: "/about", label: "À Propos" },
      { href: "/contact", label: "Contact" },
    ],
    services: [
      { href: "/reservation", label: "Réservation" },
      { href: "/catering", label: "Mariage & Événements" },
      { href: "/rooms", label: "Hébergement" },
      { href: "/menu", label: "Commander en ligne" },
      { href: "/contact", label: "Demande de Devis" },
    ],
  };

  return (
    <footer className="bg-[#080A0D] border-t border-[#D4AF37]/10 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] border border-[#D4AF37]/40 flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold">DA</span>
              </div>
              <div>
                <p className="text-white font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Délices d&apos;Africana
                </p>
                <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase">
                  {RESTAURANT_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Votre destination gastronomique à Conakry. Saveurs authentiques guinéennes, service impeccable et ambiance luxueuse.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#141720] border border-[#D4AF37]/20 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#141720] border border-[#D4AF37]/20 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-colors -ml-4 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-[#D4AF37]/0 group-hover:text-[#D4AF37] transition-colors -ml-4 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors group">
                  <Phone size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{RESTAURANT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="flex items-start gap-2.5 text-gray-400 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{RESTAURANT_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-sm">{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <Clock size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-sm">{RESTAURANT_INFO.hours.days} · {RESTAURANT_INFO.hours.display}</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-white text-sm font-semibold mb-2">Newsletter</p>
              {subscribed ? (
                <p className="text-green-400 text-sm">✓ Merci pour votre inscription!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="flex-1 bg-[#141720] border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] p-2 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Délices d&apos;Africana. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Fait avec <Heart size={12} className="text-[#D4AF37] fill-[#D4AF37]" /> à Conakry, Guinée
          </p>
        </div>
      </div>
    </footer>
  );
}
