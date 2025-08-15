from db import db

class Country(db.Model):
   __tablename__ = "countries"

   iso3 = db.Column(db.String(3), primary_key=True)
   name = db.Column(db.JSON, nullable=False, unique = True)
   currency3 = db.Column(db.String(3))
   flag = db.Column(db.Text)

   def to_dict(self):
      return {"iso3": self.iso3, "name": self.name, "currency3": self.currency3, "flag": self.flag}
