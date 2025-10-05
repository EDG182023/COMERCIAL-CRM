"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin, MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Meeting {
  id: number
  titulo: string
  prospecto: string
  fecha: string
  hora: string
  tipo: "virtual" | "presencial"
  estado: "confirmada" | "pendiente" | "completada" | "cancelada"
  ubicacion?: string
  enlace?: string
}

interface MeetingsListProps {
  meetings: Meeting[]
  onViewDetails: (meeting: Meeting) => void
}

const estadoColors: Record<string, string> = {
  confirmada: "bg-green-500/10 text-green-700 dark:text-green-400",
  pendiente: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  completada: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  cancelada: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function MeetingsList({ meetings, onViewDetails }: MeetingsListProps) {
  return (
    <div className="space-y-3">
      {meetings.length === 0 ? (
        <Card>
          <CardContent className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">No hay reuniones programadas</p>
          </CardContent>
        </Card>
      ) : (
        meetings.map((meeting) => (
          <Card key={meeting.id} className="transition-colors hover:bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{meeting.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{meeting.prospecto}</p>
                      </div>
                      <Badge className={estadoColors[meeting.estado]}>{meeting.estado}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meeting.fecha} - {meeting.hora}
                      </div>
                      <div className="flex items-center gap-1">
                        {meeting.tipo === "virtual" ? (
                          <>
                            <Video className="h-3 w-3" />
                            Virtual
                          </>
                        ) : (
                          <>
                            <MapPin className="h-3 w-3" />
                            {meeting.ubicacion || "Presencial"}
                          </>
                        )}
                      </div>
                    </div>
                    {meeting.tipo === "virtual" && meeting.enlace && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={meeting.enlace} target="_blank" rel="noopener noreferrer">
                          <Video className="mr-2 h-4 w-4" />
                          Unirse a la reunión
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(meeting)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Reprogramar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
