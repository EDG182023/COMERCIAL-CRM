"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Quotation {
  id: number
  numero: string
  prospecto: string
  fecha: string
  monto: number
  estado: "borrador" | "enviada" | "aprobada" | "rechazada" | "vencida"
  validez: string
}

interface QuotationsTableProps {
  quotations: Quotation[]
  onViewDetails: (quotation: Quotation) => void
}

const estadoColors: Record<string, string> = {
  borrador: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  enviada: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  aprobada: "bg-green-500/10 text-green-700 dark:text-green-400",
  rechazada: "bg-red-500/10 text-red-700 dark:text-red-400",
  vencida: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}

export function QuotationsTable({ quotations, onViewDetails }: QuotationsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Prospecto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Validez</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No hay cotizaciones para mostrar
              </TableCell>
            </TableRow>
          ) : (
            quotations.map((quotation) => (
              <TableRow key={quotation.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{quotation.numero}</TableCell>
                <TableCell>{quotation.prospecto}</TableCell>
                <TableCell>{quotation.fecha}</TableCell>
                <TableCell className="font-semibold">${quotation.monto.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={estadoColors[quotation.estado]}>{quotation.estado}</Badge>
                </TableCell>
                <TableCell>{quotation.validez}</TableCell>
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
                      <DropdownMenuItem onClick={() => onViewDetails(quotation)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
