from flask import Flask, render_template

app = Flask(__name__)


@app.route('/auth')
def auth():
    return render_template("auth.html", title="Login form", formTitle="auth")


@app.route('/reg')
def reg():
    return render_template("reg.html", title="Reg form", formTitle="reg")

if __name__ == '__main__':
    app.run()
