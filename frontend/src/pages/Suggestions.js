import {useEffect, useState, useRef} from "react";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";
import Logo from "../components/Logo";
import CategorySelector from "../components/CategorySelector";
import RoadmapViewer from "../components/RoadmapViewer";
import FeedbackGeneratorSuggestions from "../components/FeedbackGeneratorSuggestions";
import SuggestedProductRequest from "../components/SuggestedProductRequest";

const Suggestions = () => {
    /* Get product requests */

    const dispatch = useProductRequestsDispatch();
    useEffect(() => {
        const fetchProductRequests = async () => {
            const response = await fetch("http://localhost:4000/suggestions");
            const json = await response.json();

            dispatch({type: "read", payload: json});
        }
        
        fetchProductRequests();
    }, [dispatch]);

    const productRequests = useProductRequests();

    /* Get, filter and modify suggested product requests */

    const [category, setCategory] = useState("All");
    const changeCategory = event => {
        setCategory(event.target.innerText);
    }

    let suggestedProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "suggestion"
    });
    if (category !== "All") {
        suggestedProductRequests=suggestedProductRequests.filter(productRequest => {
            return productRequest.category === category.toLowerCase()
        });
    }

    let commentsCounter = 0;
    suggestedProductRequests.forEach(productRequest => {
        productRequest.comments.forEach(comment => {
            commentsCounter++;
            comment.replies.forEach(reply => {
                commentsCounter++;
            });
        });

        productRequest.numberOfComments = commentsCounter;
        commentsCounter = 0;
    });

    /* Get planned, in-progress and live product requests */

    const plannedProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "planned"
    });

    const inProgressProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "in-progress"
    });

    const liveProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "live"
    });

    /* Focus on certain elements conditionally */

    const [focusedElement, setFocusedElement] = useState("");
    const labelRef = useRef();
    const itemRef = useRef();

    useEffect(() => {
        if (focusedElement === "label") {
            labelRef.current.focus();
        } else if (focusedElement === "item") {
            itemRef.current.focus();
        }

        setFocusedElement("");
    });

    /* Open and close sorting methods menu */

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const changeIsMenuOpen = event => {
        let menuFlag = false;
        event.target.classList.forEach(targetClass => {
            if ([
                "sorting-methods-menu-label",
                "sorting-methods-menu-label-p",
                "sorting-methods-menu-label-span",
                "sorting-methods-menu-label-img"
            ].includes(targetClass)) {
                menuFlag = true;
            }
        });

        if (menuFlag) {
            setIsMenuOpen(isMenuOpen ? false : true);

            if (!isMenuOpen) {
                setFocusedElement("item");
            }
        } else {
            setIsMenuOpen(false);
        }
    }

    /* Choose sorting method */

    const [sortingMethod, setSortingMethod] = useState("Most Upvotes");
    const changeSortingMethod = (event) => {
        if (event.type === "mousedown") {
            setSortingMethod(event.target.innerText);
        } else if (event.type === "keydown" && (event.key === "Tab" || event.key === "Enter")) {
            event.preventDefault();

            setSortingMethod(event.target.innerText);
            setIsMenuOpen(false);
            setFocusedElement("label");
        } else if (event.type === "keydown" && event.key === "ArrowUp") {
            event.preventDefault();

            switch (sortingMethod) {
                case "Least Upvotes":
                    setSortingMethod("Most Upvotes");
                    break;
                case "Most Comments":
                    setSortingMethod("Least Upvotes");
                    break;
                case "Least Comments":
                    setSortingMethod("Most Comments");
                    break;
            }
            setFocusedElement("item");
        } else if (event.type === "keydown" && event.key === "ArrowDown") {
            event.preventDefault();

            switch (sortingMethod) {
                case "Most Upvotes":
                    setSortingMethod("Least Upvotes");
                    break;
                case "Least Upvotes":
                    setSortingMethod("Most Comments");
                    break;
                case "Most Comments":
                    setSortingMethod("Least Comments");
                    break;
            }
            setFocusedElement("item");
        }
    }

    /* Sort suggested product requests */

    if (sortingMethod === "Most Upvotes") {
        suggestedProductRequests.sort((a, b) => {
            return b.upvotes - a.upvotes
        });
    } else if (sortingMethod === "Least Upvotes") {
        suggestedProductRequests.sort((a, b) => {
            return a.upvotes - b.upvotes
        });
    } else if (sortingMethod === "Most Comments") {
        suggestedProductRequests.sort((a, b) => {
            return b.numberOfComments - a.numberOfComments
        })
    } else if (sortingMethod === "Least Comments") {
        suggestedProductRequests.sort((a, b) => {
            return a.numberOfComments - b.numberOfComments
        })
    }

    /* Render suggestions page */

    return (
        <div className="suggestions-page" onClick={changeIsMenuOpen}>
            <header className="suggestions-page-header column-flexbox">
                <Logo />

                <CategorySelector
                    category={category}
                    changeCategory={changeCategory}
                />

                <RoadmapViewer
                    numberOfPlanned={plannedProductRequests.length}
                    numberOfInProgress={inProgressProductRequests.length}
                    numberOfLive={liveProductRequests.length}
                />
            </header>

            <main className="column-flexbox suggestions-page-main">
                <FeedbackGeneratorSuggestions
                    numberOfSuggestions={suggestedProductRequests.length}
                    focusedElement={focusedElement}
                    labelRef={labelRef}
                    itemRef={itemRef}
                    isMenuOpen={isMenuOpen}
                    changeIsMenuOpen={changeIsMenuOpen}
                    sortingMethod={sortingMethod}
                    changeSortingMethod={changeSortingMethod}
                />

                <section className="suggested-product-requests-section column-flexbox">
                    {suggestedProductRequests.map(productRequest => {
                        return <SuggestedProductRequest
                            key={productRequest._id}
                            id={productRequest._id}
                            title={productRequest.title}
                            category={productRequest.category.slice(0, 1).toUpperCase() + productRequest.category.slice(1)}
                            upvotes={productRequest.upvotes}
                            description={productRequest.description}
                            numberOfComments={productRequest.numberOfComments}
                        />
                    })}
                </section>
            </main>
        </div>
    );
}

export default Suggestions;