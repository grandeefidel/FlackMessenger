import os
import requests
from flask import Flask, session, request, flash, render_template, redirect, url_for,jsonify
from flask_session import Session
from datetime import datetime
from itertools import zip_longest
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
   

channels = []
messages=list()
message_a=dict()

@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        userdata = db.execute("SELECT * FROM users where email=:username", {"username": username}).fetchone()
        print(f"{userdata}")
        if userdata is None:
            flash("username or password incorrect", "danger")
            return render_template("index.html")
        else:
            passwrd = str(password)
            print(f"{userdata.password}  and {sha256_crypt.encrypt(str(password))}")
            if sha256_crypt.verify(passwrd,userdata.password):
                session["user_id"] = userdata.id
                session["username"] = username
                return redirect(url_for('dashboard', display_name = userdata.display_name))
            else:
                flash("username or password incorrect", "danger")
                return render_template("index.html")
    return render_template("index.html")

@app.route("/dashboard", methods=["POST", "GET"])
def dashboard():
    if request.method == "POST":
        display_name = session.get("display_name")
        channelName = request.form.get("channelName")
        channelMessages = list(filter(lambda x:x["channelName"] == channelName, messages ))
        filtered = [d for d in messages if channelName in d]
        print(f"filtered {filtered}")
        print(f"channelmessages {channelMessages}")
        return render_template("dashboard.html", display_name= display_name, channelName= channelName )
    return redirect(url_for('channel'))

@app.route("/channel", methods=["POST", "GET"])
def channel():
    if not channels:
        flag = True
    else:
        flag = False    
    if request.method == "POST": 
        display_name = request.form.get("display_name")
        session["display_name"] = display_name
        return render_template("channel.html",display_name= display_name,flag=flag )
    for names in channels:
        print(f"{names} channel")
    return render_template("channel.html",channels= channels, flag=flag)
    
@app.route("/saveChannel", methods=["POST"])
def saveChannel():
    if request.method == "POST":
        name = request.form.get("name")
        for names in channels:
            if names == name:
                flash("channel already exist", "danger")
                return redirect(url_for('channel'))
        channels.append(name)
        # desc = request.form.get("desc")
        print(f"{name} has been created successfully.")
        return redirect(url_for('channel'))

@socketio.on("submit message")
def message(data):
    message = data["message"]
    channelName = data["channelName"]
    display_name = session.get("display_name")
    timeStamp =  datetime.now().strftime('%b %d %Y %H:%M:%S')
    message_id = datetime.now().strftime('%Y%m%d%H%M%S%f')
    message_a['message_id'] = message_id
    message_a['channelName'] = channelName
    message_a['display_name'] =display_name
    message_a['timeStamp'] = timeStamp
    message_a['message'] = message
    messages.append(message_a)
    for m in messages:
        print(f"messages: {m}")
    msg = {"message":message,"timeStamp":timeStamp,"channelName":channelName, "display_name":display_name,"message_id":message_id }
    emit("emit message", msg , broadcast=True)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.secret_key = "1234567dailywebcoding"
    socketio.run(app)