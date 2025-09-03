import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersCategory from "../../components/clientHome/FiltersCategory";
import { priceRanges } from "../../constants/priceRanges";
import ScrollDownButton from "../../components/clientHome/ScrollDownButton";
import { useCartStore } from "../../stores/useCartStore";
import { FaShoppingCart, FaPhone, FaThumbsUp } from "react-icons/fa";
import { MdFilterList, MdClose, MdList, MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { allMateriels } from "../../data/allMateriels";
import type { MaterielsType } from "../../types/types";

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const cat = searchParams.get("cat") || "";
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [initializedCat, setInitializedCat] = useState(false);
  const [filtered, setFiltered] = useState<MaterielsType[]>(allMateriels);
  const [open, setOpen] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const categories = Array.from(
    new Set(
      allMateriels
        .map((m) => m.categorieId?.nom)
        .filter((name): name is string => Boolean(name))
    )
  );

  const [isGrid, setIsGrid] = useState(() => {
    const saved = localStorage.getItem("isGrid");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("isGrid", JSON.stringify(isGrid));
  }, [isGrid]);

  useEffect(() => {
    if (!initializedCat && cat) {
      const found = allMateriels.find((m) => m.categorieId?.nom === cat);
      if (found && found.categorieId) setSelectedCats([found.categorieId.nom]);
      setInitializedCat(true);
    }
  }, [cat, initializedCat]);

  useEffect(() => {
    let res = allMateriels;
    if (q) res = res.filter((item) => item.nom.toLowerCase().includes(q));
    if (selectedCats.length)
      res = res.filter(
        (item) =>
          item.categorieId && selectedCats.includes(item.categorieId.nom)
      );
    if (selectedPrices.length) {
      res = res.filter((item) =>
        selectedPrices.some(
          (pr) => item.prix_location >= pr.min && item.prix_location < pr.max
        )
      );
    }
    setFiltered(res);
  }, [q, selectedCats, selectedPrices]);

  const toggleAdded = (id: number, item: MaterielsType) => {
    try {
      addToCart({
        id: item.id,
        name: item.nom,
        image_url: item.image_url,
        price: item.prix_location,
      });
      setAddedIds((prev) => new Set(prev).add(id));

      setTimeout(() => {
        setAddedIds((prev) => {
          const c = new Set(prev);
          c.delete(id);
          return c;
        });
      }, 2000);

      toast.success("Produit ajouté au panier !");
    } catch {
      toast.error("Erreur lors de l'ajout au panier.");
    }
  };

  return (
    <div>
      <section className="bgImageCatalogue">
        <div
          className="
          bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20
        "
        >
          <h1
            className="
          text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
          font-extrabold mb-4 flex gap-2
        "
          >
            Découvrez le catalogue Blit Sono - chaque matériel compte pour la
            réussite de votre événement.
          </h1>
          <p className="w-full sm:w-[500px] text-base sm:text-lg italic mb-6 text-center sm:text-start border-l-4 border-[#18769C] pl-4">
            Notre équipe vous accompagne avec bienveillance pour vous aider à
            choisir le meilleur matériel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ScrollDownButton />
            <a
              href="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </a>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row mt-4 p-5">
        <button
          className={`sm:hidden text-2xl mb-4 focus:outline-none cursor-pointer flex items-center gap-2 p-2 rounded-md text-white ${
            open
              ? "bg-transparent text-black"
              : "bg-[#18769C] hover:bg-[#0f5a70]"
          }`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <>
              <MdClose className="w-6 h-6 cursor-pointer" />
              Fermer
            </>
          ) : (
            <>
              <MdFilterList className="w-6 h-6 cursor-pointer" />
              Filtrer
            </>
          )}
        </button>

        <div
          className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0 top-16" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:w-1/4 sm:bg-transparent sm:shadow-none
        `}
        >
          <FiltersCategory
            categories={categories}
            selectedCats={selectedCats}
            onCatsChange={setSelectedCats}
            selectedPrices={selectedPrices}
            onPricesChange={setSelectedPrices}
            resetAll={() => {
              setSelectedCats([]);
              setSelectedPrices([]);
            }}
          />
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-20 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setIsGrid(true)}
                className={`px-3 py-1 rounded cursor-pointer flex flex-row gap-2 items-center ${
                  isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                <MdShoppingCart /> Carte
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`px-3 py-1 ml-2 rounded cursor-pointer flex flex-row gap-2 items-center ${
                  !isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                <MdList /> Liste
              </button>
            </div>
            {q && (
              <div className="text-sm italic text-gray-600 mt-2 sm:mt-0">
                Résultats pour : <strong>"{q}"</strong>
              </div>
            )}
          </div>

          <div
            className={
              isGrid
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "gap-4 grid grid-cols-1 sm:grid-cols-2"
            }
          >
            {filtered.length === 0 ? (
              <p>Aucun résultat trouvé.</p>
            ) : (
              filtered.map((m) => (
                <div
                  key={m.id}
                  className={`
                  group transition duration-300 rounded p-3 relative hover:scale-105
                   hover:bg-white
                  ${
                    isGrid
                      ? "flex flex-col items-center"
                      : "flex items-center gap-4"
                  }
                `}
                >
                  <img
                    src={m.image_url}
                    alt={m.nom}
                    className={`rounded object-cover flex-shrink-0 ${
                      isGrid ? "w-40 h-24" : "w-20 h-14"
                    }`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                    <h3 className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                      {m.nom}
                    </h3>
                    <p className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                      - {m.prix_location} Ar
                    </p>
                  </div>
                  <div
                    className={`
                    mt-2 flex items-center gap-1
                    ${
                      isGrid
                        ? "absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        : "ml-auto"
                    }`}
                  >
                    <Link
                      to={`/materiel/${m.id}`}
                      className="w-[90px] border border-[#18769C] text-[#18769C]
                       bg-white p-1.5 rounded-l-full hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                    >
                      Voir détail
                    </Link>
                    <button
                      onClick={() => toggleAdded(m.id, m)}
                      className={`p-2 pr-3 rounded-r-full cursor-pointer ${
                        addedIds.has(m.id)
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-[#18769C] hover:bg-[#0f5a70]"
                      } text-white transition duration-200`}
                    >
                      {addedIds.has(m.id) ? (
                        "✓"
                      ) : (
                        <FaShoppingCart className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-[#18769C] py-10 flex justify-center sm:justify-end">
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl font-extrabold mb-4 text-center sm:text-left flex flex-row gap-2">
            <FaThumbsUp size={24} /> Merci d'avoir exploré le catalogue Blit
            Sono !
          </h1>
          <p className="text-base sm:text-lg lg:text-xl italic text-[#1E2939] border-l-4 border-[#18769C] pl-4">
            Chaque équipement a été pensé pour sublimer vos événements. Notre
            équipe dévouée reste à vos côtés pour vous guider, vous conseiller
            et vous assurer une expérience 100 % sereine. Réservez en toute
            confiance - chaque matériel compte pour faire de votre projet un
            succès !
          </p>
        </div>
      </div>
    </div>
  );
}
