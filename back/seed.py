from database import SessionLocal, engine, Base
from models import Etapa, Prospecto, ProspectoEtapaActual
from datetime import datetime

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# --- Etapas base ---
etapas_base = [
     {"nombre": "Inicio de contacto", "estado_general": "Nuevo"},
    {"nombre": "Información enviada", "estado_general": "En proceso"},
    {"nombre": "Llamada/Reunión programada", "estado_general": "En proceso"},
    {"nombre": "Llamada/Reunión finalizada – Pasa a cotizar", "estado_general": "En proceso"},
    {"nombre": "Cotización creada – Lista para enviar", "estado_general": "Cotización"},
    {"nombre": "Cotización enviada", "estado_general": "Cotización"},
    {"nombre": "Respuesta de cliente a cotización", "estado_general": "Cierre"},
]

for etapa in etapas_base:
    existe = db.query(Etapa).filter_by(nombre=etapa["nombre"]).first()
    if not existe:
        db.add(Etapa(**etapa))

db.commit()

# --- Prospectos de prueba ---
prospectos_base = [
    {"empresa": "Cliente Alfa", "estado_general": "Pendiente"},
    {"empresa": "Cliente Beta", "estado_general": "En negociación"},
]

for p in prospectos_base:
    existe = db.query(Prospecto).filter_by(empresa=p["empresa"]).first()
    if not existe:
        nuevo = Prospecto(**p)
        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)

        # asignar etapa inicial
        etapa = db.query(Etapa).filter_by(estado_general=p["estado_general"]).first()
        if etapa:
            db.add(ProspectoEtapaActual(
                prospecto_id=nuevo.id,
                etapa_id=etapa.id,
                fecha_asignacion=datetime.utcnow()
            ))
            db.commit()

db.close()
print("✅ Etapas y prospectos de prueba cargados")