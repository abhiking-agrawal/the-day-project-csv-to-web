from flask import Flask, jsonify,request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
import io
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster0-znwk6.mongodb.net/demo?retryWrites=true"
mongo = PyMongo(app)

@app.route('/api/upload', methods=["POST"])
def transform_view():
    f = request.files['file']
    if not f:
        return "Please provide proper file"
    movie = mongo.db.movies
    stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.reader(stream)
    #print("file contents: ", file_contents)
    #print(type(file_contents))
    iterip = iter(csv_input)
    next(iterip)
    movieList = []
    for row in iterip:
        movieList.append({
            "Release Year": row[0],
            "Title": row[1],
            "Origin/Ethnicity": row[2],
            "Director": row[3],
            "Cast": row[4],
            "Genre": row[5],
            "Wiki Page": row[6],
            "Plot": row[7]
        })

    movie.insert_many(movieList)
    return 'File data stord successfully'

#Retrieve all the records
@app.route('/api/data',methods=['GET'])
def getAllRecords():
    movie = mongo.db.movies
    results = movie.find()
    return dumps(results),200

#Insert new entry in the collection
@app.route('/api/data',methods=['POST'])
def saveNewEntry():
    entry = request.json
    movie = mongo.db.movies
    movie.insert(entry)
    return 'Record Inserted Successfully'

#Get call - to retrive the record by id
#Put call - to update the record
#Delete call - to delete the record
@app.route('/api/data/<id>', methods=['GET','PUT','DELETE'])
def processIndividualEntry(id):
    movie = mongo.db.movies
    if request.method == 'GET':
        result = movie.find_one({"_id" : ObjectId(id)})
        return dumps(result)
    if request.method == 'DELETE':
        entry = movie.find_one({"_id" : ObjectId(id)})
        movie.remove(entry)
        return 'Record deleted successfully'
    if request.method == 'PUT':
        updatedEntry = request.json
        entry = movie.find_one({"_id" : ObjectId(id)})
        entry["Release Year"] = updatedEntry["Release Year"]
        entry["Title"] = updatedEntry["Title"]
        entry["Origin/Ethnicity"] = updatedEntry["Origin/Ethnicity"]
        entry["Director"] = updatedEntry["Director"]
        entry["Cast"] = updatedEntry["Cast"]
        entry["Genre"] = updatedEntry["Genre"]
        entry["Wiki Page"] = updatedEntry["Wiki Page"]
        entry["Plot"] = updatedEntry["Plot"]
        movie.save(entry)
        return 'Record updated successfully'
    else:
        return 'Invalid request'

if __name__ == '__main__':
    app.run() 