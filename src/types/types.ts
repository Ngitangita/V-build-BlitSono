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
   id: number;
  nom: string;
  categorieId: {
    nom: string;
  };
  image_url: string;
  prix_location: number;
  stock_total: number;
  stock_available: number;
  description: string;
};

export type Category = {
  id: number;
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



