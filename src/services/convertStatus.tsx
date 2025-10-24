export const convertStatusReservation = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "En attente",
    confirmed: "Validée",
    cancelled: "Refusée",
  };

  return statusMap[status.toLowerCase()] || "Statut inconnu";
};
