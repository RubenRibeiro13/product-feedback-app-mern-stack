const ClickedProductRequestReply = props => {
    return (
        <article className="reply-container">
            <img src={props.replyImage} alt="" className="user-image" ref={props.isLastReply ? props.lastReplyUserImage : null} />

            <div className="row-flexbox-space-between">
                <div>
                    <h4>{props.replyName}</h4>
                    <p className="user-username">{"@" + props.replyUsername}</p>
                </div>

                <button className="body-3 reply-button">Reply</button>
            </div>

            <p className="body-2 content-paragraph">
                <span className="replying-to">{"@" + props.replyingTo} </span>
                {props.replyContent}
            </p>
        </article>
    )
}

export default ClickedProductRequestReply;