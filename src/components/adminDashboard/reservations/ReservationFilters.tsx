import { TextField, MenuItem } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { reservationStatus } from "../../../data/reservationStatus";

type Filter = {
  client: string;
  date: string;
  heure: string;
  lieu: string;
  statut: string;
  duree: string;
};

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function ReservationFilters({ filter, setFilter }: Props) {
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
    width: { xs: "140px", sm: "140px" },
  };

  return (
    <div className="flex flex-row flex-wrap items-start gap-2 mb-4 bg-white p-4 rounded">
      <TextField
        label="Client"
        type="search"
        value={filter.client}
        onChange={(e) => setFilter((f) => ({ ...f, client: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      />

      <TextField
        label="Date"
        type="date"
        value={filter.date}
        onChange={(e) => setFilter((f) => ({ ...f, date: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      />

      <TextField
        label="Heure"
        type="time"
        value={filter.heure}
        onChange={(e) => setFilter((f) => ({ ...f, heure: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      />

      <TextField
        label="Durée (h)"
        type="number"
        value={filter.duree}
        onChange={(e) => setFilter((f) => ({ ...f, duree: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      />

      <TextField
        label="Lieu"
        type="search"
        value={filter.lieu}
        onChange={(e) => setFilter((f) => ({ ...f, lieu: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      />

      <TextField
        select
        label="Statut"
        value={filter.statut}
        onChange={(e) => setFilter((f) => ({ ...f, statut: e.target.value }))}
        variant="outlined"
        size="small"
        sx={textFieldSx}
      >
        {reservationStatus.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
