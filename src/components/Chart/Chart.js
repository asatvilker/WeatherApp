import React, { Component, useContext } from "react";
import Chartist from "chartist";
import "./Chart.css";

function ctTargetLineWithLabel(options) {
    return function ctTargetLineWithLabel(chart) {
        chart.on("created", function (data) {
            let projectedY = data.chartRect.height() - data.axisY.projectValue(options.value, 0) + data.chartRect.y2;
            data.svg.elem("text", {
                x: data.chartRect.x1 - options.offset,
                y: projectedY + options.offset,
                "text-anchor": "end",
                fill: "#212529"
            }, "chart-text").text(options.text)
            data.svg.elem("line", {
                x1: data.chartRect.x1,
                x2: data.chartRect.x2,
                y1: projectedY,
                y2: projectedY
            }, options.className, true)
        });
    };
};

function drawUp(options) {
    return function drawUp(chart) {
        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.y1).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    }
}

const numberOfData = 24;

class RainChart extends Component {
    state = {
        numberOfData: 0,
        options: {
            height: 175,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 1
            }),
            showArea: true,
            fullWidth: true,
            showPoints: true,
            axisY: {
                type: Chartist.FixedScaleAxis,
                low: 0,
                high: 70,
                divisor: 16,
                ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
                showLabel: false,
            },
            axisX: {
                showLabel: true,
                referenceValue: 5,
                labelInterpolationFnc: function (value, i) {
                    if (i == 0) {
                        return "Now";
                    } else if (i % (numberOfData / 8) == 0 && i != numberOfData) {
                        if (i*5 >= 60) {
                            // return new Date(new Date().getTime() + i*5*60000).toLocaleTimeString().slice(0, -3); 
                            return (i*5) / 60 + "hr"
                        } else {
                            // return new Date(new Date().getTime() + i*5*60000).toLocaleTimeString().slice(0, -3); 
                            return (i*5) + "m"
                        }
                    } else {
                        return null
                    }
                }
            },
            plugins: [
                drawUp(),
                ctTargetLineWithLabel({ value: 20, text: "Light", offset: 5, className: "chart-light" }),
                ctTargetLineWithLabel({ value: 35, text: "Medium", offset: 5, className: "chart-medium" }),
                ctTargetLineWithLabel({ value: 50, text: "Heavy", offset: 5, className: "chart-heavy" }),
            ]
        },
        responsiveOptions: [
            ["screen and (min-width: 400px)", {
                height: 200
            }],
            ["screen and (min-width: 1000px)", {
                height: 300,
                chartPadding: {
                    left: 30
                }
            }]
        ]
    };

    componentDidMount() {
        this.updateChart(this.props.data);
    }

    componentDidUpdate() {
        this.setState({numberOfData: this.props.data.length});
        this.updateChart(this.props.data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) != JSON.stringify(this.props) || JSON.stringify(nextState) != JSON.stringify(this.state);
    }

    updateChart(incomingData) {
        console.log("CHART: UPDATING", incomingData);
        let data = {
            labels: incomingData.map((item, i) => {
                return (i)
            }),
            series: [incomingData]
        }
        if (this.chartist) {
            this.chartist.update(data, this.state.options, this.state.responsiveOptions);
        } else {
            this.chartist = new Chartist.Line(this.chart, data, this.state.options, this.state.responsiveOptions);
        }
    }

    render() {
        return (
            <div class="rain_chart" ref={(ref) => this.chart = ref} style={{ position: "relative" }}> </div>
        )
    }
}

export default RainChart;