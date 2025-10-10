import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../conf/axiosClient";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { MaterielsType } from "../../../types/types";

interface FormData {
  id_product: number | null;
  serial_number: string;
  condition: string;
  purchase_date: string;
  is_available: boolean;
}

interface Props {
  products: MaterielsType[];
  onClose: () => void;
  onInventoryCreated: () => void;
}


function PostInventory({ products, onClose, onInventoryCreated }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id_product: null,
      serial_number: "",
      condition: "",
      purchase_date: "",
      is_available: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.id_product) return;
      await axiosClient.post("/inventory", data);
      onInventoryCreated();
      onClose();
    } catch (err) {
      console.error("Erreur création inventaire:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      <div className="w-full">
        <label className="block mb-1">Produit</label>
        <Controller
          name="id_product"
          control={control}
          rules={{ required: "Le produit est requis" }}
          render={({ field }) => (
            <Autocomplete
              options={products}
              getOptionLabel={(o) => o.name}
              value={products.find((p) => p.id_product === field.value) ?? null}
              onChange={(_, v) => field.onChange(v ? v.id_product : null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.id_product}
                  helperText={errors.id_product?.message}
                />
              )}
            />
          )}
        />
      </div>

      <div>
        <label>Numéro de série</label>
        <input
          type="text"
          {...register("serial_number", {
            required: "Le numéro de série est requis",
          })}
          className="p-2 border rounded w-full"
        />
        {errors.serial_number && (
          <p className="text-red-500 text-sm">{errors.serial_number.message}</p>
        )}
      </div>

      <div>
        <label>État</label>
        <input
          type="text"
          {...register("condition", { required: "L'état est requis" })}
          className="p-2 border rounded w-full"
        />
        {errors.condition && (
          <p className="text-red-500 text-sm">{errors.condition.message}</p>
        )}
      </div>

      <div>
        <label>Date d’achat</label>
        <input
          type="date"
          {...register("purchase_date", {
            required: "La date d'achat est requise",
          })}
          className="p-2 border rounded w-full"
        />
        {errors.purchase_date && (
          <p className="text-red-500 text-sm">{errors.purchase_date.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("is_available")} /> Disponible
        </label>
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
          className="px-4 py-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70] cursor-pointer"
        >
          Créer
        </button>
      </div>
    </form>
  );
}

export default PostInventory;
