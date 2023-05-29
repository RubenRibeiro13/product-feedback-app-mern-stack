import MenuItem from "../components/MenuItem";

const MenuFeedback = props => {
    return (
        <ul role="menubar">
            <li role="menuitem" className="relative-position-element">
                <button
                    className={
                        "body-2 row-flexbox-space-between small-rounded-corners-element menu-label-feedback " + props.menuOf + "-menu-label"
                    }
                    onKeyDown={props.changeIsMenuOpen}
                    ref={props.labelRef}
                >
                    {props.selectedOption}
                    <img
                        className={"menu-arrow-feedback " + props.menuOf + "-menu-arrow"}
                        src={props.isMenuOpen ? "images/icons/icon-arrow-up.png" : "images/icons/icon-arrow-down.png"}
                        alt=""
                    />
                </button>

                <ul
                    role="menu"
                    className="large-rounded-corners-element menu-options-list menu-options-list-feedback"
                    style={{display: !props.isMenuOpen && "none"}}
                >
                    {props.optionsList.map((string, index) => {
                        return <MenuItem
                            key={index}
                            isLastItem={index === props.optionsList.length - 1}
                            text={string}
                            selectedOption={props.selectedOption}
                            selectOption={props.selectOption}
                            itemRef={props.itemRef}
                        />
                    })}
                </ul>
            </li>
        </ul>
    )
}

export default MenuFeedback;