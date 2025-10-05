"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building2, Settings, Layers } from "lucide-react"
import { EtapasSettings } from "@/components/configuracion/etapas-settings"
import { ProfileSettings } from "@/components/configuracion/profile-settings"
import { CompanySettings } from "@/components/configuracion/company-settings"
import { PreferencesSettings } from "@/components/configuracion/preferences-settings"
import { getEtapas, type Etapa } from "@/lib/api"

export default function ConfiguracionPage() {
  const [etapas, setEtapas] = useState<Etapa[]>([])

  useEffect(() => {
    loadEtapas()
  }, [])

  const loadEtapas = async () => {
    try {
      const data = await getEtapas()
      setEtapas(data)
    } catch (error) {
      console.error("Error loading etapas:", error)
    }
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="Configuración" breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Configuración" }]} />
      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="company">
              <Building2 className="mr-2 h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="etapas">
              <Layers className="mr-2 h-4 w-4" />
              Etapas
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="mr-2 h-4 w-4" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>

          <TabsContent value="etapas">
            <EtapasSettings etapas={etapas} onUpdate={loadEtapas} />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
