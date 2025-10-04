# app.py
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db, init_models   # ✅ usamos el db de models

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)


    db.init_app(app)

    with app.app_context():
        init_models()
        db.create_all()

    # registrar blueprints...
    from routes.prospectos import bp as prospectos_bp
    from routes.stages import bp as stages_bp
    from routes.cotizaciones import bp as cotizaciones_bp
    from routes.reuniones import bp as reuniones_bp
    from routes.adjuntos import bp as adjuntos_bp

    app.register_blueprint(prospectos_bp, url_prefix='/api/prospectos')
    app.register_blueprint(stages_bp, url_prefix='/api/prospectos')
    app.register_blueprint(cotizaciones_bp, url_prefix='/api/cotizaciones')
    app.register_blueprint(reuniones_bp, url_prefix='/api/reuniones')
    app.register_blueprint(adjuntos_bp, url_prefix='/api/adjuntos')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)