import { useEffect, useState } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import MaterielForm from "../../components/adminDashboard/catalogues/MaterielForm";
import DeleteConfirm from "../../components/adminDashboard/catalogues/DeleteConfirm";
import type { MaterielsType } from "../../types/types";
import MaterielSearch from "../../components/adminDashboard/catalogues/MaterielSearch";

function AdminCatalogues() {
  const [materiels, setMateriels] = useState<MaterielsType[]>([]);
  const [current, setCurrent] = useState<MaterielsType | null>(null);
  const [deleting, setDeleting] = useState<MaterielsType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchPrix, setSearchPrix] = useState("");
  const [searchStockTotal, setSearchStockTotal] = useState("");
  const [searchStockAvailable, setSearchStockAvailable] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/api/materiels");
      const d = res.data;
      let arr: MaterielsType[] = [];
      if (Array.isArray(d)) arr = d;
      else if (Array.isArray(d.data)) arr = d.data;
      else if (Array.isArray(d.materiels)) arr = d.materiels;
      else console.error("API Materiels inattendue:", d);
      setMateriels(arr);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (m?: MaterielsType) => {
    setCurrent(m ?? null);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setCurrent(null);
  };

  const handleSave = async (data: MaterielsType) => {
    if (data.id) await axiosClient.put(`/api/materiels/${data.id}`, data);
    else await axiosClient.post("/api/materiels", data);
    closeForm();
    fetchData();
  };

  const confirmDelete = (m: MaterielsType) => setDeleting(m);
  const cancelDelete = () => setDeleting(null);
  const handleDelete = async () => {
    if (deleting) {
      await axiosClient.delete(`/api/materiels/${deleting.id}`);
      setDeleting(null);
      fetchData();
    }
  };

  const filtered = materiels.filter((m) => {
    const matchName = m.nom.toLowerCase().includes(searchName.toLowerCase());
    const matchPrix =
      searchPrix === "" || m.prix_location.toString().includes(searchPrix);
    const matchStockTotal =
      searchStockTotal === "" ||
      m.stock_total.toString().includes(searchStockTotal);
    const matchStockAvailable =
      searchStockAvailable === "" ||
      m.stock_available.toString().includes(searchStockAvailable);
    const matchCategorie =
      searchCategorie === "" ||
      m.categorieId.nom.toLowerCase().includes(searchCategorie.toLowerCase());

    return (
      matchName &&
      matchPrix &&
      matchStockTotal &&
      matchStockAvailable &&
      matchCategorie
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col items-start gap-4 mb-4 bg-white p-6 rounded">
        <button
          onClick={() => openForm()}
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
        >
          + Ajouter un matériel
        </button>

        <MaterielSearch
          searchName={searchName}
          setSearchName={setSearchName}
          searchPrix={searchPrix}
          setSearchPrix={setSearchPrix}
          searchStockTotal={searchStockTotal}
          setSearchStockTotal={setSearchStockTotal}
          searchStockAvailable={searchStockAvailable}
          setSearchStockAvailable={setSearchStockAvailable}
          searchCategorie={searchCategorie}
          setSearchCategorie={setSearchCategorie}
        />
      </div>

      <table className="min-w-full bg-white shadow-lg rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Catégorie</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Prix loc.</th>
            <th className="px-4 py-2">Stock total</th>
            <th className="px-4 py-2">Stock disponible</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="px-4 py-2">{m.nom}</td>
                <td className="px-4 py-2">{m.categorieId.nom}</td>
                <td className="px-4 py-2">
                  {m.image_url ? (
                    <img
                      src={m.image_url}
                      alt={m.nom}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "Aucune"
                  )}
                </td>
                <td className="px-4 py-2">{m.prix_location.toFixed(2)}</td>
                <td className="px-4 py-2">{m.stock_total}</td>
                <td className="px-4 py-2">{m.stock_available}</td>
                <td className="px-4 py-2">{m.description}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => openForm(m)}
                    className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => confirmDelete(m)}
                    className="inline-block px-4 py-2 bg-[#e3342f] hover:bg-[#cc1f1a] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-4 text-center">
                <div className="flex flex-col items-center">
                  <MdInfoOutline className="text-4xl text-gray-400" />
                  <span>Aucun matériel trouvé</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <MaterielForm
          materiel={current}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
      {deleting && (
        <DeleteConfirm
          item={deleting.nom}
          onCancel={cancelDelete}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminCatalogues;
