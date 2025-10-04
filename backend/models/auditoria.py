# models/auditoria.py
from . import db
from datetime import datetime

class Auditoria(db.Model):
    __tablename__ = 'Auditoria'
    ID = db.Column(db.Integer, primary_key=True)
    Usuario_ID = db.Column(db.Integer)
    Accion = db.Column(db.String(200))
    Tabla_Afectada = db.Column(db.String(100))
    Registro_ID = db.Column(db.Integer)
    Detalles = db.Column(db.Text)
    Fecha_Hora = db.Column(db.DateTime, default=datetime.utcnow)
    IP_Address = db.Column(db.String(100))