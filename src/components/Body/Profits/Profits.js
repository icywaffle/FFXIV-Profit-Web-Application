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
		var APIurl = "https://" + window.location.hostname + "/api/userinfo/profits"
		if (window.location.hostname === "localhost") {
			APIurl = "http://localhost:8080/api/userinfo/profits"
		}
		fetch(APIurl, {
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
