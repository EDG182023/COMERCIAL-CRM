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
import type { Etapa } from "@/lib/api"

interface NewProspectoDialogProps {
  etapas: Etapa[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function NewProspectoDialog({ etapas, open, onOpenChange, onSubmit }: NewProspectoDialogProps) {
  const [formData, setFormData] = useState({
    empresa: "",
    mail: "",
    web: "",
    rubro: "",
    estado_general: "Pendiente",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      empresa: "",
      mail: "",
      web: "",
      rubro: "",
      estado_general: "Pendiente",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nuevo Prospecto</DialogTitle>
            <DialogDescription>Agrega un nuevo prospecto al sistema</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Input
                id="empresa"
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rubro">Rubro</Label>
              <Input
                id="rubro"
                value={formData.rubro}
                onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail">Email</Label>
              <Input
                id="mail"
                type="email"
                value={formData.mail}
                onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="web">Sitio Web</Label>
              <Input
                id="web"
                type="url"
                placeholder="https://"
                value={formData.web}
                onChange={(e) => setFormData({ ...formData, web: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Prospecto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
