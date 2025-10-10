import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../conf/axiosClient";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { BundleProductTypes } from "../../../types/types";

interface FormData {
  id_bundle: number | null;
  id_product: number | null;
  quantity: number;
}

interface Props {
  bundles: { id_bundle: number; name: string }[];
  products: { id_product: number; name: string }[];
  onClose: () => void;
  onBundleProductCreated: (newBundleProduct: BundleProductTypes) => void;
}

function PostBundleProduct({ bundles, products, onClose, onBundleProductCreated }: Props) {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { id_bundle: null, id_product: null, quantity: 1 },
  });

  const onSubmit = async (data: FormData) => {
  try {
    if (!data.id_bundle || !data.id_product) return;

    const response = await axiosClient.post("/bundle-products", data);
    
    const newBundleProduct: BundleProductTypes = response.data;
    onBundleProductCreated(newBundleProduct);
    onClose();
  } catch (err) {
    console.error("Erreur ajout produit au pack:", err);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      <div className="w-full">
        <label className="block mb-1">Pack</label>
        <Controller
          name="id_bundle"
          control={control}
          rules={{ required: "Le pack est requis" }}
          render={({ field }) => (
            <Autocomplete
              options={bundles}
              getOptionLabel={(o) => o.name}
              value={bundles.find((b) => b.id_bundle === field.value) ?? null}
              onChange={(_, v) => field.onChange(v ? v.id_bundle : null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.id_bundle}
                  helperText={errors.id_bundle?.message}
                />
              )}
            />
          )}
        />
      </div>

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
        <label>Quantité</label>
        <input
          type="number"
          {...register("quantity", { required: "La quantité est requise", min: 1 })}
          className="p-2 border rounded w-full"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
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
          Ajouter au Pack
        </button>
      </div>
    </form>
  );
}

export default PostBundleProduct;
