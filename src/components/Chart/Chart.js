import React, { PureComponent, useContext } from "react";
import Chartist from "chartist";
import "./Chart.css";
import "chartist-plugin-targetline";

function ctTargetLineWithLabel(options) {
    return function ctTargetLineWithLabel(chart) {
        var defaultOptions = {
        }
        options = Chartist.extend({}, defaultOptions, options);
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
            }, "jeff", true)
        });
    };
};

class RainChart extends PureComponent {
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
        console.log("CHART: UPDATINGGGGG");
    }

    updateChart(incomingData) {
        console.log("CHART: UPDATING");
        let data = {
            labels: incomingData.map((item, i) => {return (i)}),
            series: [incomingData]
        }
        if (this.chartist) {
            this.chartist.update(data, this.state.options)
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