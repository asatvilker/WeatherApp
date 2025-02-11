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
        isFlipped: false, // for the flip card effect
        rated: false //  if the clothing suggestion was rated
    }

    componentDidUpdate(nextProps) {
        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) { //if the props have changed, i.e the hourly has changed and new clothes have been suggested
            this.setState({ rated: false }); // reset the rated button
        }
    }

    render() {
        return (
            <>
                <h1 id="clothesHead">Suggestion for the day</h1>
                <Suggest hourly={this.props.hourly} celsius={this.props.celsius} rainSummary={this.props.minutely.summary} />
                {/* a bootstrap layout component that breaks the layout up into responsive rows and columns 
                
                    Flip on click by adding a button
                */}

                <div className="flip-card-inner">
                    <div className={`flip-card-front z-depth-1 ${this.state.isFlipped ? "flipped" : ""}`}>
                        {/* For the front of the flip card we have the clothes suggesteds */}
                        {this.props.hourly[0] &&
                            <ClothesGrid temperature={this.props.hourly[0].temperature} celsius={this.props.celsius} weatherDesc={this.props.hourly[0].weatherDesc} time={this.props.hourly[0].time} text={this.props.text} expand={true} />
                        }
                    </div>

                </div>

                <div className="menu">

                    <button class="menuRate ripple" onClick={() => this.setState({ rated: !this.state.rated })}>{this.state.rated ? "Thanks!" : "Like?"}
                        <MDBIcon far={!this.state.rated} fas={this.state.rated} icon="thumbs-up" className="ml-2" /></button>
                </div>
                <hr />
            </>
        );
    }
}

export default Clothes;
