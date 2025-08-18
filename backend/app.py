from flask import Flask
from flask_cors import CORS
from db import init_db
from controllers.hotspot_controller import hotspots_bp

app = Flask(__name__)
init_db(app)

@app.route('/')
def home():
    return "Welcome to the Know Your Nic API!"

CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(hotspots_bp, url_prefix="/api/hotspots")

if __name__ == '__main__':
    app.run(debug=True, port=8008)