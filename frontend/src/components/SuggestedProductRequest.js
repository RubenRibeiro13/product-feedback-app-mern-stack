import {useState} from "react";
import {Link} from "react-router-dom";
import iconArrowUp from "../images/icons/icon-arrow-up.png";
import iconComments from "../images/icons/icon-comments.png";

const SuggestedProductRequest = props => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    return (
        <article className="relative-position-element">
            <button className="column-flexbox large-rounded-corners-element upvote-button suggested-product-request-upvotes">
                <img src={iconArrowUp} alt="" />
                {props.upvotes}
            </button>

            <Link
                to={"/feedback-detail/" + props.id}
                className="row-flexbox-space-between large-rounded-corners-element suggested-product-request-link"
                onMouseOver={() => setIsLinkHovered(true)}
                onMouseOut={() => setIsLinkHovered(false)}
            >
                <div className="suggested-product-request-editable-info">
                    <h3 style={{color: isLinkHovered && "#4661E6"}}>{props.title}</h3>
                    <p className="body-1">{props.description}</p>
                    <div className="large-rounded-corners-element body-3 product-request-category">{props.category}</div>
                </div>

                <div className="row-flexbox-flex-start product-request-comments">
                    <img src={iconComments} alt="" />
                    <span style={{opacity: props.numberOfComments === 0 && 0.5}}>{props.numberOfComments}</span>
                </div>
            </Link>
        </article>
    );
}

export default SuggestedProductRequest;