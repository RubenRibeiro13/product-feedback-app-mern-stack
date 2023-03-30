import {useState} from "react";
import {Link} from "react-router-dom";
import iconComments from "../images/icons/icon-comments.png";
import iconArrowUp from "../images/icons/icon-arrow-up.png";

const NonSuggestionProductRequest = props => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    return (
        <article className="relative-position-element">
            <Link
                to={"/feedback-detail/" + props.id}
                onMouseOver={() => {setIsLinkHovered(true)}}
                onMouseOut={() => {setIsLinkHovered(false)}}
            >
                <div
                    style={{
                        background: props.status === "planned" ? "#F49F85" : (props.status === "in-progress" ? "#AD1FEA" : "#62BCFA"),
                        borderRadius: "5px 5px 0 0",
                        height: "5px"
                    }}
                />

                <div className="non-suggestion-product-request-link">
                    <div className="row-flexbox-flex-start non-suggestion-product-request-status">
                        <div
                            style={{
                                background: props.status === "planned" ? "#F49F85" : (props.status === "in-progress" ? "#AD1FEA" : "#62BCFA"),
                                borderRadius: "50%",
                                width: "8px",
                                height: "8px"
                            }}
                        />
                        <span className="body-1">
                            {props.status === "planned" ? "Planned" : (props.status === "in-progress" ? "In Progress" : "Live")}
                        </span>
                    </div>

                    <h3 style={{color: isLinkHovered && "#4661E6"}}>{props.title}</h3>
                    <p className="body-1 non-suggestion-product-request-description">{props.description}</p>
                    <div className="body-3 large-rounded-corners-element product-request-category" style={{marginBottom: "15px"}}>
                        {props.category}
                    </div>

                    <div className="row-flexbox-flex-start product-request-comments non-suggestion-product-request-comments">
                        <img src={iconComments} alt="" />
                        <span style={{opacity: props.numberOfComments === 0 && 0.5}}>{props.numberOfComments}</span>
                    </div>
                </div>
            </Link>
        
            <button className="row-flexbox-flex-start large-rounded-corners-element upvote-button non-suggestion-product-request-upvotes">
                <img src={iconArrowUp} alt="" />
                <span>{props.upvotes}</span>
            </button>
        </article>
    )
}

export default NonSuggestionProductRequest;