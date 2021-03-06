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
                        backgroundColor: "rgba(122, 190, 237)",
                        borderColor: "rgb(122, 190, 237)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointRadius: 0,
                        data: this.props.data.map((item) => {
                            if (item <= 2.5) {
                                return item/2.5;
                            } else if (item <= 7.6) {
                                return 1 + (item-2.5)/5.1
                            } else if (item <= 50) {
                                return 2 + (item-7.6)/(50-7.6)
                            } else {
                                return 3;
                            }
                        })
                    }
                ]
            }
        }
    }

    areArraysEqual(a, b) {
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
        console.log("CHART: VALUES: ", this.props.data, this.chartRef.chartInstance.data.datasets[0].data)
        if (!(this.areArraysEqual(this.props.data, this.chartRef.chartInstance.data.datasets[0].data))) {
            console.log("CHART (BEFORE): ",this.props.data, this.chartRef.chartInstance.data.datasets[0].data);
            this.chartRef.chartInstance.data.datasets[0].data = this.props.data.map((item) => {
                if (item <= 2.5) {
                    return item/2.5;
                } else if (item <= 7.6) {
                    return 1 + (item-2.5)/5.1
                } else if (item <= 50) {
                    return 2 + (item-7.6)/(50-7.6)
                } else {
                    return 3;
                }
            });
            this.chartRef.chartInstance.update();
            console.log("CHART (AFTER): ",this.props.data, this.chartRef.chartInstance.data.datasets[0].data);
            this.chartRef.chartInstance.update();
        }
    }

    componentDidMount() {
        this.chartRef.chartInstance.update();
    }

    render() {
        return (
            <Line ref={(reference) => this.chartRef = reference} data={this.state.dataLine} options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "black",
                            max: 3,
                            min: 0, 
                            stepSize: 1,
                            callback: function(value, index, values) {
                                switch(index) {
                                    case 3:
                                        return ""
                                    case 2:
                                        return "Light"
                                    case 1:
                                        return "Medium"
                                    case 0:
                                        return "Heavy"
                                }
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: true
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                responsive: true
            }}/>
        )
    }
}

export default RainChart;