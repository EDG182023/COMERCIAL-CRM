from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float


from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Prospecto(Base):
    __tablename__ = "prospectos"
    id = Column(Integer, primary_key=True, index=True)
    empresa = Column(String, index=True, nullable=False)
    mail = Column(String, nullable=True)
    web = Column(String, nullable=True)
    rubro = Column(String, nullable=True)
    estado_general = Column(String, default="Pendiente")

    etapa_actual = relationship("ProspectoEtapaActual", back_populates="prospecto", uselist=False)

class Etapa(Base):
    __tablename__ = "etapas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    estado_general = Column(String, index=True)

class ProspectoEtapaActual(Base):
    __tablename__ = "prospecto_etapa_actual"
    id = Column(Integer, primary_key=True, index=True)
    prospecto_id = Column(Integer, ForeignKey("prospectos.id"))
    etapa_id = Column(Integer, ForeignKey("etapas.id"))
    fecha_asignacion = Column(DateTime, default=datetime.utcnow)

    prospecto = relationship("Prospecto", back_populates="etapa_actual")
    etapa = relationship("Etapa")

class ProspectoEtapaHistorico(Base):
    __tablename__ = "prospecto_etapa_historico"
    id = Column(Integer, primary_key=True, index=True)
    prospecto_id = Column(Integer, ForeignKey("prospectos.id"))
    etapa_origen_id = Column(Integer, ForeignKey("etapas.id"), nullable=True)
    etapa_destino_id = Column(Integer, ForeignKey("etapas.id"))
    usuario_id = Column(Integer, default=1)
    fecha_movimiento = Column(DateTime, default=datetime.utcnow)
    motivo = Column(String, nullable=True)

class Reunion(Base):
    __tablename__ = "reuniones"
    id = Column(Integer, primary_key=True, index=True)
    prospecto_id = Column(Integer, ForeignKey("prospectos.id"))
    fecha = Column(String)
    hora = Column(String)
    notas = Column(String)

class Cotizacion(Base):
    __tablename__ = "cotizaciones"
    id = Column(Integer, primary_key=True, index=True)
    cliente = Column(String)
    monto = Column(Float)
    estado = Column(String)

class Archivo(Base):
    __tablename__ = "archivos"
    id = Column(Integer, primary_key=True, index=True)
    prospecto_id = Column(Integer, ForeignKey("prospectos.id"))
    filename = Column(String)
    path = Column(String)
    fecha_subida = Column(DateTime, default=datetime.utcnow)

