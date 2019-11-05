import React from "react"
import LoginComponent from "./LoginComponent"
import LogoutComponent from "./LogoutComponent"
function Login(props) {
    function Logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("AccessToken")
        fetch("https://" + window.location.hostname + "/api/userinfo/logout")
        window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
    }

    if (props.userinfo) {
        return <LogoutComponent userinfo={props.userinfo} Logout={Logout} />
    } else {
        return <LoginComponent />
    }
}


export default Login