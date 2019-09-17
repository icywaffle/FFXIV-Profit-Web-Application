import React from 'react'
import SearchFormComponent from "./SearchFormComponent"

class SearchForm extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            itemName: "",
            recipeData: {},
            itemList: [],
            currPage: 1,
            counter: 0,
        }
        // We need to bind every time we want to setState
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
    }

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
            if (prevState.currPage < prevState.recipeData.Pagination.PageTotal) {
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

    xivapiSearch() {
        const searchedfor = this.state.itemName
        const url = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchedfor + "&page=" + this.state.currPage.toString()
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    recipeData: data,
                    itemList: this.createList(data),
                })
            })
    }


    createList(data) {
        const spacer = " "
        // Icon URLs from XIVAPI give /i/ then idnumber which we don't need.
        const listItems = data.Results.map((item) => {
            return (
                <li key={item.ID} value={item.ID}>
                    <img
                        src={"icon/" + item.Icon.substr(3)}
                        alt="Icon"
                    >
                    </img>
                    {spacer}
                    <button className="uk-button uk-button-text uk-text-capitalize">
                        {item.Name}
                    </button>
                </li>
            )


        })
        return listItems
    }

    // Pass all states and methods to the search form component
    // We pass them in the form of props

    // You can either send down objects using data={this.state} or use just {...this.state} so that you don't have to call all of them
    render() {
        return (
            <SearchFormComponent
                prevPage={this.prevPage}
                nextPage={this.nextPage}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                {...this.state}
            />
        )

    }
}
export default SearchForm