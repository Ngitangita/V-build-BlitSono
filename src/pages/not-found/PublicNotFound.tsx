import { Link } from "react-router-dom";

function PublicNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50">
      <h1 className="text-6xl font-bold text-[#18769C] mb-2">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Oops ! Cette page n'existe pas.</h2>
      <p className="text-gray-600 mb-6">
        Il semble que vous ayez suivi un lien brisé ou entré une adresse incorrecte.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#18769C] text-white rounded-lg shadow hover:bg-[#155e76] transition"
      >
        Revenir à l’accueil
      </Link>
    </div>
  );
}

export default PublicNotFound;
