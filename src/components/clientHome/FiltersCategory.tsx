import { useState } from "react";

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

export type FiltersCategoryType = {
  categories: string[];
  selectedCats: string[];
  onCatsChange: (cats: string[]) => void;
  selectedPrices: PriceRange[];
  onPricesChange: (prs: PriceRange[]) => void;
  resetAll: () => void;
  priceRanges: PriceRange[];   
};

export default function FiltersCategory({
  categories, 
  selectedCats,
  onCatsChange,
  selectedPrices,
  onPricesChange,
  resetAll,
   priceRanges,
}: FiltersCategoryType) {
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(false);

  const toggle = <T,>(array: T[], item: T, setter: (a: T[]) => void) => {
    setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
  };

  const catsToShow = showAllCats ? categories : categories.slice(0, 7);
  const pricesToShow = showAllPrices ? priceRanges : priceRanges.slice(0, 3);

  return (
    <aside className="w-46 p-4 pb-16 lg:w-64 bg-white text-[#575756] 
    rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">Filtres</h2>

      <button
        onClick={resetAll}
        className="w-full py-2 mb-4 bg-gray-100 rounded hover:bg-gray-200"
      >
        Effacer les filtres
      </button>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Catégorie</h3>
        {catsToShow.map(name => (
          <label key={name} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedCats.includes(name)}
              onChange={() => toggle(selectedCats, name, onCatsChange)}
            />
            {name}
          </label>
        ))}
        {categories.length > 7 && (
          <button
            className="text-[#00B5BD] text-sm mt-1 cursor-pointer"
            onClick={() => setShowAllCats(v => !v)}
          >
            {showAllCats ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Prix</h3>
        {pricesToShow.map(pr => (
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
            className="text-[#00B5BD] text-sm mt-1 cursor-pointer"
            onClick={() => setShowAllPrices(v => !v)}
          >
            {showAllPrices ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>
    </aside>
  );
}
