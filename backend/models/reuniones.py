from . import db

from datetime import datetime

class Reunion(db.Model):
    __tablename__ = 'Reuniones'
    ID = db.Column(db.Integer, primary_key=True)
    ProspectoID = db.Column(db.Integer, db.ForeignKey('Prospectos.ID'), nullable=False)
    Tipo = db.Column(db.String(40))
    Fecha_Programada = db.Column(db.DateTime)
    Fecha_Realizada = db.Column(db.DateTime)
    Duracion_Minutos = db.Column(db.Integer)
    Estado = db.Column(db.String(100))
    Comentarios = db.Column(db.Text)
    Usuario_Creacion = db.Column(db.Integer)
    Fecha_Creacion = db.Column(db.DateTime, default=datetime.utcnow)

class ReunionContacto(db.Model):
    __tablename__ = 'ReunionContactos'
    ID = db.Column(db.Integer, primary_key=True)
    ReunionID = db.Column(db.Integer, db.ForeignKey('Reuniones.ID'), nullable=False)
    ContactoID = db.Column(db.Integer, nullable=False)
    Asistio = db.Column(db.Boolean, default=False)