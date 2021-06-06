from flask import Flask, render_template
import numpy as np
from Transfer_func import tf,x,y,z
from all_pass import all_filter
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, RadioField , TextAreaField ,FileField , SelectField

app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'
# #zplane().append_point(0, [0.5, 0.866])
# #zplane().append_point(0, [0.5, -0.866])
# zplane().append_point(0, [ np.cos(135 * 2 * np.pi / 360), np.sin(135 * 2 * np.pi / 360)])
# zplane().append_point(0, [0, 1])
class Z_add(FlaskForm):
    zero = StringField("Add zero")
    conj_zero = StringField("Add cojugated zero")
    pole = StringField("Add pole")
    conj_pole = StringField("Add conjugated pole")
    add = SubmitField("Add")

class Filter(FlaskForm):
    filter_lib = SelectField(u'Choose', choices=[('0.9', '0.9'), ('0.5', '0.5'), ('0.1', '0.1'),('-0.1', '-0.1'),('-0.5', '-0.5'),('-0.9', '-0.9')])
    filter_cust = StringField("Custmized filter")
    correct = SubmitField("Correct")




@app.route('/', methods=['GET', 'POST'])
def home():
    z1 = y
    z2 = z
    form = Filter()
    form_2 = Z_add()
    points = 4*[2*[None]]
    if form_2.validate_on_submit():
        if form_2.zero.data: 
            points[0][0] = np.real(complex(form_2.zero.data))
            points[0][1] = np.imag(complex(form_2.zero.data))

        if form_2.conj_zero.data: 
            points[1][0] = np.real(complex(form_2.conj_zero.data))
            points[1][1] = np.imag(complex(form_2.conj_zero.data))

        if form_2.pole.data: 
            points[2][0] = np.real(complex(form_2.pole.data))
            points[2][1] = np.imag(complex(form_2.pole.data))

        if form_2.conj_pole.data: 
            points[3][0] = np.real(complex(form_2.conj_pole.data))
            points[3][1] = np.imag(complex(form_2.conj_pole.data))

    if form.validate_on_submit():
        if form.filter_cust.data:
            a = complex(form.filter_cust.data)
        else:
            a = complex(form.filter_lib.data)

        z1,z2,tf_corr = all_filter(a,tf,x)
    return render_template('home.html' , x = list(x), y= list(y) , z= list(z) , z1 = list(z1) , z2 = list(z2), points = points, form = form, form_2 = form_2)

if __name__ == '__main__':
    app.run(debug=True)

