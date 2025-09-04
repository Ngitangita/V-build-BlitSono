import type { PaiementData } from "../types/paiementTypes";

export const paiementStatique: PaiementData = {
  id: 123,
  reservationId: 101,
  montant: 846.00,
  moyenPaiement: "Carte bancaire",
  datePaiement: "2025-09-05T15:45:00Z",
  user: {
    prenom: "Jean",
    nom: "Dupont",
  },
  evenement: {
    type: "Mariage",
    lieu: "Paris",
    date: "2025-09-14",
  },
};