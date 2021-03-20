import React, { Component } from "react";
import {getGeoCoords} from "../../WeatherAPI.js";
import { MDBIcon } from 'mdbreact';

class BookMark extends Component{

    constructor(props){
        super(props)
        this.state ={
            hystory:{}
        };
    }

    newBookmark=()=>{
        this.props.setBookmark(this.props.data.address, this.props.data.lat, this.props.data.lon)
        console.log("saved positions", this.props.data.bookmark)
    }
    showPosition=()=>{
        let bookmarkName = Object.keys(this.props.data.bookmark)[0]
        let bookmark = this.props.data.bookmark[bookmarkName]

        
        console.log("BookMakr 0",bookmark)
        this.props.setSettings({"address":bookmarkName ,"lat": bookmark.lat,"lon": bookmark.lon  })

       // this.props.setSettings({"lat": bookmark[Object.keys(bookmark)[0]].lat, })
        //this.props.setSettings({"lon": bookmark[Object.keys(bookmark)[0]].lon})

        //console.log("welcome back to",this.props.data.address)
        //getGeoCoords("ChIJt7X11MvjSFER_R-tXLl6jUo", this.props.setSettings)
    }

    render(){
        return(
            
            <div>
                <MDBIcon far icon="bookmark" size="2x" onClick={this.newBookmark} />
                <div></div>
                <MDBIcon icon="arrow-down" onClick={this.showPosition}/>
            </div>
        )
       
        
    }
}
export default BookMark;