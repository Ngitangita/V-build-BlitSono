import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function ProtectedNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-100">
      <FaLock className="text-6xl text-[#EF4444] mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Accès protégé ou page introuvable</h1>
      <p className="text-lg text-gray-600 mb-6">
        Cette page est réservée aux administrateurs ou n'existe pas.
        <br />
        Vérifiez l'URL ou vos permissions d'accès.
      </p>
      <Link
        to="/admin"
        className="px-6 py-3 bg-[#18769C] text-white rounded-lg shadow hover:bg-[#155e76] transition-colors"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}

export default ProtectedNotFound;
