const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface Prospecto {
  id: number
  empresa: string
  mail: string | null
  web: string | null
  rubro: string | null
  estado_general: string
  etapa_nombre: string | null
}

export interface Etapa {
  id: number
  nombre: string
  estado_general: string
}

export interface Reunion {
  id: number
  prospecto_id: number
  prospecto_nombre?: string
  fecha: string
  hora: string
  notas: string | null
}

export interface Cotizacion {
  id: number
  cliente: string
  monto: number
  estado: string
}

export interface Historico {
  id: number
  prospecto_id: number
  etapa_origen_id: number | null
  etapa_destino_id: number
  usuario_id: number
  fecha_movimiento: string
  motivo: string | null
}

export interface EstadoResumen {
  estado_general: string
  cantidad: number
}

// Prospectos
export async function getProspectos(): Promise<Prospecto[]> {
  const res = await fetch(`${API_BASE_URL}/prospectos`)
  if (!res.ok) throw new Error("Failed to fetch prospectos")
  return res.json()
}

export async function getProspecto(id: number): Promise<Prospecto> {
  const res = await fetch(`${API_BASE_URL}/prospectos/${id}`)
  if (!res.ok) throw new Error("Failed to fetch prospecto")
  return res.json()
}

export async function createProspecto(data: Omit<Prospecto, "id" | "etapa_nombre">): Promise<Prospecto> {
  const res = await fetch(`${API_BASE_URL}/prospectos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create prospecto")
  return res.json()
}

export async function updateProspecto(id: number, data: Partial<Prospecto>): Promise<Prospecto> {
  const res = await fetch(`${API_BASE_URL}/prospectos/${id}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update prospecto")
  return res.json()
}

// Etapas
export async function getEtapas(): Promise<Etapa[]> {
  const res = await fetch(`${API_BASE_URL}/etapas`)
  if (!res.ok) throw new Error("Failed to fetch etapas")
  return res.json()
}

export async function createEtapa(data: Omit<Etapa, "id">): Promise<Etapa> {
  const res = await fetch(`${API_BASE_URL}/etapas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create etapa")
  return res.json()
}

// Reuniones
export async function getReuniones(): Promise<Reunion[]> {
  const res = await fetch(`${API_BASE_URL}/reuniones`)
  if (!res.ok) throw new Error("Failed to fetch reuniones")
  return res.json()
}

export async function createReunion(data: Omit<Reunion, "id" | "prospecto_nombre">): Promise<Reunion> {
  const res = await fetch(`${API_BASE_URL}/reuniones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create reunion")
  return res.json()
}

// Cotizaciones
export async function getCotizaciones(): Promise<Cotizacion[]> {
  const res = await fetch(`${API_BASE_URL}/cotizaciones`)
  if (!res.ok) throw new Error("Failed to fetch cotizaciones")
  return res.json()
}

export async function createCotizacion(data: Omit<Cotizacion, "id">): Promise<Cotizacion> {
  const res = await fetch(`${API_BASE_URL}/cotizaciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create cotizacion")
  return res.json()
}

// Histórico
export async function getHistorico(prospectoId?: number): Promise<Historico[]> {
  const url = prospectoId ? `${API_BASE_URL}/prospectos/${prospectoId}/historico` : `${API_BASE_URL}/historico`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch historico")
  return res.json()
}

// Resumen de estados
export async function getEstadosGenerales(): Promise<EstadoResumen[]> {
  const res = await fetch(`${API_BASE_URL}/prospectos/estados-generales`)
  if (!res.ok) throw new Error("Failed to fetch estados generales")
  return res.json()
}

// Mover prospecto
export async function moverProspecto(data: {
  prospecto_id: number
  etapa_destino_id: number
  usuario_id: number
  motivo?: string
}): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/kanban/mover`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to move prospecto")
  return res.json()
}
