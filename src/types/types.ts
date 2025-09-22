import type { JSX } from "react";

export type MenuItem = {
  title: string;
  icon: JSX.Element;
  path: string;
  subItems: SubItem[];
};

export type SubItem = Omit<MenuItem, "subItems">;

export type MenuCategorie = {
  title: string;
  path: string;
};

export type MaterielsType = {
  id_product?: number;
  name: string;
  description: string | null;
  daily_price: number;
  replacement_cost: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: {
    id_category: number;
    name: string;
  };
  image_url?: string;      
  stock_total?: number;   
  stock_available?: number; 
};


export type Category = {
  id_category: number;
  name: string;
};




export type PackItems = {
  id: number;
  nom: string;
  description: string;
  prix_location: number;
};

export type PackType = {
  id: number;
  name: string;
  description: string;
  price_override: number;
};
export type ProductType = {
  id: number;
  nom: string;
  categoryId?: { name: string };
  image_url: string;
  prix: number;
  stock_total: number;
  stock_available: number;
  description: string;
};
export type PackItemsType = {
  id: number;
  packId: PackType;
  productId: ProductType;
  quantite: number;
};


export type Reservation = {
  id: string;
  userId: number;
  date: string;
  heure: string;
  dureeHeure: number;
  materiel: string[];
  lieu: string;
  statut: "en_attente" | "confirmée";
  prixEstime: number;
  prixFinal?: number;
  etatCommande: string;
};

export type MaterielReserved = {
  materiel_id: number;
  name: string;
  quantity: number;
  price: number;
};

export type ReservationBase = {
  id: number;
  user_name: string;
  date_evenement: string;
  heure_evenement: string;
  duree_heure: number;
  lieu: string;
  statut: "en_attente" | "validee" | "refusee" | "confirmee";
};

export type ReservationSummary = ReservationBase & {
  materiel_list: string;
};

export type ReservationDetail = ReservationBase & {
  user_email: string;
  prix_estime: number;
  reservation_materiels: MaterielReserved[];
};


