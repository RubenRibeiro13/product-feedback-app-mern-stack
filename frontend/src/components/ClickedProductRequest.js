const clickedProductRequest = props => {
    return (
        <article className="large-rounded-corners-element clicked-product-request">
            <button className="column-flexbox large-rounded-corners-element upvote-button clicked-product-request-upvotes">
                <img src="/images/icons/icon-arrow-up.png" alt="" />
                {props.upvotes}
            </button>

            <div>
                <h3>{props.title}</h3>
                <p className="body-1 clicked-product-request-description">{props.description}</p>
                <div className="body-3 large-rounded-corners-element product-request-category">{props.category}</div>
            </div>
            

            <div className="row-flexbox-flex-start product-request-comments">
                <img src="/images/icons/icon-comments.png" alt="" />
                <span style={{opacity: props.numberOfComments === 0 && 0.5}}>{props.numberOfComments}</span>
            </div>
        </article>
    );
}

export default clickedProductRequest;