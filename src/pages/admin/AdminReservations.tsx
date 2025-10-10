import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaRegEye, FaCalendarCheck, FaCalendarAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import type { Reservation } from "../../types/user";
import type { MaterielsType, PacksType } from "../../types/types";
import ReservationDetail from "./AdminReservationDetail";
import { convertStatusReservation } from "../../services/convertStatus";

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [products, setProducts] = useState<MaterielsType[]>([]);
  const [bundles, setBundles] = useState<PacksType[]>([]);
  const [filters, setFilters] = useState({
    client: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const fetchReservations = async () => {
    try {
      const { data } = await axiosClient.get<Reservation[]>("/reservations");
      setReservations(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement des réservations");
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axiosClient.get<MaterielsType[]>("/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement des produits");
      console.error(err);
    }
  };

  const fetchBundles = async () => {
    try {
      const { data } = await axiosClient.get<PacksType[]>("/bundles");
      setBundles(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement des bundles");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchProducts();
    fetchBundles();
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    close: () => void
  ) => {
    if (e.target === ref.current) close();
  };

  const filteredReservations = reservations.filter((r) => {
    const matchClient = r.user?.first_name
      .toLowerCase()
      .includes(filters.client.toLowerCase());
    const matchStatus = filters.status ? r.status === filters.status : true;
    const matchStart = filters.startDate
      ? r.event_date >= filters.startDate
      : true;
    const matchEnd = filters.endDate ? r.event_date <= filters.endDate : true;
    return matchClient && matchStatus && matchStart && matchEnd;
  });

  const openDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailOpen(true);
  };

  const cancelReservation = async (reservation: Reservation) => {
    try {
      await axiosClient.put(
        `/reservations/${reservation.id_reservation}/cancel`
      );
      toast.success("Réservation annulée avec succès");
      fetchReservations();
    } catch (err) {
      toast.error("Erreur lors de l'annulation");
      console.error(err);
    }
  };

  const getReservationIcon = (status: Reservation["status"]) =>
    status === "confirmed" ? (
      <FaCalendarCheck color="green" />
    ) : (
      <FaCalendarAlt color="#f59e0b" />
    );

  return (
    <div className="p-4 pt-14">
      <title>Réservations | BeLoyal</title>

      <div className="container border border-gray-50 flex flex-row flex-wrap items-start gap-2 mb-4 bg-white p-6 rounded">
        <input
          type="text"
          placeholder="Rechercher par client"
          className="border px-2 py-1 rounded"
          value={filters.client}
          onChange={(e) => setFilters({ ...filters, client: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous les statuts</option>
          <option value="confirmed">Confirmée</option>
          <option value="pending">En attente</option>
          <option value="cancelled">Annulée</option>
        </select>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="border px-2 py-1 rounded"
        />
      </div>

      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Client</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Heure</th>
            <th className="py-2 px-4">Durée (h)</th>
            <th className="py-2 px-4">Produits/Bundles</th>
            <th className="py-2 px-4">Statut</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((r) => (
              <tr
                key={r.id_reservation}
                className="text-center hover:bg-gray-100 even:bg-gray-50"
              >
                <td>{r.user?.first_name}</td>
                <td>{r.event_date}</td>
                <td>{r.event_time}</td>
                <td>{r.duration_hours}</td>
                <td className="text-left">
                  {r.products?.map((p) => (
                    <span key={p.id_product}>
                      {p.name} x {p.pivot?.quantity ?? 1}
                    </span>
                  ))}

                  {r.bundles?.map((b) => (
                    <span key={b.id_bundle}>
                      {b.name} x {b.pivot?.quantity ?? 1}
                    </span>
                  ))}
                </td>
                <td
                  className={`px-4 py-2 font-semibold flex flex-row items-center ${
                    r.status === "confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {getReservationIcon(r.status)}
                  <span className="ml-1">
                    {convertStatusReservation(r.status.toLowerCase())}
                  </span>
                </td>
                <td className="flex justify-center gap-2 py-3">
                  <button
                    onClick={() => openDetail(r)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FaRegEye />
                  </button>
                  {r.status !== "cancelled" && (
                    <button
                      onClick={() => cancelReservation(r)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <MdCancel />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                Aucune réservation trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isDetailOpen && selectedReservation && (
        <div
          ref={detailRef}
          onClick={(e) =>
            handleOverlayClick(e, detailRef, () => setIsDetailOpen(false))
          }
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[600px]">
            <ReservationDetail
              reservation={selectedReservation}
              products={products}
              bundles={bundles}
              onClose={() => setIsDetailOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
