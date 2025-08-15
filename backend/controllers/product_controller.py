from flask import Blueprint, jsonify, request
from models.product import Product
from db import db

products_bp = Blueprint("products_bp", __name__)

@products_bp.route("/", methods=["GET"])
def list_products():
   # optional params
   country_iso = request.args.get("iso3")

   # get the products and filter by optional params
   product = Product.query
   if country_iso:
         product = product.filter_by(iso3=country_iso)
   return jsonify([p.to_dict() for p in product.all()])

@products_bp.route("/", methods=["POST"])
def create_product():
   data = request.get_json(silent=True) or {}
   
   # check for missing fields
   if "iso3" not in data or "name" not in data or "category" not in data or "price" not in data or "unit_cnt" not in data:
      return jsonify({"error": "Missing required fields"}), 400

   # create the product and add it to the session
   try:
      product = Product(
         iso3 = data["iso3"],
         name = data["name"],
         category = data["category"],
         price = data["price"],
         prev_prices = [],
         unit_cnt = data["unit_cnt"]
      )
   except Exception as e:
      return jsonify({"error": str(e)}), 400

   db.session.add(product)
   db.session.commit()
   
   return jsonify(product.to_dict()), 201

@products_bp.route("/<int:product_id>", methods=["PUT"])
def update_product_price(product_id: int):
   data = request.get_json(silent=True) or {}
   
   if "price" not in data:
      return jsonify({"error": "Missing required field price"}), 400

   product = Product.query.get(product_id)
   if not product:
      return jsonify({"error": "Product not found"}), 404

   try:
      product.prev_prices.append(product.price)
      product.price = float(data["price"])
      db.session.commit()
   except Exception as e:
      return jsonify({"error": str(e)}), 400

   return jsonify(product.to_dict()), 200