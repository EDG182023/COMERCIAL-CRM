"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, GripVertical, Trash2, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Etapa } from "@/lib/api"

interface EtapasSettingsProps {
  etapas: Etapa[]
  onUpdate: () => void
}

export function EtapasSettings({ etapas, onUpdate }: EtapasSettingsProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [newEtapa, setNewEtapa] = useState("")
  const { toast } = useToast()

  const handleEdit = (etapa: Etapa) => {
    setEditingId(etapa.id)
    setEditValue(etapa.nombre)
  }

  const handleSave = () => {
    toast({
      title: "Etapa actualizada",
      description: "Los cambios se han guardado exitosamente",
    })
    setEditingId(null)
    onUpdate()
  }

  const handleDelete = (id: number) => {
    toast({
      title: "Etapa eliminada",
      description: "La etapa se ha eliminado del sistema",
    })
    onUpdate()
  }

  const handleAdd = () => {
    if (newEtapa.trim()) {
      toast({
        title: "Etapa creada",
        description: "La nueva etapa se ha agregado al sistema",
      })
      setNewEtapa("")
      onUpdate()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etapas del Pipeline</CardTitle>
        <CardDescription>Gestiona las etapas del proceso de ventas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {etapas.map((etapa) => (
            <div key={etapa.id} className="flex items-center gap-2 rounded-lg border p-3">
              <GripVertical className="h-5 w-5 cursor-move text-muted-foreground" />
              {editingId === etapa.id ? (
                <>
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSave}>
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-medium">{etapa.nombre}</span>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(etapa)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(etapa.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4">
          <Input
            placeholder="Nueva etapa..."
            value={newEtapa}
            onChange={(e) => setNewEtapa(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
