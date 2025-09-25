import type { PacksType } from "../../../types/types";

interface Props {
  packToEdit: PacksType;
  setPackToEdit: (pack: PacksType) => void;
  onSave: () => void;
  onCancel: () => void;
}

function UpdatePack({ packToEdit, setPackToEdit, onSave, onCancel }: Props) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <input
        type="text"
        value={packToEdit.name}
        onChange={(e) =>
          setPackToEdit({ ...packToEdit, name: e.target.value })
        }
        placeholder="Nom du pack"
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[#18769C]"
      />

      <textarea
        value={packToEdit.description ?? ""}
        onChange={(e) =>
          setPackToEdit({ ...packToEdit, description: e.target.value })
        }
        placeholder="Description"
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[#18769C]"
      />

      <input
        type="number"
        value={packToEdit.daily_price}
        onChange={(e) =>
          setPackToEdit({
            ...packToEdit,
            daily_price: Number(e.target.value),
          })
        }
        placeholder="Prix journalier"
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[#18769C]"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={packToEdit.is_active}
          onChange={(e) =>
            setPackToEdit({ ...packToEdit, is_active: e.target.checked })
          }
          className="w-4 h-4"
        />
        <label>Activer le pack</label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
        >
          Annuler
        </button>
        <button
          onClick={onSave}
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded 
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default UpdatePack;
