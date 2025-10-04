from flask import Blueprint, request, jsonify
from models import db
from models.prospectos import Prospecto
from models.etapas import Etapa

bp = Blueprint('prospectos', __name__)

@bp.get('')
def list_prospectos():
    estado = request.args.get('estado')
    q = Prospecto.query
    if estado:
        q = q.filter(Prospecto.Estado_General == estado)
    items = q.all()
    return jsonify([{
        'ID': p.ID,
        'Empresa': p.Empresa,
        'Comercial_ID': p.Comercial_ID,
        'Estado_General': p.Estado_General,
        'Activo': p.Activo
    } for p in items])

@bp.post('')
def create_prospecto():
    data = request.json
    p = Prospecto(
        Empresa=data.get('Empresa'),
        Comercial_ID=data['Comercial_ID'],
        Estado_General=data.get('Estado_General', 'Prospecto'),
        Activo=True
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({'ID': p.ID}), 201

@bp.get('/etapas')
def list_etapas():
    items = Etapa.query.order_by(Etapa.Orden.asc()).all()
    return jsonify([{
        'ID': e.ID,
        'Nombre': e.Nombre,
        'Orden': e.Orden,
        'Estado_General': e.Estado_General,
        'Canal_ID': e.Canal_ID
    } for e in items])