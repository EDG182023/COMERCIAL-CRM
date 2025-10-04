import { useEffect, useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { http } from "../../api/http";

export default function KanbanBoard() {
  const [prospectos, setProspectos] = useState([]);
  const [etapas, setEtapas] = useState([]);

  const load = async () => {
    const [p, e] = await Promise.all([
      http.get("/prospectos"),
      http.get("/prospectos/etapas"),
    ]);
    setProspectos(p.data);
    setEtapas(e.data);
  };

  useEffect(() => {
    load();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const prospectoId = draggableId;
    const etapaId = destination.droppableId;

    await http.post(`/prospectos/${prospectoId}/stages`, {
      StageID: etapaId,
      Usuario_ID: 1,
    });
    await load();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={4} p={4} bg="gray.100" minH="100vh">
        {etapas.map((etapa) => (
          <Droppable droppableId={String(etapa.ID)} key={etapa.ID}>
            {(provided) => (
              <VStack
                ref={provided.innerRef}
                {...provided.droppableProps}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={3}
                w="300px"
                align="stretch"
              >
                <Heading size="md" textAlign="center" mb={2}>
                  {etapa.Nombre}
                </Heading>
                {prospectos
                  .filter((p) => p.Estado_General === etapa.Estado_General)
                  .map((p, index) => (
                    <Draggable
                      key={String(p.ID)}
                      draggableId={String(p.ID)}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          bg="blue.50"
                          border="1px solid"
                          borderColor="blue.200"
                          borderRadius="md"
                          p={3}
                          mb={2}
                          _hover={{ bg: "blue.100" }}
                        >
                          {p.Empresa}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
}