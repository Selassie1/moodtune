from flask import Blueprint
from .auth import auth_bp
from .ai import ai_bp

routes = Blueprint('routes', __name__)
routes.register_blueprint(auth_bp)
routes.register_blueprint(ai_bp)
