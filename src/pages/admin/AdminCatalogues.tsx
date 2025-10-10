import React, { useEffect, useState } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline, MdVisibility } from "react-icons/md";
import MaterielForm from "../../components/adminDashboard/catalogues/MaterielForm";
import DeleteConfirm from "../../components/adminDashboard/catalogues/DeleteConfirm";
import type { MaterielsType, Category } from "../../types/types";
import MaterielSearch from "../../components/adminDashboard/catalogues/MaterielSearch";
import { Tooltip } from "@mui/material";
import MaterielDetail from "../../components/adminDashboard/catalogues/MaterielDetail";

function AdminCatalogues() {
  const [materiels, setMateriels] = useState<MaterielsType[]>([]);
  const [current, setCurrent] = useState<MaterielsType | null>(null);
  const [deleting, setDeleting] = useState<MaterielsType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [, setCategories] = useState<Category[]>([]);
  const [detail, setDetail] = useState<MaterielsType | null>(null);
  const [open, setOpen] = useState(false); 

  const [searchName, setSearchName] = useState("");
  const [searchPrix, setSearchPrix] = useState("");
  const [searchStockTotal, setSearchStockTotal] = useState("");
  const [searchStockAvailable, setSearchStockAvailable] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const fetchData = async () => {
    try {
      const [resProducts, resCategories] = await Promise.all([
        axiosClient.get("/products"),
        axiosClient.get("/categories"),
      ]);

      const arr: MaterielsType[] = Array.isArray(resProducts.data)
        ? resProducts.data
        : Array.isArray(resProducts.data?.data)
        ? resProducts.data.data
        : [];

      const mapped = arr.map((m) => ({
        ...m,
        image_url: m.image_url ?? "",
        stock_total: m.stock_total ?? 0,
        stock_available: m.stock_available ?? 0,
      }));
      setMateriels(mapped);

      const cats: Category[] = Array.isArray(resCategories.data)
        ? resCategories.data
        : Array.isArray(resCategories.data?.data)
        ? resCategories.data.data
        : [];
      setCategories(cats);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchById = async (id_product: number) => {
    try {
      const res = await axiosClient.get(`/products/${id_product}`);
      const product = res.data;
      if (product) {
        setDetail({
          ...product,
          image_url: product.image_url ?? "",
          stock_total: product.stock_total ?? 0,
          stock_available: product.stock_available ?? 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openForm = (m?: MaterielsType) => {
    setCurrent(m ?? null);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setCurrent(null);
  };

  const handleSave = (savedProduct: MaterielsType) => {
    setMateriels((prev) => {
      const exists = prev.some((m) => m.id_product === savedProduct.id_product);
      return exists
        ? prev.map((m) =>
            m.id_product === savedProduct.id_product ? savedProduct : m
          )
        : [savedProduct, ...prev];
    });
    setShowForm(false);
    setCurrent(null);
  };

  const confirmDelete = (m: MaterielsType) => setDeleting(m);
  const cancelDelete = () => setDeleting(null);

  const handleDelete = async () => {
    if (deleting) {
      await axiosClient.delete(`/products/${deleting.id_product}`);
      setDeleting(null);
      fetchData();
    }
  };

  const filtered = materiels.filter((m) => {
    const matchName = m.name.toLowerCase().includes(searchName.toLowerCase());
    const matchPrix =
      searchPrix === "" || m.daily_price.toString().includes(searchPrix);
    const matchStockTotal =
      searchStockTotal === "" ||
      (m.stock_total ?? 0).toString().includes(searchStockTotal);
    const matchStockAvailable =
      searchStockAvailable === "" ||
      (m.stock_available ?? 0).toString().includes(searchStockAvailable);
    const matchCategorie =
      searchCategorie === "" ||
      (m.category?.name ?? "")
        .toLowerCase()
        .includes(searchCategorie.toLowerCase());
    const matchStatus =
      searchStatus === "" ||
      (searchStatus === "actif" && m.is_active) ||
      (searchStatus === "inactif" && !m.is_active);

    return (
      matchName &&
      matchPrix &&
      matchStockTotal &&
      matchStockAvailable &&
      matchCategorie &&
      matchStatus
    );
  });

  return (
    <div className="p-4 pt-14">
      <title>Catalogues | BeLoyal</title>

      <div
        className="flex flex-row flex-wrap items-center gap-2 mb-4
       bg-white p-6 sm:py-2 sm:px-4 rounded sticky top-14 z-20 shadow"
      >
        <button
          onClick={() => openForm()}
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded cursor-pointer"
        >
          + Ajouter un matériel
        </button>

        <div className="flex flex-col md:flex-row p-5 md:gap-5 flex-1">
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
            searchStatus={searchStatus}
            setSearchStatus={setSearchStatus}
            open={open}
            setOpen={setOpen}
          />
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      <div className="overflow-hidden hover:overflow-auto max-h-[380px] bg-white shadow-lg rounded">
        <table className="min-w-full bg-white table-fixed">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Créé le</th>
              <th className="px-4 py-2 whitespace-nowrap">Nom</th>
              <th className="px-4 py-2 whitespace-nowrap">Prix loc.</th>
              <th className="px-4 py-2 whitespace-nowrap">Coût de rempl.</th>
              <th className="px-4 py-2 whitespace-nowrap">Stock total</th>
              <th className="px-4 py-2 whitespace-nowrap">Stock dispo</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Statut</th>
              <th className="px-4 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              Object.entries(
                filtered.reduce((acc, m) => {
                  const categoryName = m.category?.name ?? "Aucune";
                  if (!acc[categoryName]) acc[categoryName] = [];
                  acc[categoryName].push(m);
                  return acc;
                }, {} as Record<string, typeof filtered>)
              ).map(([categoryName, items]) => (
                <React.Fragment key={categoryName}>
                  <tr className="bg-gray-300">
                    <td
                      colSpan={9}
                      className="px-4 py-2 font-semibold text-left"
                    >
                      {categoryName}
                    </td>
                  </tr>
                  {items.map((m) => (
                    <tr
                      key={m.id_product}
                      className="hover:bg-gray-50 even:bg-gray-100"
                    >
                      <td className="px-4 py-2 whitespace-nowrap">
                        {m.created_at
                          ? new Date(m.created_at)
                              .toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              .replace(",", "")
                          : ""}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {m.name.split(" ").length > 2
                          ? m.name.split(" ").slice(0, 2).join(" ") + " ..."
                          : m.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {m.daily_price.toLocaleString()} Ar
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {" "}
                        {(m.replacement_cost ?? 0).toLocaleString()} Ar
                      </td>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {m.stock_total}
                      </td>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {m.stock_available}
                      </td>
                      <td className="px-4 py-2">
                        {(m.description ?? "").split(" ").length > 2
                          ? (m.description ?? "")
                              .split(" ")
                              .slice(0, 2)
                              .join(" ") + " ..."
                          : m.description}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <Tooltip title={m.is_active ? "Désactiver" : "Activer"}>
                          <span
                            onClick={async () => {
                              try {
                                await axiosClient.put(
                                  `/products/${m.id_product}`,
                                  {
                                    ...m,
                                    is_active: !m.is_active,
                                  }
                                );
                                fetchData();
                              } catch (err) {
                                console.error("Erreur changement statut:", err);
                              }
                            }}
                            className={`px-2 py-1 rounded cursor-pointer transition-colors duration-200 ${
                              m.is_active
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }`}
                          >
                            {m.is_active ? "Actif" : "Inactif"}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-2 flex gap-2 justify-center whitespace-nowrap">
                        <button
                          onClick={() => openForm(m)}
                          className="px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded cursor-pointer"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() =>
                            m.id_product !== undefined &&
                            fetchById(m.id_product)
                          }
                          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded cursor-pointer"
                        >
                          <MdVisibility />
                        </button>
                        <button
                          onClick={() => confirmDelete(m)}
                          className="px-4 py-2 bg-[#e3342f] hover:bg-[#cc1f1a] text-white rounded cursor-pointer"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <MdInfoOutline className="text-4xl text-gray-400" />
                    <span>Aucun matériel trouvé</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <MaterielForm
          materiel={current}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
      {detail && (
        <MaterielDetail materiel={detail} onClose={() => setDetail(null)} />
      )}
      {deleting && (
        <DeleteConfirm
          item={deleting.name}
          onCancel={cancelDelete}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminCatalogues;
