// src/features/prospectos/CreateCardDialog.jsx
import { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Stack
} from '@mui/material';
import { http } from '../../api/http';

export default function CreateCardDialog({ open, onClose, onCreated }) {
  const [empresa, setEmpresa] = useState('');
  const [comercialId, setComercialId] = useState(1);
  const [etapas, setEtapas] = useState([]);
  const [etapaId, setEtapaId] = useState('');

  useEffect(() => {
    if (open) {
      http.get('/prospectos/etapas').then(res => {
        setEtapas(res.data);
        if (res.data.length) setEtapaId(res.data[0].ID);
      });
    }
  }, [open]);

  const handleCreate = async () => {
    const p = await http.post('/prospectos', {
      Empresa: empresa,
      Comercial_ID: comercialId
    });
    const nuevoProspectoId = p.data.ID;
    await http.post(`/stages/${nuevoProspectoId}/stages`, {
      StageID: Number(etapaId),
      Usuario_ID: comercialId
    });
    setEmpresa('');
    if (onCreated) onCreated({ prospectoId: nuevoProspectoId, etapaId });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nueva tarjeta</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
          <TextField label="Comercial ID" type="number" value={comercialId} onChange={(e) => setComercialId(Number(e.target.value))} />
          <TextField select label="Etapa inicial" value={etapaId} onChange={(e) => setEtapaId(e.target.value)}>
            {etapas.map(e => (
              <MenuItem key={e.ID} value={e.ID}>{e.Nombre}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleCreate}>Crear</Button>
      </DialogActions>
    </Dialog>
  );
}