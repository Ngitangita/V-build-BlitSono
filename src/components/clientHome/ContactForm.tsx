import { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Efface l'erreur quand l'utilisateur tape
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Le prénom est obligatoire";
    if (!form.lastName.trim()) newErrors.lastName = "Le nom est obligatoire";
    if (!form.email.trim()) newErrors.email = "L'email est obligatoire";
    if (!form.comment.trim()) newErrors.comment = "Le message est obligatoire";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Formulaire envoyé", form);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        <p className="text-sm italic text-gray-500">
          <span className="text-red-600">*</span> Indique un champ obligatoire
        </p>

        <div>
          <label className="block text-sm font-semibold tracking-wider text-gray-800">
            NOM <span className="text-red-600">*</span>
          </label>

          <div className="mt-4 flex flex-col gap-6">
            <div>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Prénom"
                aria-label="Prénom"
                className={`w-full border-2 p-2 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Nom"
                aria-label="Nom"
                className={`w-full border-2 p-2 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold tracking-wider text-gray-800">TÉLÉPHONE</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Votre numéro de téléphone"
            className="mt-4 w-full border-2 border-gray-300 p-2 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Numéro de téléphone"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold tracking-wider text-gray-800">
            EMAIL <span className="text-red-600">*</span>
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Votre adresse email"
            type="email"
            className={`mt-4 w-full border-2 p-2 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-label="Adresse email"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold tracking-wider text-gray-800">
            MESSAGE <span className="text-red-600">*</span>
          </label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Votre message..."
            className={`mt-4 w-full h-52 border-2 p-2 placeholder-gray-400 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              errors.comment ? "border-red-500" : "border-gray-300"
            }`}
            aria-label="Message"
          />
          {errors.comment && <p className="text-red-600 text-sm mt-1">{errors.comment}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-block px-8 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white cursor-pointer
            font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
