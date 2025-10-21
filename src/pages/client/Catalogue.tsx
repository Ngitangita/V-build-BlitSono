import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersCategory from "../../components/clientHome/FiltersCategory";
import ScrollDownButton from "../../components/clientHome/ScrollDownButton";
import { useCartStore } from "../../stores/useCartStore";
import { FaShoppingCart, FaThumbsUp } from "react-icons/fa";
import {
  MdFilterList,
  MdClose,
  MdList,
  MdShoppingCart,
  MdInfoOutline,
} from "react-icons/md";
import { toast } from "react-toastify";
import type { MaterielsType, Category } from "../../types/types";
import ContactButton from "./../../components/clientHome/ContactButton";
import { motion } from "framer-motion";
import axiosClient from "./../../conf/axiosClient";

type PriceRange = { label: string; min: number; max: number };

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-300 text-black">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function Catalogue() {
  const [searchParams,] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const cat = searchParams.get("cat") || "";
  const [materiels, setMateriels] = useState<MaterielsType[]>([]);
  const [categories, setCategories] = useState<
    { id_category: number; name: string }[]
  >([]);
  const [selectedPrices, setSelectedPrices] = useState<PriceRange[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [initializedCat, setInitializedCat] = useState(false);
  const [filtered, setFiltered] = useState<MaterielsType[]>([]);
  const [open, setOpen] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [priceRanges, setPriceRanges] = useState<
    { label: string; min: number; max: number }[]
  >([]);
  const [isGrid, setIsGrid] = useState(() => {
    const saved = localStorage.getItem("isGrid");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("isGrid", JSON.stringify(isGrid));
  }, [isGrid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          axiosClient.get("/products"),
          axiosClient.get("/categories"),
        ]);

        const d = resProducts.data;
        let arr: MaterielsType[] = [];
        if (Array.isArray(d)) arr = d;
        else if (Array.isArray(d.data)) arr = d.data;

        const mapped: MaterielsType[] = arr.map((m) => ({
          ...m,
          image_url: m.image_url ?? "",
          stock_quantity: m.stock_quantity ?? 0,
        }));

        setMateriels(mapped);

        if (mapped.length) {
          const prices = [...new Set(mapped.map((m) => m.daily_price))].sort(
            (a, b) => a - b
          );

          const ranges: { label: string; min: number; max: number }[] = [];

          for (let i = 0; i < prices.length; i++) {
            const min = prices[i];
            const max = prices[i + 1] ? prices[i + 1] : min;
            ranges.push({
              label: max > min ? `${min} Ar - ${max} Ar` : `${min} Ar`,
              min,
              max: max > min ? max : min + 1,
            });
          }

          setPriceRanges(ranges);
        }

        const c = resCategories.data;
        let cats: Category[] = [];

        if (Array.isArray(c)) {
          cats = c as Category[];
        } else if (Array.isArray(c?.data)) {
          cats = c.data as Category[];
        }

        setCategories(cats);
      } catch (err: unknown) {
        console.error("Erreur fetch:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!initializedCat && cat) {
      const found = categories.find((c) => c.name === cat);
      if (found) setSelectedCats([found.name]);
      setInitializedCat(true);
    }
  }, [cat, categories, initializedCat]);

  useEffect(() => {
    let res = [...materiels];

    if (q) {
      res = res.filter((item) =>
        item.name?.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (selectedCats.length) {
      res = res.filter(
        (item) => item.category && selectedCats.includes(item.category.name)
      );
    }

    if (selectedPrices.length) {
      res = res.filter((item) =>
        selectedPrices.some(
          (pr) => item.daily_price >= pr.min && item.daily_price < pr.max
        )
      );
    }

    setFiltered(res);
  }, [q, selectedCats, selectedPrices, materiels]);

  const toggleAdded = (id: number, item: MaterielsType) => {
    if (item.id_product === undefined) {
      toast.error("Impossible d'ajouter ce produit au panier : ID manquant.");
      return;
    }

    try {
      addToCart({
        id: item.id_product,
        name: item.name,
        image_url: item.image_url,
        price: item.daily_price,
        type: "materiel",
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
        <title>Catalogues | BeLoyal</title>
        <div
          className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20"
        >
          <h1 className="text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            Découvrez le catalogue BeLoyal - chaque matériel compte pour la
            réussite de votre événement.
          </h1>
          <p className="w-full sm:w-[500px] text-base sm:text-lg italic mb-6 text-center sm:text-start border-l-4 border-[#18769C] pl-4">
            Notre équipe vous accompagne avec bienveillance pour vous aider à
            choisir le meilleur matériel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ScrollDownButton />
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row p-5 md:gap-5">
        <button
          className={`sm:hidden text-2xl mb-4 focus:outline-none cursor-pointer
             flex items-center gap-2 p-2 rounded-md text-white ${
               open
                 ? "bg-transparent text-black"
                 : "bg-[#18769C] hover:bg-[#0f5a70]"
             }`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <>
              <MdClose className="w-6 h-6 cursor-pointer" /> Fermer
            </>
          ) : (
            <>
              <MdFilterList className="w-6 h-6 cursor-pointer" /> Filtrer
            </>
          )}
        </button>

        <div
          className={`fixed inset-y-0 left-0 z-30 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
           ${open ? "translate-x-0 top-16" : "-translate-x-full"}
           sm:relative sm:translate-x-0 sm:bg-transparent sm:shadow-none`}
        >
          <FiltersCategory
            categories={categories.map((c) => c.name)}
            selectedCats={selectedCats}
            onCatsChange={setSelectedCats}
            selectedPrices={selectedPrices}
            onPricesChange={setSelectedPrices}
            resetAll={() => {
              setSelectedCats([]);
              setSelectedPrices([]);
            }}
            priceRanges={priceRanges}
          />
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-20 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <div className="flex-1 overflow-hidden bg-white p-4">
          
          <div className="flex flex-col sm:flex-row justify-start gap-20 items-start sm:items-center mb-4">
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
                ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "gap-4 grid grid-cols-1 sm:grid-cols-2"
            }
          >
            {filtered.length === 0 ? (
              <div
                className="flex flex-col justify-center items-center col-span-1 
              sm:col-span-3 lg:col-span-4 xl:col-span-5 h-96 rounded bg-white"
              >
                <MdInfoOutline className="text-gray-400 text-6xl mb-2" />
                <span className="text-gray-500 font-medium text-lg">
                  Aucun matériel trouvé
                </span>
              </div>
            ) : (
              filtered.map((m) => (
                <motion.div
                  key={m.id_product}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`group rounded p-3 relative h-auto w-full max-w-full hover:bg-gray-100
                  ${
                    isGrid
                      ? "flex flex-col items-center"
                      : "flex flex-col items-center gap-4 sm:flex-row"
                  }`}
                >
                  <div
                    className={`group transition duration-300 rounded p-3 relative
                      h-auto
                      ${
                        isGrid
                          ? "flex flex-col items-center"
                          : "flex flex-col items-center gap-4 sm:flex-row"
                      }`}
                  >
                    <img
                      src={m.image_url}
                      alt={m.name}
                      className="rounded object-cover flex-shrink-0 w-full h-auto sm:h-24 sm:w-full"
                      style={{ maxWidth: isGrid ? "160px" : "80px" }}
                    />

                    <div className="flex flex-col sm:items-center gap-2 flex-1">
                      <h3 className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                        {highlightMatch(m.name, q)}
                      </h3>
                      <p className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                        {highlightMatch(m.daily_price.toString() + " Ar", q)}
                      </p>
                    </div>

                    <div
                      className={`mt-2 flex items-center gap-1
                      ${
                        isGrid
                          ? "absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          : "ml-auto"
                      }`}
                    >
                      <Link
                        to={`/materiel/${m.id_product}`}
                        className="w-[90px] border border-[#18769C] text-[#18769C]
                        bg-white p-1.5 rounded-l-full hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                      >
                        Voir détail
                      </Link>
                      <button
                        onClick={() => toggleAdded(m.id_product ?? 0, m)}
                        className={`p-2 pr-3 rounded-r-full cursor-pointer ${
                          addedIds.has(m.id_product ?? 0)
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-[#18769C] hover:bg-[#0f5a70]"
                        } text-white transition duration-200`}
                      >
                        {addedIds.has(m.id_product ?? 0) ? (
                          "✓"
                        ) : (
                          <FaShoppingCart className="text-lg" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-[#18769C] py-10 flex justify-center sm:justify-end">
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl font-extrabold mb-4 text-center sm:text-left flex flex-row gap-2">
            <FaThumbsUp size={24} /> Merci d'avoir exploré le catalogue BeLoyal !
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
