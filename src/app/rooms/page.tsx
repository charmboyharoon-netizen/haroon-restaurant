"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Users, Maximize2, Calendar, ArrowRight, Phone, X, MessageCircle } from "lucide-react";
import { ROOMS, RESTAURANT_INFO } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toaster";

function RoomBookingModal({ room, onClose }: { room: typeof ROOMS[0]; onClose: () => void }) {
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequests: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const d1 = new Date(form.checkIn);
    const d2 = new Date(form.checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const total = nights * room.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) {
      showToast({ type: "error", title: "Dates invalides", description: "Vérifiez vos dates de séjour" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/room-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: form.guestName,
          guestPhone: form.guestPhone,
          guestEmail: form.guestEmail,
          roomType: room.name,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: parseInt(form.guests),
          totalAmount: total,
          specialRequests: form.specialRequests,
        }),
      });
      if (res.ok) setSuccess(true);
      else showToast({ type: "error", title: "Erreur", description: "Veuillez réessayer" });
    } catch {
      showToast({ type: "error", title: "Erreur de connexion" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#141720] border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-white font-bold text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {success ? "Réservation Confirmée!" : `Réserver — ${room.nameFr}`}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-6">
            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
            <p className="text-gray-300 text-sm mb-2">Votre réservation a été enregistrée.</p>
            <p className="text-gray-400 text-xs mb-6">Nous vous confirmerons par téléphone.</p>
            <button
              onClick={onClose}
              className="bg-[#D4AF37] text-[#0F1115] px-6 py-2.5 rounded-xl font-bold text-sm"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Nom complet *</label>
                <input
                  required
                  type="text"
                  value={form.guestName}
                  onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                  className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Téléphone *</label>
                <input
                  required
                  type="tel"
                  value={form.guestPhone}
                  onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                  className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                  placeholder="+224..."
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Check-in *</label>
                <input
                  required
                  type="date"
                  value={form.checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Check-out *</label>
                <input
                  required
                  type="date"
                  value={form.checkOut}
                  min={form.checkIn || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.guestEmail}
                onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                className="w-full bg-[#0F1115]/50 border border-[#D4AF37]/20 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
                placeholder="votre@email.com"
              />
            </div>
            {nights > 0 && (
              <div className="bg-[#0B3D2E]/20 border border-[#D4AF37]/10 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{nights} nuit{nights > 1 ? "s" : ""} × {formatPrice(room.price)}</span>
                  <span className="text-[#D4AF37] font-bold">{formatPrice(total)}</span>
                </div>
                <p className="text-gray-500 text-xs">Le paiement se fait à l&apos;arrivée</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#B8962E] disabled:opacity-60 text-[#0F1115] py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-[#0F1115]/30 border-t-[#0F1115] rounded-full animate-spin" /> Envoi...</>
              ) : (
                <>Confirmer la Réservation <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<typeof ROOMS[0] | null>(null);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Bonjour%2C%20je%20souhaite%20réserver%20une%20chambre.`;

  return (
    <div className="min-h-screen bg-[#0F1115] pt-20">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/14036272/pexels-photo-14036272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
            alt="Chambres"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F1115]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1115]" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block"
          >
            Hébergement Premium
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Séjournez dans{" "}
            <span className="italic text-gradient-gold">le Luxe</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm max-w-xl mx-auto"
          >
            Des chambres et suites exquisément décorées alliant confort moderne et touches africaines authentiques au cœur de Conakry.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Rooms Grid */}
        <div className="space-y-10 mb-20">
          {ROOMS.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className={`relative h-72 lg:h-auto min-h-[300px] ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0F1115] px-3 py-1.5 rounded-xl text-xs font-bold">
                  {room.size}
                </div>
              </div>
              <div className={`p-8 lg:p-10 flex flex-col justify-center ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3 block">
                  {room.nameFr}
                </span>
                <h2
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {room.name}
                </h2>
                <p className="text-[#D4AF37] text-2xl font-bold mb-2">{formatPrice(room.price)}<span className="text-sm font-normal text-gray-400">/nuit</span></p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{room.description}</p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-[#D4AF37]" />
                    <span>Jusqu&apos;à {room.capacity} pers.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={14} className="text-[#D4AF37]" />
                    <span>{room.size}</span>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-xs">
                      <CheckCircle size={12} className="text-[#D4AF37] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1115] px-6 py-3 rounded-xl font-bold text-sm transition-all"
                  >
                    <Calendar size={16} />
                    Réserver maintenant
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-[#D4AF37]/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  >
                    <MessageCircle size={16} />
                    Renseignements
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 text-center"
        >
          <h3
            className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Équipements de l&apos;Hôtel
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Wi-Fi gratuit",
              "Petit-déjeuner inclus",
              "Restaurant sur place",
              "Parking sécurisé",
              "Service 24h/24",
              "Climatisation",
              "Blanchisserie",
              "Conciergerie",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle size={14} className="text-[#D4AF37]" />
                {amenity}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <RoomBookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
