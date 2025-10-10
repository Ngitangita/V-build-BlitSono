import { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../conf/axiosClient";
import { useCartStore } from "../../stores/useCartStore";
import { useAuthStore } from "../../stores/useAuthStore";
import type { CartItem } from "../../types/cart";
import type { UserType } from "../../types/user";

export type BasketFormProps = {
  items: CartItem[];
  total: number;
  remove: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  availabilityErrors?: Record<number, string>;
};

export default function BasketForm({
  items,
  total,
  remove,
  updateQuantity,
}: BasketFormProps) {
  const clearCart = useCartStore((s) => s.clear);
  const totalItems = useCartStore((s) => s.totalCount());
  const user = useAuthStore((s) => s.user) as UserType | null;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventDate: "",
    eventTime: "",
    location: "",
    duration: "",
    dayNight: "jour",
    paymentType: "complet",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reservationForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("reservationForm", JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.eventDate) e.eventDate = "Date requise.";
    if (!formData.eventTime) e.eventTime = "Heure requise.";
    if (!formData.location.trim()) e.location = "Lieu requis.";
    if (!formData.duration || Number(formData.duration) < 1)
      e.duration = "Durée invalide.";
    return e;
  };

  const sendReservation = async () => {
    const payload = {
      event_date: formData.eventDate,
      event_time: formData.eventTime,
      duration_hours: formData.duration,
      location: formData.location,
      products: items
        .filter((i) => i.type === "materiel")
        .map((i) => ({ id_product: i.id, quantity: i.quantity })),
      bundles: items
        .filter((i) => i.type === "pack")
        .map((i) => ({ id_bundle: i.id, quantity: i.quantity })),
    };

    try {
      await axiosClient.post("/reservations", payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Réservation enregistrée !");
      clearCart();
      localStorage.removeItem("reservationForm");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.message ||
          "Erreur lors de la réservation.";
        toast.error(msg);
      } else toast.error("Erreur inconnue.");
    } finally {
      setIsSubmitting(false);
      setCountdown(null);
    }
  };
  
  const startCountdown = () => {
    if (!user) {
      toast.warning("Veuillez vous connecter pour continuer.");
      navigate("/sign-in");
      return;
    }
    if (items.length === 0) {
      toast.info("Votre panier est vide.");
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Corrigez les erreurs avant de soumettre.");
      return;
    }
    setErrors({});
    setCountdown(5);
    setIsSubmitting(true);
    countdownRef.current = setInterval(() => {
      setCountdown((p) => {
        if (p !== null && p <= 1) {
          clearInterval(countdownRef.current!);
          sendReservation();
          return null;
        }
        return p ? p - 1 : null;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      setCountdown(null);
      setIsSubmitting(false);
      toast.info("Envoi annulé.");
    }
  };

  return (
    <form className="bg-white rounded-lg p-6 flex flex-col gap-6 w-[750px]">
      <p className="text-[#18769C]">
        Remplissez les informations de l'événement puis vérifiez votre panier.
      </p>

      <div className="flex flex-row gap-4 flex-wrap items-center">
        <Input
          label="Date"
          type="date"
          value={formData.eventDate}
          onChange={(v) => setFormData((d) => ({ ...d, eventDate: v }))}
          error={errors.eventDate}
        />
        <Input
          label="Heure"
          type="time"
          value={formData.eventTime}
          onChange={(v) => setFormData((d) => ({ ...d, eventTime: v }))}
          error={errors.eventTime}
        />
        <Input
          label="Lieu"
          type="text"
          value={formData.location}
          onChange={(v) => setFormData((d) => ({ ...d, location: v }))}
          placeholder="Lieu de l'événement"
          error={errors.location}
        />
        <Input
          label="Durée (heures)"
          type="number"
          value={formData.duration}
          onChange={(v) => setFormData((d) => ({ ...d, duration: v }))}
          min={1}
          error={errors.duration}
        />
      </div>

      <div className="flex gap-8 flex-wrap">
        <RadioGroup
          label="Moment"
          name="dayNight"
          options={[
            { value: "jour", label: "Jour" },
            { value: "nuit", label: "Nuit" },
          ]}
          selected={formData.dayNight}
          onChange={(v) => setFormData((d) => ({ ...d, dayNight: v }))}
        />
        <RadioGroup
          label="Paiement"
          name="payment"
          options={[
            { value: "complet", label: "Complet" },
            { value: "partiel", label: "Partiel" },
          ]}
          selected={formData.paymentType}
          onChange={(v) => setFormData((d) => ({ ...d, paymentType: v }))}
        />
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-4 border-b border-[#18769C]/40"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image_url || "/default-image.jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.price} Ar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, -1)}
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, +1)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <span>{(item.price * item.quantity).toFixed(2)} Ar</span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
        <div className="text-right font-bold text-xl">
          Total : {total} Ar ({totalItems} article
          {totalItems > 1 ? "s" : ""})
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={startCountdown}
          className="p-2 flex-1 cursor-pointer rounded hover:bg-gradient-to-l hover:from-[#18769C] hover:to-[#18769C]/20 
          bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white"
        >
          {countdown
            ? `Envoi dans ${countdown}s…`
            : isSubmitting
            ? "Envoi…"
            : "Envoyer la demande"}
        </button>
        {countdown && (
          <button
            type="button"
            onClick={cancelCountdown}
            className="p-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

function Input({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  min,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  min?: number;
}) {

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded border-[#18769C]/50 w-40"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  selected,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p>{label}</p>
      {options.map((opt) => (
        <label key={opt.value} className="ml-2">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="cursor-pointer"
          />{" "}
          {opt.label}
        </label>
      ))}
    </div>
  );
}
