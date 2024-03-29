import React, { useState, useEffect } from "react"
import OAuth2Payload from "authkeys/discord.js"
import Login from "./Login"
function OAuth2(props) {
    // Sample Payload
    /*
        client_id: "",
        client_secret: "",
        grant_type: "authorization_code",
        code: "",
        redirect_uri: "",
        scope: "identify",
    */
    const [currentCode] = useState(props.code.location.search.slice(6))
    const [login, setLogin] = useState(localStorage.getItem("user"))
    // For urlencoded forms, we need to manually change our payload
    function encodePayload() {
        var formBody = []
        for (var property in OAuth2Payload) {
            if ({}.hasOwnProperty.call(OAuth2Payload, property)) {
                var encodedKey = encodeURIComponent(property)
                var encodedValue = encodeURIComponent(OAuth2Payload[property.toString()])
                formBody.push(encodedKey + "=" + encodedValue)
            }
        }
        formBody = formBody.join("&")

        return formBody
    }

    // Requests for an access token, so we can access user"s info
    function requestAccessToken() {
        var url = "https://discordapp.com/api/oauth2/token"

        OAuth2Payload.code = currentCode
        var encodedPayload = encodePayload()

        fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodedPayload,
        })
            .then((response) => response.json())

            // Once we get the data access_token , we can access the User Info and store it in session
            .then((data) => {
                localStorage.setItem("AccessToken", data.access_token)
                const payload = {
                    AccessToken: data.access_token,
                }
                // We also need to log into the API, since our token will expire
                // Parse the window location to know what domain we're at
                var APIURL = window.location.hostname
                // If we're localhost, then we have to describe by port, otherwise map to api subdomain
                if (window.location.hostname === "localhost") {
                    APIURL = "http://localhost:8080"
                } else {
                    APIURL = "https://api." + APIURL
                }

                APIURL = APIURL + "/userinfo/login/"

                fetch(APIURL, {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload),
                })
                    // Only start the redirect after we logged in from the API.
                    .then((json) => {
                        // Then we can go ahead and get user information with this access token.
                        fetch("https://discordapp.com/api/users/@me", {
                            headers: {
                                authorization: `${data.token_type} ${data.access_token}`,
                            },
                        })
                            .then((response) => response.json())
                            .then((userdata) => {
                                localStorage.setItem("user", JSON.stringify(userdata))
                                setLogin(localStorage.getItem("user"))

                                // Once we"re done getting data, move the user off of the query string.
                                window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
                            })
                    })
            })

    }


    // Only want to request once, and we only want to do it if we made a request with a code query
    useEffect(() => {
        // If we had access denied, user must have requested a cancel.
        if (props.code.location.search.slice(0, 6) === "?code=") {
            requestAccessToken()
        } else if (props.code.location.search.slice(0, 20) === "?error=access_denied") {
            window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
            return
        }
    }, [])

    return (
        <Login userinfo={JSON.parse(login)} />
    )

}
export default OAuth2