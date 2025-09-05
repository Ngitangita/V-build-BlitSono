import TextField from "@mui/material/TextField";
import { reservationStatus } from "../../data/reservationStatus";

type Filter = {
  client: string;
  dateHeure: string;
  lieu: string;
  statut: string;
};

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  commonSX: object;
};

export default function ReservationFilters({ filter, setFilter, commonSX }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <TextField label="Client" type="search" value={filter.client}
        onChange={e => setFilter(f => ({ ...f, client: e.target.value }))}
        variant="outlined" size="small" sx={{
    ...commonSX,
    position: "relative",
    zIndex: 10, 
  }}/>

      <TextField label="Date/Heure" type="search" value={filter.dateHeure}
        onChange={e => setFilter(f => ({ ...f, dateHeure: e.target.value }))}
        variant="outlined" size="small" sx={{
    ...commonSX,
    position: "relative",
    zIndex: 10,
  }} />

      <TextField label="Lieu" type="search" value={filter.lieu}
        onChange={e => setFilter(f => ({ ...f, lieu: e.target.value }))}
        variant="outlined" size="small" sx={{
    ...commonSX,
    position: "relative",
    zIndex: 10,
  }} />

      <TextField label="Statut" select SelectProps={{ native: true }}
        value={filter.statut}
        onChange={e => setFilter(f => ({ ...f, statut: e.target.value }))}
        variant="outlined" size="small" sx={{
    ...commonSX,
    position: "relative",
    zIndex: 10, 
  }}>
        {reservationStatus.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </TextField>
    </div>
  );
}
