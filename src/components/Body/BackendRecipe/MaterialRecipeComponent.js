import React, { useState, useEffect } from "react"
import BackendRecipe from "./BackendRecipe"

function MaterialRecipeComponent(props) {
    const [ingredientPrice, setIngredientPrice] = useState(props.MarketIngredientPrice)
    // Every time we change the ingredient price, reflect the change
    useEffect(() => {
        setIngredientPrice(props.MarketIngredientPrice)
    }, [props.MarketIngredientPrice])
    const baserecipe = props.baserecipe
    const matinfo = props.matinfo
    const materialList = baserecipe.IngredientNames.map((material, index) => {
        // If there is no material, just return nothing
        if (material === "") {
            return null
        }

        const matrecipe = baserecipe.IngredientRecipes
        const materialRecipe = (matrecipe[parseInt(index)] === null)
            ? null
            : <div>
                <ul uk-accordion="multiple: true">
                    <li>
                        <a className="uk-accordion-title" href="#">Craftable</a>
                        <div className="uk-accordion-content">
                            <BackendRecipe MainRecipe={matinfo[matrecipe[parseInt(index)][0]]} InnerRecipes={matinfo} />
                        </div>
                    </li>
                </ul>
            </div>

        const marketInfo = (matinfo)
            ? (<ul className="uk-list">
                <li>
                    <form
                        className="uk-form-width-small"
                        onSubmit={props.handleSubmit}
                    >
                        Market Price:
                <input
                            className="uk-input"
                            type="text"
                            name={index}
                            value={ingredientPrice[parseInt(index)]}
                            placeholder="Current Market Price"
                            onChange={props.handleIngredientPriceChange}
                        />
                        Market Amount:
                <input
                            className="uk-input"
                            type="text"
                            name={index}
                            value={props.MarketIngredientAmount[parseInt(index)]}
                            placeholder="Current Market Price"
                            onChange={props.handleAmountChange}
                        />
                    </form>
                </li>
                <li>
                    {materialRecipe}
                </li>
            </ul>
            )
            : null
        return (
            <li>
                <a className="uk-accordion-title" href="">
                    <img
                        className="itemicon"
                        src={"/icon/0" + baserecipe.IngredientIconID[parseInt(index)].toString().substr(0, 2) + "000/0" + baserecipe.IngredientIconID[parseInt(index)].toString() + ".png"}
                    />
                    <span> {material} </span>
                    <span className="uk-text-meta">
                        x{baserecipe.IngredientAmounts[parseInt(index)]}
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