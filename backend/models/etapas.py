from . import db


class Etapa(db.Model):
    __tablename__ = 'Etapas'
    ID = db.Column(db.Integer, primary_key=True)
    Canal_ID = db.Column(db.Integer)
    Nombre = db.Column(db.String(510))
    Orden = db.Column(db.Integer)
    Estado_General = db.Column(db.String(100))
    #Color = db.Column(db.String(40))