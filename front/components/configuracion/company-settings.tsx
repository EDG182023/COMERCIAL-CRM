"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function CompanySettings() {
  const [formData, setFormData] = useState({
    nombre: "Mi Empresa S.A.",
    rut: "12.345.678-9",
    direccion: "Av. Principal 123, Oficina 501",
    telefono: "+56 2 2345 6789",
    email: "contacto@miempresa.com",
    web: "https://www.miempresa.com",
    descripcion: "Empresa líder en soluciones tecnológicas",
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Datos actualizados",
      description: "La información de la empresa se ha guardado exitosamente",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Empresa</CardTitle>
        <CardDescription>Configura los datos de tu empresa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nombre-empresa">Nombre de la empresa</Label>
            <Input
              id="nombre-empresa"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input id="rut" value={formData.rut} onChange={(e) => setFormData({ ...formData, rut: e.target.value })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono-empresa">Teléfono</Label>
            <Input
              id="telefono-empresa"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-empresa">Email</Label>
            <Input
              id="email-empresa"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="web">Sitio web</Label>
            <Input
              id="web"
              type="url"
              value={formData.web}
              onChange={(e) => setFormData({ ...formData, web: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Guardar cambios</Button>
        </div>
      </CardContent>
    </Card>
  )
}
