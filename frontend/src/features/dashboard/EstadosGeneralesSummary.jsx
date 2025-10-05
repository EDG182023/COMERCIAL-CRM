import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Typography } from '@mui/material';
import { http } from '../../api/http';

export default function EstadosGeneralesSummary() {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    http.get('/prospectos/estados_generales')
      .then(res => setEstados(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Grid container spacing={3}>
      {estados.map((estado, idx) => (
        <Grid xs={12} md={4} key={idx}>
          <Card>
            <CardContent>
              <Typography variant="h6">{estado.nombre}</Typography>
              <Typography variant="h3" color="primary">
                {estado.valor}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}