import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Search(){
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("q") ?? "";
  const [q, setQ] = useState<string>(initialQuery);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (q.trim()) {
      setSearchParams({ q: q.trim() });
      if (window.location.pathname !== "/catalogue") {
        navigate("/catalogue");
      }
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("q");
      setSearchParams(newParams);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.currentTarget.value)}
        placeholder="Que cherchez-vous ?"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </form>
  );
}
