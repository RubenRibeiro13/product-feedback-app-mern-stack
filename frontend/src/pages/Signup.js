import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import ImageInput from "../components/ImageInput";

const Signup = () => {
    /* Initialize variables */

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const imageRef = useRef();
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [imageDimensions, setImageDimensions] = useState([0, 0]);
    const [imagePosition, setImagePosition] = useState([0, 0]);
    const [croppingSide, setCroppingSide] = useState(0);
    const [croppingPosition, setCroppingPosition] = useState([0, 0, 0, 0]);
    const [isImageCropped, setIsImageCropped] = useState(false);

    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);

    const [username, setUsername] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    const [password, setPassword] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    /* Adjust cropping side and position */

    const handleCroppingClick = clickEvent => {
        clickEvent.preventDefault();

        let currentMousePosition = [clickEvent.pageX, clickEvent.pageY];
        let currentCroppingPosition = croppingPosition;

        const handleCroppingDrag = dragEvent => {
            const displacementX = dragEvent.pageX - currentMousePosition[0];
            const displacementY = dragEvent.pageY - currentMousePosition[1];
            currentMousePosition = [dragEvent.pageX, dragEvent.pageY];

            if (
                currentCroppingPosition[0] + displacementX >= 0 && currentCroppingPosition[2] - displacementX >= 0 &&
                currentCroppingPosition[1] + displacementY >= 0 && currentCroppingPosition[3] - displacementY >= 0
            ) {
                currentCroppingPosition = [
                    currentCroppingPosition[0] + displacementX,
                    currentCroppingPosition[1] + displacementY,
                    currentCroppingPosition[2] - displacementX,
                    currentCroppingPosition[3] - displacementY
                ];
            }

            setCroppingPosition(currentCroppingPosition);
            setImagePosition([-currentCroppingPosition[0], -currentCroppingPosition[1]]);
        }

        window.addEventListener("mousemove", handleCroppingDrag);
        window.addEventListener("mouseup", () => window.removeEventListener("mousemove", handleCroppingDrag));
    }

    const handleResizerClick = clickEvent => {
        clickEvent.preventDefault();

        let currentMousePosition = [clickEvent.pageX, clickEvent.pageY];
        let currentCroppingSide = croppingSide;
        let currentCroppingPosition = croppingPosition;

        const handleResizerDrag = dragEvent => {
            const displacementX = dragEvent.pageX - currentMousePosition[0];
            const displacementY = dragEvent.pageY - currentMousePosition[1];
            currentMousePosition = [dragEvent.pageX, dragEvent.pageY];

            if (clickEvent.target.classList.value.includes("top-left-resizer")) {
                if (
                    Math.abs(displacementX) > Math.abs(displacementY) &&
                    currentCroppingSide - displacementX > 16 &&
                    currentCroppingPosition[0] + displacementX > 0 && currentCroppingPosition[1] + displacementX > 0
                ) {
                    currentCroppingSide -= displacementX;
                    currentCroppingPosition = [
                        currentCroppingPosition[0] + displacementX,
                        currentCroppingPosition[1] + displacementX,
                        currentCroppingPosition[2],
                        currentCroppingPosition[3]
                    ];
                } else if (
                    Math.abs(displacementX) <= Math.abs(displacementY) &&
                    currentCroppingSide - displacementY > 16 &&
                    currentCroppingPosition[0] + displacementY > 0 && currentCroppingPosition[1] + displacementY > 0
                ) {
                    currentCroppingSide -= displacementY;
                    currentCroppingPosition = [
                        currentCroppingPosition[0] + displacementY,
                        currentCroppingPosition[1] + displacementY,
                        currentCroppingPosition[2],
                        currentCroppingPosition[3]
                    ];
                }
            } else if (clickEvent.target.classList.value.includes("top-right-resizer")) {
                if (
                    Math.abs(displacementX) > Math.abs(displacementY) &&
                    currentCroppingSide + displacementX > 16 &&
                    currentCroppingPosition[1] - displacementX > 0 && currentCroppingPosition[2] - displacementX > 0
                ) {
                    currentCroppingSide += displacementX;
                    currentCroppingPosition = [
                        currentCroppingPosition[0],
                        currentCroppingPosition[1] - displacementX,
                        currentCroppingPosition[2] - displacementX,
                        currentCroppingPosition[3]
                    ];
                } else if (
                    Math.abs(displacementX) <= Math.abs(displacementY) &&
                    currentCroppingSide - displacementY > 16 &&
                    currentCroppingPosition[1] + displacementY > 0 && currentCroppingPosition[2] + displacementY > 0
                ) {
                    currentCroppingSide -= displacementY;
                    currentCroppingPosition = [
                        currentCroppingPosition[0],
                        currentCroppingPosition[1] + displacementY,
                        currentCroppingPosition[2] + displacementY,
                        currentCroppingPosition[3]
                    ];
                }
            } else if (clickEvent.target.classList.value.includes("bottom-left-resizer")) {
                if (
                    Math.abs(displacementX) > Math.abs(displacementY) &&
                    currentCroppingSide - displacementX > 16 &&
                    currentCroppingPosition[0] + displacementX > 0 && currentCroppingPosition[3] + displacementX > 0
                ) {
                    currentCroppingSide -= displacementX;
                    currentCroppingPosition = [
                        currentCroppingPosition[0] + displacementX,
                        currentCroppingPosition[1],
                        currentCroppingPosition[2],
                        currentCroppingPosition[3] + displacementX
                    ];
                } else if (
                    Math.abs(displacementX) <= Math.abs(displacementY) &&
                    currentCroppingSide + displacementY > 16 &&
                    currentCroppingPosition[0] - displacementY > 0 && currentCroppingPosition[3] - displacementY > 0
                ) {
                    currentCroppingSide += displacementY;
                    currentCroppingPosition = [
                        currentCroppingPosition[0] - displacementY,
                        currentCroppingPosition[1],
                        currentCroppingPosition[2],
                        currentCroppingPosition[3] - displacementY
                    ];
                }
            } else if (clickEvent.target.classList.value.includes("bottom-right-resizer")) {
                if (
                    Math.abs(displacementX) > Math.abs(displacementY) &&
                    currentCroppingSide + displacementX > 16 &&
                    currentCroppingPosition[2] - displacementX > 0 && currentCroppingPosition[3] - displacementX > 0
                ) {
                    currentCroppingSide += displacementX;
                    currentCroppingPosition = [
                        currentCroppingPosition[0],
                        currentCroppingPosition[1],
                        currentCroppingPosition[2] - displacementX,
                        currentCroppingPosition[3] - displacementX
                    ];
                } else if (
                    Math.abs(displacementX) <= Math.abs(displacementY) &&
                    currentCroppingSide + displacementY > 16 &&
                    currentCroppingPosition[2] - displacementY > 0 && currentCroppingPosition[3] - displacementY > 0
                ) {
                    currentCroppingSide += displacementY;
                    currentCroppingPosition = [
                        currentCroppingPosition[0],
                        currentCroppingPosition[1],
                        currentCroppingPosition[2] - displacementY,
                        currentCroppingPosition[3] - displacementY
                    ];
                }
            }

            setCroppingSide(currentCroppingSide);
            setCroppingPosition(currentCroppingPosition);
            setImagePosition([-currentCroppingPosition[0], -currentCroppingPosition[1]]);
        }

        window.addEventListener("mousemove", handleResizerDrag);
        window.addEventListener("mouseup", () => window.removeEventListener("mousemove", handleResizerDrag));
    }

    /* Crop image */

    const cropImage = () => {
        setImageDimensions(imageDimensions.map(dimension => {return dimension * 200 / croppingSide}));
        setImagePosition(imagePosition.map(position => {return position * 200 / croppingSide}));
        setCroppingSide(200);
        setCroppingPosition([0, 0, 0, 0]);
        setIsImageCropped(true);
    }

    /* Change cropping */

    const changeCropping = () => {
        const naturalWidth = imageRef.current.naturalWidth;
        const naturalHeight = imageRef.current.naturalHeight;
        const currentWidth = naturalWidth / naturalHeight < 460 / 200 ? naturalWidth / naturalHeight * 200 : 460;
        const currentHeight = naturalHeight / naturalWidth < 200 / 460 ? naturalHeight / naturalWidth * 460 : 200;

        setImageDimensions([currentWidth, currentHeight]);
        setCroppingSide(Math.min(currentWidth, currentHeight));
        setCroppingPosition([
            currentWidth / 2 - Math.min(currentWidth, currentHeight) / 2,
            currentHeight / 2 - Math.min(currentWidth, currentHeight) / 2,
            currentWidth / 2 - Math.min(currentWidth, currentHeight) / 2,
            currentHeight / 2 - Math.min(currentWidth, currentHeight) / 2
        ]);
        setImagePosition([
            -(currentWidth / 2 - Math.min(currentWidth, currentHeight) / 2),
            -(currentHeight / 2 - Math.min(currentWidth, currentHeight) / 2)
        ]);
        setIsImageCropped(false);
    }

    /* Submit form */

    const handleSubmit = async event => {
        event.preventDefault();

        if ((image === "" || image !== "" && isImageCropped) && isNameValid && isUsernameValid && isPasswordValid) {
            /* const imageBlob = await fetch(imageFile).then(res => res.blob()); */
            const randomR = Math.round(Math.random() * 255);
            const randomG = Math.round(Math.random() * 255);
            const randomB = Math.round(Math.random() * 255);

            /* const userData = new FormData();
            userData.append("image", image !== "" ? imageBlob : "");
            userData.append("imageColor", "rgb(" + [randomR, randomG, randomB] + ")");
            userData.append("imageWidth", image !== "" ? imageDimensions[0] / croppingSide : 1);
            userData.append("imageLeft", image !== "" ? imagePosition[0] / croppingSide : 0);
            userData.append("imageTop", image !== "" ? imagePosition[1] / croppingSide : 0);
            userData.append("name", name);
            userData.append("username", username);
            userData.append("password", password); */

            /* let user = {}; */
            /* for (const value of userData.values()) {
                console.log(value.toString());
            } */
            /* console.log(JSON.stringify(Object.fromEntries(userData))); */

            /* const user = '{' +
                '"image": ' + (image !== "" ? imageBlob : '""') + ', ' +
                '"imageColor": "rgb(' + [randomR, randomG, randomB] + ')", ' +
                '"imageWidth": ' + (image !== "" ? imageDimensions[0] / croppingSide : 1) + ', ' +
                '"imageLeft": ' + (image !== "" ? imagePosition[0] / croppingSide : 0) + ', ' +
                '"imageTop": ' + (image !== "" ? imagePosition[1] / croppingSide : 0) + ', ' +
                '"name": "' + name + '", ' +
                '"username": "' + username + '", ' +
                '"password": "' + password + '"' +
            '}'; */

            const user = {
                image: imageFile,
                imageColor: "rgb(" + [randomR, randomG, randomB] + ")",
                imageWidth: image !== "" ? imageDimensions[0] / croppingSide : 1,
                imageLeft: image !== "" ? imagePosition[0] / croppingSide : 0,
                imageTop: image !== "" ? imagePosition[1] / croppingSide : 0,
                name,
                username,
                password
            };

            /* console.log(userData.entries()); */

            /* const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:4000/user/signup');
            xhr.send(userData); */

            const response = await fetch("http://localhost:4000/user/signup", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {"Content-Type": "application/json"}
            });
            const json = await response.json();
            /* console.log(await response.json()); */

            localStorage.setItem("user", JSON.stringify(json));
            dispatch({type: "login", payload: json});
            navigate(-1);
        }
    }

    /* Render signup page */

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
                            <ImageInput
                                imageRef={imageRef}
                                image={image}
                                setImage={setImage}
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                imageDimensions={imageDimensions}
                                imagePosition={imagePosition}
                                croppingSide={croppingSide}
                                croppingPosition={croppingPosition}
                                isImageCropped={isImageCropped}
                                setIsImageCropped={setIsImageCropped}
                                handleCroppingClick={handleCroppingClick}
                                handleResizerClick={handleResizerClick}
                                cropImage={cropImage}
                                changeCropping={changeCropping}
                            />
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