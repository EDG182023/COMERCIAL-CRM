from http.client import HTTPException
from fastapi import FastAPI, Depends, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, crud
from database import engine, SessionLocal, Base
import os, shutil
from datetime import datetime
from fastapi import Body

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción conviene restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Prospectos ---
@app.post("/prospectos", response_model=schemas.Prospecto)
def crear_prospecto(prospecto: schemas.ProspectoCreate, db: Session = Depends(get_db)):
    return crud.create_prospecto(db, prospecto)

@app.get("/prospectos", response_model=list[schemas.Prospecto])
def listar_prospectos(db: Session = Depends(get_db)):
    return crud.get_prospectos(db)

@app.get("/prospectos/estados-generales")
def resumen_estados(db: Session = Depends(get_db)):
    return crud.resumen_estados(db)

@app.get("/prospectos/{prospecto_id}/historico", response_model=list[schemas.ProspectoEtapaHistorico])
def historico_prospecto(prospecto_id: int, db: Session = Depends(get_db)):
    return crud.get_historico(db, prospecto_id)

# --- Etapas ---
@app.post("/etapas", response_model=schemas.Etapa)
def crear_etapa(etapa: schemas.EtapaCreate, db: Session = Depends(get_db)):
    return crud.create_etapa(db, etapa)

@app.get("/etapas", response_model=list[schemas.Etapa])
def listar_etapas(db: Session = Depends(get_db)):
    return crud.get_etapas(db)

# --- Kanban mover ---
@app.post("/kanban/mover")
def mover(mov: schemas.MovimientoInput, db: Session = Depends(get_db)):
    return crud.mover_prospecto(db, mov)

# --- Reuniones ---
@app.post("/reuniones", response_model=schemas.Reunion)
def crear_reunion(reunion: schemas.ReunionCreate, db: Session = Depends(get_db)):
    return crud.create_reunion(db, reunion)

@app.get("/reuniones", response_model=list[schemas.Reunion])
def listar_reuniones(db: Session = Depends(get_db)):
    return crud.get_reuniones(db)

# --- Cotizaciones ---
@app.post("/cotizaciones", response_model=schemas.Cotizacion)
def crear_cotizacion(cot: schemas.CotizacionCreate, db: Session = Depends(get_db)):
    return crud.create_cotizacion(db, cot)

@app.get("/cotizaciones", response_model=list[schemas.Cotizacion])
def listar_cotizaciones(db: Session = Depends(get_db)):
    return crud.get_cotizaciones(db)

# --- Archivos ---
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/archivos", response_model=schemas.Archivo)
def subir_archivo(prospecto_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    filename = f"{datetime.utcnow().timestamp()}_{file.filename}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_obj = models.Archivo(
        prospecto_id=prospecto_id,
        filename=file.filename,
        path=filepath
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.put("/prospectos/{prospecto_id}", response_model=schemas.Prospecto)
def actualizar_prospecto(prospecto_id: int, prospecto: schemas.ProspectoCreate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Prospecto).filter(models.Prospecto.id == prospecto_id).first()
    if not db_obj:
        return {"error": "Prospecto no encontrado"}
    for key, value in prospecto.dict().items():
        setattr(db_obj, key, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj


@app.put("/prospectos/{prospecto_id}/etapa")
def actualizar_etapa(prospecto_id: int, data: dict = Body(...), db: Session = Depends(get_db)):
    etapa_destino_id = data.get("etapa_id")
    usuario_id = data.get("usuario_id", 1)  # por ahora fijo
    motivo = data.get("motivo", "Cambio manual desde detalle")

    return crud.mover_prospecto(
        db,
        schemas.MovimientoInput(
            prospecto_id=prospecto_id,
            etapa_destino_id=etapa_destino_id,
            usuario_id=usuario_id,
            motivo=motivo
        )
    )

@app.put("/prospectos/{prospecto_id}/update", response_model=schemas.Prospecto)
def update_prospecto_completo(prospecto_id: int, data: dict = Body(...), db: Session = Depends(get_db)):
    updated = crud.update_prospecto_completo(db, prospecto_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Prospecto no encontrado")
    return updated

@app.get("/archivos", response_model=list[schemas.Archivo])
def listar_archivos(prospecto_id: int, db: Session = Depends(get_db)):
    return db.query(models.Archivo).filter(models.Archivo.prospecto_id == prospecto_id).all()

@app.get("/prospectos/{prospecto_id}", response_model=schemas.Prospecto)
def get_prospecto(prospecto_id: int, db: Session = Depends(get_db)):
    prospecto = crud.get_prospecto_by_id(db, prospecto_id)
    if not prospecto:
        raise HTTPException(status_code=404, detail="Prospecto no encontrado")
    return prospecto