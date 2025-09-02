
type PackType = {
  id: number;
  name: string;
  description: string;
  price_override: number;
};
type ProductType = {
  id: number;
  nom: string;
  categoryId?: { name: string };
  image_url: string;
  prix: number;
  stock_total: number;
  stock_available: number;
  description: string;
};
type PackItemsType = {
  id: number;
  packId: PackType;
  productId: ProductType;
  quantite: number;
};

export const allPackItems: PackItemsType[] = [
  // Pack 1 : Mariage Classique
  {
    id: 1,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description:
        "Contient tout le nécessaire pour une sonorisation de mariage",
      price_override: 250000,
    },
    productId: {
      id: 1,
      nom: "Enceinte JBL EON610",
      categoryId: { name: "Sonorisation" },
      image_url: "/enceinte-JBL.jpeg",
      prix: 100,
      stock_total: 50,
      stock_available: 30,
      description:
        "Système électroacoustique complet pour diffuser et amplifier le son...",
    },
    quantite: 2,
  },
  {
    id: 2,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description: "Le pack parfait pour commencer dans le mix",
      price_override: 250000,
    },
    productId: {
      id: 13,
      nom: "Micro Shure SM58",
      categoryId: { name: "Microphonie" },
      image_url: "/micro.jpg",
      prix: 90,
      stock_total: 60,
      stock_available: 40,
      description: "Casque de monitoring fermé pour DJs...",
    },
    quantite: 4,
  },
  {
    id: 3,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description: "Jeux de lumière pour animer vos soirées",
      price_override: 250000,
    },
    productId: {
      id: 14,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "Projecteur lyre motorisé RGBW 60W...",
    },
    quantite: 3,
  },

  // Pack 2 : DJ Débutant
  {
    id: 4,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Matériel idéal pour conférences et présentations",
      price_override: 180000,
    },
    productId: {
      id: 2,
      nom: "Casque Audio Technica",
      categoryId: { name: "Accessoires" },
      image_url: "/casque-audio-technica.jpg",
      prix: 75,
      stock_total: 20,
      stock_available: 15,
      description: "Micro cardioïde dynamique pour la voix...",
    },
    quantite: 1,
  },
  {
    id: 5,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description:
        "Pack complet haut de gamme avec éclairages et sono professionnels",
      price_override: 180000,
    },
    productId: {
      id: 15,
      nom: "Contrôleur Pioneer DDJ-200",
      categoryId: { name: "DJ" },
      image_url: "/ddj-200.jpg",
      prix: 150,
      stock_total: 10,
      stock_available: 8,
      description: "Système audio professionnel pour grands événements.",
    },
    quantite: 1,
  },
  {
    id: 6,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Pour la sonorisation de cérémonies religieuses",
      price_override: 180000,
    },
    productId: {
      id: 16,
      nom: "Micro Behringer XM8500",
      categoryId: { name: "Microphonie" },
      image_url: "/behringer-xm8500.jpg",
      prix: 40,
      stock_total: 25,
      stock_available: 20,
      description: "Micro discret pour pupitre ou autel.",
    },
    quantite: 1,
  },

  // Pack 3 : Lumière Événement
  {
    id: 7,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "Vidéoprojecteur, écran et sono légère pour projections",
      price_override: 120000,
    },
    productId: {
      id: 3,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "...",
    },
    quantite: 2,
  },
  {
    id: 8,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "...",
      price_override: 120000,
    },
    productId: {
      id: 17,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 9,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "...",
      price_override: 120000,
    },
    productId: {
      id: 18,
      nom: "Effet stroboscope LED",
      categoryId: { name: "Éclairage" },
      image_url: "/strobe-led.jpg",
      prix: 80,
      stock_total: 15,
      stock_available: 10,
      description: "...",
    },
    quantite: 1,
  },

  // Pack 4 : Conférence Pro
  {
    id: 10,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "...",
      price_override: 150000,
    },
    productId: {
      id: 4,
      nom: "Micro Shure SM58",
      categoryId: { name: "Microphonie" },
      image_url: "/micro.jpeg",
      prix: 90,
      stock_total: 60,
      stock_available: 40,
      description: "...",
    },
    quantite: 3,
  },
  {
    id: 11,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "...",
      price_override: 150000,
    },
    productId: {
      id: 19,
      nom: "Projecteur Epson HD",
      categoryId: { name: "Vidéo" },
      image_url: "/videoprojecteur.jpg",
      prix: 200,
      stock_total: 8,
      stock_available: 5,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 12,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
      price_override: 150000,
    },
    productId: {
      id: 20,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpeg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
    },
    quantite: 2,
  },

  // Pack 5 : Mariage Premium
  {
    id: 13,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description:
        "Projecteur haute définition pour présentations et projections.",
      price_override: 500000,
    },
    productId: {
      id: 5,
      nom: "Système Line Array",
      categoryId: { name: "Sonorisation" },
      image_url: "/line-array.jpg",
      prix: 300,
      stock_total: 10,
      stock_available: 6,
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
    },
    quantite: 2,
  },
  {
    id: 14,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "...",
      price_override: 500000,
    },
    productId: {
      id: 3,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "...",
    },
    quantite: 4,
  },
  {
    id: 15,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "...",
      price_override: 500000,
    },
    productId: {
      id: 21,
      nom: "Micro col de cygne",
      categoryId: { name: "Microphonie" },
      image_url: "/col-cygne.jpg",
      prix: 65,
      stock_total: 25,
      stock_available: 18,
      description: "...",
    },
    quantite: 3,
  },

  // Pack 6 : Église
  {
    id: 16,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
      price_override: 180000,
    },
    productId: {
      id: 6,
      nom: "Micro col de cygne",
      categoryId: { name: "Microphonie" },
      image_url: "/col-cygne.jpeg",
      prix: 65,
      stock_total: 25,
      stock_available: 18,
      description: "...",
    },
    quantite: 2,
  },
  {
    id: 17,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
      price_override: 180000,
    },
    productId: {
      id: 22,
      nom: "Enceinte JBL EON610",
      categoryId: { name: "Sonorisation" },
      image_url: "/enceinte-JBL.jpeg",
      prix: 100,
      stock_total: 50,
      stock_available: 30,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 18,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
      price_override: 180000,
    },
    productId: {
      id: 23,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led-dmx.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 1,
  },
];
