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

        const materialRecipe = []
        const matrecipe = baserecipe.IngredientRecipes
        if (matrecipe[parseInt(index)] !== null) {
            for (var i = 0; i < matrecipe[parseInt(index)].length; i++) {
                materialRecipe.push(
                    <ul uk-accordion="multiple: true">
                        <li>
                            <a class="uk-accordion-title" href="#">
                                <img
                                    className="crafticon"
                                    src={"/icon/060000/06011" + (matinfo[matrecipe[parseInt(index)][i]].CraftTypeTargetID + 2).toString() + ".png"}
                                />
                                {" Lv.  " + matinfo[matrecipe[parseInt(index)][i]].RecipeLevelTable.ClassJobLevel}
                                {"★".repeat(matinfo[matrecipe[parseInt(index)][i]].RecipeLevelTable.Stars)}
                                <br></br>

                                {" " + material} Recipe
                        </a>
                            <div class="uk-accordion-content">
                                <BackendRecipe MainRecipe={matinfo[matrecipe[parseInt(index)][i]]} InnerRecipes={matinfo} />
                            </div>
                        </li>
                    </ul>
                )
            }
        }

        const marketInfo = (matinfo)
            ? (
                <React.Fragment>
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
                        </form>
                    </li>
                </React.Fragment>
            )
            : null


        return (
            <React.Fragment>
                <ul className="uk-list" uk-accordion="multiple: true">
                    <li>
                        <img
                            className="itemicon"
                            src={"/icon/0" + baserecipe.IngredientIconID[parseInt(index)].toString().substr(0, 2) + "000/0" + baserecipe.IngredientIconID[parseInt(index)].toString() + ".png"}
                        />
                        <span> {material} </span>
                        <span className="uk-text-meta">
                            x{baserecipe.IngredientAmounts[parseInt(index)]}
                        </span>
                    </li>
                    {marketInfo}
                </ul>
                {materialRecipe}
            </React.Fragment>
        )
    })

    return (
        <React.Fragment>
            <div className="uk-section uk-padding-small uk-background-secondary uk-light">
                <div className="uk-container">
                    <div className="uk-width-4-5 uk-float-right">
                        <h2>Materials</h2>
                        {materialList}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default MaterialRecipeComponent