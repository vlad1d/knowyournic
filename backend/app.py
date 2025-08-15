from flask import Flask
from db import init_db
from seeds.seeder import seed_countries
from controllers.product_controller import products_bp
from controllers.country_controller import countries_bp

app = Flask(__name__)
init_db(app)
seed_countries(app)

@app.route('/')
def home():
    return "Welcome to the Know Your Nic API!"
 
app.register_blueprint(products_bp, url_prefix="/products")
app.register_blueprint(countries_bp, url_prefix="/countries")

if __name__ == '__main__':
    app.run(debug=True)