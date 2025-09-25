import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Reservation } from "../../types/user";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

type Props = {
  reservation: Reservation;
  onClose: () => void;
};

export default function AdminReservationDetail({
  reservation,
  onClose,
}: Props) {
  const combineEventDateTime = (eventDate: string, eventTime: string) => {
    const [hour, minute, second] = eventTime.split(":").map(Number);
    return dayjs(eventDate).hour(hour).minute(minute).second(second);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      BackdropProps={{ sx: { backgroundColor: "rgba(30,41,57,0.8)" } }}
    >
      <DialogTitle className="flex justify-between items-center">
        Détails Réservation
        <IconButton onClick={onClose} size="small" color="error">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <p>
          <strong>Client :</strong> {reservation.user?.first_name}
        </p>
        <p>
          <strong>Date :</strong>
          {combineEventDateTime(
            reservation.event_date,
            reservation.event_time
          ).format("DD/MM/YYYY HH:mm")}
        </p>
        <p>
          <strong>Durée :</strong> {reservation.duration_hours} h
        </p>
        <p>
          <strong>Lieu :</strong> {reservation.location}
        </p>
        <p>
          <strong>Statut :</strong> {reservation.status}
        </p>
        <p>
          <strong>Jour/Nuit :</strong>{" "}
          {reservation.day_night === "jour" ? "Jour" : "Nuit"}
        </p>

        {reservation.products && reservation.products.length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">Produits :</h3>
            <ul className="list-disc ml-6">
              {reservation.products.map((p) => (
                <li key={p.id_product}>
                  {p.name} — {p.pivot?.quantity || 1} unité(s)
                </li>
              ))}
            </ul>
          </div>
        )}

        {(reservation.bundles ?? []).length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">Bundles :</h3>
            <ul className="list-disc ml-6">
              {(reservation.bundles ?? []).map((b) => (
                <li key={b.id_bundle}>
                  {b.name} — {b.pivot?.quantity || 1} unité(s)
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
