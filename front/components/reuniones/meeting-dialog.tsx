"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Video, MapPin, User, FileText } from "lucide-react"

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
  descripcion?: string
  participantes?: string[]
  notas?: string
}

interface MeetingDialogProps {
  meeting: Meeting | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const estadoColors: Record<string, string> = {
  confirmada: "bg-green-500/10 text-green-700 dark:text-green-400",
  pendiente: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  completada: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  cancelada: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function MeetingDialog({ meeting, open, onOpenChange }: MeetingDialogProps) {
  if (!meeting) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl">{meeting.titulo}</DialogTitle>
                <DialogDescription className="mt-1">{meeting.prospecto}</DialogDescription>
              </div>
            </div>
            <Badge className={estadoColors[meeting.estado]}>{meeting.estado}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fecha y Hora</p>
                <p className="font-medium">
                  {meeting.fecha} - {meeting.hora}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {meeting.tipo === "virtual" ? (
                  <Video className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tipo</p>
                <p className="font-medium">{meeting.tipo === "virtual" ? "Virtual" : "Presencial"}</p>
              </div>
            </div>
          </div>

          {meeting.tipo === "virtual" && meeting.enlace && (
            <div>
              <Button className="w-full" asChild>
                <a href={meeting.enlace} target="_blank" rel="noopener noreferrer">
                  <Video className="mr-2 h-4 w-4" />
                  Unirse a la reunión
                </a>
              </Button>
            </div>
          )}

          {meeting.tipo === "presencial" && meeting.ubicacion && (
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Ubicación</p>
                  <p className="text-sm text-muted-foreground">{meeting.ubicacion}</p>
                </div>
              </div>
            </div>
          )}

          {meeting.descripcion && (
            <>
              <Separator />
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold">Descripción</h4>
                </div>
                <p className="text-sm text-muted-foreground">{meeting.descripcion}</p>
              </div>
            </>
          )}

          {meeting.participantes && meeting.participantes.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold">Participantes</h4>
                </div>
                <div className="space-y-2">
                  {meeting.participantes.map((participante, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {participante.charAt(0)}
                      </div>
                      {participante}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {meeting.notas && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Notas</h4>
                <p className="text-sm text-muted-foreground">{meeting.notas}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
