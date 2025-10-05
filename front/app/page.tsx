"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Users, Calendar, FileText, TrendingUp, DollarSign, Target } from "lucide-react"
import { PipelineChart } from "@/components/charts/pipeline-chart"
import { ConversionChart } from "@/components/charts/conversion-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"
import { TopProspects } from "@/components/dashboard/top-prospects"

const pipelineData = [
  { etapa: "Contacto", cantidad: 45 },
  { etapa: "Calificación", cantidad: 32 },
  { etapa: "Propuesta", cantidad: 24 },
  { etapa: "Negociación", cantidad: 15 },
  { etapa: "Cierre", cantidad: 8 },
]

const conversionData = [
  { mes: "Jul", tasa: 18 },
  { mes: "Ago", tasa: 22 },
  { mes: "Sep", tasa: 20 },
  { mes: "Oct", tasa: 24 },
  { mes: "Nov", tasa: 26 },
  { mes: "Dic", tasa: 24 },
]

const revenueData = [
  { mes: "Jul", monto: 145000 },
  { mes: "Ago", monto: 178000 },
  { mes: "Sep", monto: 165000 },
  { mes: "Oct", monto: 198000 },
  { mes: "Nov", monto: 225000 },
  { mes: "Dic", monto: 284500 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Dashboard" description="Resumen general de tu pipeline de ventas" />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Prospectos"
            value="124"
            description="32 nuevos este mes"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Reuniones Programadas"
            value="18"
            description="Esta semana"
            icon={Calendar}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Cotizaciones Activas"
            value="42"
            description="$284,500 en total"
            icon={FileText}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Tasa de Conversión"
            value="24%"
            description="Últimos 30 días"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Ingresos Proyectados"
            value="$284.5k"
            description="Basado en pipeline actual"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Meta del Mes"
            value="78%"
            description="$220k de $280k objetivo"
            icon={Target}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <PipelineChart data={pipelineData} />
          <ConversionChart data={conversionData} />
        </div>

        <div className="grid gap-4 lg:grid-cols-1">
          <RevenueChart data={revenueData} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RecentActivity />
          <UpcomingMeetings />
          <TopProspects />
        </div>
      </div>
    </div>
  )
}
