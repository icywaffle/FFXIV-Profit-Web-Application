import React from "react"

// Given an handleFormEnter Method, handleChange, and a handleClick method
// Shows a functional searchbar across the screen
function SearchFormComponent(props) {
    return (
        <div className="uk-container uk-padding-large uk-padding-remove-bottom">
            <form onSubmit={props.handleFormEnter}>
                <div className="uk-margin-small">
                    <div className="uk-position-center uk-position-relative uk-inline">
                        <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: search"></span>
                        <input
                            className="uk-input uk-form-width-large"
                            type="text"
                            name="itemName"
                            value={props.itemName}
                            placeholder="E.g. : Seeing Horde"
                            onChange={props.handleChangeItemName}
                        />
                    </div>
                </div>
                <button
                    className="uk-button uk-button-primary uk-align-center"
                    type="button"
                    onClick={props.handleClick}
                >
                    Search
                </button>
            </form>
        </div>
    )

}

export default SearchFormComponent