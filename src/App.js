import logo from './logo.svg';
import './App.css';
import Overview from './components/DropDown/overview';
import AddressBar from "./components/AddressBar/AddressBar";
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,
            lon: -0.1277583,
            address: "London, UK",
            celsius: true,
            date: new Date(),
            hourly: [],
            minutely: [{temperature: 0}],
            daily: []
        }
    }

    render() {
        return (
            <div className="App">
                <Overview />
                <AddressBar/>
            </div>
        )
    }
}

export default App;
