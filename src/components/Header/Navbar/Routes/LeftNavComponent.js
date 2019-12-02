import React from "react"

function LeftNavComponent() {
    // Parse the window location to know what domain we're at
    var URLParts = window.location.hostname
    var firstDotPosition = URLParts.indexOf(".")
    var APIURL = URLParts.substring(firstDotPosition + 1)
    // If we're localhost, then we have to describe by port, otherwise map to api subdomain
    if (window.location.hostname === "localhost") {
        APIURL = "http://localhost:3001"
    } else {
        APIURL = "https://api." + APIURL
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
                    <a href={APIURL}>API</a>
                </li>
            </ul>
        </div>
    )
}

export default LeftNavComponent