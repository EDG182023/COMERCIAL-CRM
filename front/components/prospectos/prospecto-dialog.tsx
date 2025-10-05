"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Mail, Globe, Calendar, FileText, Activity, Edit } from "lucide-react"
import type { Prospecto, Etapa } from "@/lib/api"

interface ProspectoDialogProps {
  prospecto: Prospecto | null
  etapas: Etapa[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProspectoDialog({ prospecto, etapas, open, onOpenChange }: ProspectoDialogProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!prospecto) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl">{prospecto.empresa}</DialogTitle>
                <DialogDescription className="mt-1">{prospecto.rubro || "Sin rubro especificado"}</DialogDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="datos" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="datos">Datos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="reuniones">Reuniones</TabsTrigger>
            <TabsTrigger value="cotizaciones">Cotizaciones</TabsTrigger>
            <TabsTrigger value="archivos">Archivos</TabsTrigger>
          </TabsList>

          <TabsContent value="datos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" defaultValue={prospecto.empresa} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rubro">Rubro</Label>
                <Input id="rubro" defaultValue={prospecto.rubro || ""} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mail">Email</Label>
                <div className="flex gap-2">
                  <Input id="mail" type="email" defaultValue={prospecto.mail || ""} disabled={!isEditing} />
                  {prospecto.mail && !isEditing && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${prospecto.mail}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="web">Sitio Web</Label>
                <div className="flex gap-2">
                  <Input id="web" type="url" defaultValue={prospecto.web || ""} disabled={!isEditing} />
                  {prospecto.web && !isEditing && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={prospecto.web} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="etapa">Etapa Actual</Label>
                <Select defaultValue={prospecto.etapa_nombre || ""} disabled={!isEditing}>
                  <SelectTrigger id="etapa">
                    <SelectValue placeholder="Seleccionar etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    {etapas.map((etapa) => (
                      <SelectItem key={etapa.id} value={etapa.nombre}>
                        {etapa.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado General</Label>
                <Input id="estado" defaultValue={prospecto.estado_general} disabled />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button>Guardar Cambios</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Histórico de movimientos del prospecto</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 border-l-2 border-primary pl-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Movido a Negociación</p>
                    <p className="text-xs text-muted-foreground">Hace 2 días - Por Juan Pérez</p>
                    <p className="mt-1 text-xs">Motivo: Cliente interesado en propuesta</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-l-2 border-muted pl-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Movido a Propuesta</p>
                    <p className="text-xs text-muted-foreground">Hace 5 días - Por María García</p>
                    <p className="mt-1 text-xs">Motivo: Reunión exitosa</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reuniones" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Reuniones programadas y completadas</span>
                </div>
                <Button size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Nueva Reunión
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">No hay reuniones registradas</div>
            </div>
          </TabsContent>

          <TabsContent value="cotizaciones" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Cotizaciones enviadas</span>
                </div>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Nueva Cotización
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">No hay cotizaciones registradas</div>
            </div>
          </TabsContent>

          <TabsContent value="archivos" className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Documentos adjuntos</span>
                </div>
                <Button size="sm">Subir Archivo</Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">No hay archivos adjuntos</div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
