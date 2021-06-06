from flask import Flask, render_template
from plot import zplane
import numpy as np

app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'
zplane().append_point(0, [ np.cos(45 * 2 * np.pi / 360), np.sin(45 * 2 * np.pi / 360)])
# #zplane().append_point(0, [0.5, 0.866])
# #zplane().append_point(0, [0.5, -0.866])
# zplane().append_point(0, [ np.cos(135 * 2 * np.pi / 360), np.sin(135 * 2 * np.pi / 360)])
# zplane().append_point(0, [0, 1])

@app.route('/plot', methods=['GET', 'POST'])
def home():
    x,y = zplane().plot_mag()

    return render_template('home.html' , x = x, y= y , url = "/plot.png")

if __name__ == '__main__':
    app.run(debug=True)

