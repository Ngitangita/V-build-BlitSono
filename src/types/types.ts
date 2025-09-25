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
   pivot?: {
    quantity?: number;
    price?: number;
  };
};


export type Category = {
  id_category: number;
  name: string;
};

export type PacksType = {
  id_bundle: number,
  name: string;
  description?: string; 
  daily_price: number;
  is_active: boolean;
  created_at: string; 
  pivot?: { quantity?: number; price?: number };
}

export type BundleProductType = {
  id_bundle: number;      
  id_product: number;     
  quantity: number;       
};


export type BundleProductTypes = {
  bundle: PacksType;       
  product: MaterielsType;  
  quantity: number;
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


export type PackItemsType = {
  id: number;
  packId: PacksType;
  productId: MaterielsType;
  quantite: number;
};
