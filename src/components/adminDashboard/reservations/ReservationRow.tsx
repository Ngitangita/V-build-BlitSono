import {
  FaRegEye,
  FaCalendarCheck,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";
import type { Reservation } from "../../../types/user";
import { convertStatusReservation } from "../../../services/convertStatus";

export default function ReservationRow({
  r,
  openDetail,
  openModal,
  modalAction = { type: null, reservation: null },
  closeModal,
  updateReservation,
}: {
  r: Reservation;
  openDetail: (res: Reservation) => void;
  openModal: (type: "cancel" | "confirm" | "delete", res: Reservation) => void;
  updateReservation: (
    reservation: Reservation,
    type: "confirm" | "cancel" | "delete"
  ) => void;
  modalAction?: {
    type: "cancel" | "confirm" | "delete" | null;
    reservation: Reservation | null;
  };
  closeModal: () => void;
}) {
  const getReservationIcon = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <FaCalendarCheck color="green" />;
      case "cancelled":
        return <MdCancel color="red" />;
      default:
        return <FaCalendarAlt color="#f59e0b" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 even:bg-gray-100">
        <td className="px-4 py-2">{r.user?.first_name}</td>
        <td className="px-4 py-2">
          {r.event_date
            ? new Date(r.event_date).toLocaleDateString("fr-FR")
            : ""}{" "}
          à {r.event_time}
        </td>
        <td className="px-4 py-2">{r.location}</td>
        <td className="px-4 py-2">{r.duration_hours}</td>
        <td className="px-4 py-2 text-left">
          {r.products?.map((p) => (
            <div key={p.id_product}>
              {p.name} × {p.pivot?.quantity ?? 1}
            </div>
          ))}
          {r.bundles?.map((b) => (
            <div key={b.id_bundle}>
              {b.name} × {b.pivot?.quantity ?? 1}
            </div>
          ))}
        </td>
        <td
          className={`px-4 py-2 font-semibold text-center ${getStatusColor(
            r.status
          )}`}
        >
          <div className="flex gap-2 justify-center items-center">
            {getReservationIcon(r.status)}{" "}
            <span>{convertStatusReservation(r.status.toLowerCase())}</span>
          </div>
        </td>
        <td className="px-4 py-2 flex justify-center gap-2">
          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Voir les détails"
            onClick={() => openDetail(r)}
            className="p-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70] transition cursor-pointer"
          >
            <FaRegEye />
          </button>
          {r.status === "pending" && (
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Confirmer"
              onClick={() => openModal("confirm", r)}
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
            >
              <FaCheckCircle />
            </button>
          )}
          {(r.status === "pending" || r.status === "confirmed") && (
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Annuler"
              onClick={() => openModal("cancel", r)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
            >
              <MdCancel />
            </button>
          )}
          {r.status !== "cancelled" && (
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Supprimer"
              onClick={() => openModal("delete", r)}
              className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition cursor-pointer"
            >
              <MdDelete />
            </button>
          )}
        </td>
      </tr>

      {modalAction.type === "delete" && modalAction.reservation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              Confirmer la suppression
            </h3>
            <p className="mb-6">
              Êtes-vous sûr de vouloir supprimer la réservation de{" "}
              <strong>{modalAction.reservation.user?.first_name}</strong> ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  modalAction.reservation &&
                  updateReservation(modalAction.reservation, "delete")
                }
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
