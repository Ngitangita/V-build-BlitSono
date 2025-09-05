export const reservationStatus = [
  { value: "", label: "Tous statuts" },
  { value: "en_attente", label: "En attente" },
  { value: "validee", label: "Validée" },
  { value: "refusee", label: "Refusée" },
] as const;

export type ReservationStatus = typeof reservationStatus[number]["value"];
