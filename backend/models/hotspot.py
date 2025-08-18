from db import db

class Hotspot(db.Model):
  __tablename__ = "hotspots"
  id = db.Column(db.Integer, primary_key=True)
  locationId = db.Column(db.Integer, db.ForeignKey('locations.id', ondelete='CASCADE'), nullable=False, index=True)
  
  wifiName = db.Column(db.String(100), nullable=False)
  wifiPassword = db.Column(db.String(100))
  category = db.Column(db.String(100), nullable=False) # open, customer, municipal
  description = db.Column(db.Text)
  
  submitterName = db.Column(db.String(100), nullable=False)
  submitterEmail = db.Column(db.String(200), nullable=False)
  submitterRelationship = db.Column(db.String(50)) # customer, employee, owner
  
  # Uniqueness constraint to prevent duplicate hotspots at the same location
  __table_args__ = (
    db.UniqueConstraint('locationId', 'wifiName', name='uq_location_wifiName'),
  )
  
  def to_dict(self):
    return {
      "id": self.id,
      "locationId": self.locationId,
      "wifiName": self.wifiName,
      "wifiPassword": self.wifiPassword,
      "category": self.category,
      "description": self.description,
      "submitterInfo": {
        "name": self.submitterName,
        "email": self.submitterEmail,
        "relationship": self.submitterRelationship
      }
    }