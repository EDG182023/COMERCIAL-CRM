"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Mail, Globe, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Prospecto } from "@/lib/api"

interface ProspectosTableProps {
  prospectos: Prospecto[]
  onViewDetails: (prospecto: Prospecto) => void
}

const estadoColors: Record<string, string> = {
  Pendiente: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  "En Proceso": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Ganado: "bg-green-500/10 text-green-700 dark:text-green-400",
  Perdido: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function ProspectosTable({ prospectos, onViewDetails }: ProspectosTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Rubro</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospectos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No hay prospectos para mostrar
              </TableCell>
            </TableRow>
          ) : (
            prospectos.map((prospecto) => (
              <TableRow key={prospecto.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{prospecto.empresa}</TableCell>
                <TableCell>{prospecto.rubro || "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{prospecto.etapa_nombre || "Sin etapa"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={estadoColors[prospecto.estado_general] || ""}>{prospecto.estado_general}</Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewDetails(prospecto)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Agendar reunión</DropdownMenuItem>
                      <DropdownMenuItem>Crear cotización</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
