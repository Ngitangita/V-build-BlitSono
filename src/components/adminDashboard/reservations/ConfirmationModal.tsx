import type { Reservation } from "../../../types/user";

export default function ConfirmationModal({
  modalAction,
  onConfirm,
  onClose,
}: {
  modalAction: {
    type: 'pending' |'validated' | 'confirmed' | 'cancelled' | 'delete' | null;
    reservation: Reservation | null;
  };
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!modalAction.type || !modalAction.reservation) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {modalAction.type === "cancelled"
            ? "Annuler la réservation"
            : "Confirmer la réservation"}
        </h2>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir{" "}
          <strong>
            {modalAction.type === "cancelled" ? "annuler" : "confirmer"}
          </strong>{" "}
          la réservation de{" "}
          <span className="font-semibold text-gray-900">
            {modalAction.reservation.user?.first_name}
          </span>{" "}
          ?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white transition cursor-pointer ${
              modalAction.type === "cancelled"
                ? "bg-red-600 hover:bg-red-700"
                : "inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
            }`}
          >
            {modalAction.type === "cancelled" ? "Oui, annuler" : "Oui, confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}
