import {useState, useEffect, useRef} from "react";
import ClickedProductRequestReply from "./ClickedProductRequestReply";

const ClickedProductRequestComment = props => {
    const commentUserImage = useRef();
    const lastReplyUserImage = useRef();
    const [verticalRuleHeight, setVerticalRuleHeight] = useState(0);

    useEffect(() => {
        const adjustVerticalRuleHeight = () => {
            if (props.replies.length !== 0) {
                const lastReplyUserImageTop = lastReplyUserImage.current.getBoundingClientRect().top;
                const commentUserImageTop = commentUserImage.current.getBoundingClientRect().top;
    
                setVerticalRuleHeight(lastReplyUserImageTop - commentUserImageTop - 45);
            }
        }

        adjustVerticalRuleHeight();
        window.addEventListener("resize", adjustVerticalRuleHeight);
        return () => {window.removeEventListener("resize", adjustVerticalRuleHeight)}
    });

    return (
        <article className="relative-position-element">
            <div className="comment-container" style={{borderBottom: !props.isLastComment && "1px solid rgb(140, 146, 179, 0.25)"}}>
                <img src={props.commentImage} alt="" className="user-image" ref={commentUserImage} />

                <div className="row-flexbox-space-between">
                    <div>
                        <h4>{props.commentName}</h4>
                        <p className="user-username">{"@" + props.commentUsername}</p>
                    </div>

                    <button className="body-3 reply-button">Reply</button>
                </div>

                <p className="body-2 content-paragraph">{props.commentContent}</p>
            </div>

            <section className="column-flexbox clicked-product-request-replies-section">
                {props.replies.map((reply, index) => {
                    return <ClickedProductRequestReply
                        key={reply._id}
                        replyImage={reply.user.image.replace("./assets/user-images", "/images/users")}
                        replyName={reply.user.name}
                        replyUsername={reply.user.username}
                        replyingTo={reply.replyingTo}
                        replyContent={reply.content}
                        isLastReply={index === props.replies.length - 1}
                        lastReplyUserImage={lastReplyUserImage}
                    />
                })}
            </section>

            <div className="vertical-rule" style={{height: verticalRuleHeight}} />
        </article>
    )
}

export default ClickedProductRequestComment;