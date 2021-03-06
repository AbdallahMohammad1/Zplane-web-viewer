// import '/digital-filter-design/d3/d3'
class Zplane {
    constructor(width, height) {
        //equation x**2 + y**2 = 1
        this.w = width;
        this.h = height;
        this.padding = 30;
        this.dataSet = [];

        this.middlePointOf_x = width / 2;
        this.middlePointOf_y = height / 2;
        // add svg element 
        this.svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "zPlane");

        // set our scale
        // scale x
        this.xNegativScale = d3.scaleLinear().domain([-1, 0]).range([this.padding, this.middlePointOf_x]);
        this.xPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_x, this.w - this.padding]);
        //scale y 
        this.yNegativScale = d3.scaleLinear().domain([0, -1]).range([this.middlePointOf_y, this.h - this.padding]);
        this.yPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_y, this.padding]);

        // set up x axis
        this.xPositiveAxis = d3.axisBottom(this.xPositiveScale).tickValues([0.2, 0.4, 0.6, 0.8])
        this.xNegativeAxis = d3.axisBottom(this.xNegativScale).tickValues([-0.2, -0.4, -0.6, -0.8]);
        // set up y axis
        this.yPositiveAxis = d3.axisLeft(this.yPositiveScale).tickValues([0.2, 0.4, 0.6, 0.8]);
        this.yNegativeAxis = d3.axisLeft(d3.scaleLinear().domain([0, -1]).range([this.middlePointOf_y, this.h - this.padding]))
            .tickValues([-0.2, -0.4, -0.6, -0.8]);
        // draw tha main circle
        this.svg.append("circle").attr("cx", this.middlePointOf_x).attr("cy", this.middlePointOf_y).attr("r", this.middlePointOf_x - this.padding)
            .attr("stroke", "rgb(115, 115, 115)")
            .attr("stroke-width", "1.8")
            .attr("fill", "none");

        this.types = {
            nonConjPole: "nonConjPole",
            nonConjZero: "nonConjZero",
            conjPole: "conjPole",
            conjZero: "conjZero"
        };
    }

    //check if a point is inside the z-plane
    isInside = (xElement, yElement) => {
        let firstPart = (xElement - this.middlePointOf_x) * (xElement - this.middlePointOf_x);
        let secondPart = (yElement - this.middlePointOf_y) * (yElement - this.middlePointOf_y);
        let thirdPart = (this.middlePointOf_x - this.padding) * (this.middlePointOf_x - this.padding);
        let ch = firstPart + secondPart - thirdPart;
        if (ch > 1) return false;
        return true;
    }

    plot_axis() {
        //plot x
        this.svg.append("g").call(this.xPositiveAxis).attr("class", "axis")
            .attr("transform", "translate(0," + this.middlePointOf_y + ")");
        this.svg.append("g").call(this.xNegativeAxis).attr("class", "axis")
            .attr("transform", "translate(0," + this.middlePointOf_y + ")");
        //plot y
        this.svg.append("g").call(this.yPositiveAxis).attr("class", "axis")
            .attr("transform", "translate(" + this.middlePointOf_x + ",0)");
        this.svg.append("g").call(this.yNegativeAxis).attr("class", "axis")
            .attr("transform", "translate(" + this.middlePointOf_x + ",0)");
    }
    add_point = (point, type) => {
        //check if the point exist 
        this.dataSet.push({
            point: point,
            type: type
        });
        let points = this.svg.selectAll(".point").data(this.dataSet);
        if (type == this.types.nonConjPole) {
            points.enter().append("text").text("X").attr("x", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]) - 4;
                } else {
                    v = this.xNegativScale(d["point"][0]) - 4;
                }
                return v;
            }).attr("y", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]) + 6;
                } else {
                    v = this.yNegativScale(d["point"][1]) + 6;
                }
                return v;
            }).attr("class", "point")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "green")
                .on("mouseover", function (ev) {
                    d3.select(ev.target).attr("fill", "red");
                })
                .on("mouseout", function (ev) {
                    d3.select(ev.target).attr("fill", "green");
                })
                .on("mousedown", (ev) => {
                    this.isMouseDown = true;
                    this.downElement = ev.target;
                })
                .on("click", (ev) => {
                    //delete point
                    //get point 
                    let xElement = ev.layerX;
                    let yElement = ev.layerY;
                    let point = this.mapFromElementToPlaneCor(xElement,yElement);
                    let pIndex = this.getIndexFromPoint(point);
                    this.dataSet.splice(pIndex, 1);
                    // update 
                    d3.select(ev.target).remove();
                })
                .call(d3.drag()
                    .on("drag", (ev) => {
                        // get value in dataSet
                        let point = ev.subject.point;
                        //change value in current label
                        d3.select("#current_x").text(point[0]);
                        d3.select("#current_j").text(point[1]);
                        let pIndex = -1;
                        // get point index
                        for (let i = 0; i < this.dataSet.length; i++) {
                            if (this.dataSet[i]["point"] === point) {
                                pIndex = i;
                                break;
                            }
                        }
                        //change value in dataset
                        let xElement = ev.x;
                        let yElement = ev.y;
                        let mPoint = this.mapFromElementToPlaneCor(xElement, yElement);
                        console.log(mPoint);
                        // boundry conditions
                        // if (mPoint[0] < -1) mPoint[0] = -1;
                        // if (mPoint[0] > 1) mPoint[0] = 1;
                        this.dataSet[pIndex].point = [mPoint[0], mPoint[1]];
                        // update position on plan
                        this.update_point(this.dataSet[pIndex].type);
                    })
                )
                .attr("id", this.dataSet.length - 1)
                .attr("style", "cursor: default;")
                .merge(points);
        } else if (type == this.types.nonConjZero) {
            points.enter().append("circle").attr("cx", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]);
                } else {
                    v = this.xNegativScale(d["point"][0]);
                }
                return v;
            }).attr("cy", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]);
                } else {
                    v = this.yNegativScale(d["point"][1]);
                }
                return v;
            })
                .attr("r", 5).attr("class", "point")
                .attr("stroke", "green")
                .attr("stroke-width", "1")
                .attr("fill", "none")
                .on("mouseover", function (ev) {
                    d3.select(ev.target).attr("fill", "red");
                })
                .on("mouseout", function (ev) {
                    d3.select(ev.target).attr("fill", "none");
                })
                .on("click",(ev) => {
                    //delete point
                    //get point 
                    let xElement = ev.layerX;
                    let yElement = ev.layerY;
                    let point = this.mapFromElementToPlaneCor(xElement,yElement);
                    let pIndex = this.getIndexFromPoint(point);
                    this.dataSet.splice(pIndex, 1);
                    // update 
                    d3.select(ev.target).remove();
                })
                .call(d3.drag()
                    .on("drag", (ev) => {
                        // get value in dataSet
                        let point = ev.subject.point;
                        //change value in current label
                        d3.select("#current_x").text(point[0]);
                        d3.select("#current_j").text(point[1]);
                        let pIndex = -1;
                        // get point index
                        for (let i = 0; i < this.dataSet.length; i++) {
                            if (this.dataSet[i]["point"] === point) {
                                pIndex = i;
                                break;
                            }
                        }
                        //change value in dataset
                        let xElement = ev.x;
                        let yElement = ev.y;
                        let mPoint = this.mapFromElementToPlaneCor(xElement, yElement);
                        // boundry conditions
                        // if (mPoint[0] < -1) mPoint[0] = -1;
                        // if (mPoint[0] > 1) mPoint[0] = 1;
                        this.dataSet[pIndex].point = [mPoint[0], mPoint[1]];
                        // update position on plan
                        this.update_point(this.dataSet[pIndex].type);
                    })
                )
                .attr("index", this.dataSet.length - 1)
                .merge(points);
        } else if (type == this.types.conjPole) {
            // we need to add two points 
            // add conj point
            this.dataSet.push({
                point: [point[0], -1 * point[1]],
                type: type
            });
            points = this.svg.selectAll(".point").data(this.dataSet);
            //console.log(this.dataSet);
            points.enter().append("text").text("X").attr("x", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]) - 4;
                } else {
                    v = this.xNegativScale(d["point"][0]) - 4;
                }
                return v;
            }).attr("y", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]) + 6;
                } else {
                    v = this.yNegativScale(d["point"][1]) + 6;
                }
                return v;
            }).attr("class", "point")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "green")
                .on("mouseover", function (ev) {
                    d3.select(ev.target).attr("fill", "red");
                })
                .on("mouseout", function (ev) {
                    d3.select(ev.target).attr("fill", "green");
                })
                .on("click", (ev) => {
                    //delete point
                    //get point 
                    // let xElement = d3.select(ev.target).attr("x") + 4;
                    // let yElement = d3.select(ev.target).attr("y") - 6;
                    // let point = this.mapFromElementToPlaneCor(xElement,yElement);
                    // let pIndex = this.getIndexFromPoint(point);
                    // let conIndex = this.getIndexFromPoint([point[0],-1*point[1]]);
                    // console.log(point);
                    // update 
                    // let p = this.svg.selectAll(".point").data(this.dataSet);
                    // p.exit().remove();
                })
                .call(d3.drag()
                    .on("start", (ev) => {
                        // get value in dataSet
                        let point = ev.subject.point;
                        this.pIndex = -1;
                        // get point index
                        for (let i = 0; i < this.dataSet.length; i++) {
                            if (this.dataSet[i]["point"] === point) {
                                this.pIndex = i;
                                break;
                            }
                        }
                        // console.log(this.dataSet);
                        let conPoint = [point[0], -1 * point[1]];
                        // console.log(conPoint);
                        this.conIndex = -1;
                        // get conj point index 
                        for (let i = 0; i < this.dataSet.length; i++) {
                            if (this.dataSet[i]["point"][0] === conPoint[0]
                                &&
                                this.dataSet[i]["point"][1] === conPoint[1]) {
                                this.conIndex = i;
                                break;
                            }
                        }
                    })
                    .on("drag", (ev) => {
                        let point = ev.subject.point;
                        //change value in current label
                        d3.select("#current_x").text(point[0]);
                        d3.select("#current_j").text(point[1]);

                        //change value in dataset
                        let xElement = ev.x;
                        let yElement = ev.y;
                        let mPoint = this.mapFromElementToPlaneCor(xElement, yElement);
                        let mConPoint = [mPoint[0], -1 * mPoint[1]];
                        // boundry conditions
                        // if (!this.isInside(xElement, yElement)) {
                        //     return;
                        // }
                        // if(mPoint[0] < -1) mPoint[0] = -1;
                        // if(mPoint[0] > 1) mPoint[0] = 1;
                        this.dataSet[this.pIndex].point = [mPoint[0], mPoint[1]];
                        this.dataSet[this.conIndex].point = [mConPoint[0], mConPoint[1]];
                        // update position on plan
                        this.update_point(this.dataSet[this.pIndex].type);
                    })
                )
                .attr("style", "cursor: default;")
                .merge(points);
        } else {
            // we need to add two points 
            // add conj point
                this.dataSet.push({
                    point: [point[0], -1 * point[1]],
                    type: type
                });
                points = this.svg.selectAll(".point").data(this.dataSet);
                points.enter().append("circle").attr("cx", (d) => {
                    let v = 0;
                    if (d["point"][0] > 0) {
                        v = this.xPositiveScale(d["point"][0]);
                    } else {
                        v = this.xNegativScale(d["point"][0]);
                    }
                    return v;
                }).attr("cy", (d) => {
                    let v = 0;
                    if (d["point"][1] >= 0) {
                        v = this.yPositiveScale(d["point"][1]);
                    } else {
                        v = this.yNegativScale(d["point"][1]);
                    }
                    return v;
                })
                .attr("r", 5).attr("class", "point")
                .attr("stroke", "green")
                .attr("stroke-width", "1")
                .attr("fill", "none")
                .on("mouseover", function (ev) {
                    d3.select(ev.target).attr("fill", "red");
                })
                .on("mouseout", function (ev) {
                    d3.select(ev.target).attr("fill", "none");
                })
                .on("click",(ev) => {
                    //delete point
                    //get point 
                    let point = [ parseFloat(d3.select(ev.target).attr("xPlan")),
                                  parseFloat(d3.select(ev.target).attr("yPlan"))
                                ];
                    // console.log(this.dataSet);
                    let pIndex = this.getIndexFromPoint(point); 
                    this.dataSet.splice(pIndex,1);
                    // let p = this.svg.selectAll(".point").data(this.dataSet,(d) => {
                        
                    // });
                    points.exit().remove();
                    //let conIndex = this.getIndexFromPoint([point[0],-1*point[1]]);
                    // console.log(this.dataSet);
                    // console.log(point,[point[0],-1*point[1]]);
                    // console.log(pIndex,conIndex);
                    // console.log(this.dataSet);
                    // // update 
                    // let p = this.svg.selectAll(".point").data(this.dataSet);
                    // p.exit().remove();
                })
                .call(d3.drag()
                .on("start", (ev) => {
                    // get value in dataSet
                    let point = ev.subject.point;
                    this.pIndex = -1;
                    // get point index
                    for (let i = 0; i < this.dataSet.length; i++) {
                        if (this.dataSet[i]["point"] === point) {
                            this.pIndex = i;
                            break;
                        }
                    }
                    // console.log(this.dataSet);
                    let conPoint = [point[0], -1 * point[1]];
                    // console.log(conPoint);
                    this.conIndex = -1;
                    // get conj point index 
                    for (let i = 0; i < this.dataSet.length; i++) {
                        if (this.dataSet[i]["point"][0] === conPoint[0]
                            &&
                            this.dataSet[i]["point"][1] === conPoint[1]) {
                            this.conIndex = i;
                            break;
                        }
                    }
                })
                .on("drag", (ev) => {
                    let point = ev.subject.point;
                    //change value in current label
                    d3.select("#current_x").text(point[0]);
                    d3.select("#current_j").text(point[1]);

                    //change value in dataset
                    let xElement = ev.x;
                    let yElement = ev.y;
                    let mPoint = this.mapFromElementToPlaneCor(xElement, yElement);
                    let mConPoint = [mPoint[0], -1 * mPoint[1]];
                    // boundry conditions
                    if (!this.isInside(xElement, yElement)) {
                        return;
                    }
                    // if(mPoint[0] < -1) mPoint[0] = -1;
                    // if(mPoint[0] > 1) mPoint[0] = 1;
                    this.dataSet[this.pIndex].point = [mPoint[0], mPoint[1]];
                    this.dataSet[this.conIndex].point = [mConPoint[0], mConPoint[1]];
                    // update position on plan
                    this.update_point(this.dataSet[this.pIndex].type);
                })
            )
            .attr("xPlan",point[0])
            .attr("yPlan",point[1])
            .merge(points);
        }
    }

    getIndexFromPoint = (point) => {
        let ind = -1;
        // get point index
        for (let i = 0; i < this.dataSet.length; i++) {
            if (this.dataSet[i]["point"][0] === point[0]
            &&
            this.dataSet[i]["point"][1] === point[1]) {
                ind = i;
                break;
            }
        }
        return ind;
    }
    mapFromElementToPlaneCor = (xElement, yElement) => {
        let xPlan = undefined;
        let yPlane = undefined;
        if (xElement > this.middlePointOf_x) {
            xPlan = this.xPositiveScale.invert(xElement);
        } else {
            xPlan = this.xNegativScale.invert(xElement);
        }
        if (yElement <= this.middlePointOf_y) {
            yPlane = this.yPositiveScale.invert(yElement);
        } else {
            yPlane = this.yNegativScale.invert(yElement);
        }
        return [xPlan, yPlane];
    }

    update_point = (type) => {
        if (type == this.types.nonConjPole) {
            this.svg.selectAll(".point").data(this.dataSet).attr("x", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]) - 4;
                } else {
                    v = this.xNegativScale(d["point"][0]) - 4;
                }
                return v;
            })
            .attr("y", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]) + 6;
                } else {
                    v = this.yNegativScale(d["point"][1]) + 6;
                }
                return v;
            });
        } else if (type == this.types.nonConjZero) {
            this.svg.selectAll(".point").data(this.dataSet).attr("cx", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]);
                } else {
                    v = this.xNegativScale(d["point"][0]);
                }
                return v;
            })
            .attr("cy", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]);
                } else {
                    v = this.yNegativScale(d["point"][1]);
                }
                return v;
            });
        }
        else if (type == this.types.conjPole) {
            this.svg.selectAll(".point").data(this.dataSet).attr("x", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]) - 4;
                } else {
                    v = this.xNegativScale(d["point"][0]) - 4;
                }
                return v;
            }).attr("y", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]) + 6;
                } else {
                    v = this.yNegativScale(d["point"][1]) + 6;
                }
                return v;
            });
        }else {
            this.svg.selectAll(".point").data(this.dataSet).attr("cx", (d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]);
                } else {
                    v = this.xNegativScale(d["point"][0]);
                }
                return v;
            }).attr("cy", (d) => {
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]);
                } else {
                    v = this.yNegativScale(d["point"][1]);
                }
                return v;
            })
            .attr("xPlan",d => d["point"][0])
            .attr("yPlan",d => d["point"][1])
        }
    }
}
