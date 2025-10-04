import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem } from "@mui/material";
import { http } from "../../api/http";

export default function CotizacionesList() {
  const [rows, setRows] = useState([]);

  const load = async () => {
    const { data } = await http.get("/cotizaciones");
    setRows(data);
  };

  useEffect(() => {
    load();
  }, []);

  const changeState = async (id, estado) => {
    await http.patch(`/cotizaciones/${id}/estado`, {
      Estado: estado,
      Usuario_ID: 1,
    });
    await load();
  };

  const columns = [
    { field: "ID", headerName: "ID", width: 90 },
    { field: "ID_empresa", headerName: "Prospecto", width: 140 },
    { field: "Monto", headerName: "Monto", width: 140 },
    { field: "Fecha", headerName: "Fecha", width: 140 },
    {
      field: "Estado",
      headerName: "Estado",
      width: 160,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value || ""}
          onChange={(e) => changeState(params.row.ID, e.target.value)}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="En proceso">En proceso</MenuItem>
          <MenuItem value="Cerrada">Cerrada</MenuItem>
          <MenuItem value="Rechazada">Rechazada</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} getRowId={(r) => r.ID} />
    </div>
  );
}