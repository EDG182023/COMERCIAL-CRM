import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Typography, Box, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { http } from '../../api/http';
import CreateCardDialog from '../prospectos/CreateCardDialog';

export default function KanbanBoard() {
  const [prospectos, setProspectos] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const load = async () => {
    const [p, e] = await Promise.all([
      http.get('/prospectos'),
      http.get('/prospectos/etapas')
    ]);
    setProspectos(p.data);
    setEtapas(e.data);
  };

  useEffect(() => { load(); }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const prospectoId = result.draggableId;
    const etapaId = result.destination.droppableId;
    await http.post(`/stages/${prospectoId}/stages`, {
      StageID: Number(etapaId),
      Usuario_ID: 1
    });
    await load();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={() => setOpenCreate(true)}
      >
        Nueva tarjeta
      </Button>

      <CreateCardDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={() => load()}
      />

      <Grid container spacing={3} sx={{ p: 2 }}>
        {etapas.map((etapa) => (
          <Grid xs={12} md={4} key={etapa.ID}>
            <Droppable droppableId={String(etapa.ID)}>
              {(provided) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ p: 2, minHeight: 400 }}
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    {etapa.Nombre}
                  </Typography>

                  {prospectos
                    .filter(p => p.StageID === etapa.ID) // 👈 más preciso que Estado_General
                    .map((p, index) => (
                      <Draggable draggableId={String(p.ID)} index={index} key={p.ID}>
                        {(drag) => (
                          <Box
                            ref={drag.innerRef}
                            {...drag.draggableProps}
                            {...drag.dragHandleProps}
                            sx={{
                              bgcolor: 'primary.50',
                              border: '1px solid',
                              borderColor: 'primary.200',
                              borderRadius: 1,
                              p: 2,
                              mb: 1,
                              cursor: 'grab',
                              '&:active': { cursor: 'grabbing' },
                              '&:hover': { bgcolor: 'primary.100' }
                            }}
                          >
                            {p.Empresa}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
}