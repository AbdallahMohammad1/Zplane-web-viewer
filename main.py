from flask import Flask, render_template ,request,url_for,redirect,session #import flask class
from scipy.interpolate import interp1d
# m = interp1d([485,1020],[-1,1])
# n = interp1d([265,800],[-1,1])
m = interp1d([435,1085],[-1.5,1.5])
n = interp1d([221,837],[-1.5,1.5])

app = Flask(__name__) 
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = "secret"


# @app.route('/pole',methods= ['POST','GET'])
# def zero_pole():
#     if request.method == 'POST':
#             status      = request.form['pole_zero']
#     return render_template('main.html',status =[status])
@app.route('/',methods= ['POST','GET'])
def index():
    if request.method == 'POST':
            countP      = int(request.form['hidden_countP'])
            countZ      = int(request.form['hidden_countZ'])
            print(countP)
            print(countZ)
            # locPx        = request.form['locPx1']
            locPx        =request.form['locPx'+ str("1")]
            print (locPx)
            for i in range (1,countP+1):
                print("htis is i ",i)
                # locZx        = int(request.form['locZx' + i])
                # locZy        = int(request.form['locZy'+ i])
                locPx        = int(request.form['locPx'+ str(i)])
                locPy        = int(request.form['locPy'+ str(i)])
                # print(locPx)
                # print(locPy)
                # locationZx   = m(locZx+ i)
                # locationZy   = n(locZy+ i)
                locationPx   = m(locPx+ i)
                locationPy   = n(locPy+ i)
                # print(locationZx)
                # print(locationZy)
                print(locationPx)
                print(locationPy)
            for i in range (1,countZ+1):
                print("htis is i ",i)
                locZx        = int(request.form['locZx' + str(i)])
                locZy        = int(request.form['locZy'+ str(i)])
                # locPx        = int(request.form['locPx'+ i])
                # locPy        = int(request.form['locPy'+ i])
                # print(locZx)
                # print(locZy)
                locationZx   = m(locZx+ i)
                locationZy   = n(locZy+ i)
                # locationPx   = m(locPx+ i)
                # locationPy   = n(locPy+ i)
                print(locationZx)
                print(locationZy)
                # print(locationPx)
                # print(locationPy)
            # status      = request.form['pole_zero']
            # countP        = request.form['count1']
            # countZ        = request.form['count2']
            # locationsPX = []
            # locationsPY = []
            # for i in countP:
            #     locx        = request.form['locPx'+i]
            #     locy        = request.form['locPy'+i]
            #     locationx   = m(locx)
            #     locationy   = n(locy)
            #     locationsPX.append(locationx)
            #     locationsPY.append(locationy)
            # print(status)
            # print(locationsPX)
            # print(locationsPY)

            # locationsZX = []
            # locationsZY = []
            # for i in countZ:
            #     locx        = request.form['locZx'+i]
            #     locy        = request.form['locZy'+i]
            #     locationx   = m(locx)
            #     locationy   = n(locy)
            #     locationsZX.append(locationx)
            #     locationsZY.append(locationy)
            # print(status)
            # print(locationsZX)
            # print(locationsZY)
    return render_template('main.html')

#     if request.method == 'POST':
#             countP        = request.form['count1']
#             countZ        = request.form['count2']
#             # status      = request.form['pole_zero']
#             # locx        = request.form['locx']
#             # locy        = request.form['locy']
#             # locx2       = request.form['locx2']
#             # locy2       = request.form['locy2']

#             # locationx   = m(locx)
#             # locationy   = n(locy)
#             # locationx2  = m(locx2)
#             # locationy2  = n(locy2)
#             # print(status)
#             # print(locationx)
#             # print(locationy)
#             # print(locationx2)
#             # print(locationy2)
#             print(countP)
#             print(countZ)
    return render_template('main.html')



if __name__ == '__main__':
    app.run()