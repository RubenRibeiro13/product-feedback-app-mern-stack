import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";
import changeIsMenuOpen from "../functions/changeIsMenuOpen";
import selectOption from "../functions/selectOption";
import MenuFeedback from "../components/MenuFeedback";

const NewFeedback = () => {
    /* Get product requests */

    const dispatch = useProductRequestsDispatch();
    useEffect(() => {
        const fetchProductRequests = async () => {
            const response = await fetch("http://localhost:4000/new-feedback");
            const json = await response.json();

            dispatch({type: "read", payload: json});
        }

        fetchProductRequests();
    }, [dispatch]);

    const productRequests = useProductRequests();

    /* Initialize variables */

    const navigate = useNavigate();

    const titleRef = useRef();
    const [title, setTitle] = useState("");
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(true);

    const categoriesMenuLabelRef = useRef();
    const categoriesMenuItemRef = useRef();
    const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
    const categoriesList = ["Feature", "UI", "UX", "Enhancement", "Bug"];
    const [selectedCategory, setSelectedCategory] = useState("Feature");

    const detailRef = useRef();
    const [detail, setDetail] = useState("");
    const [isDetailFocused, setIsDetailFocused] = useState(false);
    const [isDetailValid, setIsDetailValid] = useState(true);

    /* Focus on certain elements conditionally */

    const [focusedElement, setFocusedElement] = useState("");

    useEffect(() => {
        if (focusedElement === "categoriesMenuLabel") {
            categoriesMenuLabelRef.current.focus();
        } else if (focusedElement === "categoriesMenuItem") {
            categoriesMenuItemRef.current.focus();
        }

        setFocusedElement("");
    });

    /* Open and close categories menu */

    const changeIsCategoriesMenuOpen = event => {
        changeIsMenuOpen(event, "categories", isCategoriesMenuOpen, setIsCategoriesMenuOpen, setFocusedElement);
    }

    /* Select category */

    const selectCategory = event => {
        selectOption(event, selectedCategory, setSelectedCategory, setIsCategoriesMenuOpen, categoriesList, setFocusedElement, "categories");
    }

    /* Submit form */

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (titleRef.current.value === "") {
            setIsTitleValid(false);
        }
        if (detailRef.current.value === "") {
            setIsDetailValid(false);
        }

        if (titleRef.current.value !== "" && detailRef.current.value !== "") {
            const productRequest = {
                id: productRequests.length + 1,
                title: title,
                category: selectedCategory.toLowerCase(),
                upvotes: 0,
                status: "planned",
                description: detail,
                comments: []
            };

            const response = await fetch("http://localhost:4000/new-feedback", {
                method: "POST",
                body: JSON.stringify(productRequest),
                headers: {"Content-Type": "application/json"}
            });
            const json = await response.json();

            dispatch({type: "create", payload: json});
            navigate("/suggestions");
        }
    }

    /* Render new feedback page */

    return (
        <main className="new-feedback-page" onMouseDown={changeIsCategoriesMenuOpen}>
            <div style={{width: "min(100%, 540px)"}}>
                <button
                    onClick={() => navigate(-1)}
                    className="row-flexbox-flex-start back-link-feedback"
                    style={{width: "max-content"}}
                >
                    <img src="images/icons/icon-arrow-left.png" alt="" />
                    Go Back
                </button>

                <form
                    className="relative-position-element large-rounded-corners-element create-new-feedback-section"
                    onSubmit={handleSubmit}
                >
                    <img src="images/icons/icon-new-feedback.png" alt="" className="new-feedback-icon" />
                    <h1>Create New Feedback</h1>

                    <div className="column-flexbox inputs-container" style={{marginTop: "min(6vw, 40px)"}}>
                        <div>
                            <h4>Feedback Title</h4>
                            <p className="input-label">Add a short, descriptive headline</p>
                            <input
                                type="text"
                                value={title}
                                className="body-2 small-rounded-corners-element"
                                style={{
                                    outline: isTitleValid ? (isTitleFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsTitleFocused(true)}}
                                onBlur={() => {setIsTitleFocused(false)}}
                                onChange={event => {
                                    setTitle(event.target.value);
                                    setIsTitleValid(true);
                                }}
                                ref={titleRef}
                            />
                            <p className="error-message">{!isTitleValid && "Can't be empty"}</p>
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
                        </div>

                        <div>
                            <h4>Feedback Detail</h4>
                            <p className="input-label">Include any specific comments on what should be improved, added, etc.</p>
                            <textarea
                                value={detail}
                                className="body-2 small-rounded-corners-element feedback-detail-draft"
                                style={{
                                    outline: isDetailValid ? (isDetailFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsDetailFocused(true)}}
                                onBlur={() => {setIsDetailFocused(false)}}
                                onChange={event => {
                                    setDetail(event.target.value);
                                    setIsDetailValid(true);
                                }}
                                ref={detailRef}
                            />
                            <p className="error-message">{!isDetailValid && "Can't be empty"}</p>
                        </div>
                    </div>

                    <div className="row-flexbox-flex-start" style={{justifyContent: "flex-end", gap: "15px"}}>
                        <button
                            type="button"
                            className="large-rounded-corners-element colored-button colored-button-3"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button className="large-rounded-corners-element colored-button colored-button-1">Add Feedback</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default NewFeedback;