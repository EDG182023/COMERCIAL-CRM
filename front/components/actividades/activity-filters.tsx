"use client"

import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare, FileText, Calendar, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityFiltersProps {
  selectedTypes: string[]
  onTypeToggle: (type: string) => void
}

const filterTypes = [
  { value: "llamada", label: "Llamadas", icon: Phone, color: "text-blue-600 dark:text-blue-400" },
  { value: "email", label: "Emails", icon: Mail, color: "text-purple-600 dark:text-purple-400" },
  { value: "nota", label: "Notas", icon: MessageSquare, color: "text-green-600 dark:text-green-400" },
  { value: "tarea", label: "Tareas", icon: FileText, color: "text-orange-600 dark:text-orange-400" },
  { value: "reunion", label: "Reuniones", icon: Calendar, color: "text-pink-600 dark:text-pink-400" },
  { value: "cambio_etapa", label: "Cambios", icon: TrendingUp, color: "text-cyan-600 dark:text-cyan-400" },
]

export function ActivityFilters({ selectedTypes, onTypeToggle }: ActivityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterTypes.map((type) => {
        const Icon = type.icon
        const isSelected = selectedTypes.includes(type.value)
        return (
          <Button
            key={type.value}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeToggle(type.value)}
            className={cn(!isSelected && "hover:bg-muted")}
          >
            <Icon className={cn("mr-2 h-4 w-4", !isSelected && type.color)} />
            {type.label}
          </Button>
        )
      })}
    </div>
  )
}
