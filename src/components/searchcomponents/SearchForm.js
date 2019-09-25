import React from 'react'
import SearchFormComponent from "./SearchFormComponent"
import SearchResultComponent from "./SearchResultComponent"
import BackendResponse from './BackendResponse'

class PrevPage extends React.Component {
    handleClick = () => {
        this.props.onPrevClick(this.props.pagePrev)
    }

    render() {
        if (this.props.pagePrev != null) {
            return (<button
                className="uk-button uk-button-secondary"
                type="button"
                onClick={this.handleClick}
            >
                Prev Page
            </button>
            )
        } else {
            return (<div></div>)
        }

    }
}

class NextPage extends React.Component {
    handleClick = () => {
        this.props.onNextClick(this.props.pageNext)
    }

    render() {
        if (this.props.pageNext != null) {
            return (
                <button
                    className="uk-button uk-button-secondary"
                    type="button"
                    onClick={this.handleClick}
                >
                    Next Page
                </button>
            )
        } else {
            return (<div></div>)
        }
    }
}


class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            itemClicked: false,
            itemName: "",
            searchData: {},
            recipeData: {},
            counter: 0,
        }
        // We need to bind every time we want to setState
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleFormEnter = this.handleFormEnter.bind(this)
    }

    // Event takes ANY event, with a specific event name
    // and contains a value with that event name
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }


    prevPage(prevPage) {
        this.xivapiSearch(prevPage)
    }

    nextPage(nextPage) {
        this.xivapiSearch(nextPage)
    }


    handleClick() {
        this.setState({
            loading: true,
        }, this.xivapiSearch())
    }

    // Handles the Item Clicked in a list after searching for specific recipes
    // Will grab the recipeID from the clicked item, and searches the backend RESTful API
    handleItemClick(event) {
        const { value } = event.target
        this.setState({
            itemClicked: true,
            loading: true,
        }, () => {
            // We now have a recipeID
            // Given this recipeID, we need to call the database, for the information
            this.backendSearch(value)
        })

    }

    handleFormEnter(event) {
        event.preventDefault()
        this.handleClick()
    }

    // Searches using the backend RESTful api server, for the specific information about that recipeID
    backendSearch(recipeID) {
        const url = "https://" + window.location.hostname + "/recipe/" + recipeID
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipeData: data,
                    loading: false,
                })
            })
    }


    // Uses the xivapi Search response to obtain a quicker way to search for a specific recipe that we may not have in the database
    // Default pagenumber should be 1. If there are other pages, the next page and prev page buttons should handle that
    xivapiSearch(pageNumber = "1") {
        const searchedfor = this.state.itemName
        const url = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchedfor + "&page=" + pageNumber
        const cachedXIVAPI = localStorage.getItem(searchedfor + pageNumber)
        if (cachedXIVAPI) {
            this.setState({
                searchData: JSON.parse(cachedXIVAPI),
            }, () => {
                // Okay? It won't set state even after a callback afterwards
                // It must be due to something about that JSON parse?
                // Anyways, we can just set state directly afterwards, and we should be fine
                this.setState({
                    loading: false,
                    recipeData: {},
                    itemClicked: false,
                })
            })
        } else {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem(searchedfor + pageNumber, JSON.stringify(data))
                    this.setState({
                        loading: false,
                        searchData: data,
                        // Empty out whatever we had before, if we decide to search again
                        recipeData: {},
                        itemClicked: false,
                    })
                })
        }


    }





    // Pass all states and methods to the search form component
    // We pass them in the form of props

    // You can either send down objects using data={this.state} or use just {...this.state} so that you don't have to call all of them
    render() {


        // Show the search results, unless we click an item
        const searchResults = this.state.itemClicked
            ? (Object.entries(this.state.recipeData).length === 0 ? <div></div> : <BackendResponse recipeData={this.state.recipeData} />)
            : <div>
                <SearchResultComponent
                    handleItemClick={this.handleItemClick}
                    {...this.state}
                />
            </div>


        const loadingSpinner = this.state.loading
            ? <div uk-spinner="ratio: 3"></div>
            : <div></div>

        const pageNext = Object.entries(this.state.searchData).length === 0
            ? null
            : this.state.searchData.Pagination.PageNext

        const pagePrev = Object.entries(this.state.searchData).length === 0
            ? null
            : this.state.searchData.Pagination.PagePrev

        return (
            <div>
                <SearchFormComponent
                    handleFormEnter={this.handleFormEnter}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    {...this.state}
                />
                {loadingSpinner}
                {searchResults}

                <PrevPage
                    onPrevClick={this.prevPage}
                    pagePrev={pagePrev}
                />
                <NextPage
                    onNextClick={this.nextPage}
                    pageNext={pageNext}
                />
            </div>
        )

    }
}

export default SearchForm