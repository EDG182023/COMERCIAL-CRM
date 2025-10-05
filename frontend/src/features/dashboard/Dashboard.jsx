import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EstadosGeneralesSummary from './EstadosGeneralesSummary';

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Control
      </Typography>

      {/* Resumen de estados generales */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <EstadosGeneralesSummary />
      </Paper>

      {/* Acá podés dejar otros widgets del template o borrarlos */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2, height: 240 }}>
            <Typography variant="h6">Widget de ejemplo</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2, height: 240 }}>
            <Typography variant="h6">Otro widget</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}