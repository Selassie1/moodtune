from app import create_app
from app.extensions import db

app = create_app()
@app.route("/")
def index():
    return "Moodtune backend is running!"


with app.app_context():
    db.create_all()
