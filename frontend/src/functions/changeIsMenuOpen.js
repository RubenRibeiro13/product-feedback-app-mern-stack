const changeIsMenuOpen = (event, menuOf, isMenuOpen, setIsMenuOpen, setFocusedElement) => {
    let menuFlag = false;
    event.target.classList.forEach(targetClass => {
        if ([
            menuOf + "-menu-label",
            menuOf + "-menu-arrow"
        ].includes(targetClass)) {
            menuFlag = true;
        }
    });

    if (menuFlag) {
        if (event.type === "mousedown" || (event.type === "keydown" && event.key === "Enter")) {
            setIsMenuOpen(!isMenuOpen);
        }

        if (!isMenuOpen && event.type === "keydown" && event.key === "Enter") {
            setFocusedElement(menuOf + "MenuItem");
        }
    } else {
        setIsMenuOpen(false);
    }
}

export default changeIsMenuOpen;