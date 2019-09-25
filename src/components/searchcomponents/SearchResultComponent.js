import React from 'react'
function createList(props) {
    const spacer = " "

    // We need to protect this function in the case that there are no prop data
    // Props data only gets filled when we actually search for something
    if (Object.entries(props.searchData).length === 0) {
        return []
    }

    // If we have data, then we can actually create the entire list
    const listItems = props.searchData.Results.map((item) => {
        return (
            <li key={item.ID}>
                <img
                    src={"/icon/" + item.Icon.substr(3)}
                    alt="Icon"
                >
                </img>
                {spacer}
                <button className="uk-button uk-button-text uk-text-capitalize" name="recipeID" value={item.ID} onClick={props.handleItemClick}>
                    {item.Name}
                </button>
            </li>
        )


    })
    return listItems
}
function SearchResultComponent(props) {
    const itemList = createList(props)
    return (<div>
        <div className="uk-section uk-section-muted uk-animation-slide-left">
            <div className="uk-container uk-width-3-4 uk-float-right" uk-height-viewport="expand: true">
                <div className="uk-accordion-content">
                    <ul className="uk-list" id="itemlist">
                        {itemList}
                    </ul>
                </div>
            </div>
        </div>
        <button
            className="uk-button uk-button-secondary"
            type="button"
            uk-toggle="target: #searchspinner"
            onClick={props.prevPage}
        >
            Prev Page
        </button>
        <button
            className="uk-button uk-button-secondary"
            type="button"
            uk-toggle="target: #searchspinner"
            onClick={props.nextPage}
        >
            Next Page
        </button>
    </div>)
}

export default SearchResultComponent