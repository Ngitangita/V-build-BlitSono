import { useEffect, useState, useRef } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline, MdVisibility } from "react-icons/md";
import PostPack from "../../components/adminDashboard/packs/PostPack";
import UpdatePack from "../../components/adminDashboard/packs/UpdatePack";
import PacksDetail from "../../components/adminDashboard/packs/PacksDetail";
import type { PacksType } from "../../types/types";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

function AdminPacks() {
  const [packs, setPacks] = useState<PacksType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const createRef = useRef<HTMLDivElement | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteRef = useRef<HTMLDivElement | null>(null);
  const [toDelete, setToDelete] = useState<PacksType | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef<HTMLDivElement | null>(null);
  const [toEdit, setToEdit] = useState<PacksType | null>(null);

  const [searchPrice, setSearchPrice] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedPackId, setSelectedPackId] = useState<number | null>(null);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const { data } = await axiosClient.get<PacksType[]>("/bundles");
      setPacks(Array.isArray(data) ? data : []);
    } catch {
      setError("Erreur lors du chargement des packs");
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement | null>,
    close: () => void
  ) => {
    if (e.target === ref.current) close();
  };

  const openDelete = (pack: PacksType) => {
    setToDelete(pack);
    setIsDeleteOpen(true);
  };
  const openEdit = (pack: PacksType) => {
    setToEdit(pack);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await axiosClient.delete(`/bundles/${toDelete.id_bundle}`);
      setIsDeleteOpen(false);
      fetchPacks();
      toast.success("Pack a été supprimé avec succès ");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleEditSave = async () => {
    if (!toEdit) return;
    try {
      await axiosClient.put(`/bundles/${toEdit.id_bundle}`, {
        name: toEdit.name,
        description: toEdit.description,
        daily_price: toEdit.daily_price,
        is_active: toEdit.is_active,
      });
      toast.success("Pack mis à jour avec succès ");
      fetchPacks();
      setToEdit(null);
      setIsEditOpen(false);
    } catch (err) {
      console.error("Erreur mise à jour :", err);
      toast.error("Erreur lors de la mise à jour du pack ");
    }
  };

  const filtered = packs
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (searchPrice ? p.daily_price.toString().includes(searchPrice) : true))
    .filter((p) =>
      searchStatus === ""
        ? true
        : searchStatus === "active"
        ? p.is_active
        : !p.is_active
    )
    .sort((a, b) => b.id_bundle - a.id_bundle);

  return (
    <div className="p-4 pt-14">
      <title>Packs Sono Pro | BeLoyal</title>
      <div className="container border border-gray-50">
        <div className="flex flex-row flex-wrap items-start gap-2 mb-4 bg-white p-6 rounded">
          {error && <p className="text-red-500">{error}</p>}

          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Ajouter un pack"
            onClick={() => setIsCreateOpen(true)}
            className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded cursor-pointer"
          >
            + Ajouter pack
          </button>

          <input
            type="search"
            placeholder="Rechercher un pack"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-[#18769C]"
          />
          <input
            type="number"
            placeholder="Rechercher par prix"
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-[#18769C]"
          />
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-36 focus:outline-none focus:ring-2 focus:ring-[#18769C]"
          >
            <option value="">Tous</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Créé le</th>
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Prix loc.</th>
                <th className="py-2 px-4">Statut</th>
                <th className="py-2 px-4">Déscription</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((p, i) => (
                  <tr
                    key={p.id_bundle ?? `pack-${i}`}
                    className="text-center hover:bg-gray-100 even:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </td>
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">{p.daily_price.toLocaleString()} Ar</td>
                    <td className="py-3 px-4">
                      <span
                        data-tooltip-id="tooltip"
                        data-tooltip-content={p.is_active ? "Désactiver" : "Activer"}
                        onClick={async () => {
                          try {
                            await axiosClient.put(`/bundles/${p.id_bundle}`, {
                              ...p,
                              is_active: !p.is_active,
                            });
                            fetchPacks();
                          } catch (err) {
                            console.error("Erreur changement statut:", err);
                          }
                        }}
                        className={`px-2 py-1 rounded cursor-pointer transition-colors duration-200 ${
                          p.is_active
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {p.is_active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {(p.description ?? "").split(" ").length > 2
                        ? (p.description ?? "").split(" ").slice(0, 2).join(" ") + " ..."
                        : p.description}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Modifier"
                        onClick={() => openEdit(p)}
                        className="inline-block p-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded cursor-pointer"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Voir détails"
                        onClick={() => p.id_bundle && setSelectedPackId(p.id_bundle)}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded cursor-pointer"
                      >
                        <MdVisibility />
                      </button>
                      <button
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Supprimer"
                        onClick={() => openDelete(p)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center">
                    <div className="flex flex-col items-center">
                      <MdInfoOutline className="text-4xl text-gray-400" />
                      <span>Aucun pack trouvé</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateOpen && (
        <div
          ref={createRef}
          onClick={(e) => handleOverlayClick(e, createRef, () => setIsCreateOpen(false))}
          className="fixed inset-0 bg-[#1E2939]/80 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Créer un nouveau pack</h2>
              <button
                data-tooltip-id="tooltip"
                data-tooltip-content="Fermer"
                onClick={() => setIsCreateOpen(false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
              >
                x
              </button>
            </div>
            <PostPack onClose={() => setIsCreateOpen(false)} onBundleCreated={fetchPacks} />
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
            <p className="mb-6">
              Voulez-vous vraiment supprimer le pack <strong>{toDelete.name}</strong> ?
            </p>
            <div className="flex justify-between">
              <button
                data-tooltip-id="tooltip"
                data-tooltip-content="Annuler"
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
                Non
              </button>
              <button
                data-tooltip-id="tooltip"
                data-tooltip-content="Confirmer la suppression"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
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
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Modifier le pack</h2>
              <button
                data-tooltip-id="tooltip"
                data-tooltip-content="Fermer"
                onClick={() => setIsEditOpen(false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
              >
                x
              </button>
            </div>
            <UpdatePack
              packToEdit={toEdit!}
              setPackToEdit={setToEdit}
              onSave={handleEditSave}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {selectedPackId && <PacksDetail id={selectedPackId} onClose={() => setSelectedPackId(null)} />}

      <Tooltip id="tooltip" className="z-50 text-sm bg-gray-800 text-white p-2 rounded" />
    </div>
  );
}

export default AdminPacks;
