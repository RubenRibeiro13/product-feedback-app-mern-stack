const selectOption = (event, selectedOption, setSelectedOption, setIsMenuOpen, optionsList, setFocusedElement, menuOf) => {
    event.preventDefault();

    if (event.type === "mousedown") {
        setSelectedOption(event.target.innerText);
    } else if (event.type === "keydown") {
        if (event.key === "Enter" || event.key === "Tab") {
            setIsMenuOpen(false);
            setFocusedElement(menuOf + "MenuLabel");
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            const selectedOptionIndex = optionsList.findIndex(option => {return option === selectedOption});

            if (event.key === "ArrowUp" && selectedOptionIndex !== 0) {
                setSelectedOption(optionsList[selectedOptionIndex - 1]);
            } else if (event.key === "ArrowDown" && selectedOptionIndex !== optionsList.length - 1) {
                setSelectedOption(optionsList[selectedOptionIndex + 1]);
            }

            setFocusedElement(menuOf + "MenuItem");
        }
    }
}

export default selectOption;