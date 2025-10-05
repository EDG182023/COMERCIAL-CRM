import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, TrendingUp, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: number
  type: "prospecto" | "reunion" | "cotizacion" | "conversion"
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: "prospecto",
    title: "Nuevo prospecto agregado",
    description: "Tech Solutions Inc.",
    time: "Hace 2 horas",
  },
  {
    id: 2,
    type: "reunion",
    title: "Reunión completada",
    description: "Con Global Enterprises",
    time: "Hace 4 horas",
  },
  {
    id: 3,
    type: "cotizacion",
    title: "Cotización enviada",
    description: "$45,000 - Digital Marketing",
    time: "Hace 6 horas",
  },
  {
    id: 4,
    type: "conversion",
    title: "Prospecto convertido",
    description: "Innovation Labs cerró",
    time: "Hace 8 horas",
  },
  {
    id: 5,
    type: "reunion",
    title: "Reunión programada",
    description: "Mañana a las 10:00 AM",
    time: "Hace 12 horas",
  },
]

const activityIcons = {
  prospecto: Users,
  reunion: Calendar,
  cotizacion: FileText,
  conversion: TrendingUp,
}

const activityColors = {
  prospecto: "bg-primary/10 text-primary",
  reunion: "bg-accent/10 text-accent",
  cotizacion: "bg-chart-3/10 text-chart-3",
  conversion: "bg-chart-2/10 text-chart-2",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    activityColors[activity.type],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
