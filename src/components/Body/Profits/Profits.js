import React, { useState, useEffect } from "react"

export default function Profits() {
	const [sortedRecipes, setSortedRecipes] = useState([])

	function handleItemClick(event) {
		const { value } = event.target
		var url = "https://" + window.location.host + "/search?RecipeID=" + value
		if (window.location.hostname === "localhost") {
			url = "http://localhost:3000/search?RecipeID=" + value
		}
		window.open(url)
	}

	function recipesToDisplay() {
		const recipeList = sortedRecipes.map((data, index) => {
			return (
				<ul className="uk-list">
					<li>
						<img
							className="itemicon"
							alt="icon"
							src={
								"/icon/0" +
								data.IconID.toString().substr(0, 2) +
								"000/0" +
								data.IconID.toString() +
								".png"
							}
						/>
						<button className="uk-button uk-button-text uk-text-capitalize" name="recipeID" value={data.RecipeID} onClick={handleItemClick}>
							{data.ItemName}
						</button>
					</li>

					<li>Rank: {index + 1}</li>
					<li>Profit Percentage: {data.ProfitPercentage}%</li>
					<li>Profit: {data.Profits}</li>
					<li>Material Costs: {data.MaterialCosts}</li>
				</ul>
			)
		})
		return recipeList
	}

	useEffect(() => {
		// Parse the window location to know what domain we're at
		var APIURL = window.location.hostname
		// If we're localhost, then we have to describe by port, otherwise map to api subdomain
		if (window.location.hostname === "localhost") {
			APIURL = "http://localhost:8080"
		} else {
			APIURL = "https://api." + APIURL
		}
		// Add the path
		var APIURL = APIURL + "/userinfo/profits"

		fetch(APIURL, {
			credentials: "include"
		})
			.then((response) => response.json())
			.then((data) => {
				setSortedRecipes(data.SortedRecipes)
			})
	}, [])

	return (
		<div className="uk-section uk-padding-large uk-background-secondary">
			<div className="uk-container">
				<div className="uk-width-4-5 uk-float-right uk-light">
					<h2>Personal Profits</h2>
					<h6 className="uk-text-primary uk-margin-small-bottom">Sorted by Profit Percentage</h6>
					{recipesToDisplay()}
				</div>
			</div>
		</div>
	)
}
