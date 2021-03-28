import React, { Component } from "react";
import {placeSuggestions, getGeoCoords} from "../../WeatherAPI.js";
import "./AddressBar.css";
import {BiSearch} from "react-icons/bi"
import { MDBIcon } from 'mdbreact';


// AddressBar component that allows you to search for a location, get auto complete suggestions and 
// set the applications lat and longitude

class AddressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            suggestions: [],
            focus: false,
        }
        this.createSuggestions = this.createSuggestions.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
        this.click = this.click.bind(this);
    }

    // On key change, take the input value and request auto complete suggestions
    // Throw in a callback that then sets the return to the state
    createSuggestions(e) {
        placeSuggestions(e.target.value, this.callBack.bind(this));
    }

    // CallBack function to allow for the state to be set outside of the component
    callBack(settings){
        this.setState(settings)
    }

    // When a suggestion is clicked, remove the focus and get the latitude and longitude based on the placeId of the suggestion
    // Pass in a callback from the parent that sets the applications global settings
    click(placeId) {
        getGeoCoords(placeId, this.props.setSettings)
        this.removeFocus();
    }

    // Create a focus when the address bar is clicked
    setFocus(e) {
        this.setState({
            focus: true,
            isListOpen: true
        });
    }

    // Remove the focus created
    removeFocus() {
        this.setState({
            focus: false,
            isListOpen: false
        });
    }
    
    // For the bookmark feature, this function creates a bookmark and adds it
    newBookmark=()=>{
        document.getElementById('emptyStar').style.animation = 'turnR 2s ease';
        document.getElementById('bookmark-button').style.animation = 'bounce 2s ease';
        this.props.setBookmark()// creates a bookmark by calling the function in app.js that will store the current states
        console.log("saved positions", this.props.data.bookmark[this.props.data.address])
    }

    // Remove the bookmark if its already there
    alreadyBookmark=()=>{
        document.getElementById('filledStar').style.animation = 'turnL 2s ease';
        document.getElementById('bookmark-button').style.animation = 'shake 2s ease';
        this.props.removeBookmark(this.props.data.address)//removes bookmark by passing the address name to app.js method
    }

    render() {
        const {focus, suggestions, isListOpen } = this.state;
        const bookmarked_check = this.props.data.bookmark[this.props.data.address];
        console.log(bookmarked_check)
        const addOverlay = () => {
            if (focus) {
                return <div className="address-overlay" onClick={this.removeFocus}/>
            }
        }

        const resetInput = (e) => {
            e.target.value = "";
        }

        return (
            <div>
                {addOverlay()}
                <div className="address-wrapper">
                    <div className="address-header-title" >
                        <BiSearch className="address-search-icon"/>
                        <input
                            type="text"
                            defaultValue={"Search"}
                            onClick={this.setFocus}
                            onFocus={(e) => resetInput(e)}
                            className={focus ? "": "greyed"} 
                            style={{fontFamily: 'Sen'}}
                            onChange={this.createSuggestions}
                            />
                        {/*if there is not an existing address in the bookmark dictinary in app.js, display empty start, otherwise full star*/}
                        {bookmarked_check !== undefined?
                            <MDBIcon  icon="star" className="address-search-icon-star" id="filledStar" onClick={this.alreadyBookmark}  />: 
                            <MDBIcon  far icon="star" id="emptyStar" className="address-search-icon-star" onClick={this.newBookmark} />}
                    </div>
                    {isListOpen && (                                                                                                        // is the address bar is open, render the following
                        <div className="address-suggestions">
                        {suggestions.map((item, i) => (                                                                                     // render each suggestions // make the suggestions clickable and allocate them their placeid
                            <div className="address-suggestions-item" key={item.placeId} onClick={() => this.click(item.placeId)}>          
                                <div className="address-text-body">
                                    <div className="address-suggestions-main">
                                        {item.main}
                                    </div>
                                    <div className="address-suggestions-secondary">
                                        {item.secondary}
                                    </div>
                                </div>
                                {i < suggestions.length - 1  && (
                                    <div className="address-line"></div>                                                                    // Add dividors between suggestions, but not for the last one or before the first one
                                )}
                            </div>
                        ))}
                    </div>
                    )}  
                </div>
            </div>
        )
    }
}

export default AddressBar;