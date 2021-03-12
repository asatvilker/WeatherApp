import ChartJsAnnotation from "chartjs-plugin-annotation";
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
            <Line 
                ref={(reference) => this.chartRef = reference} 
                data={this.state.dataLine}
                options={{
                    legend: {
                        labels: {
                            fontColor: "#212529",
                            display: false
                        }
                    },
                    tooltips: {
                        enabled: false
                    },
                    responsive: true
                    // scales: {
                    //     xAxes: [{
                    //         id: "x-axis-0",
                    //         display: true,
                    //         gridLines: { 
                    //             zeroLineColor: "#131c2b",
                    //             zeroLineWidth: 5,
                    //             drawTicks: false,
                    //         },
                    //         ticks: {
                    //             autoSkip: false,
                    //             display: false
                    //         }
                    //     }],
                    //     yAxes: [{
                    //         display: true,
                    //         gridLines: { 
                    //             zeroLineColor: "#131c2b",
                    //             zeroLineWidth: 5,
                    //             drawTicks: false,
                    //             drawOnChartArea: false,
                    //         },
                    //         ticks: {
                    //             fontColor: "#212529",
                    //             fontFamily: "Sen",
                    //             beginAtZero: true,
                    //             callback: function(value, index, values) {
                    //                 if (value == 20) {
                    //                     return "Light";
                    //                 } else if (value == 35) {
                    //                     return "Medium";
                    //                 } else if (value == 50) {
                    //                     return "Heavy";
                    //                 } else {
                    //                     return "";
                    //                 }
                    //             },
                    //             padding: 5,
                    //             autoSkip: false
                    //         }
                    //     }]
                        
                    // },
                    // annotation: {
                    //     annotations: [
                    //         {
                    //             type: "line",
                    //             drawTime: "afterDatasetsDraw",
                    //             scaleID: "y-axis-0",
                    //             value: 20,
                    //             mode: "horizontal",
                    //             borderColor: '#212529',	
                    //         },
                    //         {
                    //             type: "line",
                    //             drawTime: "afterDatasetsDraw",
                    //             scaleID: "y-axis-0",
                    //             value: 35,
                    //             mode: "horizontal",
                    //             borderColor: '#212529',	
                    //         },
                    //         {
                    //             type: "line",
                    //             drawTime: "afterDatasetsDraw",
                    //             scaleID: "y-axis-0",
                    //             value: 50,
                    //             mode: "horizontal",
                    //             borderColor: "#212529",
                    //         }
                    //     ]
                    // }
                }}/>
        )
    }
}

export default RainChart;