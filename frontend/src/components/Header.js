import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="row-flexbox-flex-start">
            <Link to="/signup" className="large-rounded-corners-element colored-button colored-button-2">Sign Up</Link>
            <Link to="/login" className="large-rounded-corners-element colored-button colored-button-3">Log In</Link>
        </header>
    )
}

export default Header;