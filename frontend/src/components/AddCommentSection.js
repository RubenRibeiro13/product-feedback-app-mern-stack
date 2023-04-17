import {useState, useRef} from "react";

const AddCommentSection = () => {
    const textareaRef = useRef();
    const [isCommentFocused, setIsCommentFocused] = useState(false);
    const [charactersLeft, setCharactersLeft] = useState(250);
    const [isCommentValid, setIsCommentValid] = useState(true);

    const handleChange = () => {
        if (textareaRef.current.value.length <= 250) {
            setCharactersLeft(250 - textareaRef.current.value.length);
        } else {
            textareaRef.current.value = textareaRef.current.value.slice(0, 250);
        }

        setIsCommentValid(true);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (textareaRef.current.value === "") {
            setIsCommentValid(false);
        }
    }

    return (
        <section className="large-rounded-corners-element add-comment-section">
            <h3>Add Comment</h3>

            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Type your comment here"
                    className="body-2 small-rounded-corners-element comment-draft"
                    style={{
                        outline: isCommentValid ? (isCommentFocused && "1px solid #4661E6") : "1px solid #D73737"
                    }}
                    onFocus={() => {setIsCommentFocused(true)}}
                    onBlur={() => {setIsCommentFocused(false)}}
                    onChange={handleChange}
                    ref={textareaRef}
                />
                <p className="error-message">{!isCommentValid && "Can't be empty"}</p>

                <div className="row-flexbox-space-between" style={{marginTop: "15px"}}>
                    <p className="body-2">{charactersLeft} Characters left</p>
                    <button className="large-rounded-corners-element colored-button colored-button-1">Post Comment</button>
                </div>
            </form>
        </section>
    )
}

export default AddCommentSection;