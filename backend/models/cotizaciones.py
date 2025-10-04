from . import db

from datetime import datetime

class Cotizacion(db.Model):
    __tablename__ = 'Cotizaciones'
    ID = db.Column(db.Integer, primary_key=True)
    ID_empresa = db.Column(db.Integer, nullable=False)   # Prospecto.ID
    Fecha = db.Column(db.Date, default=datetime.utcnow)
    Archivo = db.Column(db.String(1000))
    Estado = db.Column(db.String(100), default='Pendiente')
    Motivo_Rechazo_ID = db.Column(db.Integer)
    Monto = db.Column(db.Numeric(12, 2))
    Usuario_Creacion = db.Column(db.Integer)
    Fecha_Creacion = db.Column(db.DateTime, default=datetime.utcnow)

class CotizacionEstado(db.Model):
    __tablename__ = 'CotizacionEstados'
    ID = db.Column(db.Integer, primary_key=True)
    CotizacionID = db.Column(db.Integer, db.ForeignKey('Cotizaciones.ID'), nullable=False)
    Estado = db.Column(db.String(100), nullable=False)
    Fecha_Cambio = db.Column(db.DateTime, default=datetime.utcnow)
    Usuario_ID = db.Column(db.Integer, nullable=False)
    Comentarios = db.Column(db.Text)