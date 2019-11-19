import React, { useState, useEffect } from "react"
import MainRecipeComponent from "./MainRecipeComponent"
import MaterialRecipeComponent from "./MaterialRecipeComponent"
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
	const [MarketIngredientAmount, setMarketIngredientAmount] = useState([
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

	// We only try to obtain data each time we get a new recipe
	useEffect(() => {
		if (JSON.parse(localStorage.getItem("user")) && props) {
			const RecipeID = props.MainRecipe.ID
			var APIurl =
				"https://" +
				window.location.hostname +
				"/api/userinfo/recipe/" +
				RecipeID
			if (window.location.hostname === "localhost") {
				APIurl = "http://localhost:8080/api/userinfo/recipe/" + RecipeID
			}
			fetch(APIurl, {
				credentials: "include"
			})
				.then((response) => response.json())
				.then((data) => {
					// Only set if we have a response. If we don"t , then return defaults
					if (data.UserPrices) {
						// Main Item Data
						if (data.UserPrices[props.MainRecipe.ItemResultTargetID]) {
							setMarketItemPrice(
								data.UserPrices[props.MainRecipe.ItemResultTargetID]
									.MarketItemPrice
							)
							setMarketAmount(
								data.UserPrices[props.MainRecipe.ItemResultTargetID]
									.MarketAmount
							)
						}
						// Ingredient Data
						const newMarketIngredientPrice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						const newMarketIngredientAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						for (var i = 0; i < props.MainRecipe.IngredientID.length; i++) {
							if (props.MainRecipe.IngredientID[parseInt(i)] !== 0) {
								const Price =
									data.UserPrices[props.MainRecipe.IngredientID[parseInt(i)]]
								if (Price) {
									newMarketIngredientPrice[parseInt(i)] = Price.MarketItemPrice
									newMarketIngredientAmount[parseInt(i)] = Price.MarketAmount
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
				totalSum +=
					MarketIngredientPrice[parseInt(i)] *
					props.MainRecipe.IngredientAmounts[parseInt(i)]
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
		const ItemName = props.MainRecipe.Name
		const IconID = props.MainRecipe.IconID
		const payload = {
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
		var APIurl = "https://" + window.location.hostname + "/api/userinfo/"
		if (window.location.hostname === "localhost") {
			APIurl = "http://localhost:8080/api/userinfo/"
		}
		fetch(APIurl, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		})
	}

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
	if (props === null) {
		return null
	}


	return (
		<div>
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
			<div className="uk-container">
				<div className="uk-width-4-5 uk-float-right">
					{confirmationButton()}
				</div>
			</div>
		</div>
	)
}

export default BackendRecipe
