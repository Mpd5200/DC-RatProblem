import pandas as pd
import re
import datetime

from flask import (
    Flask,
    render_template,
    jsonify)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine = create_engine("sqlite:///db/dc_rodents.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


# Save reference to the table
data= Base.classes.rodents_sightings

# Create our session (link) from Python to the DB
session = Session(engine)



app = Flask(__name__)



@app.route("/")
def home():
    """Render Home Page."""
    return render_template("ratdc.html")


@app.route("/sightings")
def sightings_data():
    
    session = Session(engine)

    # Query for the wards and sightings count
    sightings= session.query(data.WARD, func.count(data.SERVICECODEDESCRIPTION)).\
        group_by(data.WARD).\
        order_by(data.SERVICECODEDESCRIPTION.desc()).all()

    ward=[]
    count=[]
    for sighting in sightings:
        ward.append(sighting[0])
        count.append(sighting[1])

    # Generate the plot trace
    trace = {
        "x": ward,
        "y": count,
        "type": "bar"
    }
    return jsonify(trace)

@app.route("/date")
def date_data():


  #Query data for ward, count of sightings & date
    session = Session(engine)

    sightings= session.query(data.WARD, data.ADDDATE, func.count(data.SERVICECODEDESCRIPTION)).\
        group_by(data.ADD_DATE).\
        order_by(data.SERVICECODEDESCRIPTION.desc()).all()

    ward=[]
    count=[]
    service_date=[]
    for sighting in sightings:
        ward.append(sighting[0])
        service_date.append(sighting[1])
        count.append(sighting[2])

    


   # Generate the plot trace
    trace = {
        "x": service_date,
        "y": count,
        "type": "bar"
     }

    return jsonify(trace)



if __name__ == '__main__':
   app.run(debug=True)