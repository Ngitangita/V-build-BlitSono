import { TextField, MenuItem } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { reservationStatus } from "../../data/reservationStatus";

type Filter = {
  client: string;
  dateHeure: string;
  lieu: string;
  statut: string;
};

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  commonSX?: object;
};

export default function ReservationFilters({ filter, setFilter, commonSX = {} }: Props) {
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
    ...commonSX,
  };

  return (
    <div
    className="flex flex-row flex-wrap items-start gap-2 mb-4 bg-white p-4 rounded">
      <TextField
        label="Client"
        type="search"
        value={filter.client}
        onChange={(e) => setFilter(f => ({ ...f, client: e.target.value }))}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: { xs: "200px", sm: "150px" } }}
      />

      <TextField
        label="Date/Heure"
        type="search"
        value={filter.dateHeure}
        onChange={(e) => setFilter(f => ({ ...f, dateHeure: e.target.value }))}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: { xs: "200px", sm: "150px" } }}
      />

      <TextField
        label="Lieu"
        type="search"
        value={filter.lieu}
        onChange={(e) => setFilter(f => ({ ...f, lieu: e.target.value }))}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: { xs: "200px", sm: "150px" } }}
      />

      <TextField
        select
        label="Statut"
        value={filter.statut}
        onChange={(e) => setFilter(f => ({ ...f, statut: e.target.value }))}
        variant="outlined"
        size="small"
        sx={{ ...textFieldSx, width: { xs: "150px", sm: "130px" } }}
      >
        {reservationStatus.map(s => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
