from flask import Flask, render_template, session
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
    return render_template("index.html", title="Welcome")


@app.route('/auth', methods=['POST', 'GET'])
def auth():
    if request.method == 'GET':
        return render_template("auth.html", title="Login form", formTitle="auth")
    else:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT password from user WHERE username ='" + username + "'")
        data = cursor.fetchone()
        if data[0] == password:
            # session['username'] == username
            return render_template("index.html", title='success')
        else:
            return render_template("index.html", title='denied')


@app.route('/reg', methods=['POST', 'GET'])
def reg():
    if request.method == 'GET':
        return render_template("reg.html", title="Reg form", formTitle="reg")
    else:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        date = request.form['birthday']
        gender = request.form['gender']

        cursor = mysql.connect().cursor()
        query = "INSERT INTO user(date,gender,password, email,username,first_name,last_name) " \
                "VALUES(%s,%s,%s,%s,%s,%s,%s)"

        args = (date, gender, password, email, username, first_name, last_name)
        cursor.execute(query, args)
        mysql.connect().commit()
        return render_template("index.html", msg='success')
        # cursor.close()


if __name__ == '__main__':
    app.run()
