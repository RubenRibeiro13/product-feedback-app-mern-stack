import CategoryButton from "./CategoryButton";

const CategorySelector = props => {
    return (
        <nav className="category-selector large-rounded-corners-element">
            {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((string, index) => {
                return (
                    <CategoryButton
                        key={index}
                        text={string}
                        category={props.category}
                        changeCategory={props.changeCategory}
                    />
                )
            })}
        </nav>
    )
}

export default CategorySelector;