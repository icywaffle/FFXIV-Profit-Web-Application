import React from "react"
function LoginComponent() {

    return (
        <div className="uk-padding-small">
            <a
                href={"https://discordapp.com/api/oauth2/authorize?client_id=598247290972667904&redirect_uri=https%3A%2F%2F"
                    + window.location.hostname
                    + "%2FUser&response_type=code&scope=identify"}
                className="uk-button uk-button-default"
            >
                Login
            </a>
        </div>
    )
}

export default LoginComponent