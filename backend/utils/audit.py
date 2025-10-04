# utils/audit.py
from datetime import datetime
from models import db
from models.auditoria import Auditoria

def audit(usuario_id, tabla, registro_id, accion, detalles=None, ip=None):
    """
    Inserta un registro en la tabla Auditoria.
    
    :param usuario_id: ID del usuario que ejecuta la acción
    :param tabla: Nombre de la tabla afectada
    :param registro_id: ID del registro afectado
    :param accion: Descripción de la acción realizada
    :param detalles: Texto adicional (opcional)
    :param ip: Dirección IP (opcional)
    """
    a = Auditoria(
        Usuario_ID=usuario_id,
        Accion=accion,
        Tabla_Afectada=tabla,
        Registro_ID=registro_id,
        Detalles=detalles,
        Fecha_Hora=datetime.utcnow(),
        IP_Address=ip
    )
    db.session.add(a)
    # ⚠️ Importante: el commit se hace en la ruta/servicio que llama a audit()