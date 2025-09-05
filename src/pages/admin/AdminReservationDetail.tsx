import { useState, useEffect } from "react";
import axiosClient from "../../conf/axiosClient";
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaTimes, FaPaperPlane } from "react-icons/fa";
import type { ReservationDetail } from "../../types/types";

export default function AdminReservationDetail(){
  const { id } = useParams<{ id: string }>();
  const [res, setRes] = useState<ReservationDetail | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosClient
      .get<ReservationDetail>(`/api/admin/reservations/${id}`, { withCredentials: true })
      .then(({ data }) => setRes(data))
      .catch(console.error);
  }, [id]);

  if (!res) return <p className="p-6">Chargement...</p>;

  const totalQuantity = res.reservation_materiels.reduce((sum, m) => sum + m.quantity, 0);

  const handleAction = async (status: ReservationDetail["statut"]) => {
    setProcessing(true);
    try {
      await axiosClient.patch(`/api/admin/reservations/${res.id}`, { statut: status }, { withCredentials: true });
      setRes({ ...res, statut: status });
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleSendOffer = async () => {
    setProcessing(true);
    try {
      await axiosClient.post(`/api/admin/reservations/${res.id}/send-offer`, {}, { withCredentials: true });
      alert(`Offre envoyée à ${res.user_email}`);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin" className="text-[#18769C] hover:underline">← Retour</Link>
      <h2 className="text-3xl font-bold text-[#18769C] mb-4">Détails de la réservation #{res.id}</h2>
      <div className="mb-6">
        <p><strong>Client :</strong> {res.user_name} ({res.user_email})</p>
        <p><strong>Date :</strong> {res.date_evenement} {res.heure_evenement}</p>
        <p><strong>Lieu :</strong> {res.lieu}</p>
        <p><strong>Durée :</strong> {res.duree_heure} heures</p>
        <p><strong>Statut :</strong> <span className={
          res.statut === "en_attente" ? "text-yellow-600" :
          res.statut === "validee"   ? "text-green-600" :
                                      "text-red-600"
        }>{res.statut}</span></p>
      </div>
      <table className="w-full table-auto bg-white shadow rounded mb-6">
        <thead className="bg-gray-100">
          <tr>{["Matériel", "Quantité", "Prix unitaire", "Sous-total"].map(h =>
            <th key={h} className="p-2 text-left">{h}</th>
          )}</tr>
        </thead>
        <tbody>
          {res.reservation_materiels.map(m => (
            <tr key={m.materiel_id} className="even:bg-gray-50">
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.quantity}</td>
              <td className="p-2">{m.price.toLocaleString()} Ar</td>
              <td className="p-2">{(m.price * m.quantity).toLocaleString()} Ar</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-semibold">Quantité totale : {totalQuantity}</p>
      <p className="font-semibold mb-4">Prix estimé : {res.prix_estime.toLocaleString()} Ar</p>
      <div className="space-x-2">
        <button disabled={processing} onClick={() => handleAction("validee")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          <FaCheck className="inline mr-2" /> Valider
        </button>
        <button disabled={processing} onClick={() => handleAction("refusee")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          <FaTimes className="inline mr-2" /> Refuser
        </button>
        <button disabled={processing} onClick={handleSendOffer}
          className="px-4 py-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70]">
          <FaPaperPlane className="inline mr-2" /> Envoyer l'offre
        </button>
      </div>
    </div>
  );
}
