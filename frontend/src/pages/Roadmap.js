import {useEffect} from "react";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";
import FeedbackGeneratorRoadmap from "../components/FeedbackGeneratorRoadmap";
import NonSuggestionProductRequestsColumn from "../components/NonSuggestionProductRequestsColumn";

const Roadmap = () => {
    /* Get and modify non-suggestion product requests */

    const dispatch = useProductRequestsDispatch();
    useEffect(() => {
        const fetchProductRequests = async () => {
            const response = await fetch("http://localhost:4000/roadmap");
            const json = await response.json();

            dispatch({type: "read", payload: json});
        }
        
        fetchProductRequests();
    }, [dispatch]);

    const productRequests = useProductRequests();

    let commentsCounter = 0;
    productRequests.forEach(productRequest => {
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
    const numberOfPlanned = plannedProductRequests.length;

    const inProgressProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "in-progress"
    });
    const numberOfInProgress = inProgressProductRequests.length;

    const liveProductRequests = productRequests.filter(productRequest => {
        return productRequest.status === "live"
    });
    const numberOfLive = liveProductRequests.length;

    /* Render roadmap page */

    return (
        <main className="column-flexbox roadmap-page">
            <FeedbackGeneratorRoadmap />

            <section className="non-suggestion-product-requests-columns-section">
                {["Planned", "In-Progress", "Live"].map((string, index) => {
                    return <NonSuggestionProductRequestsColumn
                        key={index}
                        heading={
                            string + " (" +
                            (string === "Planned" ? numberOfPlanned : (string === "In-Progress" ? numberOfInProgress : numberOfLive))
                            + ")"
                        }
                        paragraph={
                            string === "Planned" ? "Ideas prioritized for research" : (
                                string === "In-Progress" ? "Currently being developed" : "Released features"
                            )
                        }
                        nonSuggestionProductRequests={
                            string === "Planned" ? plannedProductRequests : (
                                string === "In-Progress" ? inProgressProductRequests : liveProductRequests
                            )
                        }
                    />
                })}
            </section>
        </main>
    )
}

export default Roadmap;