import React from 'react'

function SearchFormComponent(props) {
    const loadingSpinner = props.loading
        ? <div uk-spinner="ratio: 3"></div>
        : ""
    return (
        <section>
            <div className="uk-container">
                <div className="uk-grid-match uk-width-5-6 uk-float-right">
                    <form onSubmit={props.handleFormEnter}>
                        <input
                            className="uk-input"
                            type="text"
                            name="itemName"
                            placeholder="E.g. : Seeing Horde"
                            onChange={props.handleChange}
                        />
                        <button
                            className="uk-button uk-button-primary"
                            type="button"
                            onClick={props.handleClick}
                        >
                            Search
                            </button>
                    </form>
                    {loadingSpinner}
                </div>
            </div>
        </section>
    )
}

export default SearchFormComponent