import React, { useState, useEffect } from 'react'
import MainRecipeComponent from './MainRecipeComponent'
import MaterialRecipeComponent from './MaterialRecipeComponent'
import Loading from "components/Body/Loading"
import Confirmation from "./Confirmation"

// Given props.MainRecipe, and props.InnerRecipes, 
// Returns all information about that main recipe.
// Recursively calls for the inner recipes if they have recipes.
function BackendRecipe(props) {

    const [Profits, setProfits] = useState(0)
    const [ProfitPercentage, setProfitPercentage] = useState(0)
    const [MarketItemPrice, setMarketItemPrice] = useState(0)
    const [MarketAmount, setMarketAmount] = useState(0)

    const [MarketIngredientPrice, setMarketIngredientPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [MarketIngredientAmount, setMarketIngredientAmount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    const [MaterialCosts, setMaterialCosts] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    // We only try to obtain data each time we get a new recipe
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user")) && props) {
            const RecipeID = props.MainRecipe.ID
            var url = "https://" + window.location.hostname + "/api/userinfo/recipe/" + RecipeID
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Only set if we have a response. If we don't , then return defaults
                    if (data.UserPrices !== undefined) {
                        // Main Item Data
                        if (data.UserPrices[props.MainRecipe.ItemResultTargetID] !== undefined) {
                            setMarketItemPrice(data.UserPrices[props.MainRecipe.ItemResultTargetID].MarketItemPrice)
                            setMarketAmount(data.UserPrices[props.MainRecipe.ItemResultTargetID].MarketAmount)
                        }
                        // Ingredient Data
                        const newMarketIngredientPrice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        const newMarketIngredientAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        for (var i = 0; i < props.MainRecipe.IngredientID.length; i++) {
                            if (props.MainRecipe.IngredientID[i] !== 0) {
                                const Price = data.UserPrices[props.MainRecipe.IngredientID[i]]
                                if (Price !== undefined) {
                                    newMarketIngredientPrice[i] = Price.MarketItemPrice
                                    newMarketIngredientAmount[i] = Price.MarketAmount
                                }

                            }
                        }
                        setMarketIngredientPrice(newMarketIngredientPrice)
                        setMarketIngredientAmount(newMarketIngredientAmount)
                    }
                })
        }
    }, [])

    // We want to set Profits any time we change our prices
    useEffect(() => {
        if (props) {
            var totalSum = 0
            for (var i = 0; i < MarketIngredientPrice.length; i++) {
                totalSum += MarketIngredientPrice[i] * props.MainRecipe.IngredientAmounts[i]
            }
            setProfits(MarketItemPrice - totalSum)
            setMaterialCosts(totalSum)
            var tempPercentage = ((MarketItemPrice - totalSum) / totalSum) * 100
            setProfitPercentage(parseInt(tempPercentage))
        }

    }, [MarketItemPrice, MarketIngredientPrice])

    function handleIngredientPriceChange(event) {
        const { name } = event.target
        const value = parseInt(event.target.value) || 0
        let newCopy = [...MarketIngredientPrice]
        newCopy[parseInt(name)] = value
        setMarketIngredientPrice(newCopy)
    }

    function handleAmountChange(event) {
        const { name } = event.target
        const value = parseInt(event.target.value) || 0
        let newCopy = [...MarketIngredientAmount]
        newCopy[parseInt(name)] = value
        setMarketIngredientAmount(newCopy)
    }
    function handleItemPriceChange(event) {
        const value = parseInt(event.target.value) || 0

        setMarketItemPrice(value)
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
        const RecipeID = props.MainRecipe.ID
        const ItemID = props.MainRecipe.ItemResultTargetID
        const IngredientItemID = props.MainRecipe.IngredientID
        const payload = {
            RecipeID: RecipeID,
            ItemID: ItemID,
            Profits: Profits,
            ProfitPercentage: ProfitPercentage,
            MarketItemPrice: MarketItemPrice,
            MarketAmount: MarketAmount,

            IngredientItemID: IngredientItemID,
            MarketIngredientPrice: MarketIngredientPrice,
            MarketIngredientAmount: MarketIngredientAmount,
        }
        var url = "https://" + window.location.hostname + "/userinfo/"
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
                Profits={Profits}
                ProfitPercentage={ProfitPercentage}
                MaterialCosts={MaterialCosts}
            />
            <MaterialRecipeComponent
                baserecipe={props.MainRecipe}
                matinfo={props.InnerRecipes}
                MarketIngredientAmount={MarketIngredientAmount}
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