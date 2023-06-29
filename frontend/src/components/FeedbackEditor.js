import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const FeedbackEditor = props => {
    const [isBackLinkHovered, setIsBackLinkHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="row-flexbox-space-between">
            <button
                onClick={() => navigate(-1)}
                className="row-flexbox-flex-start back-link-feedback"
                onMouseOver={() => {setIsBackLinkHovered(true)}}
                onMouseOut={() => {setIsBackLinkHovered(false)}}
            >
                <img src="/images/icons/icon-arrow-left.png" alt="" />
                <span style={{textDecoration: isBackLinkHovered && "underline"}}>Go Back</span>
            </button>

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