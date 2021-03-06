import * as ClothesIcons from "react-icons/gi";
import {FaRibbon} from "react-icons/fa";
const ClothesIcon = ({iconName, size}) => {
    if (iconName === "IoRibbonOutline") {
        let Icon = FaRibbon
        return (
            <Icon className="weatherIcon" size={size} style={{color: "floralwhite"}}/>
        )
    }
    else{
        let Icon = ClothesIcons[iconName];
        return (
            <Icon className="weatherIcon" size={size} style={{color: "floralwhite"}}/>
        )
    }
}

export default ClothesIcon
