import {useState, useRef, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";
import changeIsMenuOpen from "../functions/changeIsMenuOpen";
import selectOption from "../functions/selectOption";
import MenuFeedback from "../components/MenuFeedback";

const EditFeedback = () => {
    /* Get product requests */

    const dispatch = useProductRequestsDispatch();
    useEffect(() => {
        const fetchProductRequests = async () => {
            const response = await fetch("http://localhost:4000/feedback-detail");
            const json = await response.json();

            dispatch({type: "read", payload: json});
        }

        fetchProductRequests();
    }, [dispatch]);

    const productRequests = useProductRequests();

    /* Get properties of product request to edit */

    const {suggestionId} = useParams();
    const productRequestToEdit = productRequests.filter(productRequest => {return productRequest._id === suggestionId});
    
    const id = productRequestToEdit.map(productRequest => {return productRequest.id})[0];
    const initialTitle = productRequestToEdit.map(productRequest => {return productRequest.title})[0];
    const initialCategory = productRequestToEdit.map(productRequest => {return productRequest.category})[0];
    const upvotes = productRequestToEdit.map(productRequest => {return productRequest.upvotes})[0];
    const initialStatus = productRequestToEdit.map(productRequest => {return productRequest.status})[0];
    const initialDetail = productRequestToEdit.map(productRequest => {return productRequest.description})[0];
    const comments = productRequestToEdit.map(productRequest => {return productRequest.comments})[0];

    /* Initialize variables */

    const navigate = useNavigate();

    const titleRef = useRef();
    const [title, setTitle] = useState(initialTitle);
    useEffect(() => {setTitle(initialTitle)}, [initialTitle]);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isTitleValid, setIsTitleValid] = useState(true);

    const categoriesMenuLabelRef = useRef();
    const categoriesMenuItemRef = useRef();
    const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
    const categoriesList = ["Feature", "UI", "UX", "Enhancement", "Bug"];
    const [selectedCategory, setSelectedCategory] = useState(
        !["ui", "ux"].includes(initialCategory) ?
            initialCategory.slice(0, 1).toUpperCase() + initialCategory.slice(1)
        : initialCategory.toUpperCase()
    );
    useEffect(() => {setSelectedCategory(
        !["ui", "ux"].includes(initialCategory) ?
            initialCategory.slice(0, 1).toUpperCase() + initialCategory.slice(1)
        : initialCategory.toUpperCase()
    )}, [initialCategory]);

    const statusesMenuLabelRef = useRef();
    const statusesMenuItemRef = useRef();
    const [isStatusesMenuOpen, setIsStatusesMenuOpen] = useState(false);
    const statusesList = ["Suggestion", "Planned", "In-Progress", "Live"];
    const [selectedStatus, setSelectedStatus] = useState(
        initialStatus === "in-progress" ? "In-Progress" : initialStatus.slice(0, 1).toUpperCase() + initialStatus.slice(1)
    );
    useEffect(() => {setSelectedStatus(
        initialStatus === "in-progress" ? "In-Progress" : initialStatus.slice(0, 1).toUpperCase() + initialStatus.slice(1)
    )}, [initialStatus]);

    const detailRef = useRef();
    const [detail, setDetail] = useState(initialDetail);
    useEffect(() => {setDetail(initialDetail)}, [initialDetail]);
    const [isDetailFocused, setIsDetailFocused] = useState(false);
    const [isDetailValid, setIsDetailValid] = useState(true);

    /* Focus on certain elements conditionally */

    const [focusedElement, setFocusedElement] = useState("");

    useEffect(() => {
        if (focusedElement === "categoriesMenuLabel") {
            categoriesMenuLabelRef.current.focus();
        } else if (focusedElement === "categoriesMenuItem") {
            categoriesMenuItemRef.current.focus();
        } else if (focusedElement === "statusesMenuLabel") {
            statusesMenuLabelRef.current.focus();
        } else if (focusedElement === "statusesMenuItem") {
            statusesMenuItemRef.current.focus();
        }

        setFocusedElement("");
    });

    /* Open and close categories and statuses menus */

    const changeIsCategoriesMenuOpen = event => {
        changeIsMenuOpen(event, "categories", isCategoriesMenuOpen, setIsCategoriesMenuOpen, setFocusedElement);
    }

    const changeIsStatusesMenuOpen = event => {
        changeIsMenuOpen(event, "statuses", isStatusesMenuOpen, setIsStatusesMenuOpen, setFocusedElement);
    }

    /* Select category and status */

    const selectCategory = event => {
        selectOption(event, selectedCategory, setSelectedCategory, setIsCategoriesMenuOpen, categoriesList, setFocusedElement, "categories");
    }

    const selectStatus = event => {
        selectOption(event, selectedStatus, setSelectedStatus, setIsStatusesMenuOpen, statusesList, setFocusedElement, "statuses");
    }

    /* Delete product request */

    const deleteProductRequest = async () => {
        await fetch("http://localhost:4000/edit-feedback/" + suggestionId, {
            method: "DELETE",
        });
        
        navigate("/suggestions");
    }

    /* Submit form */

    const handleSubmit = async event => {
        event.preventDefault();

        if (titleRef.current.value === "") {
            setIsTitleValid(false);
        }
        if (detailRef.current.value === "") {
            setIsDetailValid(false);
        }

        if (titleRef.current.value !== "" && detailRef.current.value !== "") {
            const productRequest = {
                id: id,
                title: title,
                category: selectedCategory.toLowerCase(),
                upvotes: upvotes,
                status: selectedStatus.toLowerCase(),
                description: detail,
                comments: comments
            };

            await fetch("http://localhost:4000/edit-feedback/" + suggestionId, {
                method: "PATCH",
                body: JSON.stringify(productRequest),
                headers: {"Content-Type": "application/json"}
            });

            navigate("/suggestions");
        }
    }

    /* Render edit feedback page */

    return (
        <main
            className="edit-feedback-page"
            onMouseDown={event => {
                changeIsCategoriesMenuOpen(event);
                changeIsStatusesMenuOpen(event);
            }}
        >
            <div style={{width: "min(100%, 540px)"}}>
                <button
                    onClick={() => navigate(-1)}
                    className="row-flexbox-flex-start back-link-feedback"
                    style={{width: "max-content"}}
                >
                    <img src="../images/icons/icon-arrow-left.png" alt="" />
                    Go Back
                </button>

                <form
                    className="relative-position-element large-rounded-corners-element editing-feedback-section"
                    onSubmit={handleSubmit}
                >
                    <img src="../images/icons/icon-edit-feedback.png" alt="" className="edit-feedback-icon" />
                    <h1>Editing '{initialTitle}'</h1>

                    <div className="column-flexbox inputs-container" style={{marginTop: "min(6vw, 75px)"}}>
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
                            <h4>Update Status</h4>
                            <p className="input-label">Change feature state</p>
                            <MenuFeedback
                                menuOf="statuses"
                                isMenuOpen={isStatusesMenuOpen}
                                changeIsMenuOpen={changeIsStatusesMenuOpen}
                                optionsList={statusesList}
                                selectedOption={selectedStatus}
                                selectOption={selectStatus}
                                labelRef={statusesMenuLabelRef}
                                itemRef={statusesMenuItemRef}
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

                    <div className="row-flexbox-space-between">
                        <button
                            type="button"
                            className="large-rounded-corners-element colored-button colored-button-4"
                            onClick={deleteProductRequest}
                        >
                            Delete
                        </button>

                        <div className="row-flexbox-flex-start" style={{gap: "15px"}}>
                            <button
                                type="button"
                                className="large-rounded-corners-element colored-button colored-button-3"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button className="large-rounded-corners-element colored-button colored-button-1">Add Feedback</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default EditFeedback;