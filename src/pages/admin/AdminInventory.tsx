import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../conf/axiosClient";
import { TextField } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import { toast } from "react-toastify";
import PostInventory from "../../components/adminDashboard/inventory/PostInventory";
import UpdateInventory from "../../components/adminDashboard/inventory/UpdateInventory";
import type { Inventory, MaterielsType } from "../../types/types";

export default function AdminInventory() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [products, setProducts] = useState<MaterielsType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const createRef = useRef<HTMLDivElement | null>(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteRef = useRef<HTMLDivElement | null>(null);
  const [toDelete, setToDelete] = useState<Inventory | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef<HTMLDivElement | null>(null);
  const [toEdit, setToEdit] = useState<Inventory | null>(null);

  const fetchInventory = async () => {
    try {
      const { data } = await axiosClient.get<Inventory[]>("/inventory");
      setInventory(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement de l’inventaire");
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axiosClient.get<MaterielsType[]>("/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement des produits");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    close: () => void
  ) => {
    if (e.target === ref.current) close();
  };

  const openDelete = (item: Inventory) => {
    setToDelete(item);
    setIsDeleteOpen(true);
  };
  const openEdit = (item: Inventory) => {
    setToEdit(item);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await axiosClient.delete(`/inventory/${toDelete.id_inventory}`);
      toast.success("Matériel supprimé avec succès");
      setIsDeleteOpen(false);
      fetchInventory();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      console.error(err);
    }
  };

  const filtered = inventory.filter((i) =>
    i.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pt-14">
      <title>Inventaire Sono Pro | BeLoyal</title>

      <div className="container border border-gray-50 flex flex-row flex-wrap items-start gap-2 mb-4 bg-white p-6 rounded">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded cursor-pointer"
        >
          + Ajouter matériel
        </button>
        <TextField
          label="Rechercher par numéro de série"
          type="search"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Produit</th>
            <th className="py-2 px-4">Numéro de série</th>
            <th className="py-2 px-4">État</th>
            <th className="py-2 px-4">Date achat</th>
            <th className="py-2 px-4">Disponible</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((i) => (
              <tr
                key={i.id_inventory}
                className="text-center hover:bg-gray-100 even:bg-gray-50"
              >
                <td>
                  {products.find((p) => p.id_product === i.id_product)?.name ??
                    `Produit #${i.id_product}`}
                </td>
                <td>{i.serial_number}</td>
                <td>{i.condition}</td>
                <td>{i.purchase_date}</td>
                <td>{i.is_available ? "Oui" : "Non"}</td>
                <td className="flex justify-center gap-2 py-3">
                  <button
                    onClick={() => openEdit(i)}
                    className="p-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => openDelete(i)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                <MdInfoOutline className="text-4xl text-gray-400 mx-auto" />
                <span>Aucun matériel trouvé</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isCreateOpen && (
        <div
          ref={createRef}
          onClick={(e) => handleOverlayClick(e, createRef, () => setIsCreateOpen(false))}
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[500px]">
            <PostInventory
              products={products}
              onClose={() => setIsCreateOpen(false)}
              onInventoryCreated={fetchInventory}
            />
          </div>
        </div>
      )}

      {isDeleteOpen && toDelete && (
        <div
          ref={deleteRef}
          onClick={(e) => handleOverlayClick(e, deleteRef, () => setIsDeleteOpen(false))}
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
            <p>
              Voulez-vous vraiment supprimer{" "}
              <strong>{toDelete.serial_number}</strong> ?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Non
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && toEdit && (
        <div
          ref={editRef}
          onClick={(e) => handleOverlayClick(e, editRef, () => setIsEditOpen(false))}
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[500px]">
            <UpdateInventory
              inventory={toEdit}
              onClose={() => setIsEditOpen(false)}
              onInventoryUpdated={fetchInventory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
