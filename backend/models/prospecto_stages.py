from . import db


class ProspectoStage(db.Model):
    __tablename__ = 'ProspectoStages'
    ID = db.Column(db.Integer, primary_key=True)
    ProspectoID = db.Column(db.Integer, db.ForeignKey('Prospectos.ID'), nullable=False)
    StageID = db.Column(db.Integer, db.ForeignKey('Etapas.ID'), nullable=False)
    Usuario_ID = db.Column(db.Integer, nullable=False)
    Fecha_Entrada = db.Column(db.DateTime, nullable=False)
    Fecha_Salida = db.Column(db.DateTime)
    DuracionSegundos = db.Column(db.BigInteger)
    Comentarios = db.Column(db.Text)