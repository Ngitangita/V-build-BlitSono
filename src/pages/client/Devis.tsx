import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaHeadphones,
  FaThumbsUp,
} from "react-icons/fa";
import { devisStatique } from "../../data/DevisData";
import type { LigneDevis } from "../../types/devisTypes";
import ContactButton from './../../components/clientHome/ContactButton';

export default function Devis() {
  const d = devisStatique;

  return (
    <div className="text-[#575756]">
      <title>Vos devis personnalisés | Blit Sono</title>
      <section className="bgImageReservation">
        <div
          className="
          bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20
        "
        >
          <h1
            className="
          text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
          font-extrabold mb-4 flex gap-2
        "
          >
            <FaCalendarCheck className="text-5xl sm:text-6xl lg:text-7xl text-[#18769C]" />
            Détails de votre devis
          </h1>
          <p className="w-full sm:w-[500px] text-base sm:text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Avec BeLoyal, découvrez en détail le matériel que vous avez
            sélectionné ! Profitez d'un aperçu complet, prix transparent, et
            qualité professionnelle — parce que votre événement mérite
            l'excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="p-4 sm:p-6 md:p-8 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-white rounded shadow mt-6 sm:mt-8">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4">
          Votre Devis
        </h1>
        <Link
          to="/client"
          className="text-[#18769C] hover:underline mb-6 block text-sm sm:text-lg lg:text-xl"
        >
          ← Retour à mes réservations
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 text-sm sm:text-base lg:text-lg">
          <div>
            <h2 className="font-semibold mb-2">Informations Générales</h2>
            <p>Numéro de devis : DV{d.id}</p>
            <p>Réservation : #{d.reservationId}</p>
            <p>Date : {new Date(d.dateEmission).toLocaleDateString("fr-FR")}</p>
            <p>
              Client : {d.user.prenom} {d.user.nom}
            </p>
            <p>Téléphone: {d.user.telephone}</p>
            <p>Email : {d.user.email}</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Informations sur l'événement</h2>
            <p>
              Date : {new Date(d.evenement.date).toLocaleDateString("fr-FR")}
            </p>
            <p>
              Heure : {d.evenement.heureDebut} - {d.evenement.heureFin}
            </p>
            <p>Lieu : {d.evenement.lieu}</p>
            <p>Événement : {d.evenement.type}</p>
            <p>Paiement : {d.evenement.paiement}</p>
            <p>Statut : {d.evenement.statut}</p>
            <p>Prix est.: {d.evenement.prixEstime?.toLocaleString()} Ar</p>
            <p>Prix fin.: {d.evenement.prixFinal?.toLocaleString()} Ar</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto mb-6 text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Matériel",
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
              {d.lignes.map((L: LigneDevis, i: number) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="p-2 sm:p-3 md:p-4 flex items-center space-x-3">
                    <img
                      src={L.image_url}
                      alt={L.materiel}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                    <span className="text-xs sm:text-sm md:text-base">
                      {L.materiel}
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
            <li>Total matériel : {d.totalHT.toLocaleString()} Ar</li>
            <li>Frais de livraison : {d.fraisLivraison.toLocaleString()} Ar</li>
            <li>Majoration nuit : {d.majorationNuit.toLocaleString()} Ar</li>
            <li>Réductions : {d.reductions.toLocaleString()} Ar</li>
            <li className="font-bold text-[#18769C]">
              Total TTC : {d.totalTTC.toLocaleString()} Ar
            </li>
          </ul>
          <div className="space-x-2 space-y-2 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Valider le devis
            </button>
            <button className="w-full sm:w-auto px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Refuser le devis
            </button>
            <button className="w-full sm:w-auto px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Télécharger le devis PDF
            </button>
          </div>
        </div>
      </div>
      <div className="text-[#18769C] py-10 w-full flex flex-col px-6 sm:px-12 items-end">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 flex items-center gap-1 w-full sm:w-[500px]">
          <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
        </h1>
        <p className="w-full sm:w-[500px] text-sm sm:text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Nous sommes ravis de contribuer au succès de votre événement avec du
          matériel professionnel, fiable et de haute qualité. Vous bénéficiez
          d'une installation rapide, d'un service expert et d'une tranquillité
          d'esprit. À très bientôt !
        </p>
      </div>
    </div>
  );
}
