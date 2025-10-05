"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, CalendarIcon, List } from "lucide-react"
import { CalendarView } from "@/components/reuniones/calendar-view"
import { MeetingsList } from "@/components/reuniones/meetings-list"
import { MeetingDialog } from "@/components/reuniones/meeting-dialog"
import { NewMeetingDialog } from "@/components/reuniones/new-meeting-dialog"
import { useToast } from "@/hooks/use-toast"

const mockMeetings = [
  {
    id: 1,
    titulo: "Presentación de propuesta",
    prospecto: "Tech Solutions Inc.",
    fecha: "2025-01-10",
    hora: "14:00",
    tipo: "virtual" as const,
    estado: "confirmada" as const,
    enlace: "https://meet.google.com/abc-defg-hij",
    descripcion: "Presentar propuesta comercial para implementación de CRM",
    participantes: ["Juan Pérez", "María García"],
  },
  {
    id: 2,
    titulo: "Seguimiento comercial",
    prospecto: "Global Enterprises",
    fecha: "2025-01-11",
    hora: "10:00",
    tipo: "presencial" as const,
    estado: "confirmada" as const,
    ubicacion: "Av. Principal 123, Oficina 501",
    descripcion: "Reunión de seguimiento para resolver dudas sobre la propuesta",
    participantes: ["Carlos López"],
  },
  {
    id: 3,
    titulo: "Demo de producto",
    prospecto: "Innovation Labs",
    fecha: "2025-01-15",
    hora: "16:30",
    tipo: "virtual" as const,
    estado: "pendiente" as const,
    enlace: "https://zoom.us/j/123456789",
    descripcion: "Demostración técnica del producto",
  },
  {
    id: 4,
    titulo: "Reunión de cierre",
    prospecto: "Digital Marketing Co.",
    fecha: "2025-01-08",
    hora: "11:00",
    tipo: "presencial" as const,
    estado: "completada" as const,
    ubicacion: "Centro Empresarial Norte",
    notas: "Cliente aprobó la propuesta. Proceder con contrato.",
  },
]

export default function ReunionesPage() {
  const [meetings] = useState(mockMeetings)
  const [selectedMeeting, setSelectedMeeting] = useState<(typeof mockMeetings)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleViewDetails = (meeting: (typeof mockMeetings)[0]) => {
    setSelectedMeeting(meeting)
    setDialogOpen(true)
  }

  const handleCreateMeeting = (data: any) => {
    toast({
      title: "Reunión creada",
      description: "La reunión se ha programado exitosamente",
    })
  }

  const handleDateSelect = (date: Date) => {
    toast({
      title: "Fecha seleccionada",
      description: date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
    })
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Reuniones"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reuniones" }]}
        actions={
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Reunión
          </Button>
        }
      />
      <div className="flex-1 space-y-6 p-6">
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendario
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{meetings.length} reuniones programadas</p>
            </div>
            <MeetingsList meetings={meetings} onViewDetails={handleViewDetails} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView meetings={meetings} onDateSelect={handleDateSelect} />
          </TabsContent>
        </Tabs>
      </div>

      <MeetingDialog meeting={selectedMeeting} open={dialogOpen} onOpenChange={setDialogOpen} />

      <NewMeetingDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} onSubmit={handleCreateMeeting} />
    </div>
  )
}
