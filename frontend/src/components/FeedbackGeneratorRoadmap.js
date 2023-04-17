import {useState} from "react";
import {Link} from "react-router-dom";
import iconArrowLeftGray from "../images/icons/icon-arrow-left-gray.png";

const FeedbackGeneratorRoadmap = () => {
    const [isBackLinkHovered, setIsBackLinkHovered] = useState(false);

    return (
        <section className="row-flexbox-space-between large-rounded-corners-element feedback-generator-roadmap">
            <div>
                <Link
                    to="/suggestions"
                    className="row-flexbox-flex-start back-link-roadmap"
                    onMouseOver={() => {setIsBackLinkHovered(true)}}
                    onMouseOut={() => {setIsBackLinkHovered(false)}}
                >
                    <img src={iconArrowLeftGray} alt="" />
                    <span style={{textDecoration: isBackLinkHovered && "underline"}}>Go Back</span>
                </Link>
                <h1 style={{color: "white"}}>Roadmap</h1>
            </div>

            <Link to="/new-feedback" className="large-rounded-corners-element colored-button colored-button-1">+ Add Feedback</Link>
        </section>
    )
}

export default FeedbackGeneratorRoadmap;