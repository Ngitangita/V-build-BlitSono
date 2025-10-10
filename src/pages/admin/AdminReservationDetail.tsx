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
import type { MaterielsType, PacksType } from "../../types/types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { convertStatusReservation } from "../../services/convertStatus";
dayjs.locale("fr");

type Props = {
  reservation: Reservation;
  products?: MaterielsType[];
  bundles?: PacksType[];
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
    <>
      <title>Gestion des Réservations | BeLoyal</title>
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
            <strong>Statut :</strong>{" "}
            {convertStatusReservation(reservation.status)}
          </p>

          <p>
            <strong>Prix estimé :</strong> {reservation.estimated_price} Ar
          </p>
          <p>
            <strong>Prix final :</strong> {reservation.final_price ?? "-"} Ar
          </p>
          <p>
            <strong>État de la commande :</strong> {reservation.order_state}
          </p>
          <p>
            <strong>Date de réservation :</strong>{" "}
            {dayjs(reservation.reservation_date).format("DD/MM/YYYY HH:mm")}
          </p>

          <p>
            <strong>Jour/Nuit :</strong>{" "}
            {reservation.day_night === "jour" ? "Jour" : "Nuit"}
          </p>

          {reservation.products?.map((p) => (
            <li key={p.id_product}>
              {p.name} — {p.pivot?.quantity ?? 1} unité(s)
            </li>
          ))}

          {reservation.bundles?.map((b) => (
            <li key={b.id_bundle}>
              {b.name} — {b.pivot?.quantity ?? 1} unité(s)
            </li>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
