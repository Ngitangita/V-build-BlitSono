import { useState, useEffect } from "react";
import axiosClient from "../conf/axiosClient";
import { toast } from "react-toastify";
import type { Reservation } from "../types/user";
import type { MaterielsType, PacksType } from "../types/types";

type ModalAction = {
  type: "pending" | "validated" | "confirmed" | "cancelled" | "delete" | null;
  reservation: Reservation | null;
};

export default function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [products, setProducts] = useState<MaterielsType[]>([]);
  const [bundles, setBundles] = useState<PacksType[]>([]);
  const [filters, setFilters] = useState({
    client: "",
    date: "",
    heure: "",
    lieu: "",
    statut: "",
    duree: "",
  });
  const [modalAction, setModalAction] = useState<ModalAction>({
    type: null,
    reservation: null,
  });
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const fetchData = async <T>(
    url: string,
    setter: (data: T[]) => void,
    errorMsg: string
  ) => {
    try {
      const { data } = await axiosClient.get<T[]>(url);
      setter(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const fetchAll = () => {
    fetchData(
      "/reservations",
      setReservations,
      "Erreur lors du chargement des réservations"
    );
    fetchData(
      "/products",
      setProducts,
      "Erreur lors du chargement des produits"
    );
    fetchData("/bundles", setBundles, "Erreur lors du chargement des bundles");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredReservations = reservations.filter((r) => {
    const matchClient = r.user?.first_name
      ?.toLowerCase()
      .includes(filters.client.toLowerCase());
    const matchLieu = filters.lieu
      ? r.location?.toLowerCase().includes(filters.lieu.toLowerCase())
      : true;
    const matchStatut =
      !filters.statut || filters.statut === "Tous statuts"
        ? true
        : r.status === filters.statut;
    const matchDate = filters.date
      ? new Date(r.event_date).toISOString().slice(0, 10) === filters.date
      : true;
    const matchHeure = filters.heure
      ? r.event_time?.slice(0, 5) === filters.heure
      : true;
    const matchDuree = filters.duree
      ? r.duration_hours === Number(filters.duree)
      : true;
    return (
      matchClient &&
      matchLieu &&
      matchStatut &&
      matchDate &&
      matchHeure &&
      matchDuree
    );
  });

  const openModal = (
    type: "pending" | "validated" | "confirmed" | "cancelled" | "delete",
    reservation: Reservation
  ) => {
    setModalAction({ type, reservation });
  };

  const closeModal = () => setModalAction({ type: null, reservation: null });
  const openDetail = (reservation: Reservation) =>
    setSelectedReservation(reservation);
  const closeDetail = () => setSelectedReservation(null);

  const updateReservation = async (
    type: "pending" | "validated" | "confirmed" | "cancelled" | "delete",
    reservation: Reservation
  ) => {
    try {
      closeModal();
      console.log(type);

      if (type === "delete") {
        await axiosClient.delete(`/reservations/${reservation.id_reservation}`);
        toast.success("Réservation supprimée avec succès");
      } else {
        await axiosClient.patch(`/reservations/${reservation.id_reservation}`, {
          status: type,
        });
        toast.success(
          `Réservation ${
            type === "confirmed" ? "confirmée" : "annulée"
          } avec succès`
        );
      }

      fetchAll();
    } catch (err) {
      toast.error("Erreur lors de l'action");
      console.error(err);
    }
  };

  return {
    reservations: filteredReservations,
    products,
    bundles,
    filters,
    setFilters,
    modalAction,
    openModal,
    closeModal,
    selectedReservation,
    openDetail,
    closeDetail,
    updateReservation,
  };
}
