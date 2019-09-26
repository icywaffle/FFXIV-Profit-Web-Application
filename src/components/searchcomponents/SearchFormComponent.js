import React from 'react'

function SearchFormComponent(props) {
    return (
        <form onSubmit={props.handleFormEnter}>
            <div className="uk-margin-small">
                <div className="uk-position-center uk-position-relative uk-inline">
                    <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: search"></span>
                    <input
                        className="uk-input uk-form-width-large"
                        type="text"
                        name="itemName"
                        placeholder="E.g. : Seeing Horde"
                        onChange={props.handleChange}
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
    )
}

export default SearchFormComponent