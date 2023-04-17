import {useState, useEffect, useRef} from "react";
import ClickedProductRequestReply from "./ClickedProductRequestReply";

const ClickedProductRequestComment = props => {
    /* Initialize reply-related variables */

    const [isReplyValid, setIsReplyValid] = useState(true);
    const [isReplyFocused, setIsReplyFocused] = useState(false);

    /* Handle "Post Reply" button click */

    const textareaRef = useRef();
    const handlePostReplyButtonClick = () => {
        if (textareaRef.current.value === "") {
            setIsReplyValid(false);
        }
    }

    /* Adjust vertical rule height */

    const commentUserImageRef = useRef();
    const lastReplyUserImageRef = useRef();
    const [verticalRuleHeight, setVerticalRuleHeight] = useState(0);

    useEffect(() => {
        const adjustVerticalRuleHeight = () => {
            if (props.replies.length !== 0) {
                const lastReplyUserImageTop = lastReplyUserImageRef.current.getBoundingClientRect().top;
                const commentUserImageTop = commentUserImageRef.current.getBoundingClientRect().top;
    
                setVerticalRuleHeight(lastReplyUserImageTop - commentUserImageTop - 45);
            }
        }

        adjustVerticalRuleHeight();
        window.addEventListener("resize", adjustVerticalRuleHeight);
        return () => {window.removeEventListener("resize", adjustVerticalRuleHeight)}
    });

    /* Render clicked product request comment component */

    return (
        <article
            className="relative-position-element"
            style={{
                padding: !props.isLastComment ? "min(6vw, 30px) 0" : "min(6vw, 30px) 0 0",
                borderBottom: !props.isLastComment && "1px solid rgb(140, 146, 179, 0.25)"
            }}
        >
            <div className="comment-container" style={{paddingBottom: props.replies.length !== 0 && "min(6vw, 30px)"}}>
                <img src={props.commentImage} alt="" className="user-image" ref={commentUserImageRef} />

                <div className="row-flexbox-space-between">
                    <div>
                        <h4>{props.commentName}</h4>
                        <p className="user-username">{"@" + props.commentUsername}</p>
                    </div>

                    <button
                        className="body-3 reply-button"
                        id={"reply-button-" + props.commentId}
                        onClick={props.updateClickedReplyButton}
                    >
                        Reply
                    </button>
                </div>

                <div className="content-and-reply-draft-container">
                    <p className="body-2">{props.commentContent}</p>

                    <div
                        className="reply-draft-container"
                        style={{display: "reply-button-" + props.commentId !== props.clickedReplyButton && "none"}}
                    >
                        <div>
                            <textarea
                                placeholder="Type your reply here"
                                className="body-2 small-rounded-corners-element reply-draft"
                                style={{
                                    outline: isReplyValid ? (isReplyFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsReplyFocused(true)}}
                                onBlur={() => {setIsReplyFocused(false)}}
                                onChange={() => {setIsReplyValid(true)}}
                                ref={textareaRef}
                            />

                            <p className="error-message">{!isReplyValid && "Can't be empty"}</p>
                        </div>

                        <button
                            className="large-rounded-corners-element colored-button colored-button-1"
                            onClick={handlePostReplyButtonClick}
                        >
                            Post Reply
                        </button>
                    </div>
                </div>
            </div>

            <section className="column-flexbox clicked-product-request-replies-section">
                {props.replies.map((reply, index) => {
                    return <ClickedProductRequestReply
                        key={reply._id}
                        replyId={reply._id}
                        replyImage={reply.user.image.replace("./assets/user-images", "/images/users")}
                        replyName={reply.user.name}
                        replyUsername={reply.user.username}
                        replyingTo={reply.replyingTo}
                        replyContent={reply.content}
                        isLastReply={index === props.replies.length - 1}
                        lastReplyUserImageRef={lastReplyUserImageRef}
                        clickedReplyButton={props.clickedReplyButton}
                        updateClickedReplyButton={props.updateClickedReplyButton}
                    />
                })}
            </section>

            <div className="vertical-rule" style={{height: verticalRuleHeight}} />
        </article>
    )
}

export default ClickedProductRequestComment;