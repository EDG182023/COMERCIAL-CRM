from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
import models, schemas

# ---------------- Prospectos ----------------
def get_prospectos(db: Session):
    rows = (
        db.query(
            models.Prospecto.id,
            models.Prospecto.empresa,
            models.Prospecto.mail,
            models.Prospecto.web,
            models.Prospecto.rubro,
            models.Prospecto.estado_general,
            models.Etapa.nombre.label("etapa_nombre")
        )
        .outerjoin(models.ProspectoEtapaActual, models.Prospecto.id == models.ProspectoEtapaActual.prospecto_id)
        .outerjoin(models.Etapa, models.ProspectoEtapaActual.etapa_id == models.Etapa.id)
        .all()
    )

    # Convertimos a lista de dicts para que FastAPI pueda serializar
    return [
        {
            "id": r.id,
            "empresa": r.empresa,
            "mail": r.mail,
            "web": r.web,
            "rubro": r.rubro,
            "estado_general": r.estado_general,
            "etapa_nombre": r.etapa_nombre
        }
        for r in rows
    ]

def get_prospecto_by_id(db: Session, prospecto_id: int):
    row = (
        db.query(
            models.Prospecto.id,
            models.Prospecto.empresa,
            models.Prospecto.mail,
            models.Prospecto.web,
            models.Prospecto.rubro,
            models.Prospecto.estado_general,
            models.Etapa.nombre.label("etapa_nombre")
        )
        .outerjoin(models.ProspectoEtapaActual, models.Prospecto.id == models.ProspectoEtapaActual.prospecto_id)
        .outerjoin(models.Etapa, models.ProspectoEtapaActual.etapa_id == models.Etapa.id)
        .filter(models.Prospecto.id == prospecto_id)
        .first()
    )
    if not row:
        return None

    return {
        "id": row.id,
        "empresa": row.empresa,
        "mail": row.mail,
        "web": row.web,
        "rubro": row.rubro,
        "estado_general": row.estado_general,
        "etapa_nombre": row.etapa_nombre
    }

