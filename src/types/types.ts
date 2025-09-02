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
    name: string;
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

