export type PaiementData ={
  id: number;               
  reservationId: number;    
  montant: number;          
  moyenPaiement: string;    
  datePaiement: string;     
  user: {                   
    prenom: string;
    nom: string;
  };
  evenement: {
    type: string;
    lieu: string;
    date: string;
  };
}