import json
from pathlib import Path
from models.country import Country
from db import db

def seed_countries(app, json_file = 'seeds/countries.json'):
   path = Path(json_file)
   if not path.exists():
      app.logger.error(f"Countries seed JSON file not found: {json_file}")
      return
   
   with path.open('r', encoding='utf-8') as file:
      countries = json.load(file)

   with app.app_context():
      for country in countries:
         exists = Country.query.filter_by(iso3=country['isoAlpha3']).first()
         if not exists:
            country = Country(
               iso3 = country.get("isoAlpha3"),
               name = country.get("name"),
               currency3 = country["currency"]["code"] if country.get("currency") else None,
               flag = country.get("flag")
            )
            db.session.add(country)
         db.session.commit()
      app.logger.info(f"Countries seeded.")