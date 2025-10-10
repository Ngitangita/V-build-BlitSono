export const reservationStatus = [
  { value: "Tous statuts", label: "Tous statuts" },
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Validée" },
  { value: "rejected", label: "Refusée" },
] as const;

export type ReservationStatus = typeof reservationStatus[number]["value"];
