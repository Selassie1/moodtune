# app/models/user.py

from app.extensions import db 
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.String(150), primary_key=True)  # Using username as ID
    password_hash = db.Column(db.String(256), nullable=False)
    phone = db.Column(db.String(20), nullable=True)

    # 🔗 Relationship to Playlist
    playlists = db.relationship('Playlist', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
