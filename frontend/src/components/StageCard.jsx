import { Card, CardContent, Typography, MenuItem, Select } from "@mui/material";

export default function StageCard({ prospecto, etapas, onDrop }) {
  // Filtramos las etapas a las que se puede mover
  const opciones = etapas.filter(
    (e) => e.Estado_General !== prospecto.Estado_General
  );

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle1">{prospecto.Empresa}</Typography>
        <Select
          fullWidth
          displayEmpty
          value=""
          onChange={(e) => onDrop(prospecto.ID, Number(e.target.value))}
        >
          <MenuItem value="" disabled>
            Mover a etapa…
          </MenuItem>
          {opciones.map((e) => (
            <MenuItem key={e.ID} value={e.ID}>
              {e.Nombre}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
}