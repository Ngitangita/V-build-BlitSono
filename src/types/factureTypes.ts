export type LigneFacture = {
  designation: string;
  quantite: number;
  prixUnitaire: number;
  dureeHeure: number;
  sousTotal: number;
  image_url: string;
};

export type FactureData = {
  id: number;
  reservationId: number;
  dateFacturation: string;
  user: {
    nom: string;
    prenom: string;
    adresse: string;
    ville: string;
    codePostal: string;
  };
  evenement: {
    type: string;
    lieu: string;
    paiement: string;
  };
  lignes: LigneFacture[];
  montantTotal: number;
};
