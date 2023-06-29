import {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import changeIsMenuOpen from "../functions/changeIsMenuOpen";
import selectOption from "../functions/selectOption";
import MenuFeedback from "../components/MenuFeedback";

const NewFeedback = () => {
    /* Initialize variables */

    const navigate = useNavigate();
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(true);

    /* Focus on certain elements conditionally */

    const [focusedElement, setFocusedElement] = useState("");
    const categoriesMenuLabelRef = useRef();
    const categoriesMenuItemRef = useRef();

    useEffect(() => {
        if (focusedElement === "categoriesMenuLabel") {
            categoriesMenuLabelRef.current.focus();
        } else if (focusedElement === "categoriesMenuItem") {
            categoriesMenuItemRef.current.focus();
        }

        setFocusedElement("");
    });

    /* Open and close categories menu */

    const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);

    const changeIsCategoriesMenuOpen = event => {
        changeIsMenuOpen(event, "categories", isCategoriesMenuOpen, setIsCategoriesMenuOpen, setFocusedElement);
    }

    /* Select category */

    const categoriesList = ["Feature", "UI", "UX", "Enhancement", "Bug"];
    const [selectedCategory, setSelectedCategory] = useState("Feature");

    const selectCategory = event => {
        selectOption(event, selectedCategory, setSelectedCategory, setIsCategoriesMenuOpen, categoriesList, setFocusedElement, "categories");
    }

    /* Render new feedback page */

    return (
        <main className="new-feedback-page" onMouseDown={changeIsCategoriesMenuOpen}>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="row-flexbox-flex-start back-link-feedback"
                    style={{width: "max-content"}}
                >
                    <img src="images/icons/icon-arrow-left.png" alt="" />
                    Go Back
                </button>

                <section className="relative-position-element large-rounded-corners-element create-new-feedback-section">
                    <img src="images/icons/icon-new-feedback.png" alt="" className="new-feedback-icon" />
                    <h1>Create New Feedback</h1>

                    <div className="column-flexbox inputs-container" style={{marginTop: "min(6vw, 40px)"}}>
                        <div>
                            <h4>Feedback Title</h4>
                            <p className="input-label">Add a short, descriptive headline</p>
                            <input type="text" className="body-2 small-rounded-corners-element" />
                        </div>

                        <div>
                            <h4>Category</h4>
                            <p className="input-label">Choose a category for your feedback</p>
                            <MenuFeedback
                                menuOf="categories"
                                isMenuOpen={isCategoriesMenuOpen}
                                changeIsMenuOpen={changeIsCategoriesMenuOpen}
                                optionsList={categoriesList}
                                selectedOption={selectedCategory}
                                selectOption={selectCategory}
                                labelRef={categoriesMenuLabelRef}
                                itemRef={categoriesMenuItemRef}
                            />
                            <input type="hidden" value={selectedCategory} />
                        </div>

                        <div>
                            <h4>Feedback Detail</h4>
                            <p className="input-label">Include any specific comments on what should be improved, added, etc.</p>
                            <textarea className="body-2 small-rounded-corners-element feedback-detail-draft" />
                        </div>
                    </div>

                    <div className="row-flexbox-flex-start" style={{justifyContent: "flex-end", gap: "15px"}}>
                        <button
                            className="large-rounded-corners-element colored-button colored-button-3"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button className="large-rounded-corners-element colored-button colored-button-1">Add Feedback</button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default NewFeedback;