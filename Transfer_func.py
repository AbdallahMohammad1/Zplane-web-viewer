import matplotlib.pyplot as plt
import numpy as np
import math
from all_pass import all_filter

class zplane():
    points=[[],[]]
    w = np.arange(0, 180, 1)
    def phase(self,operation,type,point):
        tf=[]
        for i in range(0,180):
            tf.append(1)
        if operation == 0:
            for i in range(len(zplane().points[type])):
                if point == zplane().points[type][i]:
                    zplane().points[type].pop(i)
                    break
        else:
            zplane.points[type].append(point)
        for j in range(len(zplane().points)):
            for i in range(len(zplane().points[j])):
                z = (np.exp(2j*zplane().w*np.pi/360) - zplane().points[j][i])
                if j ==0:
                    tf = tf * z
                elif j== 1:
                    tf = tf / z
        return tf, zplane().w,np.abs(tf),np.angle(tf)

# zplane().phase(1,0,[-1+0j])
# tf,w,y1,y2=zplane().phase(1,1,[1.25+0j])
# # plt.plot(w,z1)
# # plt.plot(w,z2)
# # plt.show()
# plt.plot(w,y1)
# plt.plot(w,y2)
# plt.plot(w,z2)
# plt.show()
# tf,x,y,z = zplane().phase(1,0,[0.7+0.7j])
# plt.plot(x,y)
# plt.plot(x,z)
# plt.show()
# z1,z2 = all_filter(0.7,tf,x)
# x,y,z = zplane().phase(1,0,[0.5-0.866j])
# x,y,z = zplane().phase(1,0,[0+1j])
# plt.plot(x,y)
# plt.plot(x,z2)
# plt.show()


#zplane().phase(0,[-1-0j])

