"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageSquare, FileText, Calendar, TrendingUp } from "lucide-react"

interface NewActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

const activityTypes = [
  { value: "llamada", label: "Llamada", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
  { value: "nota", label: "Nota", icon: MessageSquare },
  { value: "tarea", label: "Tarea", icon: FileText },
  { value: "reunion", label: "Reunión", icon: Calendar },
  { value: "cambio_etapa", label: "Cambio de Etapa", icon: TrendingUp },
]

export function NewActivityDialog({ open, onOpenChange, onSubmit }: NewActivityDialogProps) {
  const [formData, setFormData] = useState({
    tipo: "",
    titulo: "",
    descripcion: "",
    prospecto: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      tipo: "",
      titulo: "",
      descripcion: "",
      prospecto: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva Actividad</DialogTitle>
            <DialogDescription>Registra una nueva actividad en el sistema</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Actividad *</Label>
              <Select
                required
                value={formData.tipo}
                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                required
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prospecto">Prospecto *</Label>
              <Input
                id="prospecto"
                required
                placeholder="Nombre del prospecto"
                value={formData.prospecto}
                onChange={(e) => setFormData({ ...formData, prospecto: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Actividad</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
