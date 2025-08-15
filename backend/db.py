from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.engine import Engine
import models


db = SQLAlchemy()

def init_db(app):
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///knowyournic.db'
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
   db.init_app(app)
   with app.app_context():
      @event.listens_for(Engine, 'connect')
      def set_sqlite_pragma(dbapi_connection, _):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()
            
      db.create_all()