import React, { Component } from "react";
import { MDBIcon } from 'mdbreact';
import './BookMark.css';

class BookMark extends Component{

    constructor(props){
        super(props)
        this.state ={
            isBookmarkOpen:false,
        };
    }

    //Set bookmark in apps.js as that is mounted only once, and states stay, add the variables to a dictionary
    setPosition=(item)=>{
        let bookmarkName = Object.keys(this.props.data.bookmark)[item] //finds the addressName of the item in that position 
        let bookmark = this.props.data.bookmark[bookmarkName] //finds the details linked to the name address
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
    //calls the method in app.js that was passed
    removeBookmark =(name)=>{
        this.props.removeBookmark(name)
    }

    render(){
        const {isBookmarkOpen} = this.state
        // show all items the bookmark state from app.js, if there is any 
        const displaybookmark = () =>{
            if (isBookmarkOpen){
                if(Object.keys(this.props.data.bookmark).length == 0) {
                    return(
                        <div id="bookmarkslist" >
                            <div id="bookMarkeditem">
                                <div>No bookmarks saved</div>{/*if there are not bookamrks saved */}
                            </div>  
                        </div>
                        
                    )
                }
                else {
                    return(
                        <div id="bookmarkslist" >
                            
                            <div className="bookmarkHeader">FAVORITE:</div>
                            <div className="bookmark-line"></div>
                            {/*loops through every item in bookmark*/}
                            {Object.keys(this.props.data.bookmark).map((item, i) =>( 
                                <>
                                    <div id="bookMarkeditem">
                                        <div onClick={()=> this.setPosition(i)}>
                                            {Object.keys(this.props.data.bookmark)[i]}{/*when clicked will set the position with the address displayed*/} 
                                        </div>
                                        <div>
                                            {/*this button will remove the bookmark by accessing the bookmark function un app.js*/} 
                                        <button className="close" onClick={()=>this.removeBookmark(Object.keys(this.props.data.bookmark)[i])}><span className="sr-only">Close</span></button> 
                                        </div>
                                    </div>
                                    {/*only display the line of is not the last item */} 
                                    {i < Object.keys(this.props.data.bookmark).length - 1  && (
                                        <div className="bookmark-line"></div>
                                    )}
                                </>
                                )
                            )}
                        </div>
                    )
                }
            }
        }
        return(
            <div>
                {/*display the overlay only when the bookamrk list is open */} 
                {this.state.isBookmarkOpen ? <div className="bookmark-overlay" onClick={this.removeFocus} /> : null }
                <div>
                    <div >
                        <MDBIcon far icon="bookmark" className="bookmark-button" size="2x" onClick={this.openBookmarks} />
                    </div>
                    {displaybookmark()}
                </div>
            </div>
        )
       
        
    }
}
export default BookMark;