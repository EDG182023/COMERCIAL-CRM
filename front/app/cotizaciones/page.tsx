"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { QuotationsTable } from "@/components/cotizaciones/quotations-table"
import { QuotationDialog } from "@/components/cotizaciones/quotation-dialog"
import { NewQuotationDialog } from "@/components/cotizaciones/new-quotation-dialog"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockQuotations = [
  {
    id: 1,
    numero: "COT-2025-001",
    prospecto: "Tech Solutions Inc.",
    fecha: "2025-01-08",
    monto: 125000,
    estado: "enviada" as const,
    validez: "30 días",
    items: [
      { id: 1, descripcion: "Implementación CRM", cantidad: 1, precio: 80000, total: 80000 },
      { id: 2, descripcion: "Capacitación equipo", cantidad: 5, precio: 5000, total: 25000 },
      { id: 3, descripcion: "Soporte técnico (3 meses)", cantidad: 1, precio: 20000, total: 20000 },
    ],
    notas: "Incluye soporte técnico durante los primeros 3 meses",
    terminos: "Pago 50% al inicio, 50% al finalizar implementación",
  },
  {
    id: 2,
    numero: "COT-2025-002",
    prospecto: "Global Enterprises",
    fecha: "2025-01-09",
    monto: 98000,
    estado: "aprobada" as const,
    validez: "15 días",
    items: [
      { id: 1, descripcion: "Consultoría estratégica", cantidad: 1, precio: 60000, total: 60000 },
      { id: 2, descripcion: "Análisis de procesos", cantidad: 1, precio: 38000, total: 38000 },
    ],
  },
  {
    id: 3,
    numero: "COT-2025-003",
    prospecto: "Innovation Labs",
    fecha: "2025-01-10",
    monto: 156000,
    estado: "borrador" as const,
    validez: "45 días",
    items: [
      { id: 1, descripcion: "Desarrollo software personalizado", cantidad: 1, precio: 120000, total: 120000 },
      { id: 2, descripcion: "Integración APIs", cantidad: 1, precio: 36000, total: 36000 },
    ],
  },
  {
    id: 4,
    numero: "COT-2024-098",
    prospecto: "Digital Marketing Co.",
    fecha: "2024-12-20",
    monto: 67000,
    estado: "vencida" as const,
    validez: "20 días",
  },
]

export default function CotizacionesPage() {
  const [quotations] = useState(mockQuotations)
  const [selectedQuotation, setSelectedQuotation] = useState<(typeof mockQuotations)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const handleViewDetails = (quotation: (typeof mockQuotations)[0]) => {
    setSelectedQuotation(quotation)
    setDialogOpen(true)
  }

  const handleCreateQuotation = (data: any) => {
    toast({
      title: "Cotización creada",
      description: "La cotización se ha creado exitosamente",
    })
  }

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      searchQuery === "" ||
      q.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.prospecto.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || q.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Cotizaciones"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Cotizaciones" }]}
        actions={
          <Button onClick={() => setNewDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cotización
          </Button>
        }
      />
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cotizaciones..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="borrador">Borrador</SelectItem>
              <SelectItem value="enviada">Enviada</SelectItem>
              <SelectItem value="aprobada">Aprobada</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredQuotations.length} de {quotations.length} cotizaciones
          </p>
          <div className="text-sm font-medium">
            Total: ${filteredQuotations.reduce((sum, q) => sum + q.monto, 0).toLocaleString()}
          </div>
        </div>

        <QuotationsTable quotations={filteredQuotations} onViewDetails={handleViewDetails} />
      </div>

      <QuotationDialog quotation={selectedQuotation} open={dialogOpen} onOpenChange={setDialogOpen} />

      <NewQuotationDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} onSubmit={handleCreateQuotation} />
    </div>
  )
}
