import React from "react"
import LoginComponent from "./LoginComponent"
import LogoutComponent from "./LogoutComponent"
function Login(props) {
    function Logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("AccessToken")
        // Logout from API
        var APIurl = "https://api." + window.location.hostname + "/userinfo/logout"
        if (window.location.hostname === "localhost") {
            APIurl = "http://localhost:8080/userinfo/logout"
        }
        fetch(APIurl, {
            credentials: "include",
        })
            .then((json) => {
                // Move user off after logoff
                window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
            })

    }

    if (props.userinfo) {
        return <LogoutComponent userinfo={props.userinfo} Logout={Logout} />
    } else {
        return <LoginComponent />
    }
}


export default Login