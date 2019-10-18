import React from "react"
// Creates a list of items, given the correct props with searchData
// Will link to the Backend Response given a correct handleItemClick
function ListOfSearchItems(props) {

    // We need to protect this function in the case that there are no prop data
    // Props data only gets filled when we actually search for something
    if (props === null || props.searchData === null) {
        return null
    }
    // If we have data, then we can actually create the entire list
    const listItems = props.searchData.Results.map((item) => {
        return (
            <li key={item.ID}>

                <div className="uk-position-center uk-position-relative">
                    <img
                        src={"/icon/" + item.Icon.substr(3)}
                        alt="Icon"
                    >
                    </img>
                    <button className="uk-button uk-button-text uk-text-capitalize" name="recipeID" value={item.ID} onClick={props.handleItemClick}>
                        {item.Name}
                    </button>
                </div>
            </li>
        )
    })

    return (
        <div className="uk-container uk-grid uk-flex-around uk-background-secondary uk-padding-large">
            <div className="uk-overflow-auto uk-height-medium uk-width-expand uk-padding">
                <ul className="uk-list">
                    {listItems}
                </ul>
            </div>

        </div>
    )
}

export default ListOfSearchItems