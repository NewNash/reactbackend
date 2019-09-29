import json,os,random,string,time,socket
from flask import Flask,request,send_from_directory
from flask_cors import CORS
app = Flask(__name__,static_url_path='/static')
app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024
app.config['UPLOADED_PHOTOS_DEST'] = os.path.join(os.getcwd(),'static/upload')


@app.route('/login',methods=['POST'])
def login():
    reqdata = json.loads(request.data)
    if reqdata['username'] == '123' and reqdata['password'] == '123':
        return 'ok'
    return 'false'


@app.route('/upload',methods=['POST'])
def upload():
    imgname = random_name(request.files['myfile'].filename.split('.')[-1])
    request.files['myfile'].save(os.path.join(app.config['UPLOADED_PHOTOS_DEST'],imgname))
    return 'http://127.0.0.1:3001/static/upload/'+imgname


def random_name(shuffix,length=4):
    Str = string.ascii_letters+string.digits
    return  time.strftime("%Y-%m-%d-%H-%M-%S-", time.localtime())+''.join(random.choice(Str) for i in range(length))+'.'+shuffix


@app.route('/')
def index():
    s = socket.gethostname()
    ip=socket.gethostbyname(s)
    print('hos')
    return ip


if __name__ == '__main__':
    CORS(app,supports_credentials = True)
    app.run(debug=True,port='3001')


