/* import {useState} from "react"; */

const ImageInput = props => {
    /* const [image, setImage] = useState(""); */

    /* const readImageFile = readEvent => {
        const chunkSize = 64 * 1024;
        let offset = 0;

        const handleImageChunk = handleEvent => {
            offset += chunkSize;
            console.log(handleEvent.target.result);

            if (offset < readEvent.target.files[0].size) {
                readImageChunk(offset, );
            }
        }

        const readImageChunk = (offset, file) => {
            const fr = new FileReader();
            const imageChunk = file.slice(offset, offset + chunkSize);
            fr.readAsDataURL(imageChunk);
            fr.onload = handleImageChunk;
        }
    } */

    return (
        <div
            className="row-flexbox-flex-start relative-position-element"
            style={{justifyContent: "center"}}
        >
            <input
                type="file"
                accept="image/png, image/jpeg"
                value={props.image}
                title=""
                style={{
                    width: props.image === "" ? "200px" : 0,
                    height: props.image === "" ? "200px" : 0
                }}
                onChange={event => {
                    props.setImage(event.target.value);
                    props.setImageFile(URL.createObjectURL(event.target.files[0]));

                    // if (event.target.value === "") {
                    //     props.setImageFile("");
                    // } else {
                    //     const fileReader = new FileReader();
                    //     fileReader.readAsDataURL(event.target.files[0]);
                    //     fileReader.onload = () => {props.setImageFile(fileReader.result)};
                    // }
                }}
            />

            {props.image === "" && <div className="column-flexbox drag-n-drop-zone">
                <p className="body-1">Drag&Drop image here</p>
                <p className="body-2">or</p>
                <p className="body-1">Click to browse images</p>
            </div>}

            {props.image !== "" && <div className="column-flexbox" style={{alignItems: "center", gap: "15px"}}>
                <div
                    className="relative-position-element"
                    style={{
                        width: !props.isImageCropped ? props.imageDimensions[0] : 200,
                        height: !props.isImageCropped ? props.imageDimensions[1] : 200
                    }}
                >
                    <div
                        className="cropping-square"
                        style={{
                            outline: !props.isImageCropped && "medium solid #D73737",
                            width: props.croppingSide,
                            height: props.croppingSide,
                            left: props.croppingPosition[0],
                            top: props.croppingPosition[1],
                            right: props.croppingPosition[2],
                            bottom: props.croppingPosition[3],
                            pointerEvents: props.isImageCropped && "none"
                        }}
                        onMouseDown={event => {
                            if (event.target.classList.value.includes("resizer")) {
                                props.handleResizerClick(event);
                            } else {
                                props.handleCroppingClick(event);
                            }
                        }}
                    >
                        <div
                            className="cropping-circle"
                            style={{
                                outline: !props.isImageCropped ? "medium solid #D73737" : "medium dashed #4661E6",
                                overflow: props.isImageCropped && "hidden"
                            }}
                        >
                            <img
                                src={props.imageFile}
                                alt=""
                                style={{
                                    width: props.imageDimensions[0],
                                    height: props.imageDimensions[1],
                                    marginLeft: props.imagePosition[0],
                                    marginTop: props.imagePosition[1],
                                    pointerEvents: "none"
                                }}
                                onLoad={props.changeCropping}
                                ref={props.imageRef}
                            />
                        </div>

                        <div
                            className="resizer top-left-resizer"
                            style={{outline: !props.isImageCropped && "medium solid #D73737"}}
                        />
                        <div
                            className="resizer top-right-resizer"
                            style={{outline: !props.isImageCropped && "medium solid #D73737"}}
                        />
                        <div
                            className="resizer bottom-left-resizer"
                            style={{outline: !props.isImageCropped && "medium solid #D73737"}}
                        />
                        <div
                            className="resizer bottom-right-resizer"
                            style={{outline: !props.isImageCropped && "medium solid #D73737"}}
                        />
                    </div>
                </div>
                                    
                <div className="column-flexbox" style={{alignItems: "center", gap: "15px"}}>
                    <div style={{textAlign: "center"}}>
                        <button
                            type="button"
                            className="large-rounded-corners-element colored-button colored-button-1"
                            style={{width: "170px", display: props.isImageCropped && "none"}}
                            onClick={props.cropImage}
                        >
                            Crop Image
                        </button>
                        <p className="error-message">{props.image !== "" && !props.isImageCropped && "Image must be cropped"}</p>
                    </div>

                    <button
                        type="button"
                        className="large-rounded-corners-element colored-button colored-button-3"
                        style={{width: "170px", display: !props.isImageCropped && "none"}}
                        onClick={props.changeCropping}
                    >
                        Change Cropping
                    </button>

                    <button
                        type="button"
                        className="large-rounded-corners-element colored-button colored-button-4"
                        style={{width: "170px"}}
                        onClick={() => {
                            props.setImage("");
                            props.setImageFile("");
                            props.setIsImageCropped(false);
                        }}
                    >
                        Delete Image
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default ImageInput;