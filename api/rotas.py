from typing import Text
from flask import Flask, render_template, redirect, request , url_for, session
from flask_mysqldb import MySQL
 

app = Flask(__name__)

app.config.from_pyfile('banco.py')

mysql = MySQL(app) 


 
if __name__ == '__main__':
    
    app.run(debug=True)