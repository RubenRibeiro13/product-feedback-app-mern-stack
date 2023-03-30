import ClickedProductRequestComment from "./ClickedProductRequestComment";

const ClickedProductRequestCommentsSection = props => {
    return (
        <section className="large-rounded-corners-element clicked-product-request-comments-section">
            <h3>{props.numberOfComments} Comments</h3>

            <section>
                {props.comments.map((comment, index) => {
                    return <ClickedProductRequestComment
                        key={comment._id}
                        commentImage={comment.user.image.replace("./assets/user-images", "/images/users")}
                        commentName={comment.user.name}
                        commentUsername={comment.user.username}
                        commentContent={comment.content}
                        replies={comment.replies.sort((a, b) => {return a.id - b.id})}
                        isLastComment={index === props.comments.length - 1}
                    />
                })}
            </section>
        </section>
    )
}

export default ClickedProductRequestCommentsSection;