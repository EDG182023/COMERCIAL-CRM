# models/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_models():
    from .prospectos import Prospecto
    from .etapas import Etapa
    from .prospecto_stages import ProspectoStage
    from .cotizaciones import Cotizacion, CotizacionEstado
    from .reuniones import Reunion, ReunionContacto
    from .auditoria import Auditoria