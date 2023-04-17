import {useState} from "react";
import {Link} from "react-router-dom";

const FeedbackEditor = props => {
    const [isBackLinkHovered, setIsBackLinkHovered] = useState(false);

    return (
        <section className="row-flexbox-space-between">
            <Link
                to="/suggestions"
                className="row-flexbox-flex-start back-link-feedback"
                onMouseOver={() => {setIsBackLinkHovered(true)}}
                onMouseOut={() => {setIsBackLinkHovered(false)}}
            >
                <img src="/images/icons/icon-arrow-left.png" alt="" />
                <span style={{textDecoration: isBackLinkHovered && "underline"}}>Go Back</span>
            </Link>

            <Link
                to={"/edit-feedback/" + props.suggestionId}
                className="large-rounded-corners-element colored-button colored-button-2"
            >
                Edit Feedback
            </Link>
        </section>
    )
}

export default FeedbackEditor;