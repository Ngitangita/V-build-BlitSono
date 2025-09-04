import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import type { MaterielsType, Category } from "../../../types/types";
import { useEffect, useState, useRef } from "react";

type Props = {
  materiel: MaterielsType | null;
  onSave: (m: MaterielsType) => void;
  onCancel: () => void;
};

type MaterielFormFields =
  | "nom"
  | "description"
  | "prix_location"
  | "stock_total"
  | "stock_available"
  | "image_url";

export default function MaterielForm({ materiel, onSave, onCancel }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control } = useForm<MaterielsType & { file?: FileList }>({
    defaultValues: materiel ?? {
      id: 0,
      nom: "",
      description: "",
      categorieId: { nom: "" },
      prix_location: 0,
      stock_total: 0,
      stock_available: 0,
      image_url: "",
    },
  });

  useEffect(() => {
    axios
      .get<Category[]>("/api/categories")
      .then((res) => (Array.isArray(res.data) ? setCategories(res.data) : setCategories([])))
      .catch(() => setCategories([]));
  }, []);

  const onSubmit = async (data: MaterielsType & { file?: FileList }) => {
    const form = new FormData();

    // on mappe correctement les champs existants
    const keys: (keyof MaterielsType)[] = [
      "nom",
      "description",
      "prix_location",
      "stock_total",
      "stock_available",
    ];
    keys.forEach((key) => {
      const value = data[key];
      form.append(key, value?.toString() ?? "");
    });

    // catégorie
    form.append("categorieId", data.categorieId?.nom ?? "");

    if (data.file?.[0]) form.append("image", data.file[0]);

    await axios({
      method: materiel?.id ? "put" : "post",
      url: materiel?.id ? `/api/materiels/${materiel.id}` : "/api/materiels",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });

    onSave({ ...data, id: materiel?.id ?? data.id });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onCancel();
  };

  const fields: MaterielFormFields[] = [
    "nom",
    "description",
    "prix_location",
    "stock_total",
    "stock_available",
    "image_url",
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg sm:w-[800px] w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">{materiel ? "Éditer Matériel" : "Ajouter Matériel"}</h2>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 rounded flex flex-row flex-wrap items-center justify-between"
        >
          {fields.map((key) => (
            <div key={key} className="mb-3">
              <label className="block mb-1">{key}</label>
              <input
                {...register(key, key === "prix_location" ||
                key === "stock_total" ||
                key === "stock_available"
                  ? { valueAsNumber: true }
                  : undefined)}
                type={
                  key === "prix_location" ||
                  key === "stock_total" ||
                  key === "stock_available"
                    ? "number"
                    : "text"
                }
                step={key === "prix_location" ? "0.01" : undefined}
                className="w-[400px] sm:w-[350px] p-2 pr-10 border rounded outline-[#18769C] border-[#18769C]/50"
              />
            </div>
          ))}

          <div className="mb-3 w-full sm:w-[350px]">
            <label className="block mb-1">Catégorie</label>
            <Controller
              name="categorieId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={categories}
                  getOptionLabel={(o) => o.name}
                  value={categories.find((c) => c.name === field.value?.nom) ?? null}
                  onChange={(_, v) =>
                    field.onChange(v ? { nom: v.name } : { nom: "" })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </div>

          <div className="mb-3 w-full">
            <label className="block mb-1">Image</label>
            <input
              {...register("file")}
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2 w-full mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
