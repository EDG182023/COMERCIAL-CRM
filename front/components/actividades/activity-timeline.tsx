"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare, FileText, Calendar, TrendingUp, Clock, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Activity {
  id: number
  tipo: "llamada" | "email" | "nota" | "tarea" | "reunion" | "cambio_etapa"
  titulo: string
  descripcion: string
  prospecto: string
  fecha: string
  usuario: string
  completada?: boolean
}

interface ActivityTimelineProps {
  activities: Activity[]
}

const activityIcons = {
  llamada: Phone,
  email: Mail,
  nota: MessageSquare,
  tarea: FileText,
  reunion: Calendar,
  cambio_etapa: TrendingUp,
}

const activityColors = {
  llamada: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  email: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  nota: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  tarea: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  reunion: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
  cambio_etapa: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
}

const activityLabels = {
  llamada: "Llamada",
  email: "Email",
  nota: "Nota",
  tarea: "Tarea",
  reunion: "Reunión",
  cambio_etapa: "Cambio de Etapa",
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <Card>
          <CardContent className="flex h-[400px] items-center justify-center">
            <p className="text-muted-foreground">No hay actividades registradas</p>
          </CardContent>
        </Card>
      ) : (
        activities.map((activity, index) => {
          const Icon = activityIcons[activity.tipo]
          const isLast = index === activities.length - 1

          return (
            <div key={activity.id} className="relative flex gap-4">
              {!isLast && <div className="absolute left-5 top-12 h-full w-px bg-border" />}

              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                  activityColors[activity.tipo],
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{activityLabels[activity.tipo]}</Badge>
                        {activity.completada !== undefined && (
                          <Badge variant={activity.completada ? "default" : "secondary"}>
                            {activity.completada ? "Completada" : "Pendiente"}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{activity.titulo}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{activity.descripcion}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-medium">{activity.prospecto}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.fecha}
                        </div>
                        <span>•</span>
                        <span>Por {activity.usuario}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })
      )}
    </div>
  )
}
