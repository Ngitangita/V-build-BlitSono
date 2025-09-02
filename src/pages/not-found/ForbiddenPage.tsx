import { Link } from "react-router-dom";
export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">403 - Accès interdit</h1>
      <p className="mt-4 text-gray-600">
        Vous n'avez pas l'autorisation d'accéder à cette page.
      </p>
       <Link
        to="/"
        className="px-6 py-3 mt-7 bg-[#18769C] text-white rounded-lg shadow hover:bg-[#155e76] transition"
      >
        Revenir à l'accueil
      </Link>
    </div>
  );
}
