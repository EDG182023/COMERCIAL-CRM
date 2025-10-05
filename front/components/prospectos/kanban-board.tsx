"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Globe } from "lucide-react"
import type { Prospecto, Etapa } from "@/lib/api"

interface KanbanBoardProps {
  prospectos: Prospecto[]
  etapas: Etapa[]
  onViewDetails: (prospecto: Prospecto) => void
}

export function KanbanBoard({ prospectos, etapas, onViewDetails }: KanbanBoardProps) {
  const getProspectosByEtapa = (etapaNombre: string) => {
    return prospectos.filter((p) => p.etapa_nombre === etapaNombre)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {etapas.map((etapa) => {
        const etapaProspectos = getProspectosByEtapa(etapa.nombre)
        return (
          <div key={etapa.id} className="flex min-w-[320px] flex-col">
            <div className="mb-4 flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{etapa.nombre}</h3>
                <Badge variant="secondary">{etapaProspectos.length}</Badge>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {etapaProspectos.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed p-8 text-center text-sm text-muted-foreground">
                  No hay prospectos en esta etapa
                </div>
              ) : (
                etapaProspectos.map((prospecto) => (
                  <Card
                    key={prospecto.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => onViewDetails(prospecto)}
                  >
                    <CardHeader className="p-4 pb-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{prospecto.empresa}</CardTitle>
                          {prospecto.rubro && <p className="mt-1 text-xs text-muted-foreground">{prospecto.rubro}</p>}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-2">
                        {prospecto.mail && (
                          <a
                            href={`mailto:${prospecto.mail}`}
                            className="text-muted-foreground hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {prospecto.web && (
                          <a
                            href={prospecto.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
