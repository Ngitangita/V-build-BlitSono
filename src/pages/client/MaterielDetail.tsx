import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";
import { allMateriels } from "../../data/allMateriels";


export default function MaterielDetail() {
  const { id } = useParams<{ id: string }>();
  const mat = allMateriels.find((m) => m.id === Number(id));
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [id]);

  if (!mat) {
    return <div className="p-4">Matériel non trouvé.</div>;
  }

  const handleAdd = () => {
    addToCart({
      id: mat.id,
      name: mat.nom,
      image_url: mat.image_url,
      price: mat.prix_location,
    });
    setAdded(true);
  };

  return (
    <div>
      <title>Détail du matériel | Blit Sono</title>
      <section
        className="
    bg-cover bg-center bg-no-repeat
  "
        style={{ backgroundImage: `url(${mat.image_url})` }}
      >
        <div
          className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
         text-white py-10 w-full flex flex-col pl-30"
        >
          <p className="text-3xl font-extrabold mb-4 flex gap-1 items-center">
            <FaHeadphones className="text-4xl text-[#18769C]" />
            Détail du matériel : <strong>{mat.nom}</strong>
            (catégorie : <em>{mat.categorieId.nom}</em>)
          </p>
          <p className="w-[800px] text-lg italic mb-6 text-start border-l-4 border-[#18769C] pl-4">
            Admirez cette pièce d'exception : design soigné et fonctionnalités
            premium, le tout à seulement
            <strong> {mat.prix_location} Ar</strong>.
            Stock :  <strong> {mat.stock_available} article </strong> disponible sur{" "}
             <strong>{mat.stock_total} article </strong> au total. Un vrai atout pour vos
            événements !
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={mat.image_url}
            alt={mat.nom}
            className="w-full md:w-1/2 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-row gap-7 items-center">
              <h1 className="text-3xl font-semibold mb-2">
                {mat.nom}
              </h1>
              <Link
                to="/catalogues"
                className="text-[#18769C] hover:underline text-2xl"
              >
                ← Retour au catalogue
              </Link>
            </div>
            <p className="mb-6">{mat.description}</p>
            <button
              onClick={handleAdd}
              className={`px-6 py-3 rounded cursor-pointer ${
                added
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#18769C] hover:bg-[#0f5a70]"
              } text-white transition duration-200`}
            >
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </div>
      <div className="py-10 w-full flex flex-col pr-30 items-end">
        <p className="w-[500px] text-lg italic mb-6 text-start flex border-l-4 border-[#18769C] pl-4
        text-[#1E2939]">
          <FaThumbsUp className="mr-2 text-6xl text-[#18769C]" /> Merci de considérer{" "}
          {mat.nom} avec BlitSono ! Nous sommes convaincus que ce
          matériel apportera professionnalisme et qualité à votre événement.
          Réservez en toute confiance !
        </p>
      </div>
    </div>
  );
}
