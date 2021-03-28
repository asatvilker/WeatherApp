import React, { Component} from "react";
import Chartist from "chartist";
import "./Chart.css";


// This is basically a plugin for the chartist npm package
// This creates a horizontal line on the chart to represent certain thresholds of rain intensity
function ctTargetLineWithLabel(options) {
    return function ctTargetLineWithLabel(chart) {
        chart.on("created", function (data) {
            let projectedY = data.chartRect.height() - data.axisY.projectValue(options.value, 0) + data.chartRect.y2;
            data.svg.elem("text", {
                x: data.chartRect.x1 - options.offset,
                y: projectedY + options.offset,
                "text-anchor": "end",
                fill: "white"
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


// Another function to smooth the transition when new data is given, this should draw the entire line from the y-axis 0 upwards nicely
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

// there are 24 data points for the rain data
const numberOfData = 24;

class RainChart extends Component {
    state = {
        numberOfData: 0,
        options: {
            height: 175,
            lineSmooth: Chartist.Interpolation.monotoneCubic({
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
                    // At certain indexs of the x-axis, return the following to label the x-axis nicely
                    if (i == 0) {
                        return "Now";
                    } else if (i % (numberOfData / 8) == 0 && i != numberOfData) {
                        if (i*5 >= 60) {
                            // an hour and greater
                            return (i*5) / 60 + "hr"
                        } else {
                            // smaller than an hour
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
        // responsive options for the chart
        responsiveOptions: [
            ["screen and (min-width: 400px)", {
                height: 200
            }],
            ["screen and (min-width: 1000px)", {
                height: 250,
                chartPadding: {
                    left: 30
                }
            }]
        ]
    };

    // when the component first mounts, update the chart (which creates it)
    componentDidMount() {
        this.updateChart(this.props.data);
    }

    componentDidUpdate() {
        this.setState({numberOfData: this.props.data.length});
        this.updateChart(this.props.data);
    }

    // Overwrriten otherwise caused recursive issues as when the chart changes, the component fired a change
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) != JSON.stringify(this.props) || JSON.stringify(nextState) != JSON.stringify(this.state);
    }

    forceUpdate() {
        console.log(this.chartist);
    }

    updateChart(incomingData) {
        console.log("CHART: UPDATING", incomingData);   // Console log used to debug
        let data = {
            labels: incomingData.map((item, i) => {
                return (i)                                          
            }),
            series: [incomingData]
        }
        if (this.chartist) {
            this.chartist.update(data, this.state.options, this.state.responsiveOptions); //if the chart exists, update it
        } else {
            this.chartist = new Chartist.Line(this.chart, data, this.state.options, this.state.responsiveOptions); //otherwise create one
        }
    }

    render() {
        return (
            <div class="chartWrapper">
                <div class="rainSummary"><strong>{this.props.rainSummary ? this.props.rainSummary.longPhrase : "No data avaliable"}</strong></div>
                <div class="rain-chart" ref={(ref) => this.chart = ref} style={{position: "relative"}}> </div>
            </div>
        )
    }
}

export default RainChart;