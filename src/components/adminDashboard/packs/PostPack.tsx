import { useForm } from "react-hook-form";
import axiosClient from "../../../conf/axiosClient";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  description?: string;
  daily_price: number;
  is_active: boolean;
}

interface Props {
  onClose: () => void;
  onBundleCreated: () => void;
}

function PostPack({ onClose, onBundleCreated }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      is_active: true, 
    },
  });;

  const onSubmit = async (data: FormData) => {
  try {
    await axiosClient.post("/bundles", data);
    toast.success("Pack créé avec succès !");
    onBundleCreated();
    reset();
    onClose();
  } catch (err) {
    console.error("Erreur création pack:", err);
    toast.error("Erreur lors de la création du pack");
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      
      <div>
        <label htmlFor="name" className="block mb-1">
          Nom du pack
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Le nom est requis" })}
          className={`p-2 w-full border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="p-2 w-full border rounded border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="daily_price" className="block mb-1">
          Prix journalier (Ar)
        </label>
        <input
          id="daily_price"
          type="number"
          {...register("daily_price", {
            required: "Le prix est requis",
            min: { value: 0, message: "Le prix doit être positif" },
          })}
          className={`p-2 w-full border rounded ${
            errors.daily_price ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.daily_price && (
          <p className="text-red-500 text-sm">{errors.daily_price.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_active"
          type="checkbox"
          {...register("is_active")}
          className="w-4 h-4"
          defaultChecked
        />
        <label htmlFor="is_active">Activer le pack</label>
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded 
           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
        >
          Créer
        </button>
      </div>
    </form>
  );
}

export default PostPack;
