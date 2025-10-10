import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { priceRanges } from "../../constants/priceRanges";

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

type Props = {
  packNames: string[];
  selectedPacks: string[];
  onPacksChange: (packs: string[]) => void;
  selectedPrices: PriceRange[];
  onPricesChange: (prs: PriceRange[]) => void;
  resetAll: () => void;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SCROLL_DISTANCE = 0;
const START_BOTTOM = 0;
const END_BOTTOM = 0;

export default function FiltersPacks({
  packNames,
  selectedPacks,
  onPacksChange,
  selectedPrices,
  onPricesChange,
  resetAll,
  setFilterOpen,
}: Props) {
  const [showAllPacks, setShowAllPacks] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [bottom, setBottom] = useState(START_BOTTOM);
  const [searchTerm, setSearchTerm] = useState("");

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / SCROLL_DISTANCE, 1);
      const interpolated = START_BOTTOM + (END_BOTTOM - START_BOTTOM) * progress;
      setBottom(interpolated);
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    requestRef.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const toggle = <T,>(array: T[], item: T, setter: (a: T[]) => void) => {
    setter(array.includes(item) ? array.filter((i) => i !== item) : [...array, item]);
  };

  const filteredPackNames = packNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const packsToShow = showAllPacks ? filteredPackNames : filteredPackNames.slice(0, 5);
  const pricesToShow = showAllPrices ? priceRanges : priceRanges.slice(0, 3);

  return (
    <aside
      className="w-72  bg-white text-[#575756] rounded-lg fixed z-50 pb-16 max-h-[calc(200vh-2rem)] overflow-y-auto"
      style={{ bottom: `${bottom}px` }}
    >
      <div className="flex justify-between items-center  pt-56 border-b">
      <button
        onClick={resetAll}
        className="p-2 mb-4 mt-4 cursor-pointer bg-gray-100 rounded hover:bg-gray-200"
      >
        Effacer les filtres
      </button>
        
        <button onClick={() => setFilterOpen(false)}
          className="hover:bg-red-500 flex flex-row items-center hover:text-white bg-gray-100 rounded p-2 cursor-pointer">
          <span>Fermer</span><MdClose size={24} className="cursor-pointer" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Rechercher pack ou prix..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 mt-2 mb-4 px-2 border rounded hover:border-gray-400 focus:outline-none focus:ring focus:ring-[#00B5BD]"
      />

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Packs</h3>
        {packsToShow.length ? (
          packsToShow.map((name) => (
            <label key={name} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedPacks.includes(name)}
                onChange={() => toggle(selectedPacks, name, onPacksChange)}
              />
              {name}
            </label>
          ))
        ) : (
          <p className="text-gray-400 italic">Aucun résultat</p>
        )}
        {filteredPackNames.length > 5 && (
          <button
            onClick={() => setShowAllPacks((v) => !v)}
            className="text-[#00B5BD] text-sm mt-1"
          >
            {showAllPacks ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Prix</h3>
        {pricesToShow.length ? (
          pricesToShow.map((pr) => (
            <label key={pr.label} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedPrices.includes(pr)}
                onChange={() => toggle(selectedPrices, pr, onPricesChange)}
              />
              {pr.label}
            </label>
          ))
        ) : (
          <p className="text-gray-400 italic">Aucun résultat</p>
        )}
        {priceRanges.length > 3 && (
          <button
            onClick={() => setShowAllPrices((v) => !v)}
            className="text-[#00B5BD] text-sm mt-1"
          >
            {showAllPrices ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>
    </aside>
  );
}
