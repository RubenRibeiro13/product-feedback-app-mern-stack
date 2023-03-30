import iconCheck from "../images/icons/icon-check.png";

const SortingMethodsMenuItem = props => {
    return (
        <li role="menuitem" style={{borderBottom: props.text !== "Least Comments" && "1px solid rgb(58, 67, 116, 0.15)"}}>
            <button
                className="row-flexbox-space-between body-1"
                onClick={props.changeSortingMethod}
                onKeyDown={props.changeSortingMethod}
                ref={props.text === props.sortingMethod ? props.itemRef : null}
            >
                {props.text}
                {props.sortingMethod === props.text && <img src={iconCheck} alt="" />}
            </button>
        </li>
    );
}

export default SortingMethodsMenuItem;