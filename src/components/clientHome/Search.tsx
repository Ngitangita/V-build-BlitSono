import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    const query = q.trim();
    if (query) {
      setSearchParams({ q: query });
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  }, [q]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cherche dans le Catalogue/Packs"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />

      {q && (
        <button
          type="button"
          onClick={() => setQ("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-500 cursor-pointer"
        >
          <MdClose size={18} />
        </button>
      )}
    </div>
  );
}
