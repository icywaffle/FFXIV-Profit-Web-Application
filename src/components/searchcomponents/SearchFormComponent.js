import React from 'react'

function SearchFormComponent(props) {

    return (
        <section>
            <div className="uk-section uk-background-secondary uk-animation-slide-left uk-light">
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchFormComponent