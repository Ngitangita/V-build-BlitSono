import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaHeadphones,
  FaPhone,
  FaThumbsUp,
} from "react-icons/fa";
import { factureStatique } from "../../data/FactureData";
import type { LigneFacture } from "../../types/factureTypes";

export default function Facture() {
  const f = factureStatique;

  return (
    <div className="text-[#575756]">
      <title>Détails de la facture | Blit Sono</title>
      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-10 w-full flex flex-col pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px] items-center">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Détails de votre facture
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Découvrez votre facture BlitSono : un résumé clair et détaillé du
            matériel sélectionné, avec prix transparent et qualité
            professionnelle. Préparez-vous à vivre un événement exceptionnel !
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>

      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-bold mb-4">Facture</h1>
        <Link
          to="/client"
          className="text-[#18769C] hover:underline mb-6 block text-2xl"
        >
          ← Retour à mes réservations
        </Link>

        <div className="flex justify-between mb-6">
          <div className="flex flex-col items-center">
            <p>
              <strong>Facturé à :</strong>
            </p>
            <p>
              {f.user.prenom} {f.user.nom}
            </p>
            <p>{f.user.adresse}</p>
            <p>
              {f.user.codePostal} {f.user.ville}
            </p>
          </div>
          <div>
            <p>
              Facture N° : FCT-{new Date(f.dateFacturation).getFullYear()}-
              {f.id}
            </p>
            <p>
              Date : {new Date(f.dateFacturation).toLocaleDateString("fr-FR")}
            </p>
            <p>
              Événement : {f.evenement.type} - {f.evenement.lieu}
            </p>
            <p>Paiement : {f.evenement.paiement}</p>
            <p>Réservation ID : {f.reservationId}</p>
          </div>
        </div>

        <table className="w-full table-auto mb-6">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Désignation",
                "Quantité",
                "Prix unitaire",
                "Durée",
                "Sous‑total",
              ].map((h) => (
                <th key={h} className="p-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.lignes.map((L: LigneFacture, i: number) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="p-2 flex items-center space-x-3">
                  <img
                    src={L.image_url}
                    alt={L.designation}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{L.designation}</span>
                </td>
                <td className="p-2">{L.quantite}</td>
                <td className="p-2">{L.prixUnitaire.toLocaleString()} Ar</td>
                <td className="p-2">{Math.floor(L.dureeHeure / 24)} jours</td>
                <td className="p-2">{L.sousTotal.toLocaleString()} Ar</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mb-8">
          <ul className="list-disc ml-6">
            <li>
              Total matériel + extras : {f.montantTotal.toLocaleString()} Ar
            </li>
          </ul>
          <div>
            <button className="px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Télécharger la facture PDF
            </button>
          </div>
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[500px]">
          <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
        </h1>
        <p className="w-[500px] text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Nous sommes honorés de participer au succès de votre événement avec du
          matériel professionnel, fiable et de grande qualité. Vous bénéficiez
          d'une prestation experte, d'une installation maîtrisée et de la
          sérénité d'un service complet. À très bientôt !
        </p>
      </div>
    </div>
  );
}
