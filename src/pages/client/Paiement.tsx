import { Link, useParams } from "react-router-dom";
import { FaCalendarCheck, FaHeadphones, FaThumbsUp } from "react-icons/fa";
import ContactButton from './../../components/clientHome/ContactButton';
import { useEffect, useState } from "react";
import axiosClient from "../../conf/axiosClient";

interface Payment {
  id: number;
  reservation: {
    id: number;
    user: { first_name: string; last_name: string };
    event_date: string;
    event_time: string;
    duration_hours: number;
    location: string;
    estimated_price: number;
  };
  amount: number;
  payment_method: string;
  payment_date: string;
  status: string;
  transaction_id: string;
}

export default function Paiement() {
  const { id } = useParams(); // id du paiement
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const { data } = await axiosClient.get<Payment>(`/payments/${id}`);
        setPayment(data);
      } catch (err) {
        console.error("Erreur lors du chargement du paiement :", err);
      }
    };
    fetchPayment();
  }, [id]);

  if (!payment) return <p>Chargement...</p>;

  return (
    <div className="text-[#575756]">
      <title>Confirmation de paiement | BeLoyal</title>

      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaCalendarCheck className="text-5xl sm:text-6xl lg:text-7xl text-[#18769C]" />
            Confirmation de paiement
          </h1>
          <p className="max-w-full md:max-w-xl text-base sm:text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Merci ! Votre paiement a bien été enregistré. Vous trouverez
            ci-dessous les détails de la transaction. Nous restons à votre
            disposition pour toute question.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/catalogues" className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition">
              <FaHeadphones /> Retour au catalogue
            </Link>
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded shadow mt-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Détails du Paiement</h1>
        <Link to="/client" className="text-[#18769C] hover:underline mb-6 block text-lg sm:text-xl">
          ← Retour à mes réservations
        </Link>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-base sm:text-lg">Informations client</h2>
            <p>Client : {payment.reservation.user.first_name} {payment.reservation.user.last_name}</p>
            <p>Réservation ID : {payment.reservation.id}</p>
          </div>
          <div>
            <h2 className="font-semibold text-base sm:text-lg">Transaction</h2>
            <p>Paiement N° : {payment.transaction_id}</p>
            <p>
              Montant : {payment.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
            </p>
            <p>Moyen : {payment.payment_method}</p>
            <p>Date : {new Date(payment.payment_date).toLocaleDateString("fr-FR")} à {new Date(payment.payment_date).toLocaleTimeString("fr-FR")}</p>
            <p>Statut : {payment.status}</p>
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
          Merci d&apos;avoir choisi BeLoyal. Votre événement le {new Date(payment.reservation.event_date).toLocaleDateString("fr-FR")} à {payment.reservation.location} est désormais confirmé.
        </p>
      </div>
    </div>
  );
}
