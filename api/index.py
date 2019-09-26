import json
from flask import Flask,request
from flask_cors import CORS


app = Flask(__name__)
@app.route('/login',methods=['POST'])
def login():
    reqdata = json.loads(request.data)
    if reqdata['username'] == '123' and reqdata['password'] == '123':
        return 'ok'
    return 'false'


if __name__ == '__main__':
    CORS(app,supports_credentials = True)
    app.run(debug=True,port='3001')


