import React, { useEffect, useState } from "react"
import APIReponse from "./APIResponse"
import SearchFormComponent from "./SearchFormComponent"

function XIVAPISearch() {
    const [loading, setLoadStatus] = useState(false)
    const [itemName, setItemName] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [isRecipeClicked, setRecipeClicked] = useState(false)


    useEffect(() => {
        if (isRecipeClicked) {
            setLoadStatus(true)
        }
    }, [isRecipeClicked])


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

        // Parse the window location to know what domain we're at
        var URL = window.location.hostname
        // If we're localhost, then we have to describe by port, otherwise map to api subdomain
        if (window.location.hostname === "localhost") {
            URL = "http://localhost:3000"
        }
        // Add the path
        URL = URL + "/recipe/?ID=" + value
        // We now have a recipeID, send it to Backend Recipes
        window.location = URL
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

    return (
        <div className="uk-background-secondary uk-animation-slide-left uk-flex-wrap uk-flex-column uk-light"
            uk-height-viewport="expand: true"
        >
            <SearchFormComponent handleFormEnter={handleFormEnter} itemName={itemName} handleChangeItemName={handleChangeItemName} handleClick={handleClick} />
            <APIReponse loading={loading} incrementPage={incrementPage} decrementPage={decrementPage} searchData={searchData} handleItemClick={handleItemClick} />
        </div>

    )
}
export default XIVAPISearch