import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import KanbanBoard from "./features/kanban/KanbanBoard";
import CotizacionesList from "./features/cotizaciones/CotizacionesList";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display:'flex', gap:16, padding:16 }}>
        <Link to="/">Kanban</Link>
        <Link to="/cotizaciones">Cotizaciones</Link>
      </nav>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/cotizaciones" element={<CotizacionesList />} />
      </Routes>
    </BrowserRouter>
  );
}