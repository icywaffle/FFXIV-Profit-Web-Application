import React from "react"

function LeftNavComponent() {
    return (
        <div className="uk-navbar-left uk-container uk-container-expand">
            <ul className="uk-navbar-nav">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/search/">Search</a>
                </li>
                <li>
                    <a href="/api/">API</a>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavComponent