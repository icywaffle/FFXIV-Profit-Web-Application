import React, { useState, useEffect } from "react"

export default function Profits() {
    const [sortedRecipes, setSortedRecipes] = useState([])

    function recipesToDisplay() {
        const recipeList = sortedRecipes.map((data, index) => {
            return (
                <ul>
                    <li>Recipe ID: {data.RecipeID}</li>
                    <li>Profit Percentage: {data.ProfitPercentage}%</li>
                    <li>Profit: {data.Profits}</li>
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
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setSortedRecipes(data.SortedRecipes)
                console.log(data.SortedRecipes)
            })
    }, [])

    return (
        <React.Fragment>
            {recipesToDisplay()}
        </React.Fragment>
    )

}