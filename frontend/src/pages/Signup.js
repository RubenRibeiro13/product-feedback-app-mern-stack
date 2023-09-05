import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

const Signup = () => {
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");

    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);

    const [username, setUsername] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleSubmit = async event => {
        event.preventDefault();

        if (isNameValid && isUsernameValid && isPasswordValid) {
            const user = {image: imageFile, name, username, password};

            const response = await fetch("http://localhost:4000/user/signup", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {"Content-Type": "application/json"}
            });
            const json = await response.json();

            localStorage.setItem("user", JSON.stringify(json));
            dispatch({type: "login", payload: json});
            navigate(-1);
        }
    }

    return (
        <main className="signup-page">
            <div style={{width: "min(100%, 540px)"}}>
                <button
                    onClick={() => navigate(-1)}
                    className="row-flexbox-flex-start back-link-feedback"
                    style={{width: "max-content"}}
                >
                    <img src="images/icons/icon-arrow-left.png" alt="" />
                    Go Back
                </button>

                <form
                    className="large-rounded-corners-element signup-user-section"
                    onSubmit={handleSubmit}
                >
                    <h1>Sign Up User</h1>

                    <div className="column-flexbox inputs-container" style={{marginTop: "min(6vw, 40px)"}}>
                        <div>
                            <h4>Image (optional)</h4>
                            <p className="input-label">Choose a profile picture</p>
                            <div className="relative-position-element">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    value={image}
                                    title=""
                                    onChange={event => {
                                        setImage(event.target.value);

                                        if (event.target.value === "") {
                                            setImageFile("");
                                        } else {
                                            const fileReader = new FileReader();
                                            fileReader.readAsDataURL(event.target.files[0]);
                                            fileReader.onload = () => {setImageFile(fileReader.result)};
                                        }
                                    }}
                                />

                                {imageFile === "" && <div className="drag-n-drop-container">
                                    <p className="body-1">Drag&Drop image here</p>
                                    <p className="body-2">or</p>
                                    <p className="body-1">Click to browse images</p>
                                </div>}

                                {imageFile !== "" && <div className="profile-picture-container">
                                    <img className="profile-picture" src={imageFile} alt="" />
                                </div>}
                            </div>
                        </div>

                        <div>
                            <h4>Name</h4>
                            <p className="input-label">First and last name (capitalized and separated by a space)</p>
                            <input
                                type="text"
                                value={name}
                                placeholder="e.g. Ruben Ribeiro"
                                className="body-2 small-rounded-corners-element"
                                style={{
                                    outline: isNameValid ? (isNameFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsNameFocused(true)}}
                                onBlur={() => {setIsNameFocused(false)}}
                                onChange={event => {
                                    setName(event.target.value);
                                    setIsNameValid(/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(event.target.value));
                                }}
                            />
                            <p className="error-message">{!isNameValid && "Invalid name"}</p>
                        </div>

                        <div>
                            <h4>Username</h4>
                            <div className="input-label" style={{color: "#647196"}}>
                                Add a username. Must:
                                <ul style={{listStyleType: "disc", paddingLeft: "40px"}}>
                                    <li>Contain only lowercase letters, digits, underscores and dots.</li>
                                    <li>Begin with at least one letter.</li>
                                    <li>End with a letter or a sequence of digits which may or may not follow a dot.</li>
                                    <li>Not contain digits anywhere else.</li>
                                    <li>Not contain two or more underscores or dots in a row.</li>
                                </ul>
                            </div>
                            <input
                                type="text"
                                value={username}
                                placeholder="e.g. ruben.fm_ribeiro.13"
                                className="body-2 small-rounded-corners-element"
                                style={{
                                    outline: isUsernameValid ? (isUsernameFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsUsernameFocused(true)}}
                                onBlur={() => {setIsUsernameFocused(false)}}
                                onChange={event => {
                                    setUsername(event.target.value);
                                    setIsUsernameValid(/^[a-z]+([_.][a-z]+)*([0-9]*|[.][0-9]+)$/.test(event.target.value));
                                }}
                            />
                            <p className="error-message">{!isUsernameValid && "Invalid username"}</p>
                        </div>

                        <div>
                            <h4>Password</h4>
                            <div className="input-label" style={{color: "#647196"}}>
                                Password must include at least:
                                <ul style={{listStyleType: "disc", paddingLeft: "40px"}}>
                                    <li>8 characters</li>
                                    <li>1 lowercase letter</li>
                                    <li>1 uppercase letter</li>
                                    <li>1 digit</li>
                                    <li>1 symbol</li>
                                </ul>
                            </div>
                            <input
                                type="password"
                                value={password}
                                className="body-2 small-rounded-corners-element"
                                style={{
                                    fontSize: "21px",
                                    outline: isPasswordValid ? (isPasswordFocused && "1px solid #4661E6") : "1px solid #D73737"
                                }}
                                onFocus={() => {setIsPasswordFocused(true)}}
                                onBlur={() => {setIsPasswordFocused(false)}}
                                onChange={event => {
                                    setPassword(event.target.value);
                                    setIsPasswordValid(
                                        /.{8}/.test(event.target.value) &&
                                        /[a-z]/.test(event.target.value) &&
                                        /[A-Z]/.test(event.target.value) &&
                                        /[0-9]/.test(event.target.value) &&
                                        /[^a-zA-Z0-9]/.test(event.target.value)
                                    );
                                }}
                            />
                            <p className="error-message">{!isPasswordValid && "Invalid password"}</p>
                        </div>
                    </div>

                    <div className="row-flexbox-flex-start" style={{justifyContent: "flex-end", gap: "15px"}}>
                        <button
                            type="button"
                            className="large-rounded-corners-element colored-button colored-button-3"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button className="large-rounded-corners-element colored-button colored-button-1">Sign Up</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Signup;