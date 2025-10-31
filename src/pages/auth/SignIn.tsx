import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginValues, UserType } from "../../types/user";
import { useApiAuth } from "../../hooks/useApiAuth";
import { execute } from "../../utils/execute";
import { useAuthStore } from "../../stores/useAuthStore";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Adresse email invalide")
      .required("L'email est obligatoire"),
    mot_de_passe: yup.string().required("Le mot de passe est obligatoire"),
  })
  .required();

export const SignIn = () => {
  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  const setToken = useAuthStore.use.setToken();
  const setUser = useAuthStore.use.setUser();
  const navigate = useNavigate();

  const { signin } = useApiAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginValues) => {
    setLoading(true);
    const maxLoadingTimer = setTimeout(() => setLoading(false), 5000);

    execute(
      async () => {
        const res: { token: string; user: UserType } = await signin(
          data.email,
          data.mot_de_passe
        );
        return res;
      },
      {
        onSuccess: (res) => {
          setToken(res.token);
          setUser(res.user);
          setIsAuthenticated(true);
          navigate(res.user.id_role == 1 ? "/" : "/admin", {
            replace: true,
          });
          toast.success("Connexion réussie !");
        },
        onError: () => {
          setIsAuthenticated(false);
          setToken(null);
          setUser(null);
          toast.error("Identifiants incorrects.");
        },

        onFinally: () => {
          clearTimeout(maxLoadingTimer);
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-center bg-white px-4 py-8 text-[#575756] w-full">
        <title>Se connecter</title>

        <h1 className="text-center font-semibold font-open-sans text-2xl sm:text-3xl md:text-4xl">
          Mon Compte
        </h1>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start w-full max-w-7xl mt-10">
          <div className="flex flex-col gap-6 md:w-1/2 w-full px-4">
            <h2 className="text-xl font-semibold text-center md:text-left">
              Nouveau client ?
            </h2>
            <p className="text-[#18769C] text-sm text-justify">
              En créant votre compte sur beloyalit.com, vous gagnerez du temps
              lors de vos prochaines réservations de sonorisation, accéderez à
              l'ensemble des services de votre espace personnel et profiterez de
              nos diverses offres promotionnelles
            </p>
            <Link
              to="/sign-up"
              className="flex justify-center md:justify-start"
            >
              <button
                type="button"
                disabled={isSubmitting || loading}
                className="w-full sm:w-[300px] p-2 rounded bg-gradient-to-r 
                from-[#18769C]/20 to-[#18769C] hover:from-[#18769C] hover:to-[#18769C]/20 
                text-white text-lg cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Chargement...</span>
                ) : (
                  "Je crée mon compte"
                )}
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-6 md:w-1/2 w-full px-4">
            <h2 className="text-xl font-semibold text-center md:text-left">
              J'ai déjà un compte
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4 w-full"
            >
              <div className="w-full">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                   className={`p-2 w-full border rounded outline-[#18769C] ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#18769C]/50"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full relative">
                <label
                  htmlFor="mot_de_passe"
                  className="block mb-1 font-medium"
                >
                  Mot de passe
                </label>
                <input
                  id="mot_de_passe"
                  {...register("mot_de_passe")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className={`p-2 w-full border rounded outline-[#18769C] ${
                    errors.mot_de_passe
                      ? "border-red-500"
                      : "border-[#18769C]/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-12 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.mot_de_passe && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mot_de_passe.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full sm:w-[300px] p-2 rounded bg-gradient-to-r from-[#18769C] 
                to-[#18769C]/20 hover:from-[#18769C]/80 text-white text-lg self-center cursor-pointer"
              >
                {loading ? (
                  <span className="animate-pulse">Chargement...</span>
                ) : (
                  "Se connecter"
                )}
              </button>

              <p className="text-center mt-2 text-sm">
                <Link to="#" className="text-[#50a9f2] underline">
                  Mot de passe oublié ?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
