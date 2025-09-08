import { TextField } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

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
}: MaterielSearchProps) => {
  const textFieldSx = {
    height: "40px",
    width: "auto",
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
    <div className="flex gap-2 flex-wrap">
      <TextField
        label="Nom"
        type="search"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: "200px" }}
      />
      <TextField
        label="Prix"
        type="search"
        value={searchPrix}
        onChange={(e) => setSearchPrix(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx,  width: {
            xs: "200px",
            sm: "120px",
          }, }}
      />
      <TextField
        label="Stock total"
        type="search"
        value={searchStockTotal}
        onChange={(e) => setSearchStockTotal(e.target.value)}
        variant="outlined"
        size="small"
          sx={{ ...textFieldSx,  width: {
            xs: "200px",
            sm: "120px",
          }, }}
      />
      <TextField
        label="Stock dispo"
        type="search"
        value={searchStockAvailable}
        onChange={(e) => setSearchStockAvailable(e.target.value)}
        variant="outlined"
        size="small"
          sx={{ ...textFieldSx,  width: {
            xs: "200px",
            sm: "120px",
          }, }}
      />
      <TextField
        label="Catégorie"
        type="search"
        value={searchCategorie}
        onChange={(e) => setSearchCategorie(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: "200px" }}
      />
    </div>
  );
};

export default MaterielSearch;
