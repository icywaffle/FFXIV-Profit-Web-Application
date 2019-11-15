import React from "react"
function LoginComponent() {
    var discordURL = "https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=https%3A%2F%2Fffxivprofit.com%2FUser&response_type=code&scope=identify"
    if (window.location.hostname === "localhost") {
        discordURL = "https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FUser&response_type=code&scope=identify"
    }
    return (
        <div className="uk-padding-small">
            <a
                href={discordURL}
                className="uk-button uk-button-default"
            >
                Login
            </a>
        </div>
    )
}

export default LoginComponent