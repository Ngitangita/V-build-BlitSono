import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import type { MaterielsType, Category } from "../../../types/types";
import { useEffect, useState, useRef } from "react";
import axiosClient from "./../../../conf/axiosClient";
import { toast } from "react-toastify"; 

type Props = {
  materiel: MaterielsType | null;
  onSave: (m: MaterielsType) => void;
  onCancel: () => void;
};

export default function MaterielForm({ materiel, onSave, onCancel }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control, reset } = useForm<
    MaterielsType & { file?: FileList }
  >({
    defaultValues: {
      id_product: 0,
      name: "",
      description: "",
      daily_price: 0,
      replacement_cost: 0,
      is_active: true,
      category: { id_category: undefined, name: "" },
      created_at: "",
      updated_at: "",
      image_url: "",
      stock_quantity: 0,
    },
  });

  useEffect(() => {
    if (materiel) reset(materiel);
  }, [materiel, reset]);

  useEffect(() => {
    axiosClient
      .get<Category[]>("/categories")
      .then((res) =>
        Array.isArray(res.data) ? setCategories(res.data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  const onSubmit: SubmitHandler<MaterielsType & { file?: FileList }> = async (
    data
  ) => {
    try {
      const res = await axiosClient({
        method: materiel?.id_product ? "put" : "post",
        url: materiel?.id_product
          ? `/products/${materiel.id_product}`
          : "/products",
        data: {
          name: data.name,
          description: data.description,
          daily_price: data.daily_price,
          replacement_cost: data.replacement_cost,
          is_active: data.is_active ? 1 : 0,
          id_category: data.category?.id_category,
          stock_quantity: data.stock_quantity,
        },
      });

      const savedProductId = res.data.id_product ?? res.data.id;
      const productRes = await axiosClient.get(`/products/${savedProductId}`);
      const savedProduct = productRes.data;

      onSave({
        ...savedProduct,
        image_url: savedProduct.image_url ?? "",
        stock_quantity: savedProduct.stock_quantity ?? 0,
      });

      toast.success(
        `Le matériel "${savedProduct.name}" a été ${
          materiel ? "mis à jour" : "créé"
        } avec succès !`
      );
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
      toast.error("Erreur lors de l'enregistrement du matériel");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[700px] 2xl:w-[1000px] max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 sticky top-0 bg-white border-b">
          <h2 className="text-xl">
            {materiel ? "Éditer Matériel" : "Ajouter Matériel"}
          </h2>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col w-full">
            <label className="mb-1">Nom</label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border rounded outline-[#18769C] border-[#18769C]/50"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded outline-[#18769C] border-[#18769C]/50"
              rows={3}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Prix journalier (Ar)</label>
            <input
              {...register("daily_price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full p-2 border rounded outline-[#18769C] border-[#18769C]/50"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Coût de remplacement (Ar)</label>
            <input
              {...register("replacement_cost", { valueAsNumber: true })}
              type="number"
              className="w-full p-2 border rounded outline-[#18769C] border-[#18769C]/50"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">Stock total</label>
            <input
              {...register("stock_quantity", { valueAsNumber: true })}
              type="number"
              className="w-full p-2 border rounded outline-[#18769C] border-[#18769C]/50"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1">Catégorie</label>
            <Controller
              name="category.id_category"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={categories}
                  getOptionLabel={(o) => o.name}
                  value={
                    categories.find((c) => c.id_category === field.value) ?? null
                  }
                  onChange={(_, v) => field.onChange(v ? v.id_category : null)}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Actif"
                />
              )}
            />
          </div>

          <div className="w-full">
            <label className="block mb-1">Image</label>
            <input
              {...register("file")}
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2 w-full mt-4 sticky bottom-0 bg-white p-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded cursor-pointer"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
