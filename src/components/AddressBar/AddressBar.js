import React, { Component } from "react";
import {placeSuggestions, getGeoCoords} from "../../WeatherAPI.js";
import "./AddressBar.css";
import {BiSearch} from "react-icons/bi"
import { MDBIcon } from 'mdbreact';

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

    createSuggestions(e) {
        placeSuggestions(e.target.value, this.callBack.bind(this));
    }

    callBack(settings){
        this.setState(settings)
    }

    click(placeId) {
        getGeoCoords(placeId, this.props.setSettings)
        this.removeFocus();
    }

    setFocus(e) {
        this.setState({
            focus: true,
            isListOpen: true
        });
    }

    removeFocus() {
        this.setState({
            focus: false,
            isListOpen: false
        });
    }

    newBookmark=()=>{
        this.props.setBookmark()
        console.log("saved positions", this.props.data.bookmark[this.props.data.address])
    }
    alreadyBookmark=()=>{
        //TODO
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
                        {bookmarked_check !== undefined?<MDBIcon  icon="star" className="address-search-icon-star"onClick={this.alreadyBookmark} />: <MDBIcon  far icon="star" className="address-search-icon-star" onClick={this.newBookmark}/>}
                    </div>
                    {isListOpen && (
                        <div className="address-suggestions">
                        {suggestions.map((item, i) => (
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
                                    <div className="address-line"></div>
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