import * as ClothesIcons from "react-icons/gi";
import {FaRibbon} from "react-icons/fa";
const ClothesIcon = ({iconName, size}) => { //takes as argument the icon name and size
    if (iconName === "IoRibbonOutline") { //determining which icon library to use
        let Icon = FaRibbon //a predefined icon component from package react-icons
        return (
            <Icon className="weatherIcon" size={size} style={{color: "floralwhite"}}/> //displays this component (the icon)
        )
    }
    else{
        let Icon = ClothesIcons[iconName]; //from a different library of icons, we use the iconName to get the correct one
        return (
            <Icon className="weatherIcon" size={size} style={{color: "floralwhite"}}/>
        )
    }
}

export default ClothesIcon
