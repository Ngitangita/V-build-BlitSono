import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import type { FormValues } from "../../types/user";
import { Loading } from "../../components/Loading";
import { useApiAuth } from "../../hooks/useApiAuth";
import { execute } from "../../utils/execute";
import { useAuthStore } from "../../stores/useAuthStore";

const schema = yup.object({
  prenom: yup.string().required("Le prénom est obligatoire"),
  nom: yup.string().required("Le nom est obligatoire"),
  telephone: yup
    .string()
    .matches(/^[0-9\- ]*$/, "Le téléphone ne doit contenir que des chiffres, espaces ou tirets")
    .required("Le téléphone est obligatoire"),
  email: yup.string().email("Adresse email invalide").required("L'email est obligatoire"),
  mot_de_passe: yup.string().min(8, "Le mdp doit contenir au moins 8 caractères").required("Le mot de passe est obligatoire"),
  confirm: yup.string().oneOf([yup.ref("mot_de_passe")], "Les mots de passe doivent correspondre").required("La confirmation est obligatoire"),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useApiAuth();
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  const setToken = useAuthStore.use.setToken();
  const setUser = useAuthStore.use.setUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const fields: (keyof FormValues)[] = ["nom", "prenom", "telephone", "email", "mot_de_passe", "confirm"];
  const labels: Record<keyof FormValues, string> = {
    nom: "Nom",
    prenom: "Prénom",
    telephone: "Téléphone",
    email: "Email",
    mot_de_passe: "Mot de passe",
    confirm: "Confirmer le mot de passe",
  };

  const getInputType = (field: string): string => {
    if (field === "mot_de_passe") return showPassword ? "text" : "password";
    if (field === "confirm") return showConfirm ? "text" : "password";
    if (field === "email") return "email";
    return "text";
  };

  const toggleVisibility = (field: string) => {
    if (field === "mot_de_passe") setShowPassword((prev) => !prev);
    if (field === "confirm") setShowConfirm((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
  startTransition(() => {
    setLoading(true);

    const maxLoadingTimer = setTimeout(() => setLoading(false), 5000);

    execute(
      () =>
        signup({
          first_name: data.prenom,
          last_name: data.nom,
          email: data.email,
          password: data.mot_de_passe,
          password_confirmation: data.confirm,
          phone: data.telephone,
          id_role: 1, 
        }),
      {
        onSuccess: (res) => {
          setToken(res.token);
          setUser(res.user);
          setIsAuthenticated(true);
          toast.success("Inscription réussie !");
          navigate(res.user.id_role === 1 ? "/" : "/admin", { replace: true });
        },
        onError: (err) => {
          console.error("Erreur d'inscription :", err);
          toast.error("Échec de l'inscription. Vérifiez vos informations.");
        },
        onFinally: () => {
          clearTimeout(maxLoadingTimer);
          setLoading(false);
        },
      }
    );
  });
};


  return (
    <>
      {(pending || loading) && <Loading />}
      <div className="flex flex-col sm:flex-col gap-4 items-center justify-center bg-[#FFFFFF] p-4 pt-18 text-[#575756] w-full">
        <title>S'inscrire</title>

        <h1 className="text-center font-semibold font-open-sans text-[32px]">Je crée mon compte</h1>

        <div className="overflow-hidden w-full max-w-screen-xl px-4 sm:px-10">
          <h2 className="font-semibold text-[20px] mb-4">Identification</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-wrap gap-6 justify-between">
            {fields.map((field) => {
              const error = errors[field];
              const type = getInputType(field);
              const isPasswordField = field === "mot_de_passe" || field === "confirm";

              return (
                <div key={field} className="flex flex-col gap-1 w-full sm:w-[48%] max-w-[600px]">
                  <label htmlFor={field} className="text-sm font-medium">{labels[field]}</label>

                  <div className="relative">
                    <input
                      id={field}
                      {...register(field)}
                      type={type}
                      placeholder={labels[field]}
                      disabled={pending || loading}
                      className={`w-full p-2 pr-10 border rounded outline-[#18769C] ${error ? "border-red-500" : "border-[#18769C]/50"}`}
                    />
                    {isPasswordField && (
                      <button
                        type="button"
                        onClick={() => toggleVisibility(field)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                        tabIndex={-1}
                      >
                        {(field === "mot_de_passe" && showPassword) || (field === "confirm" && showConfirm) ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error.message}</p>}
                </div>
              );
            })}

            <div className="flex flex-col items-center w-full mt-4">
              <button
                type="submit"
                disabled={isSubmitting || pending || loading}
                className="w-full sm:w-[400px] p-2 rounded bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white hover:bg-gradient-to-l hover:from-[#18769C] hover:to-[#18769C]/20 cursor-pointer"
              >
                {pending || loading ? <span className="animate-pulse">Chargement...</span> : "S'inscrire"}
              </button>
              <p className="mt-2">
                Déjà inscrit ?{" "}
                <Link to="/sign-in" className="text-[#50a9f2] underline ml-1">Se connecter</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
