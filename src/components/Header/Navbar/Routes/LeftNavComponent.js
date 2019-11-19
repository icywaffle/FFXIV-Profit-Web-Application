import React from "react"

function LeftNavComponent() {
    var APIurl = "/api/"
    if (window.location.hostname === "localhost") {
        APIurl = "http://localhost:8080/api/"
    }
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
                    <a href="/profits/">Profits</a>
                </li>
                <li>
                    <a href={APIurl}>API</a>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavComponent