const MenuFeedback = props => {
    return (
        <ul role="menubar">
            <li role="menuitem" className="relative-position-element">
                <button
                    className="row-flexbox-space-between menu-label-feedback"
                >
                    {props.selectedOption}
                    <img
                        className="menu-arrow-feedback"
                        src={props.isMenuOpen ? "images/icons/icon-arrow-up.png" : "images/icons/icon-arrow-down.png"}
                        alt=""
                    />
                </button>

                <ul
                    role="menu"
                    className="large-rounded-corners-element menu-options-list-feedback"
                    style={{display: !props.isMenuOpen && "none"}}
                >
                    {props.optionsList.map((string, index) => {
                        return <MenuItem
                            key={index}
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