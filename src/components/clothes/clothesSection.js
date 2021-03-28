import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';
import codes from './clothes.json'
import ClothesIcon from "./clothesIcons";
import Suggest from '../suggestions/suggestion';
import Chart from "../Chart/Chart";
import ClothesGrid from "./clothesSuggestions.js";

class Clothes extends Component {

    state = {
        isFlipped: false,
        rated: false
    }

    render() {
        return (
            <>
                <h1 id="clothesHead">Suggestion for the day</h1>
                <Suggest hourly={this.props.hourly} celsius={this.props.celsius} rainSummary={this.props.minutely.summary} />
                {/* a bootstrap layout component that breaks the layout up into responsive rows and columns */}
                <div className="flip-card" onClick={() => this.setState({ isFlipped: !this.state.isFlipped })}>
                    <div className="flip-card-inner">
                        <div className={`flip-card-front z-depth-1 ${this.state.isFlipped ? "flipped" : ""}`}>
                            {this.props.hourly[0] && 
                                <ClothesGrid temperature={this.props.hourly[0].temperature} celsius={this.props.celsius} weatherDesc={this.props.hourly[0].weatherDesc} time={this.props.hourly[0].time}/>
                            }
                        </div>
                        <div className={`flip-card-back z-depth-1 ${this.state.isFlipped ? "flipped" : ""}`}>
                            
                            <Chart rainSummary={this.props.minutely.summary} data={this.props.minutely.map((item) => {
                                return (item.intensity)
                            })} />
                        
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className="menuButton" onClick={() => this.setState({ isFlipped: false })}>
                        Overview
                    </div>
                    <div className="menuButton" onClick={() => this.setState({ isFlipped: true })}>
                        Rain-Chart
                    </div>
                    <button class="menuRate ripple" onClick={() => this.setState({ rated: !this.state.rated })}>{this.state.rated ? "Thanks!" : "Like?"}
                        <MDBIcon far={!this.state.rated} fas={this.state.rated} icon="thumbs-up" className="ml-2" /></button>
                </div>
                <hr />
            </>
        );
    }
}

export default Clothes;
