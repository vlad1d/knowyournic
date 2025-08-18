from flask import Blueprint, jsonify, request
from db import db
from models.hotspot import Hotspot
from models.location import Location
from models.speedTest import SpeedTest

hotspots_bp = Blueprint("hotspots_bp", __name__)

def serialize_hotspot(hotspot: Hotspot, location: Location | None = None):
  latest = (
    SpeedTest.query
    .filter_by(hotspotId=hotspot.id)
    .order_by(SpeedTest.createdAt.desc())
    .first()
  )
  # Avoid an extra query if caller already has the Location
  loc = location or Location.query.get(hotspot.locationId)
  data = hotspot.to_dict()
  data["location"] = loc.to_dict() if loc else None
  data["latestSpeedTest"] = latest.to_dict() if latest else None
  return data

def to_float(value):
  try:
    return float(value) if value not in (None, "") else 0
  except (ValueError, TypeError):
    return None

# ---------------------------------------- GET /hotspots ----------------------------------------
@hotspots_bp.route("", methods=["GET"])
def get_hotspots():
  externalId = request.args.get("externalId")
  
  # If a location externalId is provided, then return hotspots for that location
  if externalId:
    location = Location.query.filter_by(externalId=externalId).first()
    if not location:
        return jsonify({"error": "Location not found."}), 404
    
    hotspots = Hotspot.query.filter_by(locationId=location.id).all()
    
    # For each hotspot, get the latest speed test result and attach known location
    return jsonify([serialize_hotspot(hotspot, location) for hotspot in hotspots]), 200
  
  # Otherwise, return all hotspots
  limit = request.args.get("limit", default=100, type=int)
  hotspots = Hotspot.query.limit(limit).all()
  return jsonify([serialize_hotspot(hotspot) for hotspot in hotspots]), 200

  
# ---------------------------------------- POST /hotspots ----------------------------------------
@hotspots_bp.route("", methods=["POST"])
def create_hotspot():
  data = request.get_json(silent = True) or {}
  loc = data.get("location") or {}
  coords = loc.get("coordinates") or {}
  submitter = data.get("submitterInfo") or {}
  
  required = [
    # Tweak as neeeded
  ]
  
  missing = [field for field in required if field not in data]
  if missing:
    return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400
  
  try:
    # Log the location
    place = Location.query.filter_by(externalId=loc.get("externalId")).first()
    if not place:
      place = Location(
        externalId = loc["id"],
        name = loc["name"],
        address = loc["address"],
        type = loc.get("type"),
        lat = coords.get("lat"),
        lng = coords.get("lng")
      )
      db.session.add(place)
      db.session.flush()  # Ensure the place is saved to get its ID
  
    # Now log the hotspot
    hotspot = Hotspot.query.filter_by(
      locationId=place.id,
      wifiName=data["wifiName"]
    ).first()
    
    if not hotspot:
      hotspot = Hotspot(
        locationId = place.id,
        wifiName = data["wifiName"],
        wifiPassword = data.get("wifiPassword"),
        category = data["category"],
        description = data.get("description"),
        submitterName = submitter.get("name"),
        submitterEmail = submitter.get("email"),
        submitterRelationship = submitter.get("relationship")
      )
      db.session.add(hotspot)
      db.session.flush()
    else:
      return jsonify({"error": "Hotspot already exists at this location with the same WiFi name."}), 400
    
    # Do not log the speed test. This is not provided by the user in the form.
    
    db.session.commit()
    
    # Return the appropriate response
    print(f'At location {place.to_dict()} created hotspot {hotspot.to_dict()}')
    
    return jsonify({
      "message": "Hotspot created successfully.",
      "location": place.to_dict(),
      "hotspot": hotspot.to_dict()
    }), 201
  except Exception as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 500