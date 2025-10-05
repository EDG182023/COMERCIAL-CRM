"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function PreferencesSettings() {
  const { toast } = useToast()

  const handleChange = (setting: string) => {
    toast({
      title: "Preferencia actualizada",
      description: `La configuración de ${setting} se ha actualizado`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias del Sistema</CardTitle>
        <CardDescription>Personaliza tu experiencia en el CRM</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por email</Label>
              <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
            </div>
            <Switch onCheckedChange={() => handleChange("notificaciones")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recordatorios de reuniones</Label>
              <p className="text-sm text-muted-foreground">Alertas 15 minutos antes de cada reunión</p>
            </div>
            <Switch defaultChecked onCheckedChange={() => handleChange("recordatorios")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo oscuro automático</Label>
              <p className="text-sm text-muted-foreground">Cambiar según la hora del día</p>
            </div>
            <Switch onCheckedChange={() => handleChange("modo oscuro")} />
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="space-y-2">
            <Label htmlFor="idioma">Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger id="idioma">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Zona horaria</Label>
            <Select defaultValue="america/santiago">
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america/santiago">América/Santiago (GMT-3)</SelectItem>
                <SelectItem value="america/buenos_aires">América/Buenos Aires (GMT-3)</SelectItem>
                <SelectItem value="america/sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                <SelectItem value="america/mexico_city">América/Ciudad de México (GMT-6)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moneda">Moneda</Label>
            <Select defaultValue="clp">
              <SelectTrigger id="moneda">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clp">Peso Chileno (CLP)</SelectItem>
                <SelectItem value="usd">Dólar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
                <SelectItem value="ars">Peso Argentino (ARS)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
