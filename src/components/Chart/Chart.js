import React, { Component, useContext } from "react";
import Chartist from "chartist";
import "./Chart.css";
import "chartist-plugin-targetline";

function ctTargetLineWithLabel(options) {
    return function ctTargetLineWithLabel(chart) {
        chart.on("created", function(data) {
            let projectedY = data.chartRect.height() - data.axisY.projectValue(options.value, 0) + data.chartRect.y2;
            data.svg.elem("text", {
                x: data.chartRect.x1 - options.offset,
                y: projectedY + options.offset,
                "text-anchor": "end"
            }, "chart-text").text(options.text)
            data.svg.elem("line", {
                x1: data.chartRect.x1,
                x2: data.chartRect.x2,
                y1: projectedY,
                y2: projectedY
            }, "chart-targetline", true)
        });
    };
};

function drawUp(options) {
    return function drawUp(chart) {
        chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
                console.log(data);
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

class RainChart extends Component {
    state = {
            options: {
                chartPadding: {
                },
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
                    showLabel: false
                },
                axisX: {
                    showLabel: false
                },
                plugins: [
                    drawUp(),
                    ctTargetLineWithLabel({value: 20, text: "Light", offset: 5, className: "chart-light"}),
                    ctTargetLineWithLabel({value: 35, text: "Medium", offset: 5, className: "chart-medium"}),
                    ctTargetLineWithLabel({value: 50, text: "Heavy", offset: 5, className: "chart-heavy"}),
                ]
            }
    };

    componentDidMount() {
        this.updateChart(this.props.data);
    }

    componentDidUpdate() {
        this.updateChart(this.props.data);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) != JSON.stringify(this.props) || JSON.stringify(nextState) != JSON.stringify(this.state);
    }

    updateChart(incomingData) {
        console.log("CHART: UPDATING");
        let data = {
            labels: incomingData.map((item, i) => {return (i)}),
            series: [incomingData]
        }
        if (this.chartist) {
            this.chartist.update(data, this.state.options);
        } else {
            this.chartist = new Chartist.Line(this.chart, data, this.state.options);
        }
    }

    render() {
        return (
            <div class="rain_chart" ref={(ref) => this.chart = ref} style={{position: "relative"}}> </div>
        )
    }

}

export default RainChart;