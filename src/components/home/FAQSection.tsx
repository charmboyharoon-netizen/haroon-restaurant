"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Acceptez-vous les réservations de groupe?",
    a: "Oui, nous accueillons les groupes de toutes tailles. Pour les groupes de plus de 10 personnes, veuillez nous contacter au préalable pour planifier votre visite et garantir une place dans notre salle.",
  },
  {
    q: "Proposez-vous des options végétariennes?",
    a: "Absolument! Notre menu comprend plusieurs options végétariennes comme notre Salade Africaine, Fonio aux légumes et diverses salades. Notre équipe peut aussi adapter certains plats sur demande.",
  },
  {
    q: "Livrez-vous à domicile?",
    a: "Actuellement, nous proposons la commande en ligne avec ramassage sur place. Nous travaillons sur un service de livraison à domicile qui sera bientôt disponible dans certaines zones de Conakry.",
  },
  {
    q: "Comment réserver pour un événement de mariage?",
    a: "Pour les mariages et grands événements, contactez-nous directement par téléphone au +224 621 56 76 76 ou via WhatsApp. Notre équipe événementielle vous guidera pour créer un menu personnalisé et un devis sur mesure.",
  },
  {
    q: "Quels sont les modes de paiement acceptés?",
    a: "Nous acceptons Orange Money, MTN Mobile Money et le paiement en espèces. Pour les commandes en ligne, vous pouvez payer via nos options de mobile money.",
  },
  {
    q: "Les chambres incluent-elles le petit-déjeuner?",
    a: "Oui! Toutes nos chambres incluent un petit-déjeuner continental. Les suites exécutives bénéficient d'un petit-déjeuner gourmet avec des spécialités guinéennes préparées par nos chefs.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className={isOpen ? "text-[#D4AF37]" : "text-gray-500"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="w-full h-px bg-[#D4AF37]/10 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="py-24 bg-[#080A0D]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Questions{" "}
            <span className="italic text-gradient-gold">Fréquentes</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Trouvez les réponses aux questions les plus courantes sur nos services.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
