"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface QuotationItem {
  id: string
  descripcion: string
  cantidad: number
  precio: number
}

interface NewQuotationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function NewQuotationDialog({ open, onOpenChange, onSubmit }: NewQuotationDialogProps) {
  const [formData, setFormData] = useState({
    prospecto: "",
    validez: "30 días",
    notas: "",
  })

  const [items, setItems] = useState<QuotationItem[]>([{ id: "1", descripcion: "", cantidad: 1, precio: 0 }])

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), descripcion: "", cantidad: 1, precio: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.cantidad * item.precio, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotal()
    onSubmit({
      ...formData,
      items,
      monto: total,
    })
    setFormData({
      prospecto: "",
      validez: "30 días",
      notas: "",
    })
    setItems([{ id: "1", descripcion: "", cantidad: 1, precio: 0 }])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva Cotización</DialogTitle>
            <DialogDescription>Crea una nueva cotización para un prospecto</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prospecto">Prospecto *</Label>
                <Input
                  id="prospecto"
                  required
                  value={formData.prospecto}
                  onChange={(e) => setFormData({ ...formData, prospecto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validez">Validez</Label>
                <Input
                  id="validez"
                  value={formData.validez}
                  onChange={(e) => setFormData({ ...formData, validez: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Ítems de la Cotización</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Ítem
                </Button>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="w-24">Cantidad</TableHead>
                      <TableHead className="w-32">Precio Unit.</TableHead>
                      <TableHead className="w-32">Total</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            placeholder="Descripción del ítem"
                            value={item.descripcion}
                            onChange={(e) => updateItem(item.id, "descripcion", e.target.value)}
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => updateItem(item.id, "cantidad", Number.parseInt(e.target.value) || 1)}
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.precio}
                            onChange={(e) => updateItem(item.id, "precio", Number.parseFloat(e.target.value) || 0)}
                            required
                          />
                        </TableCell>
                        <TableCell className="font-medium">${(item.cantidad * item.precio).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2 rounded-lg border p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (19%):</span>
                    <span className="font-medium">${(calculateTotal() * 0.19).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${(calculateTotal() * 1.19).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas</Label>
              <Textarea
                id="notas"
                rows={3}
                placeholder="Notas adicionales para el cliente"
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Cotización</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
