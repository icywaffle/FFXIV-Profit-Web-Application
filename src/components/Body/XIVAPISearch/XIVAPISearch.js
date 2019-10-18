import React, { useState } from 'react'
import BackendRecipe from "components/Body/BackendRecipe"
import APIReponse from "./APIResponse"
import SearchFormComponent from "./SearchFormComponent"
function XIVAPISearch() {
    const [loading, setLoadStatus] = useState(false)
    const [itemClicked, setItemClickStatus] = useState(false)
    const [itemName, setItemName] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [recipeData, setRecipeData] = useState(null)
    const [pageNumber, setPage] = useState("1")

    function incrementPage() {
        if (searchData.Pagination.PageNext) {
            setLoadStatus(true)
            setPage(searchData.Pagination.PageNext)
            xivapiSearch(pageNumber)
        }

    }
    function decrementPage() {
        if (searchData.Pagination.PagePrev) {
            setLoadStatus(true)
            setPage(searchData.Pagination.PagePrev)
            xivapiSearch(pageNumber)
        }
    }

    function handleChangeItemName(event) {
        const { value } = event.target
        setItemName(value)
    }

    function handleClick() {
        setLoadStatus(true)
        xivapiSearch()
    }

    // Handles the Item Clicked in a list after searching for specific recipes
    // Will grab the recipeID from the clicked item, and searches the backend RESTful API
    function handleItemClick(event) {
        const { value } = event.target
        setItemClickStatus(true)
        setLoadStatus(true)
        // We now have a recipeID
        // Given this recipeID, we need to call the database, for the information
        backendSearch(value)
    }

    // Forces form enter to not refresh page and lose all search progress
    function handleFormEnter(event) {
        event.preventDefault()
        handleClick()
    }

    // Searches using the backend RESTful api server, for the specific information about that recipeID
    function backendSearch(recipeID) {
        const url = "https://" + window.location.hostname + "/recipe/" + recipeID
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setRecipeData(data)
                setLoadStatus(false)
            })
    }


    // Uses the xivapi Search response to obtain a quicker way to search for a specific recipe that we may not have in the database
    // Default pagenumber should be 1. If there are other pages, the next page and prev page buttons should handle that
    // These pages should be stored into a temp cache, so that you don't spam call to the API, for the exact same item
    function xivapiSearch(currPage = "1") {
        const searchedfor = itemName
        const url = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchedfor + "&page=" + currPage
        const cachedXIVAPI = sessionStorage.getItem(searchedfor + pageNumber)
        if (cachedXIVAPI) {
            console.log("Cached")
            setSearchData(JSON.parse(cachedXIVAPI))
        } else {
            console.log("fetched")
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem(searchedfor + pageNumber, JSON.stringify(data))
                    setSearchData(data)
                })
        }
        setLoadStatus(false)
        setRecipeData(null)
        setItemClickStatus(false)
    }

    return (
        // We need to offset for the navbar
        <div className="uk-background-secondary uk-animation-slide-left uk-flex-wrap uk-flex-column uk-light uk-height-viewport"
            uk-height-viewport="offset-top: 200">
            <SearchFormComponent handleFormEnter={handleFormEnter} itemName={itemName} handleChangeItemName={handleChangeItemName} handleClick={handleClick} />
            <APIReponse loading={loading} incrementPage={incrementPage} decrementPage={decrementPage} searchData={searchData} />
            <BackendRecipe loading={loading} recipeData={recipeData} />
        </div>
    )

}
export default XIVAPISearch