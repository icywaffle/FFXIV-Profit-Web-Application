import React, { useState, useEffect } from "react"
import Loading from "../Loading"
import MaterialRecipeComponent from "./MaterialRecipeComponent"

// Given just a recipe ID, will find the set of profits for that recipe and nested recipes
function MainRecipeComponent(props) {
    const [Profits, setProfits] = useState(0)
    const [ProfitPercentage, setProfitPercentage] = useState(0)
    const [MarketItemPrice, setMarketItemPrice] = useState(0)
    const [MarketIngredientPrice, setMarketIngredientPrice] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ])

    const [MaterialCosts, setMaterialCosts] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [recipeData, setRecipeData] = useState(null)
    const [isUniversalisClicked, setUniversalisClicked] = useState(false)

    function handleIngredientPriceChange(event) {
        const { name } = event.target
        const value = parseInt(event.target.value) || 0
        let newCopy = [...MarketIngredientPrice]
        newCopy[parseInt(name)] = value
        setMarketIngredientPrice(newCopy)
    }

    function handleItemPriceChange(event) {
        const value = parseInt(event.target.value) || 0

        setMarketItemPrice(value)
    }





    // Searches using the backend RESTful api server, for the specific information about that recipeID
    function backendSearch(recipeID) {
        // Parse the window location to know what domain we're at
        var APIURL = window.location.hostname
        // If we're localhost, then we have to describe by port, otherwise map to api subdomain
        if (window.location.hostname === "localhost") {
            APIURL = "http://localhost:8080"
        } else {
            APIURL = "https://api." + APIURL
        }
        // Add the path
        APIURL = APIURL + "/recipe/" + recipeID

        fetch(APIURL, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setRecipeData(data)
            })
    }

    function backendPOST() {
        // We need to login first before we can access the forms.
        if (!JSON.parse(localStorage.getItem("user"))) {
            return
        }
        setSubmitted(true)
        const RecipeID = RecipeData.MainRecipe.ID
        const ItemID = RecipeData.MainRecipe.ItemResultTargetID
        const IngredientItemID = RecipeData.MainRecipe.IngredientID
        const ItemName = RecipeData.MainRecipe.Name
        const IconID = RecipeData.MainRecipe.IconID
        var payload = {
            RecipeID,
            ItemID,
            IconID,
            ItemName,
            Profits,
            ProfitPercentage,
            MarketItemPrice,
            MarketAmount,
            MaterialCosts,
            IngredientItemID,
            MarketIngredientPrice,
            MarketIngredientAmount
        }

        // Parse the window location to know what domain we're at
        var APIURL = window.location.hostname
        // If we're localhost, then we have to describe by port, otherwise map to api subdomain
        if (window.location.hostname === "localhost") {
            APIURL = "http://localhost:8080"
        } else {
            APIURL = "https://api." + APIURL
        }
        // Add Path
        var APIURL = APIURL + "/userinfo/"

        fetch(APIURL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    }

    // Don't do anything on submit since we want to press a button to confirm POST
    function onSubmit(event) {
        event.preventDefault()
    }

    // POST Request to API, only if logged in
    function confirmationButton() {
        if (submitted) {
            return (<Confirmation submitted={submitted} />)
        }
        var discordURL = "https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=https%3A%2F%2Fffxivprofit.com%2FUser&response_type=code&scope=identify"
        if (window.location.hostname === "localhost") {
            discordURL = "https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FUser&response_type=code&scope=identify"
        }

        if (!localStorage.getItem("user")) {
            return (
                <a
                    href={discordURL}
                    className="uk-button uk-button-default">
                    Login to Submit Prices
				</a>
            )
        }

        return (
            <button className="uk-button uk-button-default" onClick={backendPOST}>
                Submit Prices
				</button>
        )
    }

    function handleItemPriceChange(event) {
        const value = parseInt(event.target.value) || 0

        setMarketItemPrice(value)
    }

    function UniversalisApp() {
        setUniversalisClicked(true)
        const request = async () => {

            // Call for the main recipe price first
            const mainRecipeID = RecipeData.MainRecipe.ItemResultTargetID
            const mainResponse = await fetch("https://universalis.app/api/Sargatanas/" + mainRecipeID.toString())
            const data = await mainResponse.json()
            // Force wait for 60ms, so that we can rate limit our calls.
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 60)
            })

            setMarketItemPrice(parseInt(data.averagePrice))

            // Then we can call for the recipe ingredients next
            const newMarketIngredientPrices = [...MarketIngredientPrice]

            for (var i = 0; i < RecipeData.MainRecipe.IngredientID.length; i++) {
                const index = i
                if (RecipeData.MainRecipe.IngredientID[parseInt(i)] !== 0) {
                    const itemID = RecipeData.MainRecipe.IngredientID[parseInt(i)]

                    const response = await fetch("https://universalis.app/api/Sargatanas/" + itemID.toString())
                    const data = await response.json()

                    // Force wait for 60ms, so that we can rate limit our calls.
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 60)
                    })


                    newMarketIngredientPrices[parseInt(index)] = parseInt(data.averagePrice)
                }
            }

            setMarketIngredientPrice(newMarketIngredientPrices)
            setUniversalisClicked(false)
        }
        request()
    }

    function UniversalisButton() {
        if (isLoading) {
            return (<Loading loading={isLoading} />)
        }

        return (<button
            className="uk-button uk-button-default"
            onClick={UniversalisApp}
        >
            Fill Profits with Universalis
		</button>)

    }


    // We need information about the specific recipe ID
    useEffect(() => {
        backendSearch(props.recipeID)
    }, [])

    // We want to set Profits any time we change our prices
    useEffect(() => {
        if (RecipeData) {
            var totalSum = 0
            for (var i = 0; i < MarketIngredientPrice.length; i++) {
                totalSum +=
                    MarketIngredientPrice[parseInt(i)] *
                    RecipeData.MainRecipe.IngredientAmounts[parseInt(i)]
            }
            setProfits(MarketItemPrice - totalSum)
            setMaterialCosts(totalSum)
            var tempPercentage = ((MarketItemPrice - totalSum) / totalSum) * 100
            setProfitPercentage(parseInt(tempPercentage))
        }
    }, [MarketItemPrice, MarketIngredientPrice])

    // Wait for Univeralis to fill Profits
    useEffect(() => {
        if (isUniversalisClicked) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [isUniversalisClicked])

    // Wait for recipeData to be filled first
    if (recipeData === null) {
        return (
            <React.Fragment>
                <Loading loading={true} />
            </React.Fragment>
        )
    }

    return (
        <div className="uk-section uk-padding-small">
            <div className="uk-container">
                <div className="uk-width-4-5 uk-float-right">
                    {UniversalisButton()}
                    <h4>
                        <img
                            className="itemicon"
                            alt="icon"
                            src={"/icon/0" + recipeData.Recipes.IconID.toString().substr(0, 2) + "000/0" + recipeData.Recipes.IconID.toString() + ".png"}
                        />
                        <span> {recipeData.Recipes.Name}</span>
                    </h4>
                    <form
                        className="uk-form-width-small"
                        onSubmit={onSubmit}
                    >
                        Market Price:
                            <input
                            className="uk-input"
                            type="text"
                            name="MarketItemPrice"
                            value={MarketItemPrice}
                            placeholder="Current Market Price"
                            onChange={handleItemPriceChange}
                        />
                    </form>
                    <ul className="uk-list">
                        <li>Material Costs: {MaterialCosts}</li>
                        <li>Bought All Materials Profit: {Profits}</li>
                        <li>Bought All Materials Profit Percentage: {ProfitPercentage}%</li>
                    </ul>
                </div>
                <div className="uk-width-4-5 uk-float-right">
                    {confirmationButton()}
                </div>
            </div>

            <div className="uk-container">
                <div className="uk-width-4-5 uk-float-right">
                    <MaterialRecipeComponent
                        handleIngredientPriceChange={handleIngredientPriceChange}
                        MarketIngredientAmount={MarketIngredientAmount}
                    />
                </div>
            </div>
        </div>
    )
}


export default MainRecipeComponent