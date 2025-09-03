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

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / SCROLL_DISTANCE, 1);
      const interpolated =
        START_BOTTOM + (END_BOTTOM - START_BOTTOM) * progress;

      setBottom(interpolated);
      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const toggle = <T,>(array: T[], item: T, setter: (a: T[]) => void) => {
    setter(
      array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
    );
  };

  const packsToShow = showAllPacks ? packNames : packNames.slice(0, 5);
  const pricesToShow = showAllPrices ? priceRanges : priceRanges.slice(0, 3);

  return (
    <aside
      className={`
        w-64 p-4 pt-10 bg-white text-[#575756] rounded-lg fixed z-50
        transition-none pointer-events-auto
        pb-16 max-h-[calc(100vh-2rem)] overflow-y-auto
      `}
      style={{ bottom: `${bottom}px` }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg mb-4">Filtres</h2>
        <button
          onClick={() => setFilterOpen(false)}
          className="cursor-pointer bg-"
        >
          <MdClose size={24} />
        </button>
      </div>
      <button
        onClick={resetAll}
        className="w-full py-2 mb-4 mt-4 cursor-pointer bg-gray-100 rounded hover:bg-gray-200"
      >
        Effacer les filtres
      </button>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Packs</h3>
        {packsToShow.map((name) => (
          <label key={name} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedPacks.includes(name)}
              onChange={() => toggle(selectedPacks, name, onPacksChange)}
            />
            {name}
          </label>
        ))}
        {packNames.length > 5 && (
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
        {pricesToShow.map((pr) => (
          <label key={pr.label} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedPrices.includes(pr)}
              onChange={() => toggle(selectedPrices, pr, onPricesChange)}
            />
            {pr.label}
          </label>
        ))}
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
