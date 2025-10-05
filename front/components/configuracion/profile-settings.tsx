"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@empresa.com",
    telefono: "+56 9 1234 5678",
    cargo: "Gerente de Ventas",
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tus datos se han guardado exitosamente",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de Usuario</CardTitle>
        <CardDescription>Actualiza tu información personal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
              Cambiar foto
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input
              id="cargo"
              value={formData.cargo}
              onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
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
