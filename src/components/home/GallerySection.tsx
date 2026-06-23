"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/34104580/pexels-photo-34104580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
    alt: "Tanzanian Seafood Platter",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/35336025/pexels-photo-35336025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    alt: "Elegant Dinner Setting",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/28736731/pexels-photo-28736731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    alt: "Banquet Buffet",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/20067063/pexels-photo-20067063.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    alt: "Grilled Fish",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/16627892/pexels-photo-16627892.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    alt: "African Rice Dish",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/37492317/pexels-photo-37492317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    alt: "Seafood Platter",
    span: "col-span-2",
  },
];

export function GallerySection() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0F1115] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
            Notre Galerie
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Un festin{" "}
            <span className="italic text-gradient-gold">pour les yeux</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => setLightboxImg(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0F1115]/0 group-hover:bg-[#0F1115]/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X size={20} />
          </button>
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
            <Image
              src={lightboxImg}
              alt="Gallery"
              fill
              className="object-contain"
              quality={90}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
