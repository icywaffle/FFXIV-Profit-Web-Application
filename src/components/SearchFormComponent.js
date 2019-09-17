import React from 'react'

function SearchFormComponent(props) {
    return (
        <section>
            <div className="uk-section uk-background-secondary uk-animation-slide-left uk-light">
                <div className="uk-container">
                    <div className="uk-grid-match uk-width-5-6 uk-float-right">
                        <form>
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
                                uk-toggle="target: #searchspinner"
                                onClick={props.handleClick}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="uk-section uk-section-muted uk-animation-slide-left">
                <div className="uk-container uk-width-3-4 uk-float-right" uk-height-viewport="expand: true">
                    <div className="uk-accordion-content">
                        <ul className="uk-list" id="itemlist">
                            {props.itemList}
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

        </section>
    )
}

export default SearchFormComponent