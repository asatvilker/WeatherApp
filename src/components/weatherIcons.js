import * as WeatherIcons from "react-icons/wi";
//very similar to clothesIcons.js, that file for detailed comments as priciples are the same just here we are loading weather icon libraries
const WeatherIcon = ({iconName, size}) => {
    let Icon = WeatherIcons[iconName];
    return (
        <Icon className="weatherIcon" size={size} style={{color: "floralwhite", width: "100%"}}/>
    )
}

export default WeatherIcon
