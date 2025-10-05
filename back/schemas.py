from pydantic import BaseModel
from datetime import date, datetime, time
from typing import Optional

# ---------------- Prospectos ----------------
class ProspectoBase(BaseModel):
    id: int
    empresa: str
    mail: str | None = None
    web: str | None = None
    rubro: str | None = None
    estado_general: str | None
    etapa_nombre: str | None = None   # 👈 nuevo campo

    class Config:
        from_attributes = True

class ProspectoCreate(ProspectoBase):
    pass

class Prospecto(ProspectoBase):
    id: int
    etapa_nombre: Optional[str] = None   # 👈 nuevo campo



# ---------------- Etapas ----------------
class EtapaBase(BaseModel):
    nombre: str
    estado_general: str

class EtapaCreate(EtapaBase):
    pass

class Etapa(EtapaBase):
    id: int
    class Config:
        from_attributes = True

# ---------------- Movimientos ----------------
class MovimientoInput(BaseModel):
    prospecto_id: int
    etapa_destino_id: int
    usuario_id: int
    motivo: str | None = None

class ProspectoEtapaHistorico(BaseModel):
    id: int
    prospecto_id: int
    etapa_origen_id: int | None
    etapa_destino_id: int
    usuario_id: int
    fecha_movimiento: datetime
    motivo: str | None
    class Config:
        from_attributes = True

# ---------------- Reuniones ----------------
class ReunionBase(BaseModel):
    fecha: date
    hora: time
    notas: Optional[str] = None
    prospecto_id: int

class ReunionCreate(ReunionBase):
    pass

class Reunion(ReunionBase):
    id: int
    prospecto_nombre: Optional[str] = None   # 👈 nuevo campo

    class Config:
        from_attributes = True
# ---------------- Cotizaciones ----------------
class CotizacionBase(BaseModel):
    cliente: str
    monto: float
    estado: str

class CotizacionCreate(CotizacionBase):
    pass

class Cotizacion(CotizacionBase):
    id: int
    class Config:
        from_attributes = True

# ---------------- Archivos ----------------
class Archivo(BaseModel):
    id: int
    prospecto_id: int
    filename: str
    path: str
    fecha_subida: datetime
    class Config:
        from_attributes = True