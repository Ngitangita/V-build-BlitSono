import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { FaHeadphones, FaThumbsUp } from "react-icons/fa";
import ContactButton from './../../components/clientHome/ContactButton';
import type { MaterielsType } from "../../types/types";
import axiosClient from './../../conf/axiosClient';

export default function MaterielDetail() {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((s) => s.addToCart);

  const [mat, setMat] = useState<MaterielsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchById = async (id_product: number) => {
      try {
        const res = await axiosClient.get(`/products/${id_product}`);
        const product = res.data;

        if (product) {
          setMat({
            ...product,
            image_url: product.image_url ?? "",
            stock_total: product.stock_total ?? 0,
            stock_available: product.stock_available ?? 0,
          });
        } else {
          setMat(null);
        }
      } catch (err) {
        console.error("Erreur fetch by id:", err);
        setMat(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setAdded(false);
      fetchById(Number(id));
    }
  }, [id]);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (!mat) return <div className="p-4">Matériel non trouvé.</div>;

  const handleAdd = () => {
    addToCart({
      id: mat.id_product ?? 0,
      name: mat.name,
      image_url: mat.image_url,
      price: mat.daily_price,
      type: "materiel",
    });
    setAdded(true);
  };

  return (
    <div>
      <title>Détail du matériel | BeLoyal</title>
      <section
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mat.image_url})` }}
      >
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white py-10 w-full flex flex-col pl-30"
        >
          <p className="text-3xl font-extrabold mb-4 flex gap-1 items-center">
            <FaHeadphones className="text-4xl text-[#18769C]" />
            Détail du matériel : <strong>{mat.name}</strong>
            (catégorie : <em>{mat.category?.name}</em>)
          </p>
          <p className="w-[800px] text-lg italic mb-6 text-start border-l-4 border-[#18769C] pl-4">
            Admirez cette pièce d'exception : design soigné et fonctionnalités
            premium, le tout à seulement
            <strong> {mat.daily_price} Ar</strong>.
            Stock : <strong>{mat.stock_quantity} article</strong> au total.
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="w-full mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={mat.image_url}
            alt={mat.name}
            className="w-full md:w-1/2 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-row gap-7 items-center">
              <h1 className="text-3xl font-semibold mb-2">{mat.name}</h1>
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
        <p className="w-[500px] text-lg italic mb-6 text-start flex border-l-4 border-[#18769C] pl-4 text-[#1E2939]">
          <FaThumbsUp className="mr-2 text-6xl text-[#18769C]" /> Merci de considérer{" "}
          {mat.name} avec BeLoyal !
        </p>
      </div>
    </div>
  );
}
