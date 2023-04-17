import {useState} from "react";
import {Link} from "react-router-dom";
import SortingMethodsMenuItem from "./SortingMethodsMenuItem";
import iconSuggestions from "../images/icons/icon-suggestions.png";
import iconArrowDownWhite from "../images/icons/icon-arrow-down-white.png";
import iconArrowUpWhite from "../images/icons/icon-arrow-up-white.png";

const FeedbackGeneratorSuggestions = props => {
    const [isLabelHovered, setIsLabelHovered] = useState(false);

    return (
        <section className="feedback-generator-suggestions row-flexbox-space-between large-rounded-corners-element">
            <div className="row-flexbox-flex-start" style={{gap: "40px"}}>
                <div className="row-flexbox-flex-start" style={{gap: "15px"}}>
                    <img src={iconSuggestions} alt="" />
                    <h3 style={{color: "white"}}>{props.numberOfSuggestions} Suggestions</h3>
                </div>

                <ul role="menubar">
                    <li role="menuitem" className="relative-position-element">
                        <button
                            className="sorting-methods-menu-label row-flexbox-flex-start"
                            onMouseOver={() => {setIsLabelHovered(true)}}
                            onMouseOut={() => {setIsLabelHovered(false)}}
                            onClick={props.changeIsMenuOpen}
                            ref={props.labelRef}
                        >
                            <p
                                className="sorting-methods-menu-label-p"
                                style={{opacity: isLabelHovered && 0.75}}
                            >
                                Sort by : <span className="sorting-methods-menu-label-span">{props.sortingMethod}</span>
                            </p>
                            <img
                                className="sorting-methods-menu-label-img"
                                src={props.isMenuOpen ? iconArrowUpWhite : iconArrowDownWhite}
                                alt=""
                            />
                        </button>

                        <ul
                            role="menu"
                            className="large-rounded-corners-element sorting-methods-menu-options-list"
                            style={{display: !props.isMenuOpen && "none"}}
                        >
                            {["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"].map((string, index) => {
                                return (
                                    <SortingMethodsMenuItem
                                        key={index}
                                        text={string}
                                        itemRef={props.itemRef}
                                        sortingMethod={props.sortingMethod}
                                        changeSortingMethod={props.changeSortingMethod}
                                    />
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </div>

            <Link to="/new-feedback" className="large-rounded-corners-element colored-button colored-button-1">+ Add Feedback</Link>
        </section>
    );
}

export default FeedbackGeneratorSuggestions;