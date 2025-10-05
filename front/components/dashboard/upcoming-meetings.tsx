import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Meeting {
  id: number
  title: string
  client: string
  date: string
  time: string
  type: "virtual" | "presencial"
  status: "confirmada" | "pendiente"
}

const meetings: Meeting[] = [
  {
    id: 1,
    title: "Presentación de propuesta",
    client: "Tech Solutions Inc.",
    date: "Hoy",
    time: "14:00",
    type: "virtual",
    status: "confirmada",
  },
  {
    id: 2,
    title: "Seguimiento comercial",
    client: "Global Enterprises",
    date: "Mañana",
    time: "10:00",
    type: "presencial",
    status: "confirmada",
  },
  {
    id: 3,
    title: "Demo de producto",
    client: "Innovation Labs",
    date: "15 Ene",
    time: "16:30",
    type: "virtual",
    status: "pendiente",
  },
]

export function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Próximas Reuniones</CardTitle>
        <Button variant="ghost" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium leading-none">{meeting.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{meeting.client}</p>
                  </div>
                  <Badge variant={meeting.status === "confirmada" ? "default" : "secondary"}>{meeting.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meeting.date} - {meeting.time}
                  </div>
                  <div className="flex items-center gap-1">
                    {meeting.type === "virtual" ? (
                      <>
                        <Video className="h-3 w-3" />
                        Virtual
                      </>
                    ) : (
                      <>
                        <MapPin className="h-3 w-3" />
                        Presencial
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
