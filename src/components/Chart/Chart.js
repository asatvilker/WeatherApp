import React, { Component } from "react";
import Chartist from "chartist";
// /import "chartist-plugin-targetline";
import "./Chart.css";

const data =  {
    labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    series: [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]]
}

class RainChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: this.props.data.map((item, i) => {return (i)}),
                series: [this.props.data]
            },
            options: {
                fullWidth: true,
                fullHeight: true,
                chartPadding: {
                    top: 50
                },
                showArea: false,
                showPoints: false,
                high: 70,
                low: 0,
                divisor: 14,
                ticks: [1,5,10,15,20,25,30,35,40,45,50,55,60,65, 70],
                lineSmooth: Chartist.Interpolation.simple({
                    divisor: 2
                }),
                referenceValue: 65,
                stretch: true
            },
            
        }
    }

    componentDidMount() {
        this.updateChart(this.props);
    }

    componentDidUpdate() {
        this.updateChart(this.props);
    }

    updateChart() {
        if (this.state.chart) {
            console.log("shit exists");
            this.state.chart.update({
                labels: this.props.data.map((item, i) => {return (i)}),
                series: [this.props.data]
            }, this.state.options);
        } else {
            console.log("shit doesnt exist");
            this.state.chart = new Chartist.Line(this.chart, this.state.data, this.state.options);
        }
    }


    render() {
        return (
            <div class="rain-chart" ref={(ref) => this.chart = ref} style={{position: "relative"}}>
            </div>
        )
    }
}

export default RainChart;