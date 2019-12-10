import React, { useEffect, useState } from "react"
import BackendRecipe from "components/Body/BackendRecipe"
import APIReponse from "./APIResponse"
import SearchFormComponent from "./SearchFormComponent"

function XIVAPISearch() {
    const [loading, setLoadStatus] = useState(false)
    const [itemName, setItemName] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [recipeData, setRecipeData] = useState(null)
    const [queryRecipeID] = useState(window.location.search.substring(10))
    const [isRecipeClicked, setRecipeClicked] = useState(false)

    useEffect(() => {
        if (queryRecipeID !== "") {
            backendSearch(queryRecipeID)
        }
    }, [queryRecipeID])

    useEffect(() => {
        if (isRecipeClicked) {
            setLoadStatus(true)
        }
    }, [isRecipeClicked])

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
                setSearchData(null)
                setRecipeData(data)
                setLoadStatus(false)
            })
            .catch(
                setLoadStatus(false)
            )
    }

    // Uses the xivapi Search response to obtain a quicker way to search for a specific recipe that we may not have in the database
    // Default pagenumber should be 1. If there are other pages, the next page and prev page buttons should handle that
    // These pages should be stored into a temp cache, so that you don"t spam call to the API, for the exact same item
    function xivapiSearch(currPage = "1") {
        const searchedfor = itemName
        const url = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchedfor + "&page=" + currPage
        const cachedXIVAPI = sessionStorage.getItem(searchedfor + currPage)
        if (cachedXIVAPI) {
            setSearchData(JSON.parse(cachedXIVAPI))
            setLoadStatus(false)
        } else {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    sessionStorage.setItem(searchedfor + currPage, JSON.stringify(data))
                    setSearchData(data)
                    setLoadStatus(false)
                })
        }
        setRecipeData(null)
    }

    function incrementPage() {
        if (searchData.Pagination.PageNext) {
            setLoadStatus(true)
            setSearchData(null)
            xivapiSearch(searchData.Pagination.PageNext)
        }

    }

    function decrementPage() {
        if (searchData.Pagination.PagePrev) {
            setLoadStatus(true)
            setSearchData(null)
            xivapiSearch(searchData.Pagination.PagePrev)
        }
    }

    // Handles the Item Clicked in a list after searching for specific recipes
    // Will grab the recipeID from the clicked item, and searches the backend RESTful API
    function handleItemClick(event) {
        const { value } = event.target

        // So apparently setting Loading by itself will not work. LOL
        // So you have to set Recipe Clicked to true, useEffect to detect this change,
        // THEN you can set loading.
        setRecipeClicked(true)

        // We now have a recipeID
        // Given this recipeID, we need to call the database, for the information
        backendSearch(value)
    }

    function handleClick() {
        setLoadStatus(true)
        xivapiSearch()
    }

    function handleChangeItemName(event) {
        const { value } = event.target
        setItemName(value)
    }

    // Forces form enter to not refresh page and lose all search progress
    function handleFormEnter(event) {
        event.preventDefault()
        handleClick()
    }

    // Only show API Response if we haven"t found anything.
    // If we did find something, then we can just switch
    if (recipeData === null) {
        return (
            <div className="uk-background-secondary uk-animation-slide-left uk-flex-wrap uk-flex-column uk-light"
                uk-height-viewport="expand: true"
            >
                <SearchFormComponent handleFormEnter={handleFormEnter} itemName={itemName} handleChangeItemName={handleChangeItemName} handleClick={handleClick} />
                <APIReponse loading={loading} incrementPage={incrementPage} decrementPage={decrementPage} searchData={searchData} handleItemClick={handleItemClick} />
            </div>

        )
    } else {
        return (
            <div className="uk-background-secondary uk-animation-slide-left uk-flex-wrap uk-flex-column uk-light"
                uk-height-viewport="expand: true"
            >
                <SearchFormComponent handleFormEnter={handleFormEnter} itemName={itemName} handleChangeItemName={handleChangeItemName} handleClick={handleClick} />
                <BackendRecipe loading={loading} MainRecipe={recipeData.MainRecipe.Recipes} InnerRecipes={recipeData.InnerRecipes.Recipes} />
            </div>

        )
    }


}
export default XIVAPISearch