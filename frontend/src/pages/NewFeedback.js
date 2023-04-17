import {Link} from "react-router-dom";

const NewFeedback = props => {
    return (
        <main>
            <Link className="row-flexbox-flex-start back-link-feedback">
                <img src="images/icons/icon-arrow-left.png" alt="" />
                Go Back
            </Link>

            <section>
                <h1>Create New Feedback</h1>

                <h4>Feedback Title</h4>
                <p>Add a short, descriptive headline</p>
                <input type="text" />

                <h4>Category</h4>
                <p>Choose a category for your feedback</p>
                <input type="hidden" />

                <h4>Feedback Detail</h4>
                <p>Include any specific comments on what should be improved, added, etc.</p>
                <textarea />
            </section>
        </main>
    )
}

export default NewFeedback;