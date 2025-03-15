from config import api,app,db
from models import *


@app.route('/')
def index():
    return '<h1>Project Server</h1>'




if __name__ == '__main__':
    app.run(port=5555,debug=True)