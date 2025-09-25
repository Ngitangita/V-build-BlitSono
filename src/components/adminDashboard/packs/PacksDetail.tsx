import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosClient from "../../../conf/axiosClient";
import type { PacksType } from "../../../types/types";

interface PacksDetailProps {
  id: number;          
  onClose: () => void;
}

const PacksDetail = ({ id, onClose }: PacksDetailProps) => {
  const [pack, setPack] = useState<PacksType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const { data } = await axiosClient.get<PacksType>(`/bundles/${id}`);
        setPack(data);
      } catch (err) {
        console.error("Erreur lors du chargement du pack :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPack();
  }, [id]);

  if (loading) return null; 

  if (!pack) return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Pack introuvable</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );

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
        Détails du pack
        <IconButton onClick={onClose} size="small" color="error">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="space-y-3">
        <p><strong>Nom :</strong> {pack.name}</p>
        <p><strong>Description :</strong> {pack.description}</p>
        <p><strong>Prix journalier :</strong> {pack.daily_price.toLocaleString()} Ar</p>
        <p>
          <strong>Statut :</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              pack.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {pack.is_active ? "Actif" : "Inactif"}
          </span>
        </p>
        <p>
          <strong>Créé le :</strong>{" "}
          {pack.created_at
            ? new Date(pack.created_at).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </p>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PacksDetail;
