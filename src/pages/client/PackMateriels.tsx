import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersPacks from "../../components/clientHome/FiltersPacks";
import { priceRanges } from "../../constants/priceRanges";
import ScrollDownButton from "../../components/clientHome/ScrollDownButton";
import { useCartStore } from "../../stores/useCartStore";
import Slider from "react-slick";
import { FaShoppingCart, FaHeadphones, FaThumbsUp } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { FadeIn } from "../../components/clientHome/FadeIn";
import { allPackItems } from "../../data/allPackItems";
import type { BundleProductTypes } from "../../types/types";
import ContactButton from "../../components/clientHome/ContactButton";
import { motion } from "framer-motion";

type ArrowProps = { onClick?: () => void };

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

export default function PackMateriels() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [filtered, setFiltered] = useState<BundleProductTypes[]>(allPackItems);
  const [filterOpen, setFilterOpen] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const packs = Array.from(
    new Map(allPackItems.map((i) => [i.bundle.id_bundle, i.bundle])).values()
  );

  useEffect(() => {
    let res = [...allPackItems];

    if (q) {
      const query = q.toLowerCase();
      res = res.filter(
        (item) =>
          item.product.name?.toLowerCase().includes(query) ||
          item.bundle.name?.toLowerCase().includes(query) ||
          item.product.category?.name.toLowerCase().includes(query)
      );
    }

    if (selectedCats.length) {
      res = res.filter(
        (item) =>
          item.product.category &&
          selectedCats.includes(item.product.category.name)
      );
    }

    if (selectedPrices.length) {
      res = res.filter((item) =>
        selectedPrices.some(
          (pr) =>
            item.product.daily_price >= pr.min &&
            item.product.daily_price < pr.max
        )
      );
    }

    setFiltered(res);
  }, [q, selectedCats, selectedPrices]);

  const handleAddPack = (packId: number) => {
    const packItems = allPackItems.filter((i) => i.bundle.id_bundle === packId);
    if (!packItems.length) {
      toast.error("Aucun produit trouvé pour ce pack.");
      return;
    }
    packItems.forEach((item) =>
      addToCart({
        id: item.product.id_product!,
        name: item.product.name,
        image_url: item.product.image_url,
        price: item.product.daily_price,
        type: "pack",
      })
    );
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

  const [dotActive, setDotActive] = useState(0);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (_current: number, next: number) => setDotActive(next),
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
      />
    ),
  };

  return (
    <div>
      <title>Réservation Pack | BeLoyal</title>

      <section className="bgImagePack">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white w-full flex flex-col px-4 py-8 pl-20 pt-20">
          <h1 className="text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl font-extrabold mb-4 flex gap-2">
            <FaHeadphones size={48} /> Réservez votre pack BeLoyal
          </h1>
          <p className="italic mb-6 pl-4 border-l-4 border-[#18769C]">
            Choisissez parmi nos packs pour garantir la réussite de votre
            événement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ScrollDownButton />
            <ContactButton />
          </div>
        </div>
      </section>

      <div className="flex gap-6 p-4 relative">
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
          <div className="flex items-center mb-4 mt-4 sticky top-0 bg-white z-20 p-2 shadow">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center cursor-pointer gap-2 p-2 bg-[#18769C] hover:bg-[#0f5a70] rounded-md text-white"
            >
              <MdFilterList className="w-6 h-6" /> Filtrer
            </button>

            {q && (
              <div className="italic text-gray-600">
                Résultats pour : "<strong>{q}</strong>"
              </div>
            )}
          </div>

          {packs.map((pack) => {
            const produits = filtered.filter(
              (i) => i.bundle.id_bundle === pack.id_bundle
            );
            if (!produits.length) return null;

            return (
              <div
                key={pack.id_bundle}
                className="p-3 rounded w-full space-y-3 mt-10"
              >
                <h3 className="text-2xl font-semibold text-[#18769C]">
                  {highlightMatch(pack.name, q)}:{" "}
                  {highlightMatch(pack.daily_price.toString() + " Ar", q)}
                </h3>
                <p className="text-[#575756]">
                  {highlightMatch(pack.description || "", q)}
                </p>

                <FadeIn>
                  <Slider {...sliderSettings}>
                    {produits.map((item) => (
                      <PackItem
                        key={item.product.id_product}
                        item={item}
                        q={q}
                        handleAddPack={handleAddPack}
                        addedIds={addedIds}
                      />
                    ))}
                  </Slider>
                </FadeIn>
              </div>
            );
          })}
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

function PackItem({
  item,
  q,
  handleAddPack,
  addedIds,
}: {
  item: BundleProductTypes;
  q: string;
  handleAddPack: (packId: number) => void;
  addedIds: Set<number>;
}) {
  return (
    <div className="w-full flex items-center justify-center bg-white group p-6 lg:p-10 rounded shadow-lg">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        <div className="h-72 overflow-hidden rounded-lg shadow-lg">
          <motion.img
            src={item.product.image_url?.trim() || "/images/placeholder.png"}
            alt={item.product.name || "Produit"}
            className="w-full h-72 object-cover rounded-lg cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-xs uppercase text-pink-500 tracking-wide">
            Total stock: {item.product.stock_quantity}
          </p>

          <h3 className="text-2xl font-bold text-gray-800">
            {highlightMatch(item.product.name, q)}
          </h3>

          <p className="text-base text-gray-600">
            {highlightMatch(item.product.daily_price.toString() + " Ar", q)}
          </p>

          <div className="py-4 border-b-2 border-gray-200">
            <h3 className="text-lg font-medium text-[#18769C]">
              <span className="text-gray-500">Catégorie : </span>
              {highlightMatch(item.product.category?.name || "", q)}
              <span className="text-gray-500"> — Quantité : </span>
              {item.quantity}
            </h3>
          </div>

          <p className="text-sm text-gray-500 leading-6">
            {highlightMatch(item.product.description || "", q)}
          </p>

          <div className="flex items-center justify-end mt-2">
            <button
              onClick={() => handleAddPack(item.bundle.id_bundle)}
              className={`${
                addedIds.has(item.bundle.id_bundle)
                  ? "bg-green-500 hover:bg-green-600 text-white px-3 py-2"
                  : ""
              } rounded-full group transition-all duration-300`}
            >
              {addedIds.has(item.bundle.id_bundle) ? (
                "✓ Ajouté"
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="hidden group-hover:inline-block border border-[#18769C] text-[#18769C] bg-white px-3 py-2 rounded-l-full hover:bg-[#18769C] hover:text-white text-xs sm:text-sm transition-all duration-300 cursor-pointer">
                    Ajouter au panier
                  </span>
                  <span className="text-base sm:text-lg pr-3 p-2.5 rounded-r-full cursor-pointer bg-[#18769C] hover:bg-[#0f5a70] text-white transition-all duration-300 flex items-center">
                    <FaShoppingCart />
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
