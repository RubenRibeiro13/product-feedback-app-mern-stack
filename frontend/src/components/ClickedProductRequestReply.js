import {useState, useRef} from "react";

const ClickedProductRequestReply = props => {
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

    /* Render clicked product request reply component */

    return (
        <article className="reply-container">
            <img src={props.replyImage} alt="" className="user-image" ref={props.isLastReply ? props.lastReplyUserImageRef : null} />

            <div className="row-flexbox-space-between">
                <div>
                    <h4>{props.replyName}</h4>
                    <p className="user-username">{"@" + props.replyUsername}</p>
                </div>

                <button
                    className="body-3 reply-button"
                    id={"reply-button-" + props.replyId}
                    onClick={props.updateClickedReplyButton}
                >
                    Reply
                </button>
            </div>

            <div className="content-and-reply-draft-container">
                <p className="body-2">
                    <span className="replying-to">{"@" + props.replyingTo} </span>
                    {props.replyContent}
                </p>

                <div
                    className="reply-draft-container"
                    style={{display: "reply-button-" + props.replyId !== props.clickedReplyButton && "none"}}
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
        </article>
    )
}

export default ClickedProductRequestReply;