import React, { useState, useEffect } from 'react'
import Payload from './authkeys'
import LoginComponent from './LoginComponent';

function Auth(props) {
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
    const [login, setLogin] = useState(sessionStorage.getItem("user"))
    // For urlencoded forms, we need to manually change our payload
    function encodePayload() {
        var formBody = [];
        for (var property in Payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(Payload[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")

        return formBody
    }

    function RequestAccessToken() {
        var url = "https://discordapp.com/api/oauth2/token"
        Payload.code = currentCode
        var encodedPayload = encodePayload()
        fetch(url, {
            method: "POST",

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedPayload,
        })
            .then(response => response.json())
            // Once we get the data access_token , we can access the User Info
            .then(data => fetch('https://discordapp.com/api/users/@me', {
                headers: {
                    authorization: `${data.token_type} ${data.access_token}`,
                },
            })
                .then(response => response.json())
                .then(userdata => {
                    sessionStorage.setItem("user", JSON.stringify(userdata))
                    setLogin(sessionStorage.getItem("user"))
                    // Once we're done getting data, move the user off of the query string.
                    window.location.href = "https://" + window.location.hostname
                })
            )
    }


    // Only want to do this once, and we only want to do it if we made a request with a code query
    useEffect(() => {
        if (currentCode !== "") {
            RequestAccessToken()
        }
    }, [])

    return (
        <LoginComponent userinfo={JSON.parse(login)} />
    )


}


export default Auth