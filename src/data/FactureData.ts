import type { FactureData } from "../types/factureTypes";


export const factureStatique: FactureData = {
  id: 99,
  reservationId: 101,
  dateFacturation: "2025-08-16T12:00:00Z",
  user: {
    nom: "Dupont",
    prenom: "Jean",
    adresse: "45 Rue des Fêtes",
    ville: "Paris",
    codePostal: "75020",
  },
  evenement: {
    type: "Mariage",
    lieu: "Paris",
    paiement: "Complet",
  },
  lignes: [
    {
      designation: "Pack DJ + Éclairage",
      quantite: 2,
      prixUnitaire: 180,
      dureeHeure: 2 * 24,
      sousTotal: 360,
      image_url: "/pack-evenementiel.jpeg",
    },
    {
      designation: "Deejay",
      quantite: 1,
      prixUnitaire: 200,
      dureeHeure: 24,
      sousTotal: 200,
      image_url: "/deejay.jpg",
    },
  ],
  montantTotal: 360 + 200 + 30 + 36 - 20 + Math.round((360 + 200) * 0.2),
};