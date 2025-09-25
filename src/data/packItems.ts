import type { PacksType } from "../types/types";

export const packItems: (PacksType & { path: string })[] = [
  {
    id_bundle: 1,
    name: "Pack Mariage Classique",
    description: "Contient tout le nécessaire pour une sonorisation de mariage",
    daily_price: 250_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/1"
  },
  {
    id_bundle: 2,
    name: "Pack DJ Débutant",
    description: "Le pack parfait pour commencer dans le mix",
    daily_price: 180_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/2"
  },
  {
    id_bundle: 3,
    name: "Pack Lumière Événement",
    description: "Jeux de lumière pour animer vos soirées",
    daily_price: 120_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/3"
  },
  {
    id_bundle: 4,
    name: "Pack Conférence Pro",
    description: "Matériel idéal pour conférences et présentations",
    daily_price: 150_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/4"
  },
  {
    id_bundle: 5,
    name: "Pack Mariage Premium",
    description: "Pack complet haut de gamme avec éclairages et sono professionnels",
    daily_price: 500_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/5"
  },
  {
    id_bundle: 6,
    name: "Pack Église",
    description: "Pour la sonorisation de cérémonies religieuses",
    daily_price: 180_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/6"
  },
  {
    id_bundle: 7,
    name: "Pack Projection Vidéo",
    description: "Vidéoprojecteur, écran et sono légère pour projections",
    daily_price: 220_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/7"
  },
  {
    id_bundle: 8,
    name: "Pack Lumière Scénique",
    description: "Éclairage de scène avec effets LED et contrôleur DMX",
    daily_price: 300_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/8"
  },
  {
    id_bundle: 9,
    name: "Pack Soirée Privée",
    description: "Enceintes, lumières disco et micro pour petites fêtes",
    daily_price: 180_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/9"
  },
  {
    id_bundle: 10,
    name: "Pack Formation",
    description: "Matériel de sonorisation pour formations en salle",
    daily_price: 170_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/10"
  },
  {
    id_bundle: 11,
    name: "Pack Studio Débutant",
    description: "Interface audio, micro studio, casque et pieds micro",
    daily_price: 280_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/11"
  },
  {
    id_bundle: 12,
    name: "Pack Extérieur",
    description: "Sono résistante pour événements en plein air",
    daily_price: 400_000,
    is_active: true,
    created_at: new Date().toISOString(),
    path: "/packs/12"
  }
];
