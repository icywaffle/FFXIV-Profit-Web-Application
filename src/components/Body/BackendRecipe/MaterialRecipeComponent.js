import React from "react"
import BackendRecipe from "./BackendRecipe"

function MaterialRecipeComponent(props) {
    const baserecipe = props.baserecipe
    const matinfo = props.matinfo
    const materialList = baserecipe.IngredientNames.map((material, index) => {
        // If there is no material, just return nothing
        if (material === "") {
            return null
        }

        const matrecipe = baserecipe.IngredientRecipes
        const materialRecipe = (matrecipe[index] === null)
            ? null
            : <div>
                <ul className="uk-list">
                    <li>
                        <h3>Crafted Material Info</h3>
                    </li>
                    <li>
                        <BackendRecipe MainRecipe={matinfo[matrecipe[index][0]]} InnerRecipes={matinfo} />
                    </li>
                </ul>


            </div>

        const marketInfo = (matinfo === undefined)
            ? null
            : (<ul className="uk-list">
                <form
                    className="uk-form-width-small"
                    onSubmit={props.handleSubmit}
                >
                    Market Price:
                    <input
                        className="uk-input"
                        type="text"
                        name={index}
                        value={props.MarketIngredientPrice[index]}
                        placeholder="Current Market Price"
                        onChange={props.handleIngredientPriceChange}
                    />
                    Market Amount:
                    <input
                        className="uk-input"
                        type="text"
                        name={index}
                        value={props.MarketAmount[index]}
                        placeholder="Current Market Price"
                        onChange={props.handleAmountChange}
                    />
                </form>
                {materialRecipe}
            </ul>
            )

        return (
            <li>
                <a className="uk-accordion-title" href="">
                    <img
                        className="itemicon"
                        src={"/icon/0" + baserecipe.IngredientIconID[index].toString().substr(0, 2) + "000/0" + baserecipe.IngredientIconID[index].toString() + ".png"}
                    />
                    <span> {material} </span>
                    <span className="uk-text-meta">
                        x{baserecipe.IngredientAmounts[index]}
                    </span>
                </a>
                <div className="uk-accordion-content" >
                    {marketInfo}
                </div>
            </li>
        )
    })
    return (
        <div className="uk-section uk-padding-small uk-background-secondary uk-light">
            <div className="uk-container">
                <div className="uk-width-4-5 uk-float-right">
                    <h2>Materials</h2>
                    <ul className="uk-list" uk-accordion="multiple: true">
                        {materialList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MaterialRecipeComponent