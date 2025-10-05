// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./dashboard/Dashboard";
import KanbanBoard from './features/kanban/KanbanBoard';
import CotizacionesList from './features/cotizaciones/CotizacionesList'; // implementar luego

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 16, padding: 16, background: '#f5f5f5' }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/kanban">Kanban</Link>
        <Link to="/cotizaciones">Cotizaciones</Link>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/cotizaciones" element={<CotizacionesList />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}