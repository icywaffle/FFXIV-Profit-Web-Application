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

	function convertTimestamp(timestamp) {
		var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
			yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
			hh = d.getHours(),
			h = hh,
			min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
			ampm = 'AM',
			time;

		if (hh > 12) {
			h = hh - 12;
			ampm = 'PM';
		} else if (hh === 12) {
			h = 12;
			ampm = 'PM';
		} else if (hh == 0) {
			h = 12;
		}

		// ie: 01-22-2014, 3:00 PM
		time = mm + '/' + dd + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
		return time;
	}

	function recipesToDisplay() {
		const recipeList = sortedRecipes.map((data, index) => {

			const date = convertTimestamp(data.Added)

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
					<li>Added: {date}</li>
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
