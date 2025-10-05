"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  cantidad: {
    label: "Prospectos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface PipelineChartProps {
  data: Array<{
    etapa: string
    cantidad: number
  }>
}

export function PipelineChart({ data }: PipelineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline de Ventas</CardTitle>
        <CardDescription>Distribución de prospectos por etapa</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="etapa" className="text-xs" tickLine={false} axisLine={false} />
              <YAxis className="text-xs" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="cantidad" fill="var(--color-cantidad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