def create_prospecto(db: Session, prospecto: schemas.ProspectoCreate):
    db_obj = models.Prospecto(**prospecto.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def resumen_estados(db: Session):
    rows = (
        db.query(
            models.Prospecto.estado_general,
            func.count(models.Prospecto.id).label("cantidad")
        )
        .group_by(models.Prospecto.estado_general)
        .all()
    )
    return [{"estado_general": r[0], "cantidad": r[1]} for r in rows]
# ---------------- Etapas ----------------
def get_etapas(db: Session):
    return db.query(models.Etapa).all()

def create_etapa(db: Session, etapa: schemas.EtapaCreate):
    db_obj = models.Etapa(**etapa.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

# ---------------- Kanban mover ----------------
def mover_prospecto(db: Session, mov: schemas.MovimientoInput):
    prospecto = db.query(models.Prospecto).filter(models.Prospecto.id == mov.prospecto_id).first()
    etapa_destino = db.query(models.Etapa).filter(models.Etapa.id == mov.etapa_destino_id).first()
    if not prospecto or not etapa_destino:
        raise ValueError("Prospecto o etapa no encontrados")

    etapa_actual = db.query(models.ProspectoEtapaActual).filter(
        models.ProspectoEtapaActual.prospecto_id == mov.prospecto_id
    ).first()

    etapa_origen_id = etapa_actual.etapa_id if etapa_actual else None

    if etapa_actual:
        etapa_actual.etapa_id = etapa_destino.id
        etapa_actual.fecha_asignacion = datetime.utcnow()
    else:
        etapa_actual = models.ProspectoEtapaActual(
            prospecto_id=prospecto.id,
            etapa_id=etapa_destino.id,
            fecha_asignacion=datetime.utcnow()
        )
        db.add(etapa_actual)

    prospecto.estado_general = etapa_destino.estado_general

    historico = models.ProspectoEtapaHistorico(
        prospecto_id=prospecto.id,
        etapa_origen_id=etapa_origen_id,
        etapa_destino_id=etapa_destino.id,
        usuario_id=mov.usuario_id,
        fecha_movimiento=datetime.utcnow(),
        motivo=mov.motivo
    )
    db.add(historico)

    db.commit()
    return {"message": "Prospecto movido"}

def get_historico(db: Session, prospecto_id: int):
    return db.query(models.ProspectoEtapaHistorico).filter(
        models.ProspectoEtapaHistorico.prospecto_id == prospecto_id
    ).all()

# ---------------- Reuniones ----------------
def create_reunion(db: Session, reunion: schemas.ReunionCreate):
    db_obj = models.Reunion(**reunion.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_reuniones(db: Session):
    rows = (
        db.query(
            models.Reunion.id,
            models.Reunion.fecha,
            models.Reunion.hora,
            models.Reunion.notas,
            models.Reunion.prospecto_id,
            models.Prospecto.empresa.label("prospecto_nombre")
        )
        .join(models.Prospecto, models.Reunion.prospecto_id == models.Prospecto.id)
        .all()
    )

    return [
        {
            "id": r.id,
            "fecha": r.fecha,
            "hora": r.hora,
            "notas": r.notas,
            "prospecto_id": r.prospecto_id,
            "prospecto_nombre": r.prospecto_nombre
        }
        for r in rows
    ]

# ---------------- Cotizaciones ----------------
def create_cotizacion(db: Session, cot: schemas.CotizacionCreate):
    db_obj = models.Cotizacion(**cot.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_cotizaciones(db: Session):
    return db.query(models.Cotizacion).all()

# ---------------- Archivos ----------------
def create_archivo(db: Session, prospecto_id: int, filename: str, path: str):
    db_obj = models.Archivo(
        prospecto_id=prospecto_id,
        filename=filename,
        path=path,
        fecha_subida=datetime.utcnow()
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_prospecto(db: Session, prospecto_id: int, data: schemas.ProspectoCreate):
    db_obj = db.query(models.Prospecto).filter(models.Prospecto.id == prospecto_id).first()
    if not db_obj:
        return None
    for key, value in data.dict().items():
        setattr(db_obj, key, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_prospecto_completo(db: Session, prospecto_id: int, data: dict):
    # Buscar prospecto
    db_obj = db.query(models.Prospecto).filter(models.Prospecto.id == prospecto_id).first()
    if not db_obj:
        return None

    # Actualizar datos básicos
    for key in ["empresa", "mail", "web", "rubro", "estado_general"]:
        if key in data:
            setattr(db_obj, key, data[key])

    # Si viene etapa_id, mover prospecto con histórico
    etapa_id = data.get("etapa_id")
    if etapa_id:
        etapa_destino = db.query(models.Etapa).filter(models.Etapa.id == etapa_id).first()
        if etapa_destino:
            # Actualizamos estado_general según la etapa
            db_obj.estado_general = etapa_destino.estado_general

            # Actualizamos o creamos etapa actual
            etapa_actual = db.query(models.ProspectoEtapaActual).filter(
                models.ProspectoEtapaActual.prospecto_id == prospecto_id
            ).first()

            etapa_origen_id = etapa_actual.etapa_id if etapa_actual else None

            if etapa_actual:
                etapa_actual.etapa_id = etapa_destino.id
                etapa_actual.fecha_asignacion = datetime.utcnow()
            else:
                etapa_actual = models.ProspectoEtapaActual(
                    prospecto_id=prospecto_id,
                    etapa_id=etapa_destino.id,
                    fecha_asignacion=datetime.utcnow()
                )
                db.add(etapa_actual)

            # Registrar histórico
            historico = models.ProspectoEtapaHistorico(
                prospecto_id=prospecto_id,
                etapa_origen_id=etapa_origen_id,
                etapa_destino_id=etapa_destino.id,
                usuario_id=data.get("usuario_id", 1),
                fecha_movimiento=datetime.utcnow(),
                motivo=data.get("motivo", "Cambio manual desde detalle")
            )
            db.add(historico)

    db.commit()
    db.refresh(db_obj)

    # Traer nombre de la etapa actual
    etapa_actual_nombre = (
        db.query(models.Etapa.nombre)
        .join(models.ProspectoEtapaActual, models.ProspectoEtapaActual.etapa_id == models.Etapa.id)
        .filter(models.ProspectoEtapaActual.prospecto_id == prospecto_id)
        .scalar()
    )

    return {
        "id": db_obj.id,
        "empresa": db_obj.empresa,
        "mail": db_obj.mail,
        "web": db_obj.web,
        "rubro": db_obj.rubro,
        "estado_general": db_obj.estado_general,
        "etapa_nombre": etapa_actual_nombre
    }

def get_archivos(db: Session, prospecto_id: int):
    return db.query(models.Archivo).filter(models.Archivo.prospecto_id == prospecto_id).all()