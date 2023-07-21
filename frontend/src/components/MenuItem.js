import {useState} from "react";

const MenuItem = props => {
    const [isItemFocused, setIsItemFocused] = useState(false);

    return (
        <li role="menuitem" style={{borderBottom: !props.isLastItem && "1px solid rgb(58, 67, 116, 0.15)"}}>
            <button
                type="button"
                className="row-flexbox-space-between body-1"
                style={{
                    borderRadius: props.isFirstItem ? "10px 10px 0 0" : (props.isLastItem && "0 0 10px 10px"),
                    outline: isItemFocused && "1px solid #4661E6"
                }}
                onFocus={() => setIsItemFocused(true)}
                onMouseDown={props.selectOption}
                onKeyDown={props.selectOption}
                onBlur={() => setIsItemFocused(false)}
                ref={props.text === props.selectedOption ? props.itemRef : null}
            >
                {props.text}
                {props.selectedOption === props.text && <img src="/images/icons/icon-check.png" alt="" />}
            </button>
        </li>
    );
}

export default MenuItem;