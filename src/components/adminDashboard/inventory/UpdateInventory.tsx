import { useState } from "react";
import axiosClient from "../../../conf/axiosClient";
import { toast } from "react-toastify";
import type { Inventory } from "../../../types/types";

interface Props {
  inventory: Inventory;
  onClose: () => void;
  onInventoryUpdated: () => Promise<void>;
}

function UpdateInventory({ inventory, onClose, onInventoryUpdated }: Props) {
  const [updatedInventory, setUpdatedInventory] = useState(inventory);

  const handleSave = async () => {
    try {
      await axiosClient.put(`/inventory/${updatedInventory.id_inventory}`, updatedInventory);
      toast.success("✅ Inventaire mis à jour avec succès !");
      await onInventoryUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de la mise à jour de l’inventaire");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#18769C] mb-2">
        Modifier l’inventaire
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Numéro de série</label>
        <input
          type="text"
          value={updatedInventory.serial_number}
          onChange={(e) =>
            setUpdatedInventory({ ...updatedInventory, serial_number: e.target.value })
          }
          className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-[#18769C] outline-none"
        />

        <label className="text-sm font-medium">État</label>
        <input
          type="text"
          value={updatedInventory.condition}
          onChange={(e) =>
            setUpdatedInventory({ ...updatedInventory, condition: e.target.value })
          }
          className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-[#18769C] outline-none"
        />

        <label className="text-sm font-medium">Date d’achat</label>
        <input
          type="date"
          value={updatedInventory.purchase_date}
          onChange={(e) =>
            setUpdatedInventory({ ...updatedInventory, purchase_date: e.target.value })
          }
          className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-[#18769C] outline-none"
        />

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={updatedInventory.is_available}
            onChange={(e) =>
              setUpdatedInventory({
                ...updatedInventory,
                is_available: e.target.checked,
              })
            }
          />
          Disponible
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          className="bg-[#18769C] text-white px-4 py-2 rounded-lg hover:bg-[#0f5a70] transition"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default UpdateInventory;
