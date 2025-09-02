import { Link } from "react-router-dom";
import { FaThumbsUp, FaHandPointRight } from "react-icons/fa";
import { allMateriels } from "../../data/allMateriels";


export default function Materiels() {
  return (
    <div className="px-8">
      <div className="text-[#18769C] w-full flex flex-col gap-4 pt-10 pb-8">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
          <FaThumbsUp size={24} /> Nos matériels adaptés à vos besoins
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#575756] flex items-center border-l-4 border-[#18769C] pl-4">
          Découvrez notre large gamme de matériels spécialisés : sonorisation,
          éclairage, DJ, studio, et bien plus. Chaque équipement a été
          sélectionné avec soin pour répondre précisément à vos attentes. Que
          vous soyez organisateur, artiste ou passionné, vous trouverez ici des
          solutions fiables et performantes.
        </p>
        <p className="italic text-sm sm:text-base">
          <FaHandPointRight size={20} className="inline mr-2 text-[#1E2939]" />
          Accédez aux détails de chaque matériel pour connaître les spécificités
          techniques, les tarifs, les avis clients, et les disponibilités en
          temps réel. Vous pourrez ainsi choisir le produit le plus adapté à
          votre événement, avec des options de réservation flexibles et un
          accompagnement personnalisé de notre équipe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allMateriels.slice(0, 9).map((m, i) => (
          <Link key={i} to={`/materiel/${m.id}`} className="group">
            <div className="p-4 flex flex-col items-center gap-3 transform transition duration-300 group-hover:scale-105">
              <img
                src={m.image_url}
                alt={m.nom}
                className="w-full max-w-xs h-40 md:h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg text-gray-800 group-hover:text-[#18769C]">
                {m.nom}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/catalogues"
          className="inline-block px-6 py-2 bg-[#18769C] text-white rounded hover:bg-[#145b76] transition"
        >
          Voir tous les matériels
        </Link>
      </div>

      <div className="text-[#1E2939] py-10 flex justify-center">
        <p className="w-full italic border-l-4 border-[#18769C] pl-4 flex gap-2 text-sm sm:text-base">
          Blit Sono vous accompagne pour vos événements avec un service fiable
          et attentionné, en proposant des équipements son et lumière
          professionnels, un système de réservation simple et une équipe à
          l'écoute. Faites confiance à notre savoir-faire et réservez dès
          maintenant : transformez votre projet en une expérience sonore
          inoubliable !
        </p>
      </div>
    </div>
  );
}
