import { useState, useEffect, useMemo } from "react";
import axiosClient from "../../conf/axiosClient";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

type ReservationSummary = {
  id: number;
  user_name: string;
  materiel_list: string;
  date_evenement: string;
  heure_evenement: string;
  duree_heure: number;
  lieu: string;
  statut: "en_attente" | "validee" | "refusee";
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<ReservationSummary[]>([]);
  const [processing, setProcessing] = useState<number | null>(null);
  const [filter, setFilter] = useState({
    client: "",
    dateHeure: "",
    lieu: "",
    statut: "",
  });

  useEffect(() => {
    axiosClient.get("/api/admin/reservations", { withCredentials: true })
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : data.reservations || [];
        setReservations(list);
      });
  }, []);

  const updateStatus = (id: number, newStatus: ReservationSummary["statut"]) => {
    setProcessing(id);
    axiosClient
      .post(`/api/admin/reservations/${id}/${newStatus}`, {}, { withCredentials: true })
      .then(() => {
        setReservations(prev =>
          prev.map(r => (r.id === id ? { ...r, statut: newStatus } : r))
        );
      })
      .finally(() => setProcessing(null));
  };

  const filtered = useMemo(() => {
    return reservations.filter(r =>
      (!filter.client || r.user_name.toLowerCase().includes(filter.client.toLowerCase())) &&
      (!filter.dateHeure || `${r.date_evenement} ${r.heure_evenement}`.includes(filter.dateHeure)) &&
      (!filter.lieu || r.lieu.toLowerCase().includes(filter.lieu.toLowerCase())) &&
      (!filter.statut || r.statut === filter.statut)
    );
  }, [reservations, filter]);

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
      <h1 className="text-3xl font-bold mb-6 text-[#18769C]">Tableau de bord Admin</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <TextField label="Client" type="search" value={filter.client}
          onChange={e => setFilter(f => ({ ...f, client: e.target.value }))}
          variant="outlined" size="small" sx={commonSX} />
        <TextField label="Date/Heure" type="search" value={filter.dateHeure}
          onChange={e => setFilter(f => ({ ...f, dateHeure: e.target.value }))}
          variant="outlined" size="small" sx={commonSX} />
        <TextField label="Lieu" type="search" value={filter.lieu}
          onChange={e => setFilter(f => ({ ...f, lieu: e.target.value }))}
          variant="outlined" size="small" sx={commonSX} />
        <TextField label="Statut" select SelectProps={{ native: true }}
          value={filter.statut}
          onChange={e => setFilter(f => ({ ...f, statut: e.target.value }))}
          variant="outlined" size="small" sx={commonSX}>
          <option value="">Tous statuts</option>
          <option value="en_attente">En attente</option>
          <option value="validee">Validée</option>
          <option value="refusee">Refusée</option>
        </TextField>
      </div>

      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            {["Client", "Matériel", "Date/Heure", "Durée", "Lieu", "Statut", "Actions"].map(h =>
              <th key={h} className="p-2 text-left">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filtered.length ? filtered.map(res => (
            <tr key={res.id} className="even:bg-gray-50">
              <td className="p-2">{res.user_name}</td>
              <td className="p-2">{res.materiel_list}</td>
              <td className="p-2">{res.date_evenement} {res.heure_evenement}</td>
              <td className="p-2">{res.duree_heure}</td>
              <td className="p-2">{res.lieu}</td>
              <td className={`p-2 font-semibold ${
                res.statut === "en_attente" ? "text-yellow-600" :
                res.statut === "validee" ? "text-green-600" :
                "text-red-600"}`}>
                {res.statut.replace("_", " ")}
              </td>
              <td className="p-2 flex space-x-2">
                {res.statut === "en_attente" && (
                  <>
                    <button
                      disabled={processing === res.id}
                      onClick={() => updateStatus(res.id, "validee")}
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                      title="Valider"
                    >
                      <FaCheck />
                    </button>
                    <button
                      disabled={processing === res.id}
                      onClick={() => updateStatus(res.id, "refusee")}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Refuser"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
                <Link
                  to={`/admin/admin-reservations-detail/${res.id}`}
                  className="p-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70]"
                  title="Voir détail"
                >
                  <FaInfoCircle />
                </Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                Aucune réservation trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
