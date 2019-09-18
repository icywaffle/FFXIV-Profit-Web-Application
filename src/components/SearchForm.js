import React from 'react'
import SearchFormComponent from "./SearchFormComponent"
import SearchResultComponent from "./SearchResultComponent"
import BackendResponse from './BackendResponse'
class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            itemClicked: false,
            itemName: "",
            searchData: {},
            recipeData: {},
            currPage: 1,
            counter: 0,
        }
        // We need to bind every time we want to setState
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    // Event takes ANY event, with a specific event name
    // and contains a value with that event name
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }


    prevPage() {
        this.setState({
            loading: true,
        })
        this.setState(prevState => {
            if (prevState.currPage > 1) {
                return {
                    currPage: prevState.currPage - 1
                }
            } else {
                return {
                    currPage: prevState.currPage
                }
            }

        }, () => {
            this.xivapiSearch()
        })
    }

    nextPage() {
        this.setState({
            loading: true,
        })
        this.setState(prevState => {
            if (prevState.currPage < prevState.searchData.Pagination.PageTotal) {
                return {
                    currPage: prevState.currPage + 1
                }
            } else {
                return {
                    currPage: prevState.currPage
                }
            }

        }, () => {
            this.xivapiSearch()
        })

    }


    handleClick() {
        this.setState({
            loading: true,
            currPage: 1,
        }, this.xivapiSearch())
    }

    // Handles the Item Clicked in a list after searching for specific recipes
    // Will grab the recipeID from the clicked item, and searches the backend RESTful API
    handleItemClick(event) {
        console.log("We got it working")
        const { name, value } = event.target
        this.setState({
            itemClicked: true,
        }, () => {
            console.log(name, value)
            // We now have a recipeID
            // Given this recipeID, we need to call the database, for the information
            this.backendSearch(value)
        })

    }

    // Searches using the backend RESTful api server, for the specific information about that recipeID
    backendSearch(recipeID) {
        const url = "http://localhost:9000/recipe/" + recipeID
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipeData: data,
                })
            })
    }

    // Uses the xivapi Search response to obtain a quicker way to search for a specific recipe that we may not have in the database
    xivapiSearch() {
        const searchedfor = this.state.itemName
        const url = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchedfor + "&page=" + this.state.currPage.toString()
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    searchData: data,
                    itemClicked: false,
                })
            })

    }




    // Pass all states and methods to the search form component
    // We pass them in the form of props

    // You can either send down objects using data={this.state} or use just {...this.state} so that you don't have to call all of them
    render() {
        // Show the search results, unless we click an item
        const searchResults = this.state.itemClicked
            ? (Object.entries(this.state.recipeData).length === 0 ? <div></div> : <BackendResponse recipeData={this.state.recipeData} />)
            : <SearchResultComponent
                handleItemClick={this.handleItemClick}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                {...this.state}
            />

        return (
            <div>
                <SearchFormComponent
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    {...this.state}
                />
                {searchResults}
            </div>
        )

    }
}

export default SearchForm