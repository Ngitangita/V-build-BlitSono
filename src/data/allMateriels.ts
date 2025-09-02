import type { MaterielsType } from "../types/types";

export const allMateriels: (MaterielsType & { path?: string })[] = [
  {
      id: 1,
      nom: "Enceinte JBL EON610",
      categorieId: { name: "Sonorisation" },
      image_url: "/sonorisation.jpg",
      prix_location: 100,
      stock_total: 50,
      stock_available: 30,
      description:
        "Système électroacoustique complet pour diffuser et amplifier le son (micros, table de mixage, amplis, enceintes), utilisé pour concerts, DJ ou PA.",
  },
  {
      id: 2,
      nom: "Deejay",
      categorieId: { name: "Animation" },
      image_url: "/deejay.jpg",
      prix_location: 120,
      stock_total: 20,
      stock_available: 12,
      description:
        "Pack DJ professionnel : table de mixage, platines/contrôleur, casque, système audio pour mixer et animer événements.",
  },
  {
      id: 3,
      nom: "Home studio",
      categorieId: { name: "Studio" },
      image_url: "/home-studio.jpeg",
      prix_location: 80,
      stock_total: 10,
      stock_available: 5,
      description:
        "Configuration d'enregistrement personnel : interface audio, micros, casque, moniteurs près du champ, adaptée aux projets domestiques.",
  },
  {
      id: 4,
      nom: "Instruments de musique",
      categorieId: { name: "Instrument" },
      image_url: "/instruments-des-musiques.jpeg",
      prix_location: 150,
      stock_total: 15,
      stock_available: 10,
      description:
        "Instruments acoustiques ou électroniques (guitares, claviers, batteries…) pour pratique, répétition ou performance.",
  },
  {
      id: 5,
      nom: "HiFi & vidéo",
      categorieId: { name: "Multimédia" },
      image_url: "/hifi-video.jpeg",
      prix_location: 90,
      stock_total: 18,
      stock_available: 12,
      description:
        "Système audio-vidéo domestique : amplis, enceintes, platines ou lecteurs pour une expérience multimédia de qualité.",
  },
  {
      id: 6,
      nom: "Structure",
      categorieId: { name: "Structure scène" },
      image_url: "/structure.jpeg",
      prix_location: 200,
      stock_total: 10,
      stock_available: 6,
      description:
        "Structures modulaires (truss, portiques, stands) pour supports d'enceintes, éclairages, écrans en événementiel.",
  },
  {
      id: 7,
      nom: "Flight case",
      categorieId: { name: "Transport" },
      image_url: "/flight-case.jpeg",
      prix_location: 110,
      stock_total: 30,
      stock_available: 25,
      description:
        "Valises robustes en bois/aluminium renforcé, protégées par mousse, pour transporter en sécurité matériel musical ou audio.",
  },
  {
      id: 8,
      nom: "Microphones",
      categorieId: { name: "Audio" },
      image_url: "/microphones.jpeg",
      prix_location: 70,
      stock_total: 40,
      stock_available: 30,
      description:
        "Micros dynamiques ou à condensateur, souvent avec connecteur XLR, pour voix, instruments ou captation en live/studio.",
  },
  {
      id: 9,
      nom: "Enceintes",
      categorieId: { name: "Sonorisation" },
      image_url: "/enceinte.jpeg",
      prix_location: 130,
      stock_total: 20,
      stock_available: 18,
      description:
        "Haut-parleurs amplifiés ou passifs conçus pour restituer le son avec clarté — essentiels en sono et HiFi.",
  },
  {
      id: 10,
      nom: "Consoles de mixage",
      categorieId: { name: "Mixage" },
      image_url: "/console-de-mixage.jpeg",
      prix_location: 180,
      stock_total: 12,
      stock_available: 8,
      description:
        "Tables de mixage audio permettant d'équilibrer plusieurs sources, appliquer effets, réguler niveaux et sorties audio.",
  },
  {
      id: 11,
      nom: "Accessoires divers",
      categorieId: { name: "Accessoires" },
      image_url: "/accessoire-divers.jpeg",
      prix_location: 50,
      stock_total: 100,
      stock_available: 80,
      description:
        "Câbles XLR/jack, adaptateurs, pupitres, pieds, câblage divers nécessaires en sono et scène.",
  },
  {
      id: 12,
      nom: "Packs événementiels",
      categorieId: { name: "Pack" },
      image_url: "/pack-evenementiel.jpeg",
      prix_location: 160,
      stock_total: 8,
      stock_available: 5,
      description:
        "Kits tout-en-un : sono, table, micros, éclairages de base pour couvrir les besoins d’un événement clé-en-main.",
  },
];