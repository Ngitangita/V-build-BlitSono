import React, { useRef } from "react";
import useReservations from "../../hooks/useReservations";
import ReservationRow from "../../components/adminDashboard/reservations/ReservationRow";
import ConfirmationModal from "../../components/adminDashboard/reservations/ConfirmationModal";
import ReservationFilters from "../../components/adminDashboard/reservations/ReservationFilters";
import { Tooltip } from "react-tooltip";
import ReservationDetail from "./AdminReservationDetail";

export default function AdminReservations() {
  const {
    reservations,
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
  } = useReservations();

  const detailRef = useRef<HTMLDivElement | null>(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === detailRef.current) closeDetail();
  };

  const confirmationModalAction = {
          type: modalAction?.type as
            | "pending"
            | "validated"
            | "confirmed"
            | "cancelled"
            | "delete"
            | null,
          reservation: modalAction?.reservation ?? null,
        };

  return (
    <div className="p-4 pt-14 bg-gray-50 min-h-screen">
      <title>Réservations | BeLoyal</title>

      <div className="flex flex-wrap gap-2 bg-white border border-gray-100 p-4 rounded shadow-sm">
        <ReservationFilters filter={filters} setFilter={setFilters} />
      </div>

      <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-sm sm:text-base text-gray-700">
              <th className="py-3 px-4 text-left">Client</th>
              <th className="py-3 px-4 text-left">Date/Heure</th>
              <th className="py-3 px-4 text-left">Lieu</th>
              <th className="py-3 px-4 text-left">Durée (h)</th>
              <th className="py-3 px-4 text-left">Produits / Bundles</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length ? (
              reservations.map((r) => (
                <ReservationRow
                  key={r.id_reservation}
                  r={r}
                  openDetail={openDetail}
                  openModal={openModal}
                  updateReservation={updateReservation}
                  closeModal={closeModal}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-gray-500 italic"
                >
                  Aucune réservation trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Tooltip
        id="tooltip"
        className="z-50 text-sm bg-gray-800 text-white p-2 rounded"
      />

      <ConfirmationModal
        modalAction={confirmationModalAction}
        onConfirm={() =>
          confirmationModalAction.reservation &&
          updateReservation(
            confirmationModalAction.type!,
            confirmationModalAction.reservation
          )
        }
        onClose={closeModal}
      />

      {selectedReservation && (
        <div
          ref={detailRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
            <ReservationDetail
              reservation={selectedReservation}
              products={products}
              bundles={bundles}
              onClose={closeDetail}
            />
          </div>
        </div>
      )}
    </div>
  );
}
