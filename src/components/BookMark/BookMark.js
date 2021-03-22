import React, { Component } from "react";
import { MDBIcon } from 'mdbreact';
import './BookMark.css';

class BookMark extends Component{

    constructor(props){
        super(props)
        this.state ={
            isBookmarkOpen:false
        };
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

    removeBookmark =(name)=>{
        this.props.removeBookmark(name)
    }

    render(){
        const {isBookmarkOpen} = this.state
        const displaybookmark = () =>{
            if (isBookmarkOpen){
                if(Object.keys(this.props.data.bookmark).length == 0) {
                    return(
                        <div id="bookmarkslist" >
                            <div id="bookMarkeditem">
                                <div>No bookmarks saved</div>
                            </div>  
                        </div>
                    )
                }
                else {
                    return(
                        <div id="bookmarkslist" >
                            {Object.keys(this.props.data.bookmark).map((item, i) =>(
                                <>
                                    <div id="bookMarkeditem">
                                        <div onClick={()=> this.setPosition(i)}>
                                            {Object.keys(this.props.data.bookmark)[i]}
                                        </div>
                                        <div>
                                        <button className="close" onClick={()=>this.removeBookmark(Object.keys(this.props.data.bookmark)[i])}><span className="sr-only">Close</span></button> 
                                        </div>
                                        
                                    </div>
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
                {this.state.isBookmarkOpen ? <div className="bookmark-overlay" onClick={this.removeFocus} /> : null }
                <div>
                    <div>
                        <MDBIcon far icon="bookmark" className="bookmark-button" size="2x" onClick={this.openBookmarks} />
                    </div>
                    {displaybookmark()}
                </div>
            </div>
        )
       
        
    }
}
export default BookMark;