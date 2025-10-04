from . import db


class Prospecto(db.Model):
    __tablename__ = 'Prospectos'
    ID = db.Column(db.Integer, primary_key=True)
    Empresa = db.Column(db.String(510))
    Comercial_ID = db.Column(db.Integer, nullable=False)
    Estado_General = db.Column(db.String(100))
    Activo = db.Column(db.Boolean, default=True)