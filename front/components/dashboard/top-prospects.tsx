import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

interface Prospect {
  id: number
  empresa: string
  rubro: string
  valor: number
  probabilidad: number
  etapa: string
}

const prospects: Prospect[] = [
  {
    id: 1,
    empresa: "Tech Solutions Inc.",
    rubro: "Tecnología",
    valor: 125000,
    probabilidad: 85,
    etapa: "Negociación",
  },
  {
    id: 2,
    empresa: "Global Enterprises",
    rubro: "Retail",
    valor: 98000,
    probabilidad: 70,
    etapa: "Propuesta",
  },
  {
    id: 3,
    empresa: "Innovation Labs",
    rubro: "Software",
    valor: 156000,
    probabilidad: 90,
    etapa: "Cierre",
  },
  {
    id: 4,
    empresa: "Digital Marketing Co.",
    rubro: "Marketing",
    valor: 67000,
    probabilidad: 60,
    etapa: "Calificación",
  },
]

export function TopProspects() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Mejores Oportunidades</CardTitle>
        <Button variant="ghost" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prospects.map((prospect) => (
            <div
              key={prospect.id}
              className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium leading-none">{prospect.empresa}</p>
                  <p className="text-sm font-semibold">${(prospect.valor / 1000).toFixed(0)}k</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{prospect.rubro}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <Badge variant="outline" className="text-xs">
                    {prospect.etapa}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-accent transition-all" style={{ width: `${prospect.probabilidad}%` }} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{prospect.probabilidad}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
