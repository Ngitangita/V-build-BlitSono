import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { BundleProductTypes } from "../../../types/types";

interface BundleProductDetailProps {
  item: BundleProductTypes;
  onClose: () => void;
}

const BundleProductDetail = ({ item, onClose }: BundleProductDetailProps) => {
  const { product, quantity, bundle } = item;

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
        Détails du produit dans {bundle.name}
        <IconButton onClick={onClose} size="small" color="error">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <p>
          <strong>Nom :</strong> {product.name}
        </p>
        <p>
          <strong>Catégorie :</strong> {product.category?.name ?? "Aucune"}
        </p>
        <p>
          <strong>Quantité dans le pack :</strong> {quantity}
        </p>
        <p>
          <strong>Prix locatif :</strong> {product.daily_price.toLocaleString()} Ar
        </p>
        <p>
          <strong>Coût de remplacement :</strong>{" "}
          {product.replacement_cost != null ? product.replacement_cost.toLocaleString() : "-"} Ar
        </p>
        <p>
          <strong>Stock total :</strong> {product.stock_total}
        </p>
        <p>
          <strong>Stock disponible :</strong> {product.stock_available}
        </p>
        <p>
          <strong>Description :</strong> {product.description}
        </p>
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
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

export default BundleProductDetail;
