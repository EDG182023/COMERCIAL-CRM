from flask import Blueprint, request, jsonify
from models import db
from models.cotizaciones import Cotizacion, CotizacionEstado
from utils.audit import audit

bp = Blueprint('cotizaciones', __name__)

@bp.get('')
def list_quotes():
    estado = request.args.get('estado')
    q = Cotizacion.query
    if estado:
        q = q.filter(Cotizacion.Estado == estado)
    items = q.order_by(Cotizacion.ID.desc()).all()
    return jsonify([{
        'ID': c.ID,
        'ID_empresa': c.ID_empresa,
        'Estado': c.Estado,
        'Monto': float(c.Monto) if c.Monto else None,
        'Fecha': c.Fecha.isoformat() if c.Fecha else None,
        'Archivo': c.Archivo
    } for c in items])

@bp.patch('/<int:cotizacion_id>/estado')
def change_state(cotizacion_id):
    data = request.json
    nuevo_estado = data['Estado']
    usuario_id = data['Usuario_ID']
    motivo_id = data.get('Motivo_Rechazo_ID')

    c = Cotizacion.query.get_or_404(cotizacion_id)
    c.Estado = nuevo_estado
    c.Motivo_Rechazo_ID = motivo_id

    ce = CotizacionEstado(
        CotizacionID=cotizacion_id,
        Estado=nuevo_estado,
        Usuario_ID=usuario_id,
        Comentarios=data.get('Comentarios')
    )
    db.session.add(ce)
    audit(usuario_id, 'Cotizaciones', cotizacion_id, f'Estado → {nuevo_estado}')
    db.session.commit()
    return jsonify({'id': cotizacion_id, 'estado': nuevo_estado}), 200