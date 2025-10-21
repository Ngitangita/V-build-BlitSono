import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { convertStatusReservation } from "../../services/convertStatus";
import type { Reservation } from "../../types/user";
import type { MaterielsType, PacksType} from "../../types/types";

dayjs.locale("fr");

type Props = {
  reservation: Reservation;
  products: MaterielsType[];
  bundles: PacksType[];
  onClose: () => void;
};


export default function AdminReservationDetail({ reservation, onClose }: Props) {
  const formatDateTime = (date: string, time?: string) => {
    const d = dayjs(date);
    if (time) {
      const [hour, minute, second] = time.split(":").map(Number);
      return d.hour(hour).minute(minute).second(second);
    }
    return d;
  };

  const hasProducts = reservation.products && reservation.products.length > 0;
  const hasBundles = reservation.bundles && reservation.bundles.length > 0;

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
        
        <DialogTitle className="flex justify-between items-center border-b pb-2">
          <Typography variant="h6" className="font-semibold">
            Détails de la Réservation
          </Typography>
          <IconButton onClick={onClose} size="small" color="error">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 text-sm sm:text-base lg:text-lg">
         
            <div>
              <h2 className="font-semibold mb-2">Informations Générales</h2>
              <p>Client : {reservation.user?.first_name}</p>
              <p>
                Date de réservation :{" "}
                {dayjs(reservation.reservation_date).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>Statut : {convertStatusReservation(reservation.status)}</p>
              <p>État de la commande : {reservation.order_state}</p>
              <p>
                Jour/Nuit :{" "}
                {reservation.day_night === "jour" ? "Jour" : "Nuit"}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">
                Informations sur l'Événement
              </h2>
              <p>
                Date :{" "}
                {formatDateTime(
                  reservation.event_date,
                  reservation.event_time
                ).format("DD/MM/YYYY")}
              </p>
              <p>
                Heure :{" "}
                {formatDateTime(
                  reservation.event_date,
                  reservation.event_time
                ).format("HH:mm")}
              </p>
              <p>Durée : {reservation.duration_hours} h</p>
              <p>Lieu : {reservation.location}</p>
              <p>
                Prix estimé : {reservation.estimated_price?.toLocaleString()} Ar
              </p>
              <p>
                Prix final :{" "}
                {reservation.final_price
                  ? `${reservation.final_price.toLocaleString()} Ar`
                  : "-"}
              </p>
            </div>
          </div>

          <Divider className="my-4" />

          {hasProducts && !hasBundles && (
            <div className="overflow-x-auto mb-6">
              <h2 className="font-semibold mb-2 text-base sm:text-lg">
                Produits Réservés
              </h2>
              <table className="w-full table-auto text-xs sm:text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    {["Matériel", "Quantité"].map((h) => (
                      <th
                        key={h}
                        className="p-2 sm:p-3 md:p-4 text-left whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservation.products?.map((p) => (
                    <tr key={p.id_product} className="even:bg-gray-50">
                      <td className="p-2 sm:p-3 md:p-4">{p.name}</td>
                      <td className="p-2 sm:p-3 md:p-4">
                        {p.pivot?.quantity ?? 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {hasBundles && !hasProducts && (
            <div className="overflow-x-auto">
              <h2 className="font-semibold mb-2 text-base sm:text-lg">
                Packs Réservés
              </h2>
              <table className="w-full table-auto text-xs sm:text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    {["Pack", "Quantité"].map((h) => (
                      <th
                        key={h}
                        className="p-2 sm:p-3 md:p-4 text-left whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservation.bundles?.map((b) => (
                    <tr key={b.id_bundle} className="even:bg-gray-50">
                      <td className="p-2 sm:p-3 md:p-4">{b.name}</td>
                      <td className="p-2 sm:p-3 md:p-4">
                        {b.pivot?.quantity ?? 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>

        <DialogActions className="px-4 py-3">
          <Button onClick={onClose} variant="contained" color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
