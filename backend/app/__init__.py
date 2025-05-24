from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()  

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'super-secret-key'
    app.config['JWT_SECRET_KEY'] = 'another-secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///moodtune.db' 

    CORS(app, resources={r"/api/*": {"origins": "*"}}) 

    db.init_app(app)
    jwt.init_app(app)  
    CORS(app)

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app
