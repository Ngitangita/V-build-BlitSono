import { TextField, MenuItem } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { MdFilterList, MdClose } from "react-icons/md";

interface MaterielSearchProps {
  searchName: string;
  setSearchName: Dispatch<SetStateAction<string>>;
  searchPrix: string;
  setSearchPrix: Dispatch<SetStateAction<string>>;
  searchStockTotal: string;
  setSearchStockTotal: Dispatch<SetStateAction<string>>;
  searchStockAvailable: string;
  setSearchStockAvailable: Dispatch<SetStateAction<string>>;
  searchCategorie: string;
  setSearchCategorie: Dispatch<SetStateAction<string>>;
  searchStatus: string;
  setSearchStatus: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MaterielSearch = ({
  searchName,
  setSearchName,
  searchPrix,
  setSearchPrix,
  searchStockTotal,
  setSearchStockTotal,
  searchStockAvailable,
  setSearchStockAvailable,
  searchCategorie,
  setSearchCategorie,
  searchStatus,
  setSearchStatus,
  open,
  setOpen,
}: MaterielSearchProps) => {
  const textFieldSx = {
    height: "40px",
    ".MuiInputBase-root": { height: "40px" },
    "& .MuiInputLabel-outlined": { color: "#18769C" },
    "& .MuiInputLabel-outlined.Mui-focused": { color: "#0f5a70" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f5a70",
    },
  };

  return (
    <div className="w-full relative">
      <button
        className="sm:hidden fixed top-20 sm:left-2 left-64 z-40 text-2xl focus:outline-none cursor-pointer flex items-center gap-2 p-2 rounded-md text-white bg-[#18769C] hover:bg-[#0f5a70]"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <>
            <MdClose className="w-6 h-6" /> Fermer
          </>
        ) : (
          <>
            <MdFilterList className="w-6 h-6" /> Filtrer
          </>
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-md overflow-auto
      transform transition-transform duration-300 ease-in-out 
      ${open ? "translate-x-0 top-16 h-72" : "-translate-x-full "}
      sm:relative sm:translate-x-0 sm:bg-transparent sm:shadow-none sm:top-0`}
      >
        <div className="flex gap-2 flex-wrap z-0 pt-20 p-2 sm:p-0 ">
          <TextField
            label="Nom"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: "150px" }}
          />
          <TextField
            label="Prix"
            value={searchPrix}
            onChange={(e) => setSearchPrix(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: { xs: "200px", sm: "100px" } }}
          />
          <TextField
            label="Catégorie"
            value={searchCategorie}
            onChange={(e) => setSearchCategorie(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: "130px" }}
          />
          <TextField
            label="Stock total"
            value={searchStockTotal}
            onChange={(e) => setSearchStockTotal(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: { xs: "200px", sm: "100px" } }}
          />
          <TextField
            label="Stock dispo"
            value={searchStockAvailable}
            onChange={(e) => setSearchStockAvailable(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: { xs: "200px", sm: "100px" } }}
          />
          <TextField
            select
            label="Statut"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ ...textFieldSx, width: "100px" }}
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="actif">Actif</MenuItem>
            <MenuItem value="inactif">Inactif</MenuItem>
          </TextField>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default MaterielSearch;
