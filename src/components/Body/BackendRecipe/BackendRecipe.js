import React, { useState, useEffect } from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
function BackendRecipe(props) {

    const [MarketItemPrice, setMarketItemPrice] = useState(0)
    const [MarketIngredientPrice, setMarketIngredientPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [MarketAmount, setMarketAmount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    // We only try to obtain data from the backend ONCE, so it auto fills our forms
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) && props.recipeData) {
            const UserID = JSON.parse(localStorage.getItem("user")).id
            const RecipeID = props.recipeData.MainRecipe.Recipes.ID
            var url = "https://" + window.location.hostname + "/userinfo/" + UserID + "/recipe/" + RecipeID
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setMarketItemPrice(data.UserPrice.MarketItemPrice)
                    setMarketIngredientPrice(data.UserPrice.MarketIngredientPrice)
                    setMarketAmount(data.UserPrice.MarketAmount)
                })
        }
    }, [props.recipeData])

    function handleIngredientPriceChange(event) {
        const { name, value } = event.target
        let newCopy = [...MarketIngredientPrice]
        newCopy[parseInt(name)] = parseInt(value)
        setMarketIngredientPrice(newCopy)
    }

    function handleAmountChange(event) {
        const { name, value } = event.target
        let newCopy = [...MarketAmount]
        newCopy[parseInt(name)] = parseInt(value)
        setMarketAmount(newCopy)
    }
    function handleItemPriceChange(event) {
        const { value } = event.target
        setMarketItemPrice(parseInt(value))
    }

    // Do nothing on enter
    function onSubmit(event) {
        event.preventDefault()
    }
    function backendPOST() {
        // We need to login first before we can access the forms.
        if (!JSON.parse(localStorage.getItem("user"))) {
            return
        }
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
            body: JSON.stringify(payload),
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