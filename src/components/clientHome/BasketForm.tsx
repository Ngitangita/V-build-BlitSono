import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "react-toastify";
import axios from "axios";
import axiosClient from "../../conf/axiosClient";
import type { CartItem } from "../../types/cart";

export type BasketFormProps = {
  items: CartItem[];
  total: number;
  remove: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export type UnavailableItem = {
  id: number;
  message: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export default function BasketForm({
  items,
  total,
  remove,
  updateQuantity,
}: BasketFormProps) {
  const clearCart = useCartStore((s) => s.clear);
  const currentUser = useAuthStore((s) => s.user) as User | null;
  const isAuthenticated = !!currentUser;
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.totalCount());
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [dayNight, setDayNight] = useState<"jour" | "nuit">("jour");
  const [paymentType, setPaymentType] = useState<"complet" | "partiel">(
    "complet"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availabilityErrors, setAvailabilityErrors] = useState<
    Record<number, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("reservationForm");
    if (savedData) {
      const {
        eventDate,
        eventTime,
        location,
        duration,
        dayNight,
        paymentType,
      } = JSON.parse(savedData);
      setEventDate(eventDate || "");
      setEventTime(eventTime || "");
      setLocation(location || "");
      setDuration(duration || "");
      setDayNight(dayNight || "jour");
      setPaymentType(paymentType || "complet");
    }
  }, []);

  useEffect(() => {
    const formData = {
      eventDate,
      eventTime,
      location,
      duration,
      dayNight,
      paymentType,
    };
    localStorage.setItem("reservationForm", JSON.stringify(formData));
  }, [eventDate, eventTime, location, duration, dayNight, paymentType]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!eventDate) errs.eventDate = "Veuillez choisir une date.";
    if (!eventTime) errs.eventTime = "Veuillez sélectionner une heure.";
    if (!location.trim()) errs.location = "Veuillez indiquer un lieu.";
    if (!duration || duration < 1) errs.duration = "Durée invalide.";
    return errs;
  };

  const estimatePrice = (items: CartItem[]): number =>
    items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.info("Votre panier est vide.");
      return;
    }
    if (!isAuthenticated) {
      toast.warning("Veuillez vous connecter avant de finaliser");
      navigate("/sign-in");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload = {
      user_id: currentUser!.id,
      date_evenement: eventDate,
      heure_evenement: eventTime,
      duree_heure: duration,
      lieu: location,
      statut: "en_attente",
      prix_estime: estimatePrice(items),
      etat_commande: paymentType === "complet" ? "devis_envoye" : "non_emis",
      reservation_materiels: items
        .filter((i) => i.type === "materiel")
        .map((i) => ({ materiel_id: i.id, quantite: i.quantity })),
      reservation_packs: items
        .filter((i) => i.type === "pack")
        .map((i) => ({ pack_id: i.id, quantite: i.quantity })),
      dayNight,
      paymentType,
    };

    try {
      const res = await axiosClient.post("/api/reservations", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 409) {
        const errsMap: Record<number, string> = {};
        (res.data.unavailable as UnavailableItem[]).forEach((u) => {
          errsMap[u.id] = u.message;
        });
        setAvailabilityErrors(errsMap);
        toast.error(
          "Certains articles ne sont pas disponibles pour la période sélectionnée."
        );
        return;
      }

      toast.success("Réservation enregistrée !");
      clearCart();
      setAvailabilityErrors({});
      localStorage.removeItem("reservationForm");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          const errsMap: Record<number, string> = {};
          (err.response.data.unavailable as UnavailableItem[]).forEach((u) => {
            errsMap[u.id] = u.message;
          });
          setAvailabilityErrors(errsMap);
          toast.error("Conflit de réservation détecté.");
        } else {
          toast.error(
            err.response?.data?.message ?? "Erreur lors de la réservation"
          );
        }
      } else {
        toast.error("Erreur inconnue");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 flex flex-col gap-6 w-[750px]"
    >
      <p className="text-[#18769C]">
        Veuillez saisir les informations de l'événement (date, heure, lieu,
        durée, jour/nuit, paiement).
      </p>

      <div className="flex flex-row gap-4 flex-wrap items-center">
        <div>
          <label>Date de l'événement</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
          />
          {errors.eventDate && (
            <p className="text-red-500 text-sm">{errors.eventDate}</p>
          )}
        </div>

        <div>
          <label>Heure de début</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
          />
          {errors.eventTime && (
            <p className="text-red-500 text-sm">{errors.eventTime}</p>
          )}
        </div>

        <div>
          <label>Lieu</label>
          <input
            type="text"
            value={location}
            placeholder="Indiquez le lieu de l'événement"
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div>
          <label>Durée (heures)</label>
          <input
            type="number"
            placeholder="Durée en heures"
            value={duration}
            min={1}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration}</p>
          )}
        </div>

        <div>
          <p>Jour ou nuit ?</p>
          <label>
            <input
              type="radio"
              name="dayNight"
              checked={dayNight === "jour"}
              onChange={() => setDayNight("jour")}
              className="border-[#18769C]/50 outline-[#18769C] cursor-pointer"
            />{" "}
            Jour
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="dayNight"
              checked={dayNight === "nuit"}
              onChange={() => setDayNight("nuit")}
              className="border-[#18769C]/50 outline-[#18769C] cursor-pointer"
            />{" "}
            Nuit
          </label>
        </div>

        <div>
          <p>Paiement :</p>
          <label>
            <input
              type="radio"
              name="payment"
              checked={paymentType === "complet"}
              onChange={() => setPaymentType("complet")}
              className="border-[#18769C]/50 outline-[#18769C] cursor-pointer"
            />{" "}
            Complet
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="payment"
              checked={paymentType === "partiel"}
              onChange={() => setPaymentType("partiel")}
              className="border-[#18769C]/50 outline-[#18769C] cursor-pointer"
            />{" "}
            Partiel
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-4 border-b border-[#18769C]/50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Prix : {item.price} Ar</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, -1)}
                className="px-2 py-1 cursor-pointer bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, +1)}
                className="px-2 py-1 cursor-pointer bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <span>{(item.price * item.quantity).toFixed(2)} Ar</span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
            >
              <MdDelete size={20} />
            </button>
            {availabilityErrors[item.id] && (
              <p className="text-red-600 text-sm mt-1">
                {availabilityErrors[item.id]}
              </p>
            )}
          </div>
        ))}

        <div className="text-right font-bold text-xl">
          Total à payer : {total} Ar ({totalItems} produit
          {totalItems > 1 ? "s" : ""})
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="p-2 cursor-pointer rounded hover:bg-gradient-to-l hover:from-[#18769C] hover:to-[#18769C]/20 bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white"
      >
        {isSubmitting ? "Envoi…" : "Envoyer la demande"}
      </button>
    </form>
  );
}
