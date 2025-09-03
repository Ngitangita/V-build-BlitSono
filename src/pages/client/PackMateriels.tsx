import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersPacks from "../../components/clientHome/FiltersPacks";
import { priceRanges } from "../../constants/priceRanges";
import ScrollDownButton from "../../components/clientHome/ScrollDownButton";
import { useCartStore } from "../../stores/useCartStore";
import Slider from "react-slick";
import {
  FaShoppingCart,
  FaHeadphones,
  FaPhone,
  FaThumbsUp,
} from "react-icons/fa";
import { MdFilterList, MdShoppingCart, MdList } from "react-icons/md";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { FadeIn } from "../../components/clientHome/FadeIn";
import { allPackItems } from "../../data/allPackItems";
import type { PackItemsType } from "../../types/types";

type ArrowProps = {
  onClick?: () => void;
};

export default function PackMateriels() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [filtered, setFiltered] = useState<PackItemsType[]>(allPackItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  const packs = Array.from(
    new Map(allPackItems.map((i) => [i.packId.id, i.packId])).values()
  );

  const [isGrid, setIsGrid] = useState(() => {
    const saved = localStorage.getItem("isGrid");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("isGrid", JSON.stringify(isGrid));
  }, [isGrid]);

  useEffect(() => {
    let res = allPackItems;
    if (q) res = res.filter((i) => i.packId.name.toLowerCase().includes(q));
    if (selectedCats.length)
      res = res.filter((i) => selectedCats.includes(i.packId.name));
    if (selectedPrices.length)
      res = res.filter((i) =>
        selectedPrices.some(
          (pr) => i.productId.prix >= pr.min && i.productId.prix < pr.max
        )
      );
    setFiltered(res);
  }, [q, selectedCats, selectedPrices]);

  const handleAddPack = (packId: number) => {
    try {
      const packItems = allPackItems.filter((i) => i.packId.id === packId);
      if (!packItems.length) {
        toast.error("Aucun produit trouvé pour ce pack.");
        return;
      }
      packItems.forEach((item) => {
        addToCart({
          id: item.productId.id,
          name: item.productId.nom,
          image_url: item.productId.image_url,
          price: item.productId.prix,
        });
      });
      setAddedIds((prev) => new Set(prev).add(packId));
      setTimeout(
        () =>
          setAddedIds((prev) => {
            const c = new Set(prev);
            c.delete(packId);
            return c;
          }),
        2000
      );
      toast.success("Pack ajouté au panier !");
    } catch {
      toast.error("Erreur lors de l'ajout du pack.");
    }
  };

  function SampleNextArrow({ onClick }: ArrowProps) {
    return (
      <div
        className="w-14 h-12 bg-[#18769C] hover:bg-[#0f5a70] duration-300 rounded-md text-2xl text-white flex justify-center items-center absolute top-0 right-0 shadow-lg cursor-pointer z-10"
        onClick={onClick}
      >
        <HiArrowRight />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }: ArrowProps) {
    return (
      <div
        className="w-14 h-12 bg-[#18769C] hover:bg-[#0f5a70] duration-300 rounded-md text-2xl text-white flex justify-center items-center absolute top-0 right-20 shadow-lg cursor-pointer z-10"
        onClick={onClick}
      >
        <HiArrowLeft />
      </div>
    );
  }

  const [dotActive, setDocActive] = useState(0);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (_current: number, next: number) => {
      setDocActive(next);
    },

    appendDots: (dots: React.ReactNode[]) => (
      <div style={{ borderRadius: "10px", padding: "10px" }}>
        <ul
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),

    customPaging: (i: number) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          background: i === dotActive ? "#ff014f" : "gray",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      ></div>
    ),
  };

  return (
    <div>
      <title>Réservation Pack | Blit Sono</title>
      <section className="bgImagePack">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaHeadphones size={48} /> Réservez votre pack Blit Sono
          </h1>
          <p className="italic mb-6 pl-4 border-l-4 border-[#18769C]">
            Choisissez parmi nos packs pour garantir la réussite de votre
            événement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ScrollDownButton />
            <a
              href="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63]"
            >
              <FaPhone /> Contactez-nous
            </a>
          </div>
        </div>
      </section>

      <div className="flex gap-6 p-4">
        <div
          className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            filterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 overflow-y-auto">
            <FiltersPacks
              packNames={packs.map((p) => p.name)}
              selectedPacks={selectedCats}
              onPacksChange={setSelectedCats}
              selectedPrices={selectedPrices}
              onPricesChange={setSelectedPrices}
              setFilterOpen={setFilterOpen}
              resetAll={() => {
                setSelectedCats([]);
                setSelectedPrices([]);
              }}
            />
          </div>
        </div>
        {filterOpen && (
          <div
            onClick={() => setFilterOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
        )}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 mt-4">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center cursor-pointer gap-2 p-2 bg-[#18769C] hover:bg-[#0f5a70] rounded-md text-white"
            >
              <MdFilterList className="w-6 h-6" /> Filtrer
            </button>
            <div className="flex flex-row gap-2 items-center">
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
              <div className="italic text-gray-600">
                Résultats pour : "<strong>{q}</strong>"
              </div>
            )}
          </div>

          {isGrid &&
            packs.map((pack) => {
              const produits = filtered.filter((i) => i.packId.id === pack.id);
              if (!produits.length) return null;

              return (
                <div
                  key={pack.id}
                  className=" p-3 rounded w-full space-y-3 mt-10"
                >
                  <h3 className="text-2xl font-semibold text-[#18769C]">
                    {pack.name}: {pack.price_override} Ar
                  </h3>
                  <p className="text-[#575756]">{pack.description}</p>
                  <FadeIn>
                    <Slider {...sliderSettings}>
                      {produits.map((item) => (
                        <div
                          key={item.productId.id}
                          className="w-full flex items-center justify-center bg-white group p-10"
                        >
                          <div className="max-w-6xl mx-auto">
                            <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-6 items-center">
                              <div className="group w-[400px] lg:w-[35%] h-full bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row lg:flex-col gap-8 justify-center md:justify-start lg:justify-center">
                                <div className="w-full h-[80%] overflow-hidden rounded-lg">
                                  <img
                                    className="h-72 md:h-32 lg:h-72 rounded-lg object-cover group-hover:scale-110 duration-300 cursor-pointer"
                                    src={item.productId.image_url}
                                    alt={item.productId.nom}
                                  />
                                </div>
                                <div className="w-full flex flex-col justify-end">
                                  <p className="text-xs uppercase text-pink-500 tracking-wide mb-2">
                                    Total stock: {item.productId.stock_total}
                                  </p>
                                  <h3 className="text-2xl font-bold text-white">
                                    {item.productId.nom}
                                  </h3>
                                  <p className="text-base text-gray-400">
                                    {item.productId.prix} Ar
                                  </p>
                                  <p className="text-gray-400">
                                    Stock disponible:{" "}
                                    {item.productId.stock_available}
                                  </p>
                                  <div className="flex items-center justify-end">
                                    <button
                                      onClick={() => handleAddPack(pack.id)}
                                      className={` ${
                                        addedIds.has(pack.id)
                                          ? "bg-green-500 hover:bg-green-600 text-white px-3 py-2"
                                          : ""
                                      } rounded-full group transition-all duration-300`}
                                    >
                                      {addedIds.has(pack.id) ? (
                                        "✓ Ajouté"
                                      ) : (
                                        <div className="flex items-center space-x-2">
                                          <span
                                            className="hidden group-hover:inline-block border border-[#18769C] text-[#18769C]
                                        bg-white px-3 py-2 rounded-l-full 
                                        hover:bg-[#18769C] hover:text-white text-sm transition-all duration-300
                                          p-1.5 justify-center cursor-pointer"
                                          >
                                            Ajouter au panier
                                          </span>
                                          <span
                                            className="text-lg pr-3 p-2.5 rounded-r-full cursor-pointer
                                         bg-[#18769C] hover:bg-[#0f5a70] text-white transition-all duration-300 flex items-center"
                                          >
                                            <FaShoppingCart />
                                          </span>
                                        </div>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="w-[500px] lg:w-[60%] h-full flex flex-col justify-between">
                                <div className="w-full h-[70%] py-10 bg-gray-800 rounded-lg shadow-lg p-4 lg:p-8 flex flex-col justify-center gap-4 lg:gap-8">
                                  <div className="flex flex-col justify-between lg:items-center py-6 border-b-2 border-gray-700">
                                    <div>
                                      <h3 className="text-xl lg:text-2xl font-medium tracking-wide text-[#18769C]">
                                        <span className="text-gray-400">
                                          {" "}
                                          Catégorie:{" "}
                                        </span>{" "}
                                        {item.productId.categoryId?.name}
                                        <span className="text-gray-400">
                                          {" "}
                                          - Quantité:{" "}
                                        </span>
                                        {item.quantite}
                                      </h3>
                                    </div>
                                  </div>
                                  <p className="text-base text-gray-400 font-medium tracking-wide leading-6">
                                    {item.productId.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </FadeIn>
                </div>
              );
            })}
          {!isGrid && (
            <div className="space-y-4">
              {packs.map((pack) => {
                const produits = filtered.filter(
                  (i) => i.packId.id === pack.id
                );
                if (!produits.length) return null;

                return (
                  <div
                    key={pack.id}
                    className="p-3 rounded bg-gray-100 shadow group"
                  >
                    <h3 className="text-2xl font-semibold text-[#18769C]">
                      {pack.name}: {pack.price_override} Ar
                    </h3>
                    <p className="text-[#575756]">{pack.description}</p>
                    <table className="w-full mt-2 border border-gray-300 rounded">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 text-left">Produit</th>
                          <th className="p-2">Prix</th>
                          <th className="p-2">Stock total</th>
                          <th className="p-2">Stock dispo</th>
                          <th className="p-2">Catégorie</th>
                          <th className="p-2">Description</th>
                          <th className="p-2">Quantité</th>
                        </tr>
                      </thead>
                      <tbody>
                        {produits.map((item) => (
                          <tr key={item.id} className="even:bg-gray-50">
                            <td className="p-2 flex items-center gap-2">
                              <img
                                src={item.productId.image_url}
                                alt={item.productId.nom}
                                className="w-12 h-12 object-cover rounded"
                              />
                              {item.productId.nom}
                            </td>
                            <td className="p-2">{item.productId.prix} Ar</td>
                            <td className="p-2">
                              {item.productId.stock_total}
                            </td>
                            <td className="p-2">
                              {item.productId.stock_available}
                            </td>
                            <td className="p-2">
                              {item.productId.categoryId?.name}
                            </td>
                            <td className="p-2">
                              {item.productId.description}
                            </td>
                            <td className="p-2">{item.quantite}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleAddPack(pack.id)}
                        className={` ${
                          addedIds.has(pack.id)
                            ? "bg-green-500 hover:bg-green-600 text-white px-3 py-2"
                            : ""
                        } rounded-full group transition-all duration-300`}
                      >
                        {addedIds.has(pack.id) ? (
                          "✓ Ajouté"
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span
                              className="hidden group-hover:inline-block border border-[#18769C] text-[#18769C]
                                        bg-white px-3 py-2 rounded-l-full 
                                        hover:bg-[#18769C] hover:text-white text-sm transition-all duration-300
                                          p-1.5 justify-center cursor-pointer"
                            >
                              Ajouter au panier
                            </span>
                            <span
                              className="text-lg pr-3 p-2.5 rounded-r-full cursor-pointer
                                         bg-[#18769C] hover:bg-[#0f5a70] text-white transition-all duration-300 flex items-center"
                            >
                              <FaShoppingCart />
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[700px]">
          <FaThumbsUp size={24} /> Merci d'avoir consulté nos packs !
        </h1>
        <p className="italic text-lg border-l-4 border-[#18769C] pl-4 w-[700px]">
          Chaque pack est conçu pour répondre à vos besoins événementiels.
          Faites confiance à notre équipe !
        </p>
      </div>
    </div>
  );
}
