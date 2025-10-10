export const convertStatusReservation = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'En attente',
    validee: 'Validée',
    refusee: 'Refusée',
  };

  return statusMap[status.toLowerCase()] || 'Statut inconnu';
};