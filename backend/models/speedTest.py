from db import db
from datetime import datetime, timezone

class SpeedTest(db.Model):
  __tablename__ = "speedTests"
  
  id = db.Column(db.Integer, primary_key=True)
  hotspotId = db.Column(db.Integer, db.ForeignKey('hotspots.id'), nullable=False)
  
  download = db.Column(db.Float)
  upload = db.Column(db.Float)
  ping = db.Column(db.Float)
  
  createdAt = db.Column(db.DateTime(timezone = True), default=datetime.now(timezone.utc), nullable=False)
  
  def to_dict(self):
    return {
      "id": self.id,
      "hotspotId": self.hotspotId,
      "download": self.download,
      "upload": self.upload,
      "ping": self.ping,
      "createdAt": self.createdAt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    }