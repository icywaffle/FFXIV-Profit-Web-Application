import React from "react"

function MaterialRecipeComponent(props) {
    const baseinfo = props.baseinfo
    const matinfo = props.matinfo
    const materialList = baseinfo.Recipes.IngredientNames.map((material, index) => {
        // If there is no material, just return nothing
        if (material === "") {
            return ""
        }

        // For each material, we want to make it an accordion content.
        // So we would need to place all the information here
        const ingredientID = baseinfo.Recipes.IngredientID[index]

        const marketInfo = (matinfo.Prices[ingredientID] === undefined)
            ? ""
            : (<ul className="uk-list">
                <form onSubmit={props.handleSubmit}>
                    <input
                        type="text"
                        name={"MarketIngredientPrice"}
                        value={props.MarketIngredientPrice[index]}
                        index={index}
                        placeholder="Current Market Price"
                        onChange={props.handleIngredientPriceChange}
                    />
                    <input
                        type="text"
                        name={"MarketAmount"}
                        value={props.MarketAmount[index]}
                        index={index}
                        placeholder="Current Market Price"
                        onChange={props.handleAmountChange}
                    />
                </form>
            </ul>
            )

        return (
            <li>
                <a className="uk-accordion-title" href="">
                    <img
                        className="itemicon"
                        src={"/icon/0" + baseinfo.Recipes.IngredientIconID[index].toString().substr(0, 2) + "000/0" + baseinfo.Recipes.IngredientIconID[index].toString() + ".png"}
                    />
                    <span> {material} </span>
                    <span className="uk-text-meta">
                        x{baseinfo.Recipes.IngredientAmounts[index]}
                    </span>
                </a>
                <div className="uk-accordion-content" >
                    {marketInfo}
                </div>
            </li>
        )
    })
    return (
        <section>
            <div className="uk-section uk-background-secondary uk-animation-slide-left uk-light">
                <div className="uk-container">
                    <div className="uk-width-4-5 uk-float-right">
                        <h2>Materials</h2>
                        <ul className="uk-list" uk-accordion="multiple: true">
                            {materialList}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MaterialRecipeComponent