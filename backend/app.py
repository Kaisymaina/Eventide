from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db
from vendor_routes import vendor_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Only your frontend's origin(s) can call /api/* - set ALLOWED_ORIGINS in .env
    CORS(app, resources={r"/api/*": {"origins": Config.ALLOWED_ORIGINS}})

    db.init_app(app)
    app.register_blueprint(vendor_bp)

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)