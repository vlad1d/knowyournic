from flask import Blueprint, jsonify, request
from models.country import Country
from db import db

countries_bp = Blueprint("countries_bp", __name__)

@countries_bp.route("/", methods=["GET"])
def get_countries():
   country_iso = request.args.get("iso3")

   country = Country.query
   if country_iso:
         country = country.filter_by(iso3=country_iso)
   return jsonify([c.to_dict() for c in country.all()])