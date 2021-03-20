import React, { Component } from "react";
import { MDBIcon } from 'mdbreact';
import './BookMark.css';

class BookMark extends Component{

    constructor(props){
        super(props)
        this.state ={
            isBookmarkOpen:false,
            bookmarkNames:[],
        };
    }

    newBookmark=()=>{
        this.props.setBookmark()
        console.log("saved positions", this.props.data.bookmark)
    }

    setPosition=(item)=>{
        let bookmarkName = Object.keys(this.props.data.bookmark)[item]
        let bookmark = this.props.data.bookmark[bookmarkName]
        this.props.setSettings({"address":bookmarkName ,"lat": bookmark.lat,"lon": bookmark.lon, "timezone": bookmark.timezone})
        this.removeFocus()
    }

    openBookmarks=()=>{
        const {isBookmarkOpen} = this.state;
        this.setState({isBookmarkOpen: !isBookmarkOpen}); 
    }

    removeFocus = event => {
        this.setState({
            isBookmarkOpen: false
        });
    }

    render(){
        const {isBookmarkOpen} = this.state
        const displaybookmark = () =>{
            if (isBookmarkOpen){
                return(
                    <div id="bookmarkslist" >
                        {Object.keys(this.props.data.bookmark).map((item, i) =>(<div onClick={()=> this.setPosition(i)}>{Object.keys(this.props.data.bookmark)[i]}</div>))}
                    </div>
                )
            }
        }
        return(
            <div>
                {this.state.isBookmarkOpen? <div className="bookmark-overlay" onClick={this.removeFocus} /> : null }
                <div>
                    <MDBIcon far icon="bookmark" size="2x" onClick={this.newBookmark} />
                    <MDBIcon icon="arrow-down" onClick={this.openBookmarks}/>
                    {displaybookmark()}
                </div>
            </div>
        )
       
        
    }
}
export default BookMark;