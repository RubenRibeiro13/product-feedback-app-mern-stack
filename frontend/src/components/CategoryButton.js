import {useState} from "react";

const CategoryButton = props => {
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <button
            className="body-3 large-rounded-corners-element"
            style={props.text === props.category ? {
                background: "#4661E6",
                color: "white"
            } : {
                background: isButtonHovered ? "#CFD7FF" : "#F2F4FF",
                color: "#4661E6"
            }}
            onMouseOver={() => {setIsButtonHovered(true)}}
            onMouseOut={() => {setIsButtonHovered(false)}}
            onClick={props.changeCategory}
        >
            {props.text}
        </button>
    )
}

export default CategoryButton;