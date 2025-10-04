from flask import Blueprint, request, jsonify
from models import db
from models.reuniones import Reunion
from utils.audit import audit

bp = Blueprint('reuniones', __name__)

@bp.post('')
def create_meeting():
    data = request.json
    r = Reunion(
        ProspectoID=data['ProspectoID'],
        Tipo=data.get('Tipo', 'Reunion'),
        Fecha_Programada=data.get('Fecha_Programada'),
        Estado='Programada',
        Usuario_Creacion=data['Usuario_Creacion']
    )
    db.session.add(r)
    db.session.commit()
    return jsonify({'ID': r.ID}), 201

@bp.patch('/<int:id>')
def update_meeting(id):
    data = request.json
    r = Reunion.query.get_or_404(id)
    r.Estado = data.get('Estado', r.Estado)
    r.Fecha_Realizada = data.get('Fecha_Realizada', r.Fecha_Realizada)
    r.Duracion_Minutos = data.get('Duracion_Minutos', r.Duracion_Minutos)
    r.Comentarios = data.get('Comentarios', r.Comentarios)
    audit(data.get('Usuario_ID'), 'Reuniones', id, f'Actualiza estado a {r.Estado}')
    db.session.commit()
    return jsonify({'ID': r.ID, 'Estado': r.Estado}), 200

@bp.get('')
def list_meetings():
    prospecto_id = request.args.get('prospecto_id')
    q = Reunion.query
    if prospecto_id:
        q = q.filter(Reunion.ProspectoID == int(prospecto_id))
    items = q.all()
    return jsonify([{
        'ID': r.ID,
        'ProspectoID': r.ProspectoID,
        'Tipo': r.Tipo,
        'Estado': r.Estado,
        'Fecha_Programada': r.Fecha_Programada.isoformat() if r.Fecha_Programada else None,
        'Fecha_Realizada': r.Fecha_Realizada.isoformat() if r.Fecha_Realizada else None,
    } for r in items])