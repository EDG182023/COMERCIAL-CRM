from flask import Blueprint, request, jsonify
import os, uuid
from werkzeug.utils import secure_filename

bp = Blueprint('adjuntos', __name__)
UPLOAD_DIR = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED = {'.pdf', '.jpg', '.jpeg', '.png', '.docx'}

@bp.post('')
def upload():
    file = request.files['file']
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED:
        return jsonify({'error': 'Tipo de archivo no permitido'}), 400
    name = f'{uuid.uuid4()}{ext}'
    path = os.path.join(UPLOAD_DIR, secure_filename(name))
    file.save(path)
    # Aquí podrías asociar a la entidad recibida en form-data
    return jsonify({'path': f'/files/{name}'}), 201