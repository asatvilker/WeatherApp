import * as ClothesIcons from "react-icons/gi";

const ClothesIcon = ({iconName, size}) => {
    let Icon = ClothesIcons[iconName];
    return (
        <Icon className="weatherIcon" size={size} style={{color: "floralwhite"}}/>
    )
}

export default ClothesIcon
