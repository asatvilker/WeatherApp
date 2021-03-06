import * as ClothesIcons from "react-icons/gi";
import {IoRibbonOutline} from "react-icons/io5";
const ClothesIcon = ({iconName, size}) => {
    if (iconName === "IoRibbonOutline") {
        let Icon = IoRibbonOutline
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
