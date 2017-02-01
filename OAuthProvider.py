from flask import Flask, render_template
from flask import request
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'OAuthProviderDB'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/')
def index():
    return render_template("index.html", msg='asdasd')


@app.route('/auth', methods=['POST', 'GET'])
def auth():
    if request.method == 'GET':
        return render_template("auth.html", title="Login form", formTitle="auth")
    else:
        username = request.form['username']
        password = request.form['password']
        # print username + password
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from user")
        # cursor.execute("'SELECT * from user where username='+username+' and password ='+password")
        data = cursor.fetchone()
        # if data is None:
        #     return render_template("index.html", msg='aga')
        # else:
        return render_template("index.html", msg=data)


# @app.route('/auth', methods=['GET'])
# def auth():
#     return render_template("auth.html", title="Login form", formTitle="auth")


@app.route('/reg')
def reg():
    return render_template("reg.html", title="Reg form", formTitle="reg")


if __name__ == '__main__':
    app.run()
