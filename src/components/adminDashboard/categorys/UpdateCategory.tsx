import type { Category } from "../../../types/types";

interface Props {
  categoryToEdit: Category;
  setCategoryToEdit: (cat: Category) => void;
  onSave: () => void;
  onCancel: () => void;
}

function UpdateCategory({ categoryToEdit, setCategoryToEdit, onSave, onCancel }: Props) {
  return (
    <div className="p-6">
      <input
        type="text"
        value={categoryToEdit.name}
        onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
        className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none
         focus:border-[#18769C]"
      />
      <div className="flex justify-between">
        <button onClick={onCancel} 
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer">Annuler</button>
        <button onClick={onSave} 
        className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded 
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
          >Sauvegarder</button>
      </div>
    </div>
  );
}

export default UpdateCategory;
