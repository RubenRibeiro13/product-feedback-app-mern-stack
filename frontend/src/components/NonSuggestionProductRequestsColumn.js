import NonSuggestionProductRequest from "./NonSuggestionProductRequest";

const NonSuggestionProductRequestsColumn = props => {
    return (
        <article className="non-suggestion-product-requests-column">
            <h3>{props.heading}</h3>
            <p className="body-1">{props.paragraph}</p>

            <section className="column-flexbox non-suggestion-product-requests-section">
                {props.nonSuggestionProductRequests.map(productRequest => {
                    return <NonSuggestionProductRequest
                        key={productRequest._id}
                        id={productRequest._id}
                        status={productRequest.status}
                        title={productRequest.title}
                        description={productRequest.description}
                        category={productRequest.category.slice(0, 1).toUpperCase() + productRequest.category.slice(1)}
                        numberOfComments={productRequest.numberOfComments}
                        upvotes={productRequest.upvotes}
                    />
                })}
            </section>
        </article>
    )
}

export default NonSuggestionProductRequestsColumn;