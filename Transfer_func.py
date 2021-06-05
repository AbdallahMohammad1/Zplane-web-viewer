import matplotlib.pyplot as plt
import numpy as np
import math

class zplane():
    points=[[],[]]
    w = np.arange(-180, 180, 1)
    def phase(self,operation,type,point):
        tf=[]
        for i in range(0,360):
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
        return zplane().w,np.abs(tf),np.angle(tf)

zplane().phase(1,0,[-1+0j])
x,y1,y2=zplane().phase(1,1,[1.25+0j])
plt.plot(x,y1)
plt.plot(x,y2)
plt.show()

#zplane().phase(0,[-1-0j])

