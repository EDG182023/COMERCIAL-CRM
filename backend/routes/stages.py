from flask import Blueprint, request, jsonify
from datetime import datetime
from models import db
from models.prospectos import Prospecto
from models.etapas import Etapa
from models.prospecto_stages import ProspectoStage
from models.cotizaciones import Cotizacion, CotizacionEstado
from utils.audit import audit
from services.rules import is_quote_creation_stage, is_contract_creation_stage

bp = Blueprint('stages', __name__)

@bp.post('/<int:prospecto_id>/stages')
def move_stage(prospecto_id):
    data = request.json
    new_stage_id = data['StageID']
    usuario_id = data['Usuario_ID']
    comentarios = data.get('Comentarios')

    prospecto = Prospecto.query.get_or_404(prospecto_id)
    new_stage = Etapa.query.get_or_404(new_stage_id)

    last = (ProspectoStage.query
            .filter_by(ProspectoID=prospecto_id)
            .order_by(ProspectoStage.Fecha_Entrada.desc())
            .first())
    if last and not last.Fecha_Salida:
        last.Fecha_Salida = datetime.utcnow()
        last.DuracionSegundos = int((last.Fecha_Salida - last.Fecha_Entrada).total_seconds())

    ps = ProspectoStage(
        ProspectoID=prospecto_id,
        StageID=new_stage_id,
        Usuario_ID=usuario_id,
        Fecha_Entrada=datetime.utcnow(),
        Comentarios=comentarios
    )
    db.session.add(ps)

    prospecto.Estado_General = new_stage.Estado_General
    db.session.add(prospecto)

    created_quote_id = None
    if is_quote_creation_stage(new_stage.Nombre):
        q = Cotizacion(
            ID_empresa=prospecto.ID,
            Estado='Pendiente',
            Usuario_Creacion=usuario_id
        )
        db.session.add(q)
        db.session.flush()
        ce = CotizacionEstado(
            CotizacionID=q.ID,
            Estado='Pendiente',
            Usuario_ID=usuario_id
        )
        db.session.add(ce)
        created_quote_id = q.ID

    audit(usuario_id, 'ProspectoStages', prospecto_id, f'Movido a etapa {new_stage.Nombre}')
    db.session.commit()

    return jsonify({
        'prospecto_id': prospecto_id,
        'new_stage_id': new_stage_id,
        'created_quote_id': created_quote_id
    }), 201