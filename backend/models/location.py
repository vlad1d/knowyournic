from db import db

class Location(db.Model):
  __tablename__ = "locations"
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False, index=True)
  address = db.Column(db.String(200), nullable=False, index=True)
  type = db.Column(db.String(100), nullable=False) # business, landmark, address, etc.
  lat = db.Column(db.Float)
  lng = db.Column(db.Float)
  
  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "address": self.address,
      "type": self.type,
      "coordinates": {
        "lat": self.lat,
        "lng": self.lng
      } if self.lat is not None and self.lng is not None else None
    }
  