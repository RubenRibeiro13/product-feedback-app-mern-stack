const MenuItem = props => {
    return (
        <li role="menuitem" style={{borderBottom: !props.isLastItem && "1px solid rgb(58, 67, 116, 0.15)"}}>
            <button
                className="row-flexbox-space-between body-1"
                onMouseDown={props.selectOption}
                onKeyDown={props.selectOption}
                ref={props.text === props.selectedOption ? props.itemRef : null}
            >
                {props.text}
                {props.selectedOption === props.text && <img src="images/icons/icon-check.png" alt="" />}
            </button>
        </li>
    );
}

export default MenuItem;