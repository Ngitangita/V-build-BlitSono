
export type Evenement = {
  date: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  type: string;
  paiement: string;
  statut: string;
  prixEstime?: number;
  prixFinal?: number;
}

export type LigneDevis = {
  materiel: string;
  quantite: number;
  prixUnitaire: number;
  dureeHeure: number;
  sousTotal: number;
  image_url: string;
};

export type DevisData = {
  id: number;
  reservationId: number;
  dateEmission: string;
  user: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
  };
  evenement: {
    date: string;  
    type: string;
    lieu: string;
    heureDebut: string;
    heureFin: string;
    paiement: string;
    statut: string;
    prixEstime?: number;
    prixFinal?: number;
  };
  lignes: LigneDevis[];
  totalHT: number;
  fraisLivraison: number;
  majorationNuit: number;
  reductions: number;
  totalTTC: number;
  tva?: number; 
};

