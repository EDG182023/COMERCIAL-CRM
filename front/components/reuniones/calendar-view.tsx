"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Meeting {
  id: number
  titulo: string
  fecha: string
  hora: string
  prospecto: string
  tipo: "virtual" | "presencial"
}

interface CalendarViewProps {
  meetings: Meeting[]
  onDateSelect: (date: Date) => void
}

export function CalendarView({ meetings, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getMeetingsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return meetings.filter((m) => m.fecha === dateStr).length
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const meetingCount = getMeetingsForDay(day)
    const isToday =
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()

    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        className={cn(
          "relative aspect-square rounded-lg border p-2 text-sm transition-colors hover:bg-muted",
          isToday && "border-primary bg-primary/5 font-semibold",
        )}
      >
        <span className={cn(isToday && "text-primary")}>{day}</span>
        {meetingCount > 0 && (
          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
            {Array.from({ length: Math.min(meetingCount, 3) }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-primary" />
            ))}
          </div>
        )}
      </button>,
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {days}
        </div>
      </CardContent>
    </Card>
  )
}
