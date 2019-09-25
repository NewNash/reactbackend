import json
from flask import Flask,request
from flask_cors import CORS


app = Flask(__name__)
@app.route('/login',methods=['POST'])
def login():
    # data = request.form['username']
    # username = request.form['username']
    # print(username)

    print(json.loads(request.form.to_dict()))
    # print(request.form['username'])
    return request.form
if __name__=='__main__':
    CORS(app,supports_credentials = True)
    app.run(debug=True,port='3001')