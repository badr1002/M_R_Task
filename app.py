from os import error
from threading import ThreadError
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['MONGODB_SETTINGS'] = {
    'db': 'test',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)


class User(db.Document):
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()

class Values(db.Document):
    val = db.DecimalField()
    

@app.route('/api/user/allUsers')
def home():
    try:
        users = User.objects()
        return jsonify({
            'apiStatus':True,
            'msg':"get users successfully",
            'data':users
        }),200
    except(error):
        return jsonify({
            'apiStatus': False,
            'msg': "get users faild!",
            'data': {}
        }),500


@app.route('/api/user/register', methods=['POST'])
def register():
    name = request.get_json()['name']
    email = request.get_json()['email']
    password = request.get_json()['password']
    try:
       User(name=name, email=email, password=password).save()
       return jsonify({
            'apiStatus':True,
            'msg':"add users successfully",
            'data':{}
        }),200
    except(error):
        return jsonify({
            'apiStatus': False,
            'msg': "add users faild!",
            'data': {}
        }),500


@app.route('/api/user/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    try:
      user = User.objects(email=email, password=password).first()
      if user:
         return jsonify({
             'apiStatus': True,
             'msg': "login successfully",
             'data': user
         }),200
      else:
        ThreadError("this email not found!")
    except(error):
        return jsonify({
            'apiStatus': False,
            'msg': "login faild!",
            'data': error
        }),500


@app.route('/api/value/add', methods=['POST'])
def Value():
    val = request.get_json('')['value']
    try:
        Values(val=val).save()
        return jsonify({
             'apiStatus': True,
             'msg': "add value successfully",
             'data': {}
         }), 200
    except(error):
        return jsonify({
            'apiStatus': False,
            'msg': "add value faild!",
            'data': error
        }),500


@app.route('/api/value/allValues', methods=['GET'])
def getValue():
    try:
        values = Values.objects()
        return jsonify({
            'apiStatus': True,
            'msg': "get values successfully",
            'data': values
        }), 200
    except(error):
        return jsonify({
            'apiStatus': False,
            'msg': "get values faild!",
            'data': error
        }), 500
        
if __name__ == "__main__":
    app.run(debug=True)
