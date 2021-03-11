import React, { Component } from "react";
import { Line } from "react-chartjs-2";


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class RainChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            dataLine: {
                labels: this.props.data.map((item, i) => {
                    return i+1
                }),
                datasets: [
                    {
                        label: "Rain",
                        fill: true,
                        lineTension: 0.3,
                        backgroundColor: 'rgba(89, 160, 238, 0.2)',
                        borderColor: 'rgba(89, 160, 238, 1)',
                        borderCapStyle: "butt",
                        borderWidth: 1.5,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointRadius: 0,
                        data: this.props.data.map((item) => {
                           return item;
                        })
                    }
                ]
            }
        }
    }

    areArraysEqual(a, b) {
        if (!a || !b) {
            console.log("NOT DEFINED");
        }
        if (a.length != b.length) {
            return false;
        } else {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    componentDidUpdate() {
        if (!this.areArraysEqual(this.chartRef.chartInstance.data.datasets[0].data, this.props.data)) {
            this.chartRef.chartInstance.data.datasets[0].data = this.props.data;
            this.chartRef.chartInstance.update();
            console.log("CHART: VALUES: ", this.props.data, this.chartRef.chartInstance.data.datasets[0].data);
            console.log("CHART: ", this.chartRef.chartInstance.data.datasets[0].data);
            this.chartRef.chartInstance.update();
        }
    }

    render() {
        return (
            <Line ref={(reference) => this.chartRef = reference} data={this.state.dataLine} options={{
                legend: {
                    display: false,
                    labels: {
                        fontColor: "#212529"
                    }
                },
                tooltips: {
                    enabled: false
                },
                responsive: true,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            max: 65,
                            stepSize: 5,
                            autoSkip: false,
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        display:false
                    }]
                }
            }}/>
        )
    }
}

export default RainChart;