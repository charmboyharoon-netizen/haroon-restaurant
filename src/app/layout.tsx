import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: {
    default: "Délices d'Africana | Le plaisir de bien manger - Conakry, Guinea",
    template: "%s | Délices d'Africana",
  },
  description:
    "Restaurant premium guinéen à Conakry. Découvrez les saveurs authentiques de la Guinée avec notre cuisine traditionnelle et internationale. Réservez votre table dès maintenant.",
  keywords: [
    "restaurant Conakry",
    "cuisine guinéenne",
    "restaurant africain",
    "Délices d'Africana",
    "traiteur Conakry",
    "hébergement Conakry",
    "restaurant Guinea",
  ],
  authors: [{ name: "Délices d'Africana" }],
  creator: "Délices d'Africana",
  metadataBase: new URL("https://delicesdafricana.com"),
  openGraph: {
    type: "website",
    locale: "fr_GN",
    url: "https://delicesdafricana.com",
    siteName: "Délices d'Africana",
    title: "Délices d'Africana | Le plaisir de bien manger",
    description:
      "Restaurant premium guinéen à Conakry. Cuisine authentique, traiteur événementiel et hébergement de luxe.",
    images: [
      {
        url: "https://images.pexels.com/photos/34104580/pexels-photo-34104580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        width: 1200,
        height: 627,
        alt: "Délices d'Africana - Restaurant Premium Guinéen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Délices d'Africana | Le plaisir de bien manger",
    description: "Restaurant premium guinéen à Conakry, Guinea",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Délices d'Africana",
              description: "Restaurant premium guinéen à Conakry",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Lambanyi, Route d'Enco 5",
                addressLocality: "Conakry",
                addressCountry: "GN",
              },
              telephone: "+224621567676",
              email: "contact@delicesdafricana.com",
              url: "https://delicesdafricana.com",
              openingHours: "Mo-Su 09:00-23:00",
              servesCuisine: ["Guinean", "African", "International"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
