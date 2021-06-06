import matplotlib.pyplot as plt
import numpy as np

def all_filter(a, tf ,w):
    a_conj = np.conj(a)
    dom = 1 - np.exp(2j* w *np.pi/360) * a_conj
    nom = np.exp(2j* w *np.pi/360) - a
    all_func = np.divide(dom , nom)
    filterd_func = np.multiply(tf , all_func)
    return np.abs(filterd_func), np.angle(filterd_func) ,filterd_func
x = "1+2j"
y =complex(x)
print(type(y))