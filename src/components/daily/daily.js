import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import '../DropDown/dropdown.css'
import './daily.css'
import Card from '../DropDown/Card';
import ClothesGrid from "../clothes/clothesSuggestions.js"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

class DailyCard extends Component {
    state = {
        expand: this.props.expand
    }

    // When the card is clicked, toggle its expand
    toggleExpand(element) {
        this.setState({ expand: !this.state.expand });
        // Scroll to view
        element.currentTarget.parentElement.scrollTo({left: element.currentTarget.offsetLeft, behavior: "smooth"});
    }

    render() {
        const data = this.props.data;
        let day = days[data.time.getDay()]; //converting date to string
        let temp = Math.round(data.temperature); //rounding temperature so easier to read
        return (
            // This is a card that display information for a day, when tapped, it expands and shows you clothing suggestions for that day
        <div class={`container dailyWrapper ${this.state.expand ? "expand" : ""}`} onClick={(e) => this.toggleExpand(e)}>
                <Card time={day} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} wind={data.wind} kmh={this.props.kmh}/>
                <div className="dailySuggestions">
                    Suggestions
                    <ClothesGrid temperature={data.temperature} celsius={this.props.celsius} weatherDesc={data.weatherDesc} time={data.time} size={"3em"} text={this.props.text} expand={this.state.expand}/>                                          
                </div>
            </div>
        )
    }
}

class Daily extends Component {
    state = {
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div id="daily">
                <p>Next 7 days</p> {/* shows forecast for 7 days*/}
                <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}> {/*bootsrap classes to make display felex and as a row */}
                    {
                        this.props.data.slice(1, 9).map((data, index) => { /* loops through each element (each day) */
                            return (
                                <DailyCard expand={!index} data={data} celsius={this.props.celsius} text={this.props.text}/>
                                /*card element is reused for daily and hourly as they should look the same, only difference for each card is here we pass through the day not the hour */
                            )
                        })
                    }
                </MDBContainer>
            </ div>
        );
    }
}

export default Daily;
