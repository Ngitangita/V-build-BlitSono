export type CartItem = {
  id: number;
  name: string;
  type: "materiel" | "pack";
  quantity: number;
  price: number;
  image_url?: string;
}

export type BasketItem = {
  name: string;
  availableQty: number;
};

