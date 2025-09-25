import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../conf/axiosClient";
import type { Reservation } from "../../types/user";
import ContactButton from "../../components/clientHome/ContactButton";
import AdminReservationDetail from "../admin/AdminReservationDetail";
import {
  FaCalendarCheck,
  FaHeadphones,
  FaCalendarAlt,
  FaThumbsUp,
  FaFileAlt,
  FaCreditCard,
} from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export default function EspaceClient() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [detail, setDetail] = useState<Reservation | null>(null);

  useEffect(() => {
    axiosClient
      .get<Reservation[]>("/reservations")
      .then((resp) => setReservations(resp.data))
      .catch(console.error);
  }, []);
  
  const fetchById = async (id: number) => {
    try {
      const res = await axiosClient.get<Reservation>(`/reservations/${id}`);
      setDetail(res.data);
    } catch (err) {
      console.error("Erreur récupération réservation :", err);
    }
  };
  
  const getReservationIcon = (status: Reservation["status"]) =>
    status === "confirmed" ? (
      <FaCalendarCheck color="green" />
    ) : (
      <FaCalendarAlt color="#f59e0b" />
    );

  const hasReservations = reservations.length > 0;

  const combineEventDateTime = (eventDate: string, eventTime: string) => {
    const [hour, minute, second] = eventTime.split(":").map(Number);
    return dayjs(eventDate).hour(hour).minute(minute).second(second);
  };

  return (
    <div className="text-[#575756]">
      <title>Espace Client | Blit Sono</title>

      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Mes Réservations
          </h1>
          <p className="w-full sm:w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Avec BlitSono, réservez simplement le matériel qu'il vous faut en
            quelques clics ! Découvrez nos packs professionnels adaptés à tous
            types d'événements, du matériel audio et lumière fiable et de
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
            <ContactButton />
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
            <ContactButton />
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
                    "Lieu",
                    "Statut",
                    "Prix est.",
                    "Prix final",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-normal md:whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id_reservation} className="even:bg-gray-50 text-center">
                    <td className="px-4 py-2">
                    {combineEventDateTime(r.event_date, r.event_time).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </td>
                    <td className="px-4 py-2">{r.event_time}</td>
                    <td className="px-4 py-2">{r.duration_hours} h</td>
                    <td className="px-4 py-2">{r.location}</td>
                    <td
                      className={`px-4 py-2 font-semibold flex flex-row items-center ${
                        r.status === "confirmed" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {getReservationIcon(r.status)}
                      <span className="ml-1">{r.status}</span>
                    </td>
                    <td className="px-4 py-2">{r.estimated_price?.toLocaleString()} Ar</td>
                    <td className="px-4 py-2">
                      {r.final_price ? `${r.final_price.toLocaleString()} Ar` : "—"}
                    </td>
                    <td className="px-4 py-2 flex justify-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => r.id_reservation && fetchById(r.id_reservation)}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded cursor-pointer"
                      >
                        <MdVisibility />
                      </button>
                      <Link
                        to={`/devis/${r.id_reservation}`}
                        className="p-1.5 sm:p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Devis"
                      >
                        <FaCalendarAlt size={16} />
                      </Link>
                      <Link
                        to={`/facture/${r.id_reservation}`}
                        className="p-1.5 sm:p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Facture"
                      >
                        <FaFileAlt size={16} />
                      </Link>
                      <Link
                        to={`/paiement/${r.id_reservation}`}
                        className="p-1.5 sm:p-2 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                        title="Voir Paiement"
                      >
                        <FaCreditCard size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Remerciement */}
      {hasReservations && (
        <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
          <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-full sm:w-[500px]">
            <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Nous sommes ravis de vous accompagner dans la réussite de votre
            événement avec du matériel audio et lumière professionnel, fiable et
            de qualité… et nous restons à votre écoute à chaque étape.
          </p>
        </div>
      )}

      {/* Détail d'une réservation */}
      {detail && (
        <AdminReservationDetail
          reservation={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
