from flask import Flask, render_template ,request,url_for,redirect,session #import flask class
from scipy.interpolate import interp1d
# import matplotlib.pyplot as plt
from Transfer_func import zplane
from wtforms import StringField, SubmitField,SelectField
from flask_wtf import FlaskForm
import numpy as np
from all_pass import all_filter



app = Flask(__name__) 
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = "secret"



@app.route('/',methods= ['POST','GET'])
def index():
    global x,y,z,tf
    if request.method == 'POST':
            countP       = int(request.form['hidden_countP'])
            countZ       = int(request.form['hidden_countZ'])
            countCP      = int(request.form['hidden_countCP'])
            countCZ      = int(request.form['hidden_countCZ'])
            top          = int(float(request.form['top']))
            right        = int(float(request.form['right']))
            bottom       = int(float(request.form['bottom']))
            left         = int(float(request.form['left']))

            m = interp1d([left,right],[-1.5,1.5])
            n = interp1d([top,bottom],[-1.5,1.5])
            # print(top)
            # print(right)
            # print(bottom)
            # print(left)

            print(countP +countCP)
            print(countZ +countCZ)
            # locPx        = request.form['locPx1']
            # locPx        =request.form['locPx'+ str("1")]
            # locZx        =request.form['locZx'+ str("1")]
            # print (locPx)
            try:
                for i in range (1,countP+countCP+1):
                    print("htis is i ",i)
                    locPx        = int(request.form['locPx'+ str(i)])
                    locPy        = int(request.form['locPy'+ str(i)])
                    
                    locationPx   = m(locPx+ i)
                    locationPy   = n(locPy+ i)
                    tf,x,y,z = zplane().phase(1,1,[locationPx-locationPy*1j])
                    # print(locPx)
                    # print(locPy)
                    print(locationPx)
                    print(-locationPy)
                    print(x)
                    print(y)
                    # print(i)
            except Exception: 
                print(Exception)
                pass
            try:
                for i in range (1,countZ+countCZ+1):
                    # print("htis is i ",i)
                    locZx        = int(request.form['locZx' + str(i)])
                    locZy        = int(request.form['locZy'+ str(i)])
                    # print(locZx)
                    # print(locZy)
                    locationZx   = m(locZx+ i)
                    locationZy   = n(locZy+ i)
                    print(i)
                    tf,x,y,z = zplane().phase(1,0,[locationZx-locationZy*1j])
                    print(locationZx)
                    print(-locationZy)
                    print(x)
                    print(y)
            except Exception: 
                print(Exception)
                pass       
            return redirect(url_for("home"))
            
    return render_template('main.html')

class Filter(FlaskForm):
    filter_lib = SelectField(u'Choose', choices=[('0.9', '0.9'), ('0.5', '0.5'), ('0.1', '0.1'),('-0.1', '-0.1'),('-0.5', '-0.5'),('-0.9', '-0.9')])
    filter_cust = StringField("Custmized filter")
    correct = SubmitField("Correct")

@app.route('/home', methods=['GET', 'POST'])
def home(): 
    z1 = y
    z2 = z
    form = Filter()

    if form.validate_on_submit():
        if form.filter_cust.data:
            a = complex(form.filter_cust.data)
        else:
            a = complex(form.filter_lib.data)

        z1,z2,tf_corr = all_filter(a,tf,x)
    return render_template('home.html' , x = list(x), y= list(y) , z= list(z) , z1 = list(z1) , z2 = list(z2),form = form)


if __name__ == '__main__':
    app.run()