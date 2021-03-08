import * as WeatherIcons from "react-icons/wi";

const WeatherIcon = ({iconName, size}) => {
    let Icon = WeatherIcons[iconName];
    return (
        <Icon className="weatherIcon" size={size} style={{color: "floralwhite", width: "100%"}}/>
    )
}

export default WeatherIcon
