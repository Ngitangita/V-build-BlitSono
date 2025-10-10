import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../conf/axiosClient";
import ContactButton from "../../components/clientHome/ContactButton";
import { FaCalendarCheck, FaHeadphones, } from "react-icons/fa";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { convertStatusReservation } from "../../services/convertStatus";
import type { FactureReservation, ProductLine} from "../../types/types";
dayjs.locale("fr");



type FactureData = {
  invoice: FactureReservation;
  lines: ProductLine[];
}

export default function Facture() {
  const { id } = useParams();
  const [facture, setFacture] = useState<FactureData | null>(null);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const { data } = await axiosClient.get<FactureData>(`/invoices/${id}`);
        setFacture(data);
      } catch (err) {
        console.error("Erreur lors du chargement de la facture :", err);
      }
    };
    fetchFacture();
  }, [id]);

  if (!facture) return <p>Chargement...</p>;

  const f = facture.invoice;

  const combineEventDateTime = (eventDate: string, eventTime: string) => {
    const [hour, minute, second] = eventTime.split(":").map(Number);
    return dayjs(eventDate).hour(hour).minute(minute).second(second);
  };

  return (
    <div className="text-[#575756]">
      <title>Détails de la facture | BeLoyal</title>

      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaCalendarCheck className="text-5xl sm:text-6xl lg:text-7xl text-[#18769C]" />
            Détails de votre facture
          </h1>
          <p className="max-w-full md:max-w-xl text-base sm:text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Découvrez votre facture BeLoyal : résumé clair et détaillé du matériel et des coûts.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/catalogues" className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition">
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto bg-white rounded shadow mt-6 sm:mt-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Facture</h1>
        <Link to="/client" className="text-[#18769C] hover:underline mb-6 block text-base sm:text-lg lg:text-2xl">
          ← Retour à mes réservations
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 text-sm sm:text-base lg:text-lg">
          <div>
            <p><strong>Facturé à :</strong></p>
            <p>{f.first_name} {f.last_name}</p>
            <p>{f.address}</p>
            <p>Tél : {f.phone}</p>
          </div>

          <div>
            <p>Facture N° : FCT-{new Date(f.billing_date).getFullYear()}-{f.invoice_id}</p>
            <p>Date : {new Date(f.billing_date).toLocaleDateString("fr-FR")}</p>
            <p>Événement : {combineEventDateTime(f.event_date, f.event_time).format("DD/MM/YYYY HH:mm")} à {f.location}</p>
            <p>Réservation ID : {f.reservation_id}</p>
            <p>Statut : {convertStatusReservation(f.status)}</p>
            <p>Durée : {f.duration_hours} h</p>
            <p>Prix estimé : {f.estimated_price?.toLocaleString()} Ar</p>
            <p>Prix final : {f.final_price?.toLocaleString() ?? "-" } Ar</p>
            <p>Jour/Nuit : {f.day_night === "jour" ? "Jour" : "Nuit"}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto mb-6 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Durée</th>
                <th>Sous-total</th>
              </tr>
            </thead>
            <tbody>
              {facture.lines.map((L) => (
                <tr key={L.id} className="even:bg-gray-50">
                  <td className="p-2 flex items-center space-x-3">
                    {L.image_url && <img src={L.image_url} alt={L.designation} className="w-10 h-10 object-cover rounded" />}
                    <span>{L.designation}</span>
                  </td>
                  <td>{L.quantite}</td>
                  <td>{L.prix_unitaire.toLocaleString()} Ar</td>
                  <td>{Math.floor(L.duree_heure / 24)} jours</td>
                  <td>{L.sous_total.toLocaleString()} Ar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {f.products && f.products.length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">Produits :</h3>
            <ul className="list-disc ml-6">
              {f.products.map((p) => (
                <li key={p.id_product}>
                  {p.name} — {p.pivot?.quantity || 1} unité(s)
                </li>
              ))}
            </ul>
          </div>
        )}

        {f.bundles && f.bundles.length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">Bundles :</h3>
            <ul className="list-disc ml-6">
              {f.bundles.map((b) => (
                <li key={b.id_bundle}>
                  {b.name} — {b.pivot?.quantity || 1} unité(s)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end py-4">
          <p className="text-lg font-bold">Total : {f.total_amount.toLocaleString()} Ar</p>
        </div>
      </div>
    </div>
  );
}
