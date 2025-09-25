import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../conf/axiosClient";
import {
  MdDelete,
  MdVisibility,
  MdCancel,
  MdCheck,
  MdInfoOutline,
} from "react-icons/md";
import type { Reservation } from "../../types/user";
import AdminReservationDetail from "./AdminReservationDetail";
import ReservationFilters from "./../../components/adminDashboard/ReservationFilters";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

type Filter = {
  client: string;
  dateHeure: string;
  lieu: string;
  statut: string;
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [detail, setDetail] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Reservation | null>(null);
  const deleteRef = useRef<HTMLDivElement | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [toCancel, setToCancel] = useState<Reservation | null>(null);
  const cancelRef = useRef<HTMLDivElement | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const [validatingId, setValidatingId] = useState<number | null>(null);

  const [filter, setFilter] = useState<Filter>({
    client: "",
    dateHeure: "",
    lieu: "",
    statut: "",
  });

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get<Reservation[]>("/reservations");
      setReservations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur récupération réservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDeleteOpen(false);
        setIsCancelOpen(false);
        setDetail(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchById = async (id: number) => {
    try {
      const res = await axiosClient.get<Reservation>(`/reservations/${id}`);
      setDetail(res.data);
    } catch (err) {
      console.error("Erreur récupération réservation :", err);
    }
  };

  const openDeleteModal = (reservation: Reservation) => {
    setToDelete(reservation);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await axiosClient.delete(`/reservations/${toDelete.id_reservation}`);
      setReservations((prev) =>
        prev.filter((r) => r.id_reservation !== toDelete.id_reservation)
      );
    } catch (err) {
      console.error("Erreur suppression:", err);
    } finally {
      setDeleting(false);
      setIsDeleteOpen(false);
      setToDelete(null);
    }
  };

  const handleCancelClick = (reservation: Reservation) => {
    setToCancel(reservation);
    setIsCancelOpen(true);
  };

  const confirmCancel = async () => {
    if (!toCancel) return;
    setCancelling(true);
    try {
      const res = await axiosClient.patch(
        `/reservations/${toCancel.id_reservation}`,
        { status: "cancelled" }
      );
      const updated = res.data.reservation ?? res.data;
      setReservations((prev) =>
        prev.map((r) =>
          r.id_reservation === toCancel.id_reservation ? updated : r
        )
      );
    } catch (err) {
      console.error("Erreur annulation:", err);
    } finally {
      setCancelling(false);
      setIsCancelOpen(false);
      setToCancel(null);
    }
  };

  const handleValidate = async (reservation: Reservation) => {
    setValidatingId(reservation.id_reservation);
    try {
      const res = await axiosClient.patch(
        `/reservations/${reservation.id_reservation}`,
        { status: "validated" }
      );
      const updated = res.data.reservation ?? res.data;
      setReservations((prev) =>
        prev.map((r) =>
          r.id_reservation === reservation.id_reservation ? updated : r
        )
      );
    } catch (err) {
      console.error("Erreur validation:", err);
    } finally {
      setValidatingId(null);
    }
  };

  const filteredReservations = reservations.filter((r) => {
    const client = (r.user?.first_name || "").toLowerCase();
    const dateHeure = new Date(
      `${r.event_date}T${r.event_time}`
    )
      .toLocaleString("fr-FR")
      .toLowerCase();
    const lieu = r.location ? r.location.toLowerCase() : "";

    return (
      client.includes(filter.client.toLowerCase()) &&
      dateHeure.includes(filter.dateHeure.toLowerCase()) &&
      lieu.includes(filter.lieu.toLowerCase()) &&
      (filter.statut === "" || r.status === filter.statut)
    );
  });

  function handleOverlayClick(
  e: React.MouseEvent<HTMLDivElement>,
  ref: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) {
  if (ref.current && e.target === ref.current) {
    onClose();
  }
}


  const commonSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
    "& .MuiInputLabel-root": { fontSize: "0.85rem" },
  };

  const combineEventDateTime = (eventDate: string, eventTime: string) => {
    const [hour, minute, second] = eventTime.split(":").map(Number);
    return dayjs(eventDate).hour(hour).minute(minute).second(second);
  };

  return (
    <div className="p-4 pt-14">
      <title>Gestion des Réservations | BlitSono</title>

      <ReservationFilters
        filter={filter}
        setFilter={setFilter}
        commonSX={commonSX}
      />

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Lieu</th>
              <th className="px-4 py-2">Jour/Nuit</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  <MdInfoOutline className="text-4xl text-gray-400 mx-auto mb-2" />
                  {loading ? "Chargement..." : "Aucune réservation trouvée"}
                </td>
              </tr>
            ) : (
              filteredReservations.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-2">
                    {combineEventDateTime(r.event_date, r.event_time).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {r.user?.first_name}
                  </td>                  
                  <td className="px-4 py-2">{r.location}</td>
                  <td className="px-4 py-2">
                    {r.day_night === "jour" ? "Jour" : "Nuit"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        r.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : r.status === "validated"
                          ? "bg-blue-100 text-blue-800"
                          : r.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() =>
                        r.id_reservation !== undefined &&
                        fetchById(r.id_reservation)
                      }
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded cursor-pointer"
                    >
                      <MdVisibility />
                    </button>

                    {r.status !== "cancelled" && (
                      <>
                        <button
                          onClick={() => handleValidate(r)}
                          disabled={validatingId === r.id_reservation}
                          className={`px-2 py-1 rounded cursor-pointer ${
                            validatingId === r.id_reservation
                              ? "bg-blue-300"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          <MdCheck />
                        </button>
                        <button
                          onClick={() => handleCancelClick(r)}
                          className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer"
                        >
                          <MdCancel />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => openDeleteModal(r)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isDeleteOpen && toDelete && (
        <div
          ref={deleteRef}
          onClick={(e) =>
           handleOverlayClick(e, deleteRef, () => setIsDeleteOpen(false))            
          }
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
            <p className="mb-6">
              Voulez-vous vraiment supprimer la réservation de{" "}
              <strong>
                {toDelete.user?.first_name}
              </strong>{" "}
              ?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                disabled={deleting}
              >
                Non
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 rounded text-white ${
                  deleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={deleting}
              >
                {deleting ? "Suppression..." : "Oui"}
              </button>
            </div>
          </div>
        </div>
      )}

      {detail && (
        <AdminReservationDetail
          reservation={detail}
          onClose={() => setDetail(null)}
        />
      )}

      {isCancelOpen && toCancel && (
        <div
          ref={cancelRef}
          onClick={(e) =>
            handleOverlayClick(e, cancelRef, () => setIsCancelOpen(false))
          }
          className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
            <p className="mb-6">
              Voulez-vous vraiment{" "}
              <strong className="text-red-500">annuler</strong> la réservation
              de{" "}
              <strong>
                {toCancel.user?.first_name}
              </strong>{" "}
              ?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsCancelOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                disabled={cancelling}
              >
                Non
              </button>
              <button
                onClick={confirmCancel}
                className={`px-4 py-2 rounded text-white ${
                  cancelling
                    ? "bg-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                disabled={cancelling}
              >
                {cancelling ? "Annulation..." : "Oui"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
