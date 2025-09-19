import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaHeadphones,
  FaThumbsUp,
} from "react-icons/fa";
import { paiementStatique } from "../../data/PaiementData";
import ContactButton from './../../components/clientHome/ContactButton';

export default function Paiement() {
  const p = paiementStatique;

  return (
    <div className="text-[#575756]">
      <title>Confirmation de paiement | Blit Sono</title>

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
            Confirmation de paiement
          </h1>

          <p className="max-w-full md:max-w-xl text-base sm:text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Merci ! Votre paiement a bien été enregistré. Vous trouverez
            ci-dessous les détails de la transaction. Nous restons à votre
            disposition pour toute question.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Retour au catalogue
            </Link>
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded shadow mt-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Détails du Paiement
        </h1>
        <Link
          to="/client"
          className="text-[#18769C] hover:underline mb-6 block text-lg sm:text-xl"
        >
          ← Retour à mes réservations
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-base sm:text-lg">
              Informations client
            </h2>
            <p>
              Client : {p.user.prenom} {p.user.nom}
            </p>
            <p>Réservation ID : {p.reservationId}</p>
          </div>
          <div>
            <h2 className="font-semibold text-base sm:text-lg">Transaction</h2>
            <p>
              Paiement N° : PAY-{new Date(p.datePaiement).getFullYear()}-{p.id}
            </p>
            <p>
              Montant :{" "}
              {p.montant.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
            <p>Moyen : {p.moyenPaiement}</p>
            <p>
              Date :{" "}
              {new Date(p.datePaiement).toLocaleDateString("fr-FR")} à{" "}
              {new Date(p.datePaiement).toLocaleTimeString("fr-FR")}
            </p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded-lg">
            Télécharger le reçu PDF
          </button>
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 items-end">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 flex items-center gap-2 max-w-full lg:max-w-xl">
          <FaThumbsUp size={20} className="sm:size-24" /> Paiement réussi !
        </h1>
        <p className="max-w-full md:max-w-xl text-base sm:text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Merci d&apos;avoir choisi BlitSono. Votre événement ({p.evenement.type}{" "}
          à {p.evenement.lieu} le{" "}
          {new Date(p.evenement.date).toLocaleDateString("fr-FR")}) est désormais
          confirmé.
        </p>
      </div>
    </div>
  );
}
