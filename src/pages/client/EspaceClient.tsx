import { useState, useEffect } from "react";
import axiosClient from "../../conf/axiosClient";
import type { Reservation } from "../../types/types";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaPhone,
  FaHeadphones,
  FaCalendarAlt,
  FaThumbsUp,
  FaFileAlt,
  FaCreditCard,
} from "react-icons/fa";


export default function EspaceClient() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axiosClient
      .get("/api/user/reservations", { withCredentials: true })
      .then((resp) => setReservations(resp.data))
      .catch(console.error);
  }, []);

  const joinAndTruncate = (items: string[]) => {
    const joined = items.join(", ");
    const words = joined.split(" ");
    return words.length > 15 ? words.slice(0, 15).join(" ") + "…" : joined;
  };

  const getReservationIcon = (statut: Reservation["statut"]) =>
    statut === "confirmée" ? (
      <FaCalendarCheck color="green" />
    ) : (
      <FaCalendarAlt color="#f59e0b" />
    );

  const hasReservations = reservations.length > 0;

  return (
    <div className="text-[#575756]">
      {/* Section header */}
      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Mes Réservations
          </h1>
          <p className="w-full sm:w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Avec BlitSono, réservez simplement le matériel qu’il vous faut en
            quelques clics ! Découvrez nos packs professionnels adaptés à tous
            types d’événements, du matériel audio et lumière fiable et de
            qualité. Votre événement mérite le meilleur, réservez avec
            confiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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

      <div className="p-4 sm:p-6">
        {!hasReservations ? (
          <div className="text-center py-20">
            <FaCalendarAlt size={48} className="mx-auto text-[#18769C] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Oh non !</h2>
            <p className="text-lg">
              Malheureusement, vous n'avez pas encore effectué de réservation.
              Qu'attendez-vous ? Parcourez notre catalogue et réservez votre
              matériel dès maintenant !
            </p>
            <Link
              to="/catalogues"
              className="mt-4 inline-block px-6 py-3 bg-[#18769C] text-white rounded hover:bg-[#0f5a70]"
            >
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-0">
            <table className="min-w-full border-collapse table-auto md:table-fixed lg:table-auto bg-white rounded shadow">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {[
                    "Date",
                    "Heure",
                    "Durée",
                    "Matériel",
                    "Lieu",
                    "Statut",
                    "Prix est.",
                    "Prix final",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-2 text-center text-sm sm:text-base lg:text-lg whitespace-normal md:whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="even:bg-gray-50 text-center">
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.date}
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.heure}
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.dureeHeure} h
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base w-40 md:w-60 lg:w-72 overflow-hidden">
                      {joinAndTruncate(r.materiel)}
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.lieu}
                    </td>
                    <td
                      className={`p-2 sm:p-3 font-semibold text-sm sm:text-base ${
                        r.statut === "confirmée"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {getReservationIcon(r.statut)}
                      <span className="ml-1">{r.statut}</span>
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.prixEstime.toLocaleString()} Ar
                    </td>
                    <td className="p-2 sm:p-3 text-sm sm:text-base">
                      {r.prixFinal ? `${r.prixFinal.toLocaleString()} Ar` : "—"}
                    </td>
                    <td className="p-2 sm:p-3 flex justify-center space-x-2">
                      <Link
                        to={`/devis/${r.id}`}
                        className="p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Devis"
                      >
                        <FaCalendarAlt size={20} />
                      </Link>
                      <Link
                        to={`/facture/${r.id}`}
                        className="p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Facture"
                      >
                        <FaFileAlt size={20} />
                      </Link>
                      <Link
                        to={`/paiement/${r.id}`}
                        className="p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Paiement"
                      >
                        <FaCreditCard size={20} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {hasReservations && (
        <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
          <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-full sm:w-[500px]">
            <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Nous sommes ravis de vous accompagner dans la réussite de votre
            événement avec du matériel audio et lumière professionnel, fiable et
            de qualité… et nous restons à votre écoute à chaque étape, pour
            adapter nos prestations à vos besoins spécifiques et garantir une
            expérience sans stress, du début à la fin.
          </p>
        </div>
      )}
    </div>
  );
}
