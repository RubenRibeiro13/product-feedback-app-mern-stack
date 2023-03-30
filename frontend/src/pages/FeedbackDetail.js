import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";
import ClickedProductRequest from "../components/ClickedProductRequest";
import ClickedProductRequestCommentsSection from "../components/ClickedProductRequestCommentsSection";

const FeedbackDetail = () => {
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

    /* Get and modify clicked product request */

    const {suggestionId} = useParams();
    const clickedProductRequest = productRequests.filter(productRequest => {return productRequest._id === suggestionId});

    let commentsCounter = 0;
    clickedProductRequest.forEach(productRequest => {
        productRequest.comments.forEach(comment => {
            commentsCounter++;
            comment.replies.forEach(reply => {
                commentsCounter++;
            });
        });

        productRequest.numberOfComments = commentsCounter;
        commentsCounter = 0;
    });

    /* Render feedback detail page */

    return (
        <main>
            {clickedProductRequest.map(productRequest => {
                return <ClickedProductRequest
                    key={productRequest._id}
                    title={productRequest.title}
                    category={productRequest.category.slice(0,1).toUpperCase() + productRequest.category.slice(1)}
                    upvotes={productRequest.upvotes}
                    description={productRequest.description}
                    numberOfComments={productRequest.numberOfComments}
                />
            })}

            {clickedProductRequest.map(productRequest => {
                return <ClickedProductRequestCommentsSection
                    key={productRequest._id}
                    numberOfComments={productRequest.numberOfComments}
                    comments={productRequest.comments.sort((a, b) => {return a.id - b.id})}
                />
            })}
        </main>
    );
}

export default FeedbackDetail;