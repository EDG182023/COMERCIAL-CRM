"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, LayoutGrid, TableIcon } from "lucide-react"
import { ProspectosTable } from "@/components/prospectos/prospectos-table"
import { KanbanBoard } from "@/components/prospectos/kanban-board"
import { ProspectoDialog } from "@/components/prospectos/prospecto-dialog"
import { NewProspectoDialog } from "@/components/prospectos/new-prospecto-dialog"
import { getProspectos, getEtapas, createProspecto, type Prospecto, type Etapa } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ProspectosPage() {
  const [view, setView] = useState<"table" | "kanban">("table")
  const [prospectos, setProspectos] = useState<Prospecto[]>([])
  const [etapas, setEtapas] = useState<Etapa[]>([])
  const [selectedProspecto, setSelectedProspecto] = useState<Prospecto | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [prospectosData, etapasData] = await Promise.all([getProspectos(), getEtapas()])
      setProspectos(prospectosData)
      setEtapas(etapasData)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (prospecto: Prospecto) => {
    setSelectedProspecto(prospecto)
    setDialogOpen(true)
  }

  const handleCreateProspecto = async (data: any) => {
    try {
      await createProspecto(data)
      toast({
        title: "Prospecto creado",
        description: "El prospecto se ha creado exitosamente",
      })
      loadData()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el prospecto",
        variant: "destructive",
      })
    }
  }

  const filteredProspectos = prospectos.filter(
    (p) =>
      p.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.rubro && p.rubro.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Prospectos"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Prospectos" }]}
        actions={
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Prospecto
          </Button>
        }
      />
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar prospectos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={view === "table" ? "default" : "outline"} size="icon" onClick={() => setView("table")}>
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button variant={view === "kanban" ? "default" : "outline"} size="icon" onClick={() => setView("kanban")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-muted-foreground">Cargando prospectos...</p>
          </div>
        ) : view === "table" ? (
          <ProspectosTable prospectos={filteredProspectos} onViewDetails={handleViewDetails} />
        ) : (
          <KanbanBoard prospectos={filteredProspectos} etapas={etapas} onViewDetails={handleViewDetails} />
        )}
      </div>

      <ProspectoDialog prospecto={selectedProspecto} etapas={etapas} open={dialogOpen} onOpenChange={setDialogOpen} />

      <NewProspectoDialog
        etapas={etapas}
        open={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        onSubmit={handleCreateProspecto}
      />
    </div>
  )
}
