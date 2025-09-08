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
        <div
          className="
          bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20
        " >
          <h1
            className="
          text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
          font-extrabold mb-4 flex gap-2
        " >
            <FaCalendarCheck className="text-5xl sm:text-6xl lg:text-7xl text-[#18769C]" />
            Détails de votre facture
          </h1>

          <p className="max-w-full md:max-w-xl text-base sm:text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Découvrez votre facture BlitSono : un résumé clair et détaillé du
            matériel sélectionné, avec prix transparent et qualité
            professionnelle. Préparez-vous à vivre un événement exceptionnel !
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>
      
      <div className="p-4 sm:p-6 md:p-8 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-white rounded shadow mt-6 sm:mt-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
          Facture
        </h1>
        <Link
          to="/client"
          className="text-[#18769C] hover:underline mb-6 block text-base sm:text-lg lg:text-2xl"
        >
          ← Retour à mes réservations
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 text-sm sm:text-base lg:text-lg">
          <div className="flex flex-col items-start sm:items-center md:items-start">
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

          <div className="text-left sm:text-center md:text-right">
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

        <div className="overflow-x-auto">
          <table className="w-full table-auto mb-6 text-xs sm:text-sm md:text-base lg:text-lg">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Désignation",
                  "Quantité",
                  "Prix unitaire",
                  "Durée",
                  "Sous-total",
                ].map((h) => (
                  <th
                    key={h}
                    className="p-2 sm:p-3 md:p-4 text-left whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {f.lignes.map((L: LigneFacture, i: number) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="p-2 sm:p-3 md:p-4 flex items-center space-x-3">
                    <img
                      src={L.image_url}
                      alt={L.designation}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                      {L.designation}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 md:p-4">{L.quantite}</td>
                  <td className="p-2 sm:p-3 md:p-4">
                    {L.prixUnitaire.toLocaleString()} Ar
                  </td>
                  <td className="p-2 sm:p-3 md:p-4">
                    {Math.floor(L.dureeHeure / 24)} jours
                  </td>
                  <td className="p-2 sm:p-3 md:p-4">
                    {L.sousTotal.toLocaleString()} Ar
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
            <li>
              Total matériel + extras : {f.montantTotal.toLocaleString()} Ar
            </li>
          </ul>
          <div>
            <button className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded text-sm sm:text-base lg:text-lg">
              Télécharger la facture PDF
            </button>
          </div>
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 items-end">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 flex items-center gap-2 max-w-full lg:max-w-xl">
          <FaThumbsUp size={20} className="sm:size-24" /> Merci d&apos;avoir
          choisi BlitSono !
        </h1>
        <p className="max-w-full md:max-w-xl text-base sm:text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Nous sommes honorés de participer au succès de votre événement avec du
          matériel professionnel, fiable et de grande qualité. Vous bénéficiez
          d&apos;une prestation experte, d&apos;une installation maîtrisée et de
          la sérénité d&apos;un service complet. À très bientôt !
        </p>
      </div>
    </div>
  );
}
