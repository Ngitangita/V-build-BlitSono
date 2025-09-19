import { useForm } from "react-hook-form";
import axiosClient from "../../../conf/axiosClient";

interface FormData {
  name: string;
}

interface Props {
  onClose: () => void;
  onCategoryCreated: () => void;
}

function PostCategory({ onClose, onCategoryCreated }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axiosClient.post("/categories", data);
      onCategoryCreated();
      onClose();
    } catch (err) {
      console.error("Erreur création catégorie:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block mb-1">Nom de la catégorie</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Le nom est requis" })}
          className={`p-2 w-full border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="flex justify-between gap-4">
        <button type="button" onClick={onClose} 
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer">Annuler</button>
        <button type="submit" 
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded 
           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
          >
          Créer</button>
      </div>
    </form>
  );
}

export default PostCategory;
