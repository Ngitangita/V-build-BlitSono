import { useState, useEffect, useMemo } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { ReservationSummary } from "../../types/types";
import ReservationFilters from "../../components/adminDashboard/ReservationFilters";

export default function AdminReservations() {
  const [all, setAll] = useState<ReservationSummary[]>([]);
  const [processing, setProcessing] = useState<number | null>(null);
  const [filter, setFilter] = useState({
    client: "",
    dateHeure: "",
    lieu: "",
    statut: "",
  });

  useEffect(() => {
    axiosClient
      .get<ReservationSummary[]>("/api/admin/reservations", {
        withCredentials: true,
      })
      .then(({ data }) => setAll(data))
      .catch(console.error);
  }, []);

  const updateStatus = (
    id: number,
    newStatus: ReservationSummary["statut"]
  ) => {
    setProcessing(id);
    axiosClient
      .post(
        `/api/admin/reservations/${id}/${newStatus}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        setAll((prev) =>
          prev.map((r) => (r.id === id ? { ...r, statut: newStatus } : r))
        );
      })
      .catch(console.error)
      .finally(() => setProcessing(null));
  };

  const filtered = useMemo(
    () =>
      all.filter(
        (r) =>
          (!filter.client ||
            r.user_name.toLowerCase().includes(filter.client.toLowerCase())) &&
          (!filter.dateHeure ||
            `${r.date_evenement} ${r.heure_evenement}`.includes(
              filter.dateHeure
            )) &&
          (!filter.lieu ||
            r.lieu.toLowerCase().includes(filter.lieu.toLowerCase())) &&
          (!filter.statut || r.statut === filter.statut)
      ),
    [all, filter]
  );

  const commonSX = {
    width: "200px",
    height: "40px",
    ".MuiInputBase-root": { height: "40px" },
    "& .MuiInputLabel-outlined": { color: "#18769C" },
    "& .MuiInputLabel-outlined.Mui-focused": { color: "#0f5a70" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f5a70",
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#18769C]">
        Gestion des Réservations
      </h1>

      <ReservationFilters
        filter={filter}
        setFilter={setFilter}
        commonSX={commonSX}
      />
      <div className="w-full max-[479px]:overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Client",
                "Matériel",
                "Date/Heure",
                "Durée",
                "Lieu",
                "Statut",
                "Actions",
              ].map((h) => (
                <th key={h} className="p-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((res) => (
                <tr key={res.id} className="even:bg-gray-50">
                  <td className="p-2">{res.user_name}</td>
                  <td className="p-2">{res.materiel_list}</td>
                  <td className="p-2">
                    {res.date_evenement} {res.heure_evenement}
                  </td>
                  <td className="p-2">{res.duree_heure}</td>
                  <td className="p-2">{res.lieu}</td>
                  <td
                    className={`p-2 font-semibold ${
                      res.statut === "en_attente"
                        ? "text-yellow-600"
                        : res.statut === "validee"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {res.statut.replace("_", " ")}
                  </td>
                  <td className="p-2 flex space-x-2">
                    {res.statut === "en_attente" && (
                      <>
                        <button
                          disabled={processing === res.id}
                          onClick={() => updateStatus(res.id, "validee")}
                          className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <FaCheck />
                        </button>
                        <button
                          disabled={processing === res.id}
                          onClick={() => updateStatus(res.id, "refusee")}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <Link
                      to={`/admin/admin-reservations-detail/${res.id}`}
                      className="p-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70]"
                    >
                      <FaInfoCircle />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Aucune réservation trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
