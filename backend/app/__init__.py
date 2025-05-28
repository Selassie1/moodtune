# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt  # ← use extensions
from app.routes.audius import audius_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'super-secret-key'
    app.config['JWT_SECRET_KEY'] = 'another-secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moodtune.db' 

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    jwt.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.ai import ai_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(audius_bp, url_prefix='/api/audius')

    return app
