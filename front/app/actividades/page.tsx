"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { ActivityTimeline } from "@/components/actividades/activity-timeline"
import { ActivityFilters } from "@/components/actividades/activity-filters"
import { NewActivityDialog } from "@/components/actividades/new-activity-dialog"
import { useToast } from "@/hooks/use-toast"

const mockActivities = [
  {
    id: 1,
    tipo: "llamada" as const,
    titulo: "Llamada de seguimiento",
    descripcion: "Discutir propuesta comercial y resolver dudas sobre el servicio",
    prospecto: "Tech Solutions Inc.",
    fecha: "Hoy, 14:30",
    usuario: "Juan Pérez",
    completada: true,
  },
  {
    id: 2,
    tipo: "email" as const,
    titulo: "Envío de propuesta",
    descripcion: "Propuesta comercial para implementación de CRM",
    prospecto: "Global Enterprises",
    fecha: "Hoy, 11:20",
    usuario: "María García",
    completada: true,
  },
  {
    id: 3,
    tipo: "reunion" as const,
    titulo: "Reunión de presentación",
    descripcion: "Presentación de servicios y capacidades de la empresa",
    prospecto: "Innovation Labs",
    fecha: "Ayer, 16:00",
    usuario: "Carlos López",
    completada: true,
  },
  {
    id: 4,
    tipo: "tarea" as const,
    titulo: "Preparar demo técnica",
    descripcion: "Configurar ambiente de demostración para próxima reunión",
    prospecto: "Digital Marketing Co.",
    fecha: "Ayer, 10:15",
    usuario: "Ana Martínez",
    completada: false,
  },
  {
    id: 5,
    tipo: "nota" as const,
    titulo: "Nota de reunión",
    descripcion: "Cliente interesado en módulo de reportes avanzados. Solicita cotización adicional.",
    prospecto: "Tech Solutions Inc.",
    fecha: "Hace 2 días",
    usuario: "Juan Pérez",
  },
  {
    id: 6,
    tipo: "cambio_etapa" as const,
    titulo: "Movido a Negociación",
    descripcion: "Cliente aprobó propuesta inicial y está listo para negociar términos",
    prospecto: "Global Enterprises",
    fecha: "Hace 3 días",
    usuario: "María García",
  },
]

export default function ActividadesPage() {
  const [activities] = useState(mockActivities)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleCreateActivity = (data: any) => {
    toast({
      title: "Actividad creada",
      description: "La actividad se ha registrado exitosamente",
    })
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(activity.tipo)
    const matchesSearch =
      searchQuery === "" ||
      activity.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.prospecto.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Actividades"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Actividades" }]}
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Actividad
          </Button>
        }
      />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar actividades..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ActivityFilters selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredActivities.length} de {activities.length} actividades
          </p>
          {selectedTypes.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedTypes([])}>
              Limpiar filtros
            </Button>
          )}
        </div>

        <ActivityTimeline activities={filteredActivities} />
      </div>

      <NewActivityDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleCreateActivity} />
    </div>
  )
}
