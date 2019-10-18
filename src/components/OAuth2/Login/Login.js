import React from "react"
import LoginComponent from "./LoginComponent"
import LogoutComponent from "./LogoutComponent"
function Login(props) {
    function Logout() {
        localStorage.removeItem("user")
        window.location.href = "https://" + window.location.hostname
    }

    if (props.userinfo) {
        return <LogoutComponent userinfo={props.userinfo} Logout={Logout} />
    } else {
        return <LoginComponent />
    }
}


export default Login