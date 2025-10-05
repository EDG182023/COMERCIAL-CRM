// src/features/prospectos/ProspectoForm.jsx
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { http } from '../../api/http';

export default function ProspectoForm({ onCreated }) {
  const [empresa, setEmpresa] = useState('');
  const [comercialId, setComercialId] = useState(1);
  const [estadoGeneral, setEstadoGeneral] = useState('Prospecto');

  const submit = async (e) => {
    e.preventDefault();
    const res = await http.post('/prospectos', {
      Empresa: empresa,
      Comercial_ID: comercialId,
      Estado_General: estadoGeneral
    });
    setEmpresa('');
    if (onCreated) onCreated(res.data);
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={2}>
        <TextField label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
        <TextField label="Comercial ID" type="number" value={comercialId} onChange={(e) => setComercialId(Number(e.target.value))} />
        <TextField label="Estado General" value={estadoGeneral} onChange={(e) => setEstadoGeneral(e.target.value)} />
        <Button type="submit" variant="contained">Crear prospecto</Button>
      </Stack>
    </form>
  );
}