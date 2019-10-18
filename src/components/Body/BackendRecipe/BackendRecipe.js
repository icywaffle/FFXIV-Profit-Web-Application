import React, { useState } from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
function BackendRecipe(props) {

    const [MarketItemPrice, setMarketItemPrice] = useState(0)
    const [MarketIngredientPrice, setMarketIngredientPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [MarketAmount, setMarketAmount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    function handleIngredientPriceChange(event) {
        const { index, value } = event.target
        setMarketIngredientPrice(prevArray => prevArray[index] = value)
    }

    function handleAmountChange(event) {
        const { index, value } = event.target
        setMarketAmount(prevArray => prevArray[index] = value)
    }
    function handleItemPriceChange(event) {
        const { value } = event.target
        setMarketItemPrice(value)
    }

    // Do nothing on enter
    function onSubmit(event) {
        event.preventDefault()
    }
    function backendPOST() {
        // We need to login first before we can access the forms.
        console.log(props.recipeData)
        const UserID = JSON.parse(localStorage.getItem("user")).id
        const RecipeID = props.recipeData.MainRecipe.Recipes.ID
        const payload = {
            UserID: UserID,
            RecipeID: RecipeID,
            MarketItemPrice: MarketItemPrice,
            MarketIngredientPrice: MarketIngredientPrice,
            MarketAmount: MarketAmount,
        }
        var url = "https://" + window.location.hostname + "/userinfo/" + UserID
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
        })
    }
    if (props === null) {
        return null
    }

    if (props.recipeData !== null) {

        return (<div>
            <Loading loading={props.loading} />
            <MainRecipeComponent
                baseinfo={props.recipeData.MainRecipe}
                onSubmit={onSubmit}
                MarketItemPrice={MarketItemPrice}
                handleItemPriceChange={handleItemPriceChange}
            />
            <MaterialRecipeComponent
                baseinfo={props.recipeData.MainRecipe}
                matinfo={props.recipeData.InnerRecipes}
                MarketAmount={MarketAmount}
                MarketIngredientPrice={MarketIngredientPrice}
                handleIngredientPriceChange={handleIngredientPriceChange}
                handleAmountChange={handleAmountChange}
                onSubmit={onSubmit}
            />
            <button
                className="uk-button uk-button-default"
                onClick={backendPOST}
            >
                Submit Prices
            </button>
        </div>)
    }

    return null


}

export default BackendRecipe