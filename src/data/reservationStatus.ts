export const reservationStatus = [
  { value: "Tous statuts", label: "Tous statuts" },
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Validée" },
  { value: "cancelled", label: "Refusée" },
] as const;

export type ReservationStatus = typeof reservationStatus[number]["value"];
