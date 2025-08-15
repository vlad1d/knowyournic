from db import db
from sqlalchemy.ext.mutable import MutableList

class Product(db.Model):
   __tablename__ = "products"

   id = db.Column(db.Integer, primary_key=True)
   iso3 = db.Column(db.String(3), db.ForeignKey('countries.iso3'), nullable=False)
   name = db.Column(db.String(100), nullable=False)
   category = db.Column(db.String(50), nullable=False)
   price = db.Column(db.Float, nullable=False)
   unit_cnt = db.Column(db.Integer, nullable=False) # units per pack

   prev_prices = db.Column(MutableList.as_mutable(db.JSON), nullable=False, default=list)
   
   def to_dict(self):
      return {
         "id": self.id,
         "iso3": self.iso3,
         "name": self.name,
         "category": self.category,
         "price": self.price,
         "prev_prices": self.prev_prices,
         "unit_cnt": self.unit_cnt
      }
