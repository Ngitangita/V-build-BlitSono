import type { DevisData } from "../types/devisTypes";

export const devisStatique: DevisData = {
  id: 42,
  reservationId: 101,
  dateEmission: "2025-08-14T10:30:00Z",
  user: {
    nom: "Dupont",
    prenom: "Jean",
    telephone: "0346514209",
    email: "jean.dupont@example.com",
  },
  evenement: {
    date: "2025-09-14",
    heureDebut: "18:00",
    heureFin: "02:00",
    lieu: "Paris",
    type: "Mariage",
    paiement: "Complet",
    statut: "en_attente",
    prixEstime: 900,
    prixFinal: 846,
  },
  lignes: [
    {
      materiel: "Pack DJ + Éclairage",
      quantite: 2,
      prixUnitaire: 180,
      dureeHeure: 2 * 24,
      sousTotal: 360,
      image_url: "/pack-evenementiel.jpeg",
    },
    {
      materiel: "Deejay",
      quantite: 2,
      prixUnitaire: 180,
      dureeHeure: 2 * 24,
      sousTotal: 360,
      image_url: "/deejay.jpg",
    },
  ],
  fraisLivraison: 30,
  majorationNuit: 36,
  reductions: -20,
  totalHT: 720,
  tva: 144,
  totalTTC: 846 + 144 + 30 + 36 - 20, 
};