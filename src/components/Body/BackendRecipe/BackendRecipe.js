import React, { useState, useEffect } from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
import Confirmation from "./Confirmation"

// Given props.MainRecipe, and props.InnerRecipes, 
// Returns all information about that main recipe.
// Recursively calls for the inner recipes if they have recipes.
function BackendRecipe(props) {
    const [MarketItemPrice, setMarketItemPrice] = useState(0)
    const [MarketIngredientPrice, setMarketIngredientPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [MarketAmount, setMarketAmount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [Profit, setProfit] = useState(0)
    const [MaterialCosts, setMaterialCosts] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    // We only try to obtain data each time we get a new recipe
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) && props) {
            const UserID = JSON.parse(localStorage.getItem("user")).id
            const RecipeID = props.MainRecipe.ID
            var url = "https://" + window.location.hostname + "/userinfo/" + UserID + "/recipe/" + RecipeID
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Only set if we have a response. If we don't , then return defaults
                    if (data.UserPrice !== null) {
                        setMarketItemPrice(data.UserPrice.MarketItemPrice)
                        setMarketIngredientPrice(data.UserPrice.MarketIngredientPrice)
                        setMarketAmount(data.UserPrice.MarketAmount)
                    }
                })
        }
    }, [props])

    // We want to set profit any time we change our prices
    useEffect(() => {
        if (props) {
            var totalSum = 0
            for (var i = 0; i < MarketIngredientPrice.length; i++) {
                totalSum += MarketIngredientPrice[i] * props.MainRecipe.IngredientAmounts[i]
            }
            setProfit(MarketItemPrice - totalSum)
            setMaterialCosts(totalSum)
        }

    }, [MarketItemPrice, MarketIngredientPrice])

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
        setSubmitted(true)
        const UserID = JSON.parse(localStorage.getItem("user")).id
        const RecipeID = props.MainRecipe.ID
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

    if (props !== null) {

        return (<div>
            <Loading loading={props.loading} />
            <MainRecipeComponent
                baserecipe={props.MainRecipe}
                onSubmit={onSubmit}
                MarketItemPrice={MarketItemPrice}
                handleItemPriceChange={handleItemPriceChange}
                Profit={Profit}
                MaterialCosts={MaterialCosts}
            />
            <MaterialRecipeComponent
                baserecipe={props.MainRecipe}
                matinfo={props.InnerRecipes}
                MarketAmount={MarketAmount}
                MarketIngredientPrice={MarketIngredientPrice}
                handleIngredientPriceChange={handleIngredientPriceChange}
                handleAmountChange={handleAmountChange}
                onSubmit={onSubmit}
            />

            <div>
                <Confirmation submitted={submitted} />
                <button
                    className="uk-button uk-button-default"
                    onClick={backendPOST}
                >
                    Submit Prices
            </button>
            </div>

        </div>)
    }

    return null


}

export default BackendRecipe