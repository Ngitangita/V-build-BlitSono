import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { MaterielsType } from "../../../types/types";

interface MaterielDetailProps {
  materiel: MaterielsType;
  onClose: () => void;
}

const MaterielDetail = ({ materiel, onClose }: MaterielDetailProps) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      BackdropProps={{
        sx: { backgroundColor: "rgba(30,41,57,0.8)" },
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        Détails du matériel
        <IconButton onClick={onClose} size="small" color="error">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <p>
           <p>
          <strong>Catégorie :</strong> {materiel.category?.name ?? "Aucune"}
        </p>
          <strong>Crée le :</strong>{" "}
          {materiel.created_at
            ? new Date(materiel.created_at)
                .toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(",", "")
            : ""}
        </p>
        <p>
          <strong>Statut :</strong>{" "}
          <span
            className={`px-2 py-1 rounded cursor-pointer transition-colors duration-200 ${
              materiel.is_active
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
          >
            {materiel.is_active ? "Actif" : "Inactif"}
          </span>
        </p>
        <p>
          <strong>Nom :</strong> {materiel.name}
        </p>
        <p>
          <strong>Prix :</strong> {materiel.daily_price.toLocaleString()} Ar
        </p>
        <p>
          <strong>Coût de rempl :</strong>{" "}
        {materiel.replacement_cost != null ? materiel.replacement_cost.toLocaleString() : ""} Ar
        </p>
        <p>
          <strong>Stock total :</strong> {materiel.stock_total}
        </p>
        <p>
          <strong>Stock disponible :</strong> {materiel.stock_available}
        </p>
        <p>
          <strong>Description :</strong> {materiel.description}
        </p>
        {materiel.image_url && (
          <img
            src={materiel.image_url}
            alt={materiel.name}
            className="w-full h-auto rounded mt-2"
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterielDetail;
