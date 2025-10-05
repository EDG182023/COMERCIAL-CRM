"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Calendar, DollarSign, Download, Send } from "lucide-react"

interface QuotationItem {
  id: number
  descripcion: string
  cantidad: number
  precio: number
  total: number
}

interface Quotation {
  id: number
  numero: string
  prospecto: string
  fecha: string
  monto: number
  estado: "borrador" | "enviada" | "aprobada" | "rechazada" | "vencida"
  validez: string
  items?: QuotationItem[]
  notas?: string
  terminos?: string
}

interface QuotationDialogProps {
  quotation: Quotation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const estadoColors: Record<string, string> = {
  borrador: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  enviada: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  aprobada: "bg-green-500/10 text-green-700 dark:text-green-400",
  rechazada: "bg-red-500/10 text-red-700 dark:text-red-400",
  vencida: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}

export function QuotationDialog({ quotation, open, onOpenChange }: QuotationDialogProps) {
  if (!quotation) return null

  const subtotal = quotation.items?.reduce((sum, item) => sum + item.total, 0) || 0
  const iva = subtotal * 0.19
  const total = subtotal + iva

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Cotización {quotation.numero}</DialogTitle>
                <DialogDescription className="mt-1">{quotation.prospecto}</DialogDescription>
              </div>
            </div>
            <Badge className={estadoColors[quotation.estado]}>{quotation.estado}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fecha</p>
                <p className="font-medium">{quotation.fecha}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Validez</p>
                <p className="font-medium">{quotation.validez}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monto Total</p>
                <p className="font-semibold">${quotation.monto.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4 font-semibold">Ítems de la Cotización</h4>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-center">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unit.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotation.items && quotation.items.length > 0 ? (
                    quotation.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell className="text-center">{item.cantidad}</TableCell>
                        <TableCell className="text-right">${item.precio.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${item.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No hay ítems en esta cotización
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (19%):</span>
                <span className="font-medium">${iva.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {quotation.notas && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Notas</h4>
                <p className="text-sm text-muted-foreground">{quotation.notas}</p>
              </div>
            </>
          )}

          {quotation.terminos && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 font-semibold">Términos y Condiciones</h4>
                <p className="text-sm text-muted-foreground">{quotation.terminos}</p>
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            {quotation.estado === "borrador" && (
              <Button className="flex-1 bg-transparent" variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Enviar al Cliente
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
